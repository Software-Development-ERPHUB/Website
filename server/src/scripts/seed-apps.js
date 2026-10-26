// Loads the ERP product catalogue into the tracker (collection "apps").
// Also assigns a lead developer per application from an optional mapping file.
//
//   npm run seed:apps                              → add all applications (skips ones that exist)
//   npm run seed:apps -- --leads ./leads.json      → add + assign leads
//
// leads.json — keys may be an app code ("1"), slug, or exact name; values may be
// a team member's slug, name, or login email. Example:
//   { "1": "rajkiran", "2": "Govardhan", "ALL": "giri" }
import fs from 'node:fs'
import path from 'node:path'
import { pool } from '../db.js'
import { COLLECTIONS, slugify } from '../cms/collections.js'
import { cleanData } from '../cms/sanitize.js'
import { ENTERPRISE, SUITE_ENTRIES, MODULES } from '../cms/catalogue.js'

const arg = (k) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : undefined }

const titleField = COLLECTIONS.apps.titleField

async function upsertApp(input, userId) {
  const data = cleanData('apps', input)
  data.slug = slugify(input.slug || data[titleField])
  const [[hit]] = await pool.query('SELECT id FROM cms_entries WHERE collection = ? AND slug = ?', ['apps', data.slug])
  if (hit) return { id: hit.id, created: false }
  const [[{ next: order }]] = await pool.query('SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM cms_entries WHERE collection = ?', ['apps'])
  const [r] = await pool.execute(
    `INSERT INTO cms_entries (collection, slug, title, status, has_changes, sort_order, draft_data, created_by, updated_by)
     VALUES (?, ?, ?, 'draft', 0, ?, ?, ?, ?)`,
    ['apps', data.slug, String(data[titleField]).slice(0, 255), order, JSON.stringify(data), userId, userId])
  return { id: r.insertId, created: true, data }
}

async function main() {
  const [[admin]] = await pool.query("SELECT id FROM cms_users WHERE role = 'admin' ORDER BY id LIMIT 1")
  const userId = admin?.id ?? null

  const withDemo = (a) => (a.demoUrl ? { ...a, stages: { html: { status: 'Done' } } } : a)
  const apps = [ENTERPRISE, ...SUITE_ENTRIES, ...MODULES].map((a) => ({ ...withDemo(a), slug: `${a.code}-${a.name}` }))

  let created = 0
  const byKey = {}
  for (const a of apps) {
    const r = await upsertApp(a, userId)
    if (r.created) created++
    byKey[String(a.code)] = byKey[slugify(a.slug)] = byKey[slugify(a.name)] = r.id
  }

  // resolve team up-front: slug | name | email → slug
  const [team] = await pool.query(`SELECT title, slug, draft_data FROM cms_entries WHERE collection = 'team' AND status <> 'archived'`)
  const teamSlug = (v) => {
    const s = String(v || '').trim().toLowerCase()
    if (!s) return ''
    const t = team.find((x) => [x.slug, String(x.title).toLowerCase(), JSON.parse(x.draft_data || '{}').email?.toLowerCase()].includes(s))
    return t ? t.slug : ''
  }

  let assigned = 0
  const leadsFile = arg('leads')
  if (leadsFile) {
    const mapping = JSON.parse(fs.readFileSync(path.resolve(leadsFile), 'utf8'))
    for (const [key, person] of Object.entries(mapping)) {
      const id = byKey[String(key)] ?? byKey[slugify(key)]
      const lead = teamSlug(person)
      if (!id) { console.warn(`! no application matches "${key}"`); continue }
      if (!lead) { console.warn(`! no team member matches "${person}" (app "${key}")`); continue }
      const [[row]] = await pool.query('SELECT draft_data FROM cms_entries WHERE id = ?', [id])
      const data = JSON.parse(row.draft_data || '{}')
      data.lead = lead
      await pool.execute('UPDATE cms_entries SET draft_data = ?, updated_by = ? WHERE id = ?', [JSON.stringify(data), userId, id])
      assigned++
    }
  }

  console.log(`\nApplications: +${created} created, ${apps.length - created} already existed.`)
  if (leadsFile) console.log(`Leads assigned: ${assigned}.`)
  console.log('Open the tracker at http://localhost:5173/admin/tracker\n')
}

main()
  .catch((e) => { console.error('\nSeed failed:', e.code || '', e.message); process.exitCode = 1 })
  .finally(() => pool.end())
