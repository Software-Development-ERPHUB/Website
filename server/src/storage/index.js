/**
 * FILE STORAGE — one interface, swappable driver.
 *   STORAGE_DRIVER=local  → files in UPLOAD_DIR/media, served at /uploads/media/…
 *   STORAGE_DRIVER=s3     → any S3-compatible bucket (AWS S3, Cloudflare R2, DigitalOcean Spaces)
 *
 * Every driver implements:  put(key, buffer, mime) → { key, url }   and   remove(key)
 * The media table stores `storage` + `storage_key`, so files from both drivers can coexist.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { config } from '../config.js'

const MEDIA_DIR = path.join(config.uploadDir, 'media')

const local = {
  name: 'local',
  async put(key, buffer) {
    const file = path.join(MEDIA_DIR, key)
    await fs.mkdir(path.dirname(file), { recursive: true })
    await fs.writeFile(file, buffer, { flag: 'wx' })
    return { key, url: `${config.storage.publicUploadUrl}/uploads/media/${key}` }
  },
  async remove(key) {
    const file = path.join(MEDIA_DIR, path.normalize(key).replace(/^(\.\.[/\\])+/, ''))
    if (!file.startsWith(MEDIA_DIR)) return
    await fs.unlink(file).catch(() => {})
  },
}

let s3Client = null
const s3 = {
  name: 's3',
  async client() {
    if (s3Client) return s3Client
    // Loaded only when used:  npm install @aws-sdk/client-s3
    const { S3Client, PutObjectCommand, DeleteObjectCommand } = await import('@aws-sdk/client-s3')
    const c = config.storage.s3
    s3Client = {
      api: new S3Client({
        region: c.region,
        ...(c.endpoint && { endpoint: c.endpoint, forcePathStyle: true }),
        credentials: { accessKeyId: c.accessKeyId, secretAccessKey: c.secretAccessKey },
      }),
      PutObjectCommand, DeleteObjectCommand,
    }
    return s3Client
  },
  async put(key, buffer, mime) {
    const { api, PutObjectCommand } = await this.client()
    const c = config.storage.s3
    await api.send(new PutObjectCommand({ Bucket: c.bucket, Key: `media/${key}`, Body: buffer, ContentType: mime, CacheControl: 'public, max-age=31536000, immutable' }))
    return { key, url: `${c.publicUrl}/media/${key}` }
  },
  async remove(key) {
    const { api, DeleteObjectCommand } = await this.client()
    await api.send(new DeleteObjectCommand({ Bucket: config.storage.s3.bucket, Key: `media/${key}` })).catch(() => {})
  },
}

const DRIVERS = { local, s3 }
export const storage = DRIVERS[config.storage.driver] || local
export const driverFor = (name) => DRIVERS[name] || local
export const MEDIA_ROOT = MEDIA_DIR
