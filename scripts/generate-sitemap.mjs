// Generates public/robots.txt and public/sitemap.xml from content files.
// Runs automatically before `npm run build`.
import { writeFileSync } from 'node:fs'
import { SITE } from '../src/content/site.js'
import { PAGE_SEO } from '../src/content/seo.js'
import { PROJECTS } from '../src/content/projects.js'

const base = SITE.url.replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)
const urls = [
  ...Object.entries(PAGE_SEO).map(([path, s]) => ({ loc: base + (path === '/' ? '/' : path), priority: s.priority || '0.5' })),
  ...PROJECTS.filter((p) => p.showcase).map((p) => ({ loc: `${base}/projects/${p.slug}`, priority: '0.7' })),
]
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
writeFileSync(new URL('../public/robots.txt', import.meta.url), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`)
console.log(`sitemap.xml: ${urls.length} URLs for ${base}`)
