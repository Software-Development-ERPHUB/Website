import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export const config = {
  port: Number(process.env.PORT) || 5000,
  env: process.env.NODE_ENV || 'development',
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'voltech_website',
  },
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map((s) => s.trim()).filter(Boolean),
  uploadDir: path.resolve(root, process.env.UPLOAD_DIR || 'uploads'),
  adminKey: process.env.ADMIN_API_KEY || '',
  trustProxy: process.env.TRUST_PROXY === '1',
  jwtSecret: process.env.JWT_SECRET || '',
  sessionHours: Number(process.env.SESSION_HOURS) || 8,
  cookieSecure: process.env.COOKIE_SECURE === '1',
  storage: {
    driver: process.env.STORAGE_DRIVER || 'local',
    publicUploadUrl: (process.env.PUBLIC_UPLOAD_URL || '').replace(/\/$/, ''),
    s3: {
      bucket: process.env.S3_BUCKET || '',
      region: process.env.S3_REGION || 'ap-south-1',
      endpoint: process.env.S3_ENDPOINT || '',
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
      publicUrl: (process.env.S3_PUBLIC_URL || '').replace(/\/$/, ''),
    },
  },
  root,
}
