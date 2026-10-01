import { Router } from 'express'
import multer from 'multer'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { pool } from '../db.js'
import { config } from '../config.js'
import { EMAIL_RE, PHONE_RE, URL_RE, clean, orNull, fail, clientInfo } from '../middleware/validate.js'

const router = Router()

export const AREAS = ['Frontend (React)', 'Backend (Node.js / Laravel)', 'Full-stack development', 'UI/UX design', 'Mobile apps', 'Testing / QA', 'Other']
export const DURATIONS = ['1 month', '2 months', '3 months', '6 months', 'Flexible']

const CV_DIR = path.join(config.uploadDir, 'cv')
fs.mkdirSync(CV_DIR, { recursive: true })

const ALLOWED = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
}
const MAX_CV = 5 * 1024 * 1024 // 5 MB

const upload = multer({
  storage: multer.diskStorage({
    destination: CV_DIR,
    // random file name — never trust the visitor's file name on disk
    filename: (req, file, cb) => cb(null, `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ALLOWED[file.mimetype] || ''}`),
  }),
  limits: { fileSize: MAX_CV, files: 1, fields: 30 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase()
    const okExt = ['.pdf', '.doc', '.docx'].includes(ext)
    if (ALLOWED[file.mimetype] && okExt) return cb(null, true)
    const err = new Error('CV must be a PDF, DOC or DOCX file.')
    err.status = 422
    err.errors = { cv: 'Upload your CV as a PDF, DOC or DOCX file.' }
    cb(err)
  },
})

/** Check the file really is what its type says (magic bytes). */
function looksValid(filePath, mime) {
  const fd = fs.openSync(filePath, 'r')
  const buf = Buffer.alloc(8)
  fs.readSync(fd, buf, 0, 8, 0)
  fs.closeSync(fd)
  if (mime === 'application/pdf') return buf.subarray(0, 4).toString() === '%PDF'
  if (mime.includes('openxml')) return buf[0] === 0x50 && buf[1] === 0x4b // ZIP container
  if (mime === 'application/msword') return buf.toString('hex').startsWith('d0cf11e0') // OLE
  return false
}

const removeFile = (f) => { if (f?.path) fs.unlink(f.path, () => {}) }

/**
 * POST /api/internship   (multipart/form-data)
 * Fields: fullName, email, phone, college, course, yearOfStudy, area, duration?, startDate?,
 *         skills?, portfolioUrl?, linkedinUrl?, message?, consent, website (honeypot)
 * File:   cv  (PDF / DOC / DOCX, max 5 MB)
 */
router.post('/', upload.single('cv'), async (req, res, next) => {
  const file = req.file
  try {
    const b = req.body || {}
    if (clean(b.website)) { removeFile(file); return res.status(201).json({ ok: true }) }

    const v = {
      fullName: clean(b.fullName, 120),
      email: clean(b.email, 190).toLowerCase(),
      phone: clean(b.phone, 30),
      college: clean(b.college, 200),
      course: clean(b.course, 160),
      yearOfStudy: clean(b.yearOfStudy, 40),
      area: clean(b.area, 80),
      duration: clean(b.duration, 40),
      startDate: clean(b.startDate, 10),
      skills: clean(b.skills, 500),
      portfolioUrl: clean(b.portfolioUrl, 300),
      linkedinUrl: clean(b.linkedinUrl, 300),
      message: clean(b.message, 3000),
      consent: b.consent === 'true' || b.consent === '1' || b.consent === 'on',
    }

    const e = {}
    if (!v.fullName) e.fullName = 'Enter your full name.'
    if (!EMAIL_RE.test(v.email)) e.email = 'Enter a valid email address.'
    if (!PHONE_RE.test(v.phone)) e.phone = 'Enter a valid phone number.'
    if (!v.college) e.college = 'Enter your college or institution.'
    if (!v.course) e.course = 'Enter your degree or course.'
    if (!v.yearOfStudy) e.yearOfStudy = 'Choose your year of study.'
    if (!AREAS.includes(v.area)) e.area = 'Choose an area of interest.'
    if (v.duration && !DURATIONS.includes(v.duration)) e.duration = 'Choose a valid duration.'
    if (v.startDate && !/^\d{4}-\d{2}-\d{2}$/.test(v.startDate)) e.startDate = 'Enter a valid date.'
    if (v.portfolioUrl && !URL_RE.test(v.portfolioUrl)) e.portfolioUrl = 'Enter a full link starting with https://'
    if (v.linkedinUrl && !URL_RE.test(v.linkedinUrl)) e.linkedinUrl = 'Enter a full link starting with https://'
    if (!v.consent) e.consent = 'Please agree so we can store your application.'
    if (!file) e.cv = 'Attach your CV (PDF, DOC or DOCX, up to 5 MB).'
    else if (!looksValid(file.path, file.mimetype)) e.cv = 'This file does not look like a valid PDF or Word document.'
    if (Object.keys(e).length) fail(e)

    const { ip, ua } = clientInfo(req)
    const [r] = await pool.execute(
      `INSERT INTO internship_applications
        (full_name, email, phone, college, course, year_of_study, area_of_interest, duration, start_date,
         skills, portfolio_url, linkedin_url, message, cv_original_name, cv_stored_name, cv_mime, cv_size,
         consent, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        v.fullName, v.email, v.phone, v.college, v.course, v.yearOfStudy, v.area, orNull(v.duration), orNull(v.startDate),
        orNull(v.skills), orNull(v.portfolioUrl), orNull(v.linkedinUrl), orNull(v.message),
        clean(file.originalname, 255), file.filename, file.mimetype, file.size, 1, ip, ua,
      ]
    )
    res.status(201).json({ ok: true, id: r.insertId })
  } catch (err) {
    removeFile(file) // never keep an orphan CV when the insert fails
    next(err)
  }
})

/** Lists for the form's dropdowns, so front end and server never drift apart. */
router.get('/options', (req, res) => res.json({ areas: AREAS, durations: DURATIONS }))

export default router
