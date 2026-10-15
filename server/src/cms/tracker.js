import { Router } from 'express'
import { pool } from '../db.js'
import { requireUser } from './auth.js'
import { slugify } from './collections.js'
import { cleanData } from './sanitize.js'
import { ENTERPRISE, SUITE_ENTRIES, MODULES, TEAM } from './catalogue.js'

/**
 * Development tracker (dashboard only — never public).
 *   GET  /api/cms/tracker        every application + team member, latest saved data
 *   POST /api/cms/tracker/seed   admins: add the ERP catalogue and placeholder team (skips what exists)
 */
const router = Router()
router.use(requireUser())
const parse = (s) => { try { return JSON.parse(s) } catch { return {} } }

async function rows(collection) {
  const [r] = await pool.query(
    `SELECT id, slug, draft_data, sort_order, updated_at FROM cms_entries
      WHERE collection = ? AND status <> 'archived' ORDER BY sort_order ASC, id ASC`, [collection])
  return r.map((x) => ({ ...parse(x.draft_data), id: x.id, slug: x.slug, updatedAt: x.updated_at }))
}

router.get('/', async (req, res, next) => {
  try {
    const [apps, team] = await Promise.all([rows('apps'), rows('team')])
    res.json({ ok: true, apps, team })
  } catch (err) { next(err) }
})

router.post('/seed', requireUser(['admin']), async (req, res, next) => {
  try {
    const added = { apps: 0, team: 0 }
    const insert = async (collection, input, titleField) => {
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
    if (!n) for (const t of TEAM) await insert('team', t, 'name')

    const withDemo = (a) => (a.demoUrl ? { ...a, stages: { html: { status: 'Done' } } } : a)
    for (const a of [ENTERPRISE, ...SUITE_ENTRIES, ...MODULES]) await insert('apps', { ...withDemo(a), slug: `${a.code}-${a.name}` }, 'name')
    res.json({ ok: true, added })
  } catch (err) { next(err) }
})

export default router
