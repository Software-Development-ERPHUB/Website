import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import multer from 'multer'
import fs from 'node:fs'
import { config } from './config.js'
import { ping } from './db.js'
import contactRoutes from './routes/contact.js'
import internshipRoutes from './routes/internship.js'
import adminRoutes from './routes/admin.js'
import authRoutes from './cms/auth.js'
import entryRoutes from './cms/entries.js'
import mediaRoutes from './cms/media.js'
import userRoutes from './cms/users.js'
import publicRoutes from './cms/public.js'
import { MEDIA_ROOT } from './storage/index.js'

const app = express()
if (config.trustProxy) app.set('trust proxy', 1)

app.use(helmet())
app.use(cors({
  origin: (origin, cb) => cb(null, !origin || config.corsOrigins.includes(origin)),
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}))
app.use(cookieParser())
app.use(express.json({ limit: '2mb' })) // rich-text articles can be long

// Public forms: 10 submissions per IP per 15 minutes
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-7', legacyHeaders: false,
  message: { ok: false, message: 'Too many submissions. Please try again in a few minutes.' },
})

// Health check — shows the real database error outside production
app.get('/api/health', async (req, res) => {
  try {
    res.json({ ok: true, db: await ping(), database: config.db.database })
  } catch (err) {
    console.error('[health] MySQL error:', err.code, err.message)
    const hints = {
      ECONNREFUSED: 'MySQL is not running, or DB_HOST / DB_PORT is wrong.',
      ER_ACCESS_DENIED_ERROR: 'Wrong DB_USER or DB_PASSWORD in server/.env.',
      ER_BAD_DB_ERROR: `Database "${config.db.database}" does not exist — run: npm run db:init`,
      ENOTFOUND: 'DB_HOST is wrong — use 127.0.0.1.',
    }
    res.status(503).json({
      ok: false, db: false,
      ...(config.env !== 'production' && { code: err.code, error: err.message, hint: hints[err.code] || 'Check server/.env and that MySQL is running.' }),
    })
  }
})

// Website forms
app.use('/api/contact', formLimiter, contactRoutes)
app.use('/api/internship', (req, res, next) => (req.method === 'POST' ? formLimiter(req, res, next) : next()), internshipRoutes)

// CMS
app.use('/api/public', publicRoutes)       // published content for the website
app.use('/api/auth', authRoutes)           // dashboard sign-in
app.use('/api/cms/media', mediaRoutes)
app.use('/api/cms/users', userRoutes)
app.use('/api/cms', entryRoutes)
app.use('/api/admin', adminRoutes)         // enquiries + internship applications

// Uploaded media (only the media folder — CVs are never served publicly)
fs.mkdirSync(MEDIA_ROOT, { recursive: true })
app.use('/uploads/media', (req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff')
  res.set('Cross-Origin-Resource-Policy', 'cross-origin')
  next()
}, express.static(MEDIA_ROOT, { maxAge: '365d', immutable: true, index: false, dotfiles: 'deny' }))

app.use('/api', (req, res) => res.status(404).json({ ok: false, message: 'Not found' }))

// One error format for the front end: { ok:false, message, errors? }
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const msg = err.code === 'LIMIT_FILE_SIZE' ? 'File is too large.' : 'Upload failed. Please try again.'
    return res.status(422).json({ ok: false, message: msg, errors: { cv: msg, file: msg } })
  }
  if (err.status === 422) return res.status(422).json({ ok: false, message: err.message || 'Please check the highlighted fields.', errors: err.errors })
  if (err.status === 503) return res.status(503).json({ ok: false, message: err.message })
  if (err.code === 'ER_NO_SUCH_TABLE') console.error('[api] A table is missing — run: npm run db:init')
  console.error('[api] Error:', err.code || '', err.message)
  res.status(500).json({ ok: false, message: 'Something went wrong on our side. Please try again later.' })
})

app.listen(config.port, async () => {
  console.log(`API ready on http://localhost:${config.port}`)
  try { await ping(); console.log(`MySQL connected → database "${config.db.database}"`) }
  catch (err) { console.error(`MySQL NOT connected (${err.code}): ${err.message}`) }
  if (!config.jwtSecret || config.jwtSecret.startsWith('change-me')) console.warn('CMS sign-in disabled until JWT_SECRET is set in server/.env')
})
