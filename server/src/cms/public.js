import { Router } from 'express'
import { pool } from '../db.js'
import { COLLECTIONS, isCollection } from './collections.js'

/**
 * Public, read-only API used by the website. Only PUBLISHED data is ever returned.
 *   GET /api/public/:collection?page=&limit=&category=&tag=
 *   GET /api/public/:collection/:slug
 */
const router = Router()
const parse = (s) => { try { return JSON.parse(s) } catch { return {} } }

router.use((req, res, next) => { res.set('Cache-Control', 'public, max-age=60'); next() })

router.get('/:collection', async (req, res, next) => {
  try {
    const c = req.params.collection
    if (!isCollection(c)) return res.status(404).json({ ok: false, message: 'Not found' })
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 50, 1), 100)
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1)
    const order = COLLECTIONS[c].sort === 'order' ? 'sort_order ASC, id ASC' : 'published_at DESC'
    const [rows] = await pool.query(
      `SELECT id, slug, published_data, published_at, updated_at FROM cms_entries
        WHERE collection = ? AND status = 'published' AND published_data IS NOT NULL ORDER BY ${order}`, [c])
    let items = rows.map((r) => ({ ...parse(r.published_data), id: r.id, slug: r.slug, publishedAt: r.published_at }))
    if (req.query.category) items = items.filter((i) => i.category === req.query.category)
    if (req.query.tag) items = items.filter((i) => (i.tags || []).includes(req.query.tag))
    const total = items.length
    items = items.slice((page - 1) * limit, page * limit)
    // lists don't need full article bodies
    if (c === 'news') items = items.map(({ body, ...rest }) => rest)
    res.json({ ok: true, page, limit, total, items })
  } catch (err) { next(err) }
})

router.get('/:collection/:slug', async (req, res, next) => {
  try {
    const c = req.params.collection
    if (!isCollection(c)) return res.status(404).json({ ok: false, message: 'Not found' })
    const [[r]] = await pool.query(
      `SELECT id, slug, published_data, published_at FROM cms_entries WHERE collection = ? AND slug = ? AND status = 'published' AND published_data IS NOT NULL`,
      [c, req.params.slug])
    if (!r) return res.status(404).json({ ok: false, message: 'Not found' })
    res.json({ ok: true, item: { ...parse(r.published_data), id: r.id, slug: r.slug, publishedAt: r.published_at } })
  } catch (err) { next(err) }
})

export default router
