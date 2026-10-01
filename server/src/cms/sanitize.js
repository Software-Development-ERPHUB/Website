import sanitizeHtml from 'sanitize-html'
import { COLLECTIONS, slugify } from './collections.js'

/** Allow-list for rich text coming from the editor — anything else is stripped. */
const RICH = {
  allowedTags: ['p', 'br', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 's', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'hr', 'img', 'figure', 'figcaption'],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    p: ['style'], h2: ['style'], h3: ['style'], h4: ['style'],
  },
  allowedStyles: { '*': { 'text-align': [/^(left|right|center|justify)$/] } },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['http', 'https'] },
  allowProtocolRelative: false,
  transformTags: {
    a: (tag, attribs) => {
      const external = /^https?:\/\//i.test(attribs.href || '')
      return { tagName: 'a', attribs: external ? { ...attribs, target: '_blank', rel: 'noopener noreferrer' } : { href: attribs.href } }
    },
  },
}

// Relative URLs (e.g. /uploads/media/…) are allowed; javascript:, data: etc. are removed.
const cleanRich = (html) => sanitizeHtml(String(html || ''), RICH)

const str = (v, max = 5000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

/**
 * Normalise an entry's data against its collection definition.
 * Unknown fields are dropped; every value is type-checked and length-limited.
 */
export function cleanData(collection, input = {}) {
  const def = COLLECTIONS[collection]
  const out = {}
  for (const f of def.fields) {
    const v = input[f.name]
    switch (f.type) {
      case 'richtext': out[f.name] = cleanRich(v); break
      case 'slug': out[f.name] = slugify(v || input[f.from]); break
      case 'tags': out[f.name] = (Array.isArray(v) ? v : String(v || '').split(',')).map((t) => str(t, 40)).filter(Boolean).slice(0, 20); break
      case 'number': out[f.name] = Number.isFinite(Number(v)) ? Number(v) : null; break
      case 'boolean': out[f.name] = !!v; break
      case 'date': out[f.name] = /^\d{4}-\d{2}-\d{2}/.test(v || '') ? String(v).slice(0, 10) : ''; break
      case 'select': out[f.name] = f.options.includes(v) ? v : ''; break
      case 'image': {
        const id = Number(v?.id) || null
        const url = str(v?.url, 500)
        out[f.name] = id && /^(https?:\/\/|\/uploads\/)/.test(url) ? { id, url, alt: str(v?.alt, 255) } : null
        break
      }
      default: out[f.name] = str(v, f.max || 5000)
    }
  }
  return out
}

/** Errors that block publishing (drafts only need a title). */
export function publishErrors(collection, data) {
  const def = COLLECTIONS[collection]
  const e = {}
  for (const f of def.fields) {
    const v = data[f.name]
    const empty = v == null || v === '' || (Array.isArray(v) && !v.length) || (f.type === 'richtext' && !String(v).replace(/<[^>]+>/g, '').trim())
    if (f.required && empty) e[f.name] = `${f.label} is required to publish.`
    else if (f.max && typeof v === 'string' && v.length > f.max) e[f.name] = `${f.label} must be ${f.max} characters or fewer.`
  }
  return e
}
