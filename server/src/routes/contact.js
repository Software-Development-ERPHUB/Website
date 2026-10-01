import { Router } from 'express'
import { pool } from '../db.js'
import { EMAIL_RE, PHONE_RE, clean, orNull, fail, clientInfo } from '../middleware/validate.js'

const router = Router()

/**
 * POST /api/contact
 * Body (JSON): { name, company?, email, phone?, service, budget?, message, page?, website? }
 * `website` is a honeypot — real visitors never fill it.
 */
router.post('/', async (req, res, next) => {
  try {
    const b = req.body || {}
    if (clean(b.website)) return res.status(201).json({ ok: true }) // bot: pretend success, store nothing

    const v = {
      name: clean(b.name, 120),
      company: clean(b.company, 160),
      email: clean(b.email, 190).toLowerCase(),
      phone: clean(b.phone, 30),
      service: clean(b.service, 120),
      budget: clean(b.budget, 60),
      message: clean(b.message, 5000),
      page: clean(b.page, 500),
    }

    const e = {}
    if (!v.name) e.name = 'Enter your name.'
    if (!EMAIL_RE.test(v.email)) e.email = 'Enter a valid email address.'
    if (v.phone && !PHONE_RE.test(v.phone)) e.phone = 'Enter a valid phone number.'
    if (!v.service) e.service = 'Choose the service you need.'
    if (v.message.length < 10) e.message = 'Tell us a little about your project (at least 10 characters).'
    if (Object.keys(e).length) fail(e)

    const { ip, ua } = clientInfo(req)
    const [r] = await pool.execute(
      `INSERT INTO contact_enquiries
        (name, company, email, phone, service, budget, message, source_page, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [v.name, orNull(v.company), v.email, orNull(v.phone), v.service, orNull(v.budget), v.message, orNull(v.page), ip, ua]
    )
    res.status(201).json({ ok: true, id: r.insertId })
  } catch (err) { next(err) }
})

export default router
