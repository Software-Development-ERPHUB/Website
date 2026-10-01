/** Small, dependency-free validation helpers shared by the routes. */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE_RE = /^[+()\-\s\d]{7,20}$/
export const URL_RE = /^https?:\/\/[^\s]+$/i

export const clean = (v, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
export const orNull = (v) => (v === '' || v == null ? null : v)

/** Throws a 422 with a { field: message } map that the front end shows next to each field. */
export function fail(errors) {
  const err = new Error('Validation failed')
  err.status = 422
  err.errors = errors
  throw err
}

export function clientInfo(req) {
  return {
    ip: (req.ip || '').slice(0, 45) || null,
    ua: clean(req.get('user-agent') || '', 500) || null,
  }
}
