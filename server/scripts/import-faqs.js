// Copies the built-in FAQs (src/content/company.js) into the CMS as PUBLISHED entries,
// so they stay on the website next to the ones you add in the dashboard.
//   npm run cms:import-faqs
// Safe to run more than once — questions that already exist in the CMS are skipped.
import { pool } from '../db.js'
import { FAQS } from '../../../src/content/company.js'
import { slugify } from '../cms/collections.js'
import { cleanData } from '../cms/sanitize.js'

try {
  const [existing] = await pool.query("SELECT id, title FROM cms_entries WHERE collection = 'faqs'")
  const have = new Set(existing.map((r) => r.title.trim().toLowerCase()))
  const todo = FAQS.filter((f) => !have.has(f.q.trim().toLowerCase()))

  if (!todo.length) {
    console.log('All built-in FAQs are already in the CMS. Nothing to import.')
  } else {
    // built-in FAQs go first; FAQs you already added move after them (reorder anytime in the dashboard)
    await pool.execute("UPDATE cms_entries SET sort_order = sort_order + ? WHERE collection = 'faqs'", [todo.length])
    let order = 1
    for (const f of todo) {
      const data = cleanData('faqs', { q: f.q, a: f.a, slug: slugify(f.q) })
      let slug = data.slug, n = 2
      // keep slugs unique
      for (;;) {
        const [[hit]] = await pool.query("SELECT id FROM cms_entries WHERE collection = 'faqs' AND slug = ?", [slug])
        if (!hit) break
        slug = `${data.slug}-${n++}`
      }
      data.slug = slug
      const json = JSON.stringify(data)
      const [r] = await pool.execute(
        `INSERT INTO cms_entries (collection, slug, title, status, has_changes, sort_order, draft_data, published_data, published_at)
         VALUES ('faqs', ?, ?, 'published', 0, ?, ?, ?, NOW())`,
        [slug, f.q.slice(0, 255), order++, json, json])
      await pool.execute("INSERT INTO cms_revisions (entry_id, data, action) VALUES (?, ?, 'import')", [r.insertId, json])
    }
    console.log(`Imported ${todo.length} FAQ${todo.length === 1 ? '' : 's'} as published. Skipped ${FAQS.length - todo.length} already in the CMS.`)
  }
} catch (err) {
  console.error('Import failed:', err.code || '', err.message)
  if (err.code === 'ER_NO_SUCH_TABLE') console.error('Run  npm run db:init  first.')
  process.exitCode = 1
} finally {
  await pool.end()
}