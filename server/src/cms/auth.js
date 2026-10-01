import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import { pool } from '../db.js'
import { config } from '../config.js'

export const COOKIE = 'cms_session'
// Used when the email doesn't exist, so a failed login always takes the same time
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 12)

function secret() {
  if (!config.jwtSecret || config.jwtSecret.startsWith('change-me') || config.jwtSecret.length < 24) {
    const err = new Error('JWT_SECRET is not set in server/.env (use a random string of 24+ characters).')
    err.status = 503
    throw err
  }
  return config.jwtSecret
}

const cookieOpts = () => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: config.cookieSecure,
  path: '/api',
  maxAge: config.sessionHours * 3600 * 1000,
})

/** Reads the session cookie and loads the (still active) user. */
export async function loadUser(req) {
  const token = req.cookies?.[COOKIE]
  if (!token) return null
  try {
    const p = jwt.verify(token, secret())
    const [[u]] = await pool.query('SELECT id, name, email, role, active FROM cms_users WHERE id = ?', [p.sub])
    return u && u.active ? { id: u.id, name: u.name, email: u.email, role: u.role } : null
  } catch (err) {
    if (err.status === 503) throw err
    return null
  }
}

/**
 * Requires a signed-in dashboard user.
 * Write requests must also send  X-Requested-With: cms  — browsers never add this
 * header on cross-site requests, which blocks CSRF alongside the SameSite cookie.
 */
export function requireUser(roles) {
  return async (req, res, next) => {
    try {
      const user = await loadUser(req)
      if (!user) return res.status(401).json({ ok: false, message: 'Please sign in.' })
      if (roles && !roles.includes(user.role)) return res.status(403).json({ ok: false, message: 'You do not have permission for this.' })
      if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) && req.get('x-requested-with') !== 'cms') {
        return res.status(403).json({ ok: false, message: 'Missing request header.' })
      }
      req.user = user
      next()
    } catch (err) { next(err) }
  }
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: 'draft-7', legacyHeaders: false,
  message: { ok: false, message: 'Too many sign-in attempts. Try again in 15 minutes.' },
})

const router = Router()

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase()
    const password = String(req.body?.password || '')
    const [[u]] = await pool.query('SELECT * FROM cms_users WHERE email = ?', [email])
    // compare even when the user doesn't exist, so timing doesn't reveal valid emails
    const ok = await bcrypt.compare(password, u?.password_hash || DUMMY_HASH)
    if (!u || !ok || !u.active) return res.status(401).json({ ok: false, message: 'Email or password is incorrect.' })
    const token = jwt.sign({ sub: u.id, role: u.role }, secret(), { expiresIn: `${config.sessionHours}h` })
    await pool.execute('UPDATE cms_users SET last_login_at = NOW() WHERE id = ?', [u.id])
    res.cookie(COOKIE, token, cookieOpts())
    res.json({ ok: true, user: { id: u.id, name: u.name, email: u.email, role: u.role } })
  } catch (err) { next(err) }
})

router.post('/logout', (req, res) => {
  res.clearCookie(COOKIE, { ...cookieOpts(), maxAge: undefined })
  res.json({ ok: true })
})

router.get('/me', async (req, res, next) => {
  try {
    const user = await loadUser(req)
    if (!user) return res.status(401).json({ ok: false, message: 'Not signed in.' })
    res.json({ ok: true, user })
  } catch (err) { next(err) }
})

/** Change own password */
router.post('/password', requireUser(), async (req, res, next) => {
  try {
    const { current, next: nextPw } = req.body || {}
    if (String(nextPw || '').length < 10) return res.status(422).json({ ok: false, errors: { next: 'Use at least 10 characters.' } })
    const [[u]] = await pool.query('SELECT password_hash FROM cms_users WHERE id = ?', [req.user.id])
    if (!(await bcrypt.compare(String(current || ''), u.password_hash))) return res.status(422).json({ ok: false, errors: { current: 'Current password is incorrect.' } })
    await pool.execute('UPDATE cms_users SET password_hash = ? WHERE id = ?', [await bcrypt.hash(nextPw, 12), req.user.id])
    res.json({ ok: true })
  } catch (err) { next(err) }
})

export default router
