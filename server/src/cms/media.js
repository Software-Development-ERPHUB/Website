import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import crypto from 'node:crypto'
import { pool } from '../db.js'
import { requireUser } from './auth.js'
import { storage, driverFor } from '../storage/index.js'

/**
 * Media library.
 *   GET    /api/cms/media?q=&page=     list
 *   POST   /api/cms/media              upload (field "file") — images and PDFs
 *   PATCH  /api/cms/media/:id          { alt }
 *   DELETE /api/cms/media/:id
 */
const router = Router()
router.use(requireUser())

const TYPES = {
  'image/jpeg': { ext: '.jpg', sig: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  'image/png': { ext: '.png', sig: (b) => b.subarray(0, 8).toString('hex') === '89504e470d0a1a0a' },
  'image/webp': { ext: '.webp', sig: (b) => b.subarray(0, 4).toString() === 'RIFF' && b.subarray(8, 12).toString() === 'WEBP' },
  'image/gif': { ext: '.gif', sig: (b) => b.subarray(0, 3).toString() === 'GIF' },
  'application/pdf': { ext: '.pdf', sig: (b) => b.subarray(0, 4).toString() === '%PDF' },
}
const MAX = 8 * 1024 * 1024

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX, files: 1 },
  fileFilter: (req, file, cb) => {
    if (TYPES[file.mimetype]) return cb(null, true)
    const err = new Error('Only JPG, PNG, WEBP, GIF or PDF files can be uploaded.')
    err.status = 422
    err.errors = { file: err.message }
    cb(err)
  },
})

const shape = (r) => ({ id: r.id, url: r.url, name: r.original_name, mime: r.mime, size: r.size, alt: r.alt || '', storage: r.storage, createdAt: r.created_at })

router.get('/', async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 40, 1), 100)
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1)
    const where = [], args = []
    if (req.query.q) { where.push('(original_name LIKE ? OR alt LIKE ?)'); args.push(`%${req.query.q}%`, `%${req.query.q}%`) }
    if (req.query.type === 'image') where.push("mime LIKE 'image/%'")
    const w = where.length ? `WHERE ${where.join(' AND ')}` : ''
    const [rows] = await pool.query(`SELECT * FROM cms_media ${w} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`, [...args, limit, (page - 1) * limit])
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM cms_media ${w}`, args)
    res.json({ ok: true, page, limit, total, rows: rows.map(shape) })
  } catch (err) { next(err) }
})

router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    const f = req.file
    if (!f) return res.status(422).json({ ok: false, errors: { file: 'Choose a file to upload.' } })
    const t = TYPES[f.mimetype]
    if (!t.sig(f.buffer)) return res.status(422).json({ ok: false, errors: { file: 'This file does not match its type.' } })
    const d = new Date()
    const key = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${crypto.randomBytes(10).toString('hex')}${t.ext}`
    const saved = await storage.put(key, f.buffer, f.mimetype)
    const alt = String(req.body?.alt || path.parse(f.originalname).name.replace(/[-_]+/g, ' ')).slice(0, 255)
    const [r] = await pool.execute(
      'INSERT INTO cms_media (storage, storage_key, url, original_name, mime, size, alt, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [storage.name, saved.key, saved.url, f.originalname.slice(0, 255), f.mimetype, f.size, alt, req.user.id])
    const [[row]] = await pool.query('SELECT * FROM cms_media WHERE id = ?', [r.insertId])
    res.status(201).json({ ok: true, media: shape(row) })
  } catch (err) { next(err) }
})

router.patch('/:id', async (req, res, next) => {
  try {
    await pool.execute('UPDATE cms_media SET alt = ? WHERE id = ?', [String(req.body?.alt || '').slice(0, 255), Number(req.params.id) || 0])
    res.json({ ok: true })
  } catch (err) { next(err) }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const [[row]] = await pool.query('SELECT * FROM cms_media WHERE id = ?', [Number(req.params.id) || 0])
    if (!row) return res.status(404).json({ ok: false, message: 'Not found' })
    await driverFor(row.storage).remove(row.storage_key)
    await pool.execute('DELETE FROM cms_media WHERE id = ?', [row.id])
    res.json({ ok: true })
  } catch (err) { next(err) }
})

export default router
