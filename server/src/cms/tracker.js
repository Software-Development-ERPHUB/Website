import { Router } from 'express'
import multer from 'multer'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { pool } from '../db.js'
import { config } from '../config.js'
import { requireUser, EVERYONE } from './auth.js'
import { COLLECTIONS, STAGES, STAGE_STATUSES, SUITES, slugify } from './collections.js'
import { cleanData } from './sanitize.js'
import { ENTERPRISE, SUITE_ENTRIES, MODULES, TEAM } from './catalogue.js'

/**
 * Development tracker (dashboard only — never public). Admins, editors and developers.
 *   GET    /api/cms/tracker                          applications, team, stage list, and who "me" is
 *   GET    /api/cms/tracker/activity?app=&limit=     recent changes
 *   PATCH  /api/cms/tracker/apps/:id/stages/:stage   update one stage { status, start, end, notes, owners? }  ·  { join: true } adds me
 *   GET    /api/cms/tracker/files?app=               files uploaded to stages
 *   POST   /api/cms/tracker/apps/:id/stages/:stage/files   upload (field "file")
 *   GET    /api/cms/tracker/files/:id                download
 *   DELETE /api/cms/tracker/files/:id                uploader or admin
 *   POST   /api/cms/tracker/seed                     admins: add the ERP catalogue and placeholder team
 *
 * Several people can share a stage. Developers can change stages they are on (and who else is on them),
 * pick up an unassigned stage, or join a stage others are already working on.
 */
const router = Router()
router.use(requireUser(EVERYONE))
const parse = (s) => { try { return JSON.parse(s) } catch { return {} } }
const STAGE_IDS = STAGES.map((s) => s.id)
const stageLabel = (id) => STAGES.find((s) => s.id === id)?.label || id
const FILE_DIR = path.join(config.uploadDir, 'tracker')

/** A stage row stores owners as an array; fall back to a legacy single owner. */
const ownersOf = (r) => (Array.isArray(r?.owners) ? r.owners : (r?.owner ? [r.owner] : []))

async function rows(collection) {
  const [r] = await pool.query(
    `SELECT id, slug, draft_data, sort_order, updated_at FROM cms_entries
      WHERE collection = ? AND status <> 'archived' ORDER BY sort_order ASC, id ASC`, [collection])
  return r.map((x) => ({ ...parse(x.draft_data), id: x.id, slug: x.slug, updatedAt: x.updated_at }))
}

/** The team member (slug) a signed-in user is linked to, through the team member's login email. */
async function teamSlugFor(user) {
  const team = await rows('team')
  return team.find((t) => String(t.email || '').trim().toLowerCase() === user.email.toLowerCase())?.slug || ''
}

async function getApp(id) {
  const [[row]] = await pool.query(`SELECT id, title, draft_data FROM cms_entries WHERE collection = 'apps' AND id = ?`, [Number(id) || 0])
  return row ? { id: row.id, name: row.title, data: parse(row.draft_data) } : null
}

/** May this user change this stage? Staff always; developers only ones they share or an unassigned stage. */
function canEdit(user, me, stage) {
  if (user.role !== 'developer') return true
  const owners = ownersOf(stage)
  return !!me && (!owners.length || owners.includes(me))
}

/** owner = team member who holds the stage, so the dashboard can show each person's last update */
export async function log(app, stage, message, user, owner = '') {
  await pool.execute('INSERT INTO tracker_activity (app_id, app_name, stage, owner, message, user_id, user_name) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [app.id, String(app.name).slice(0, 255), stage || '', owner || '', message.slice(0, 500), user?.id || null, user?.name || null])
}

/** Write one activity line per stage that changed (used here and by the entry editor). */
export async function logStageChanges(app, before = {}, after = {}, user) {
  const team = Object.fromEntries((await rows('team')).map((t) => [t.slug, t.name]))
  const who = (slug) => team[slug] || slug
  const names = (arr) => arr.map(who).join(', ')
  for (const id of STAGE_IDS) {
    const a = before[id] || {}, b = after[id] || {}
    const ao = ownersOf(a), bo = ownersOf(b)
    const parts = []
    if (ao.join() !== bo.join()) parts.push(bo.length ? `assigned to ${names(bo)}` : 'unassigned')
    if ((a.status || 'Not started') !== (b.status || 'Not started')) parts.push(`marked ${b.status || 'Not started'}`)
    if ((a.start || '') !== (b.start || '') || (a.end || '') !== (b.end || '')) parts.push('updated dates')
    if ((a.notes || '') !== (b.notes || '') && b.notes) parts.push(`note: “${b.notes.slice(0, 120)}”`)
    if (parts.length) await log(app, id, `${stageLabel(id)} ${parts.join(', ')}`, user, bo.join(','))
  }
}

router.get('/', async (req, res, next) => {
  try {
    const [apps, team, me, [touched], [seen]] = await Promise.all([rows('apps'), rows('team'), teamSlugFor(req.user),
      pool.query('SELECT app_id, stage, MAX(created_at) AS at FROM tracker_activity GROUP BY app_id, stage'),
      pool.query("SELECT owner, created_at FROM tracker_activity WHERE owner <> '' ORDER BY created_at DESC")])
    // an activity row can credit several owners (comma-separated); newest row per person wins
    const lastSeen = {}
    for (const t of seen) for (const s of String(t.owner).split(',')) { const k = s.trim(); if (k && !(k in lastSeen)) lastSeen[k] = t.created_at }
    res.json({
      ok: true, apps, team, me, role: req.user.role, stages: STAGES, statuses: STAGE_STATUSES, suites: SUITES,
      lastUpdate: Object.fromEntries(touched.map((t) => [`${t.app_id}:${t.stage}`, t.at])),
      lastSeen,
    })
  } catch (err) { next(err) }
})

router.get('/activity', async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 40, 1), 200)
    const app = Number(req.query.app) || 0
    const [r] = await pool.query(
      `SELECT id, app_id, app_name, stage, message, user_name, created_at FROM tracker_activity
        ${app ? 'WHERE app_id = ?' : ''} ORDER BY created_at DESC, id DESC LIMIT ?`, app ? [app, limit] : [limit])
    res.json({ ok: true, rows: r })
  } catch (err) { next(err) }
})

router.patch('/apps/:id/stages/:stage', async (req, res, next) => {
  try {
    const { stage } = req.params
    if (!STAGE_IDS.includes(stage)) return res.status(404).json({ ok: false, message: 'Unknown stage' })
    const app = await getApp(req.params.id)
    if (!app) return res.status(404).json({ ok: false, message: 'Application not found' })
    const me = await teamSlugFor(req.user)
    const before = app.data.stages || {}
    const body = req.body || {}
    // { join: true } adds the signed-in person to a stage's team, even when others already work on it
    const joining = body.join === true
    if (joining && !me) return res.status(403).json({ ok: false, message: 'Your login is not linked to a team member yet. Ask an admin to add your email under Team members.' })
    if (!joining && !canEdit(req.user, me, before[stage])) {
      return res.status(403).json({ ok: false, message: me ? 'This stage is assigned to someone else.' : 'Your login is not linked to a team member yet. Ask an admin to add your email under Team members.' })
    }
    const cur = before[stage] || {}
    const curOwners = ownersOf(cur)
    const uniq = (arr) => [...new Set(arr.filter(Boolean))]
    const next_ = { ...cur, ...(joining ? {} : ['status', 'start', 'end', 'notes'].reduce((o, k) => (k in body ? { ...o, [k]: body[k] } : o), {})) }
    if (joining) next_.owners = uniq([...curOwners, me])
    // a developer can add or remove co-workers on their own stage, but always stays on it
    else if (req.user.role === 'developer') next_.owners = uniq([...(Array.isArray(body.owners) ? body.owners : curOwners), me])
    // staff can set any owners
    else if ('owners' in body || 'owner' in body) next_.owners = Array.isArray(body.owners) ? body.owners : (body.owner ? [body.owner] : [])
    else next_.owners = curOwners
    delete next_.owner
    // run the stage through the same validation the editor uses
    const data = cleanData('apps', { ...app.data, stages: { ...before, [stage]: next_ } })
    await pool.execute('UPDATE cms_entries SET draft_data = ?, updated_by = ? WHERE id = ?', [JSON.stringify({ ...app.data, stages: data.stages }), req.user.id, app.id])
    await logStageChanges(app, before, data.stages, req.user)
    res.json({ ok: true, stage: data.stages[stage] || { status: STAGE_STATUSES[0] } })
  } catch (err) { next(err) }
})

/* ── files ── */
const TYPES = {
  'application/pdf': ['.pdf', (b) => b.subarray(0, 4).toString() === '%PDF'],
  'image/jpeg': ['.jpg', (b) => b[0] === 0xff && b[1] === 0xd8],
  'image/png': ['.png', (b) => b.subarray(0, 8).toString('hex') === '89504e470d0a1a0a'],
  'image/webp': ['.webp', (b) => b.subarray(8, 12).toString() === 'WEBP'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx', (b) => b.subarray(0, 2).toString() === 'PK'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx', (b) => b.subarray(0, 2).toString() === 'PK'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx', (b) => b.subarray(0, 2).toString() === 'PK'],
  'application/zip': ['.zip', (b) => b.subarray(0, 2).toString() === 'PK'],
}
// browsers label some files differently — map by extension as a fallback
const BY_EXT = Object.fromEntries(Object.entries(TYPES).map(([mime, [ext]]) => [ext, mime]))
BY_EXT['.jpeg'] = 'image/jpeg'
const mimeOf = (file) => (TYPES[file.mimetype] ? file.mimetype : BY_EXT[path.extname(file.originalname).toLowerCase()])

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    if (mimeOf(file)) return cb(null, true)
    const err = new Error('Upload a PDF, Word, Excel, PowerPoint, JPG, PNG, WEBP or ZIP file (zip HTML demos first).')
    err.status = 422; err.errors = { file: err.message }
    cb(err)
  },
})

router.get('/files', async (req, res, next) => {
  try {
    const app = Number(req.query.app) || 0
    const [r] = await pool.query(
      `SELECT id, app_id, stage, original_name, mime, size, uploaded_by, uploaded_name, created_at FROM tracker_files
        ${app ? 'WHERE app_id = ?' : ''} ORDER BY created_at DESC, id DESC LIMIT 500`, app ? [app] : [])
    res.json({ ok: true, rows: r })
  } catch (err) { next(err) }
})

router.post('/apps/:id/stages/:stage/files', upload.single('file'), async (req, res, next) => {
  try {
    const { stage } = req.params
    if (!STAGE_IDS.includes(stage)) return res.status(404).json({ ok: false, message: 'Unknown stage' })
    const app = await getApp(req.params.id)
    if (!app) return res.status(404).json({ ok: false, message: 'Application not found' })
    const me = await teamSlugFor(req.user)
    if (!canEdit(req.user, me, app.data.stages?.[stage])) return res.status(403).json({ ok: false, message: 'You can only upload to your own stages.' })
    const f = req.file
    if (!f) return res.status(422).json({ ok: false, errors: { file: 'Choose a file to upload.' } })
    const mime = mimeOf(f)
    const [ext, sig] = TYPES[mime]
    if (!sig(f.buffer)) return res.status(422).json({ ok: false, errors: { file: 'This file does not match its type.' } })
    fs.mkdirSync(FILE_DIR, { recursive: true })
    const stored = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ext}`
    fs.writeFileSync(path.join(FILE_DIR, stored), f.buffer)
    const name = f.originalname.slice(0, 255)
    const [r] = await pool.execute(
      'INSERT INTO tracker_files (app_id, stage, original_name, stored_name, mime, size, uploaded_by, uploaded_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [app.id, stage, name, stored, mime, f.size, req.user.id, req.user.name])
    await log(app, stage, `${stageLabel(stage)}: uploaded ${name}`, req.user, ownersOf(app.data.stages?.[stage]).join(',') || me)
    res.status(201).json({ ok: true, id: r.insertId })
  } catch (err) { next(err) }
})

router.get('/files/:id', async (req, res, next) => {
  try {
    const [[row]] = await pool.query('SELECT * FROM tracker_files WHERE id = ?', [Number(req.params.id) || 0])
    if (!row) return res.status(404).json({ ok: false, message: 'Not found' })
    const file = path.join(FILE_DIR, path.basename(row.stored_name))
    if (!fs.existsSync(file)) return res.status(404).json({ ok: false, message: 'File missing on server' })
    res.set('X-Content-Type-Options', 'nosniff')
    res.type(row.mime)
    res.download(file, row.original_name)
  } catch (err) { next(err) }
})

router.delete('/files/:id', async (req, res, next) => {
  try {
    const [[row]] = await pool.query('SELECT * FROM tracker_files WHERE id = ?', [Number(req.params.id) || 0])
    if (!row) return res.status(404).json({ ok: false, message: 'Not found' })
    if (req.user.role !== 'admin' && row.uploaded_by !== req.user.id) return res.status(403).json({ ok: false, message: 'Only the person who uploaded it or an admin can delete this file.' })
    fs.rmSync(path.join(FILE_DIR, path.basename(row.stored_name)), { force: true })
    await pool.execute('DELETE FROM tracker_files WHERE id = ?', [row.id])
    const app = await getApp(row.app_id)
    if (app) await log(app, row.stage, `${stageLabel(row.stage)}: deleted ${row.original_name}`, req.user, ownersOf(app.data.stages?.[row.stage]).join(','))
    res.json({ ok: true })
  } catch (err) { next(err) }
})

router.post('/seed', requireUser(['admin']), async (req, res, next) => {
  try {
    const added = { apps: 0, team: 0 }
    const insert = async (collection, input) => {
      const titleField = COLLECTIONS[collection].titleField
      const data = cleanData(collection, input)
      data.slug = slugify(input.slug || data[titleField])
      const [[hit]] = await pool.query('SELECT id FROM cms_entries WHERE collection = ? AND slug = ?', [collection, data.slug])
      if (hit) return
      const [[{ next: order }]] = await pool.query('SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM cms_entries WHERE collection = ?', [collection])
      await pool.execute(
        `INSERT INTO cms_entries (collection, slug, title, status, has_changes, sort_order, draft_data, created_by, updated_by)
         VALUES (?, ?, ?, 'draft', 0, ?, ?, ?, ?)`,
        [collection, data.slug, String(data[titleField]).slice(0, 255), order, JSON.stringify(data), req.user.id, req.user.id])
      added[collection]++
    }
    const [[{ n }]] = await pool.query(`SELECT COUNT(*) AS n FROM cms_entries WHERE collection = 'team'`)
    if (!n) for (const t of TEAM) await insert('team', t)

    const withDemo = (a) => (a.demoUrl ? { ...a, stages: { html: { status: 'Done' } } } : a)
    for (const a of [ENTERPRISE, ...SUITE_ENTRIES, ...MODULES]) await insert('apps', { ...withDemo(a), slug: `${a.code}-${a.name}` })
    res.json({ ok: true, added })
  } catch (err) { next(err) }
})

export default router
