import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { pool } from '../db.js'
import { requireUser } from './auth.js'
import { EMAIL_RE } from '../middleware/validate.js'

/** Dashboard user management — admins only. */
const router = Router()
router.use(requireUser(['admin']))

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role, active, last_login_at, created_at FROM cms_users ORDER BY name')
    res.json({ ok: true, rows })
  } catch (err) { next(err) }
})

router.post('/', async (req, res, next) => {
  try {
    const name = String(req.body?.name || '').trim().slice(0, 120)
    const email = String(req.body?.email || '').trim().toLowerCase().slice(0, 190)
    const role = req.body?.role === 'admin' ? 'admin' : 'editor'
    const password = String(req.body?.password || '')
    const e = {}
    if (!name) e.name = 'Enter a name.'
    if (!EMAIL_RE.test(email)) e.email = 'Enter a valid email.'
    if (password.length < 10) e.password = 'Use at least 10 characters.'
    if (Object.keys(e).length) return res.status(422).json({ ok: false, errors: e })
    const [r] = await pool.execute('INSERT INTO cms_users (name, email, role, password_hash) VALUES (?, ?, ?, ?)', [name, email, role, await bcrypt.hash(password, 12)])
    res.status(201).json({ ok: true, id: r.insertId })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(422).json({ ok: false, errors: { email: 'A user with this email already exists.' } })
    next(err)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id) || 0
    const sets = [], args = []
    if (req.body?.role) { sets.push('role = ?'); args.push(req.body.role === 'admin' ? 'admin' : 'editor') }
    if (typeof req.body?.active === 'boolean') {
      if (id === req.user.id && !req.body.active) return res.status(422).json({ ok: false, message: 'You cannot deactivate yourself.' })
      sets.push('active = ?'); args.push(req.body.active ? 1 : 0)
    }
    if (req.body?.password) {
      if (String(req.body.password).length < 10) return res.status(422).json({ ok: false, errors: { password: 'Use at least 10 characters.' } })
      sets.push('password_hash = ?'); args.push(await bcrypt.hash(String(req.body.password), 12))
    }
    if (!sets.length) return res.json({ ok: true })
    await pool.execute(`UPDATE cms_users SET ${sets.join(', ')} WHERE id = ?`, [...args, id])
    res.json({ ok: true })
  } catch (err) { next(err) }
})

export default router
