import { Router } from 'express'
import path from 'node:path'
import fs from 'node:fs'
import { pool } from '../db.js'
import { config } from '../config.js'
import { requireAdmin } from '../middleware/admin.js'

/**
 * Read-only admin endpoints (send header  x-api-key: <ADMIN_API_KEY>).
 *   GET  /api/admin/contacts?status=new&page=1&limit=25
 *   GET  /api/admin/internships?status=new&area=...&page=1&limit=25
 *   GET  /api/admin/internships/:id/cv        → downloads the CV
 *   PATCH /api/admin/contacts/:id  { status }
 *   PATCH /api/admin/internships/:id  { status }
 */
const router = Router()
router.use(requireAdmin)

const page = (q) => {
  const limit = Math.min(Math.max(parseInt(q.limit, 10) || 25, 1), 100)
  const p = Math.max(parseInt(q.page, 10) || 1, 1)
  return { limit, offset: (p - 1) * limit, page: p }
}

const CONTACT_STATUS = ['new', 'in_progress', 'replied', 'closed', 'spam']
const INTERN_STATUS = ['new', 'shortlisted', 'interview', 'selected', 'rejected']

router.get('/contacts', async (req, res, next) => {
  try {
    const { limit, offset, page: p } = page(req.query)
    const where = [], args = []
    if (CONTACT_STATUS.includes(req.query.status)) { where.push('status = ?'); args.push(req.query.status) }
    const w = where.length ? `WHERE ${where.join(' AND ')}` : ''
    const [rows] = await pool.query(`SELECT * FROM contact_enquiries ${w} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...args, limit, offset])
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM contact_enquiries ${w}`, args)
    res.json({ ok: true, page: p, limit, total, rows })
  } catch (err) { next(err) }
})

router.get('/internships', async (req, res, next) => {
  try {
    const { limit, offset, page: p } = page(req.query)
    const where = [], args = []
    if (INTERN_STATUS.includes(req.query.status)) { where.push('status = ?'); args.push(req.query.status) }
    if (req.query.area) { where.push('area_of_interest = ?'); args.push(String(req.query.area).slice(0, 80)) }
    const w = where.length ? `WHERE ${where.join(' AND ')}` : ''
    const [rows] = await pool.query(
      `SELECT id, full_name, email, phone, college, course, year_of_study, area_of_interest, duration, start_date,
              skills, portfolio_url, linkedin_url, message, cv_original_name, cv_size, status, created_at
         FROM internship_applications ${w} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...args, limit, offset])
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM internship_applications ${w}`, args)
    res.json({ ok: true, page: p, limit, total, rows })
  } catch (err) { next(err) }
})

router.get('/internships/:id/cv', async (req, res, next) => {
  try {
    const [[row]] = await pool.query('SELECT cv_original_name, cv_stored_name, cv_mime FROM internship_applications WHERE id = ?', [Number(req.params.id) || 0])
    if (!row) return res.status(404).json({ ok: false, message: 'Not found' })
    const file = path.join(config.uploadDir, 'cv', path.basename(row.cv_stored_name))
    if (!fs.existsSync(file)) return res.status(404).json({ ok: false, message: 'CV file missing on server' })
    res.type(row.cv_mime)
    res.download(file, row.cv_original_name)
  } catch (err) { next(err) }
})

const patchStatus = (table, allowed) => async (req, res, next) => {
  try {
    const status = req.body?.status
    if (!allowed.includes(status)) return res.status(422).json({ ok: false, errors: { status: `Use one of: ${allowed.join(', ')}` } })
    const [r] = await pool.execute(`UPDATE ${table} SET status = ? WHERE id = ?`, [status, Number(req.params.id) || 0])
    if (!r.affectedRows) return res.status(404).json({ ok: false, message: 'Not found' })
    res.json({ ok: true })
  } catch (err) { next(err) }
}
router.patch('/contacts/:id', patchStatus('contact_enquiries', CONTACT_STATUS))
router.patch('/internships/:id', patchStatus('internship_applications', INTERN_STATUS))

export default router
