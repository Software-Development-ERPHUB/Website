import { Router } from 'express'
import { pool } from '../db.js'
import { requireUser } from './auth.js'
import { COLLECTIONS, isCollection, slugify } from './collections.js'
import { cleanData, publishErrors } from './sanitize.js'

/**
 * Dashboard API for content entries.
 *   GET    /api/cms/collections                      field definitions for the editor
 *   GET    /api/cms/stats                            counts for the dashboard
 *   GET    /api/cms/entries/:collection              list (?q=&status=&page=)
 *   POST   /api/cms/entries/:collection              create draft
 *   GET    /api/cms/entries/:collection/:id          one entry (draft + published)
 *   PUT    /api/cms/entries/:collection/:id          save draft
 *   POST   …/:id/publish | unpublish | discard | archive
 *   GET    …/:id/revisions · POST …/:id/restore/:revId
 *   DELETE …/:id                                     admins only
 *   PUT    /api/cms/entries/:collection/reorder      { ids: [..] }
 */
const router = Router()
router.use(requireUser())

const parse = (s) => { try { return JSON.parse(s) } catch { return {} } }
const shape = (row) => row && ({
  id: row.id, collection: row.collection, slug: row.slug, title: row.title, status: row.status,
  hasChanges: !!row.has_changes, sortOrder: row.sort_order, publishedAt: row.published_at,
  createdAt: row.created_at, updatedAt: row.updated_at, updatedByName: row.updated_by_name || null,
  draft: row.draft_data !== undefined ? parse(row.draft_data) : undefined,
  published: row.published_data ? parse(row.published_data) : null,
})

function col(req, res) {
  const c = req.params.collection
  if (!isCollection(c)) { res.status(404).json({ ok: false, message: 'Unknown collection' }); return null }
  return c
}

async function uniqueSlug(collection, wanted, excludeId = 0) {
  const base = slugify(wanted) || 'untitled'
  let slug = base, n = 2
  for (;;) {
    const [[hit]] = await pool.query('SELECT id FROM cms_entries WHERE collection = ? AND slug = ? AND id <> ?', [collection, slug, excludeId])
    if (!hit) return slug
    slug = `${base}-${n++}`.slice(0, 160)
  }
}

async function getRow(collection, id) {
  const [[row]] = await pool.query(
    `SELECT e.*, u.name AS updated_by_name FROM cms_entries e LEFT JOIN cms_users u ON u.id = e.updated_by
      WHERE e.collection = ? AND e.id = ?`, [collection, Number(id) || 0])
  return row
}

router.get('/collections', (req, res) => {
  res.json({ ok: true, collections: Object.entries(COLLECTIONS).map(([id, c]) => ({ id, ...c })) })
})

router.get('/stats', async (req, res, next) => {
  try {
    const [rows] = await pool.query(`SELECT collection, status, SUM(has_changes) AS changes, COUNT(*) AS n FROM cms_entries GROUP BY collection, status`)
    const [recent] = await pool.query(
      `SELECT e.id, e.collection, e.title, e.status, e.has_changes, e.updated_at, u.name AS updated_by_name
         FROM cms_entries e LEFT JOIN cms_users u ON u.id = e.updated_by ORDER BY e.updated_at DESC LIMIT 8`)
    const [[inbox]] = await pool.query(
      `SELECT (SELECT COUNT(*) FROM contact_enquiries WHERE status = 'new') AS enquiries,
              (SELECT COUNT(*) FROM internship_applications WHERE status = 'new') AS applications`)
    res.json({ ok: true, counts: rows, recent: recent.map(shape), inbox })
  } catch (err) { next(err) }
})

router.get('/entries/:collection', async (req, res, next) => {
  try {
    const c = col(req, res); if (!c) return
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100)
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1)
    const where = ['e.collection = ?'], args = [c]
    if (['draft', 'published', 'archived'].includes(req.query.status)) { where.push('e.status = ?'); args.push(req.query.status) }
    if (req.query.status === 'changes') where.push('e.has_changes = 1')
    if (req.query.q) { where.push('(e.title LIKE ? OR e.slug LIKE ?)'); args.push(`%${req.query.q}%`, `%${req.query.q}%`) }
    const order = COLLECTIONS[c].sort === 'order' ? 'e.sort_order ASC, e.id ASC' : 'COALESCE(e.published_at, e.created_at) DESC'
    const [rows] = await pool.query(
      `SELECT e.id, e.collection, e.slug, e.title, e.status, e.has_changes, e.sort_order, e.published_at, e.created_at, e.updated_at,
              e.draft_data, u.name AS updated_by_name
         FROM cms_entries e LEFT JOIN cms_users u ON u.id = e.updated_by
        WHERE ${where.join(' AND ')} ORDER BY ${order} LIMIT ? OFFSET ?`, [...args, limit, (page - 1) * limit])
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM cms_entries e WHERE ${where.join(' AND ')}`, args)
    res.json({ ok: true, page, limit, total, rows: rows.map(shape) })
  } catch (err) { next(err) }
})

router.post('/entries/:collection', async (req, res, next) => {
  try {
    const c = col(req, res); if (!c) return
    const def = COLLECTIONS[c]
    const data = cleanData(c, req.body?.data || {})
    const title = String(data[def.titleField] || '').trim()
    if (!title) return res.status(422).json({ ok: false, errors: { [def.titleField]: 'Enter a title to save the draft.' } })
    data.slug = await uniqueSlug(c, data.slug || title)
    const [[{ next: order }]] = await pool.query('SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM cms_entries WHERE collection = ?', [c])
    const [r] = await pool.execute(
      `INSERT INTO cms_entries (collection, slug, title, status, has_changes, sort_order, draft_data, created_by, updated_by)
       VALUES (?, ?, ?, 'draft', 1, ?, ?, ?, ?)`,
      [c, data.slug, title.slice(0, 255), order, JSON.stringify(data), req.user.id, req.user.id])
    res.status(201).json({ ok: true, entry: shape(await getRow(c, r.insertId)) })
  } catch (err) { next(err) }
})

router.put('/entries/:collection/reorder', async (req, res, next) => {
  try {
    const c = col(req, res); if (!c) return
    const ids = (req.body?.ids || []).map(Number).filter(Boolean).slice(0, 500)
    const conn = await pool.getConnection()
    try {
      await conn.beginTransaction()
      for (let i = 0; i < ids.length; i++) await conn.execute('UPDATE cms_entries SET sort_order = ? WHERE id = ? AND collection = ?', [i + 1, ids[i], c])
      await conn.commit()
    } catch (e) { await conn.rollback(); throw e } finally { conn.release() }
    res.json({ ok: true })
  } catch (err) { next(err) }
})

router.get('/entries/:collection/:id', async (req, res, next) => {
  try {
    const c = col(req, res); if (!c) return
    const row = await getRow(c, req.params.id)
    if (!row) return res.status(404).json({ ok: false, message: 'Not found' })
    res.json({ ok: true, entry: shape(row) })
  } catch (err) { next(err) }
})

/** Save draft — never touches what the live site shows. */
router.put('/entries/:collection/:id', async (req, res, next) => {
  try {
    const c = col(req, res); if (!c) return
    const row = await getRow(c, req.params.id)
    if (!row) return res.status(404).json({ ok: false, message: 'Not found' })
    const def = COLLECTIONS[c]
    const data = cleanData(c, req.body?.data || {})
    const title = String(data[def.titleField] || '').trim()
    if (!title) return res.status(422).json({ ok: false, errors: { [def.titleField]: 'Enter a title.' } })
    data.slug = await uniqueSlug(c, data.slug || title, row.id)
    const draftJson = JSON.stringify(data)
    const changed = row.published_data ? draftJson !== row.published_data : true
    // A published entry keeps its public slug until the next publish
    await pool.execute(
      `UPDATE cms_entries SET title = ?, draft_data = ?, has_changes = ?, updated_by = ?, slug = IF(status = 'published', slug, ?) WHERE id = ?`,
      [title.slice(0, 255), draftJson, changed ? 1 : 0, req.user.id, data.slug, row.id])
    res.json({ ok: true, entry: shape(await getRow(c, row.id)) })
  } catch (err) { next(err) }
})

router.post('/entries/:collection/:id/:action(publish|unpublish|discard|archive)', async (req, res, next) => {
  try {
    const c = col(req, res); if (!c) return
    const row = await getRow(c, req.params.id)
    if (!row) return res.status(404).json({ ok: false, message: 'Not found' })
    const { action } = req.params

    if (action === 'publish') {
      const data = parse(row.draft_data)
      const errors = publishErrors(c, data)
      if (Object.keys(errors).length) return res.status(422).json({ ok: false, message: 'Complete the required fields before publishing.', errors })
      const slug = await uniqueSlug(c, data.slug, row.id)
      data.slug = slug
      const json = JSON.stringify(data)
      await pool.execute(
        `UPDATE cms_entries SET status = 'published', slug = ?, draft_data = ?, published_data = ?, has_changes = 0,
                published_at = COALESCE(published_at, NOW()), updated_by = ? WHERE id = ?`,
        [slug, json, json, req.user.id, row.id])
      await pool.execute('INSERT INTO cms_revisions (entry_id, data, action, user_id) VALUES (?, ?, ?, ?)', [row.id, json, 'publish', req.user.id])
    }
    if (action === 'unpublish') {
      await pool.execute(`UPDATE cms_entries SET status = 'draft', published_data = NULL, has_changes = 1, updated_by = ? WHERE id = ?`, [req.user.id, row.id])
    }
    if (action === 'discard') {
      if (!row.published_data) return res.status(422).json({ ok: false, message: 'This entry has never been published — there is nothing to go back to.' })
      await pool.execute(`UPDATE cms_entries SET draft_data = published_data, title = ?, has_changes = 0, updated_by = ? WHERE id = ?`,
        [String(parse(row.published_data)[COLLECTIONS[c].titleField] || row.title).slice(0, 255), req.user.id, row.id])
    }
    if (action === 'archive') {
      await pool.execute(`UPDATE cms_entries SET status = 'archived', published_data = NULL, updated_by = ? WHERE id = ?`, [req.user.id, row.id])
    }
    res.json({ ok: true, entry: shape(await getRow(c, row.id)) })
  } catch (err) { next(err) }
})

router.get('/entries/:collection/:id/revisions', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT r.id, r.action, r.created_at, u.name AS user_name FROM cms_revisions r LEFT JOIN cms_users u ON u.id = r.user_id
        WHERE r.entry_id = ? ORDER BY r.created_at DESC, r.id DESC LIMIT 30`, [Number(req.params.id) || 0])
    res.json({ ok: true, rows })
  } catch (err) { next(err) }
})

/** Copy an old published version back into the draft (then review + publish). */
router.post('/entries/:collection/:id/restore/:revId', async (req, res, next) => {
  try {
    const c = col(req, res); if (!c) return
    const [[rev]] = await pool.query('SELECT data FROM cms_revisions WHERE id = ? AND entry_id = ?', [Number(req.params.revId) || 0, Number(req.params.id) || 0])
    if (!rev) return res.status(404).json({ ok: false, message: 'Version not found' })
    const data = parse(rev.data)
    await pool.execute(`UPDATE cms_entries SET draft_data = ?, title = ?, has_changes = (published_data IS NULL OR published_data <> ?), updated_by = ? WHERE id = ?`,
      [rev.data, String(data[COLLECTIONS[c].titleField] || '').slice(0, 255), rev.data, req.user.id, Number(req.params.id)])
    res.json({ ok: true, entry: shape(await getRow(c, req.params.id)) })
  } catch (err) { next(err) }
})

router.delete('/entries/:collection/:id', requireUser(['admin']), async (req, res, next) => {
  try {
    const c = col(req, res); if (!c) return
    const [r] = await pool.execute('DELETE FROM cms_entries WHERE collection = ? AND id = ?', [c, Number(req.params.id) || 0])
    if (!r.affectedRows) return res.status(404).json({ ok: false, message: 'Not found' })
    await pool.execute('DELETE FROM cms_revisions WHERE entry_id = ?', [Number(req.params.id)])
    res.json({ ok: true })
  } catch (err) { next(err) }
})

/** Preview the draft on the public page layout (signed-in users only). */
router.get('/preview/:collection/:slug', async (req, res, next) => {
  try {
    const c = col(req, res); if (!c) return
    const [[row]] = await pool.query(`SELECT * FROM cms_entries WHERE collection = ? AND (slug = ? OR JSON_UNQUOTE(JSON_EXTRACT(draft_data, '$.slug')) = ?) LIMIT 1`, [c, req.params.slug, req.params.slug])
    if (!row) return res.status(404).json({ ok: false, message: 'Not found' })
    res.json({ ok: true, item: { ...parse(row.draft_data), id: row.id, publishedAt: row.published_at || row.updated_at } })
  } catch (err) { next(err) }
})

export default router
