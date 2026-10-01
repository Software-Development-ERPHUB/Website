import crypto from 'node:crypto'
import { config } from '../config.js'
import { loadUser } from '../cms/auth.js'

/**
 * Protects /api/admin/* (enquiries, internship applications).
 * Accepts either a signed-in CMS dashboard user, or the ADMIN_API_KEY header (x-api-key) for scripts.
 */
export async function requireAdmin(req, res, next) {
  try {
    const user = await loadUser(req).catch(() => null)
    if (user) {
      if (!['GET', 'HEAD'].includes(req.method) && req.get('x-requested-with') !== 'cms') return res.status(403).json({ ok: false, message: 'Missing request header.' })
      req.user = user
      return next()
    }
    const given = req.get('x-api-key') || ''
    const key = config.adminKey
    if (!key || key.startsWith('change-me')) return res.status(401).json({ ok: false, message: 'Please sign in.' })
    const a = Buffer.from(given), b = Buffer.from(key)
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return res.status(401).json({ ok: false, message: 'Unauthorised' })
    next()
  } catch (err) { next(err) }
}
