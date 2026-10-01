/**
 * GLOBAL SEARCH INDEX — built from the same content files the pages use,
 * so anything added to content/ becomes searchable automatically.
 */
import { NAV, FAQS, TECH_GROUPS, TECH_LAYERS, INTERNSHIP } from '../content/company'
import { PAGE_SEO } from '../content/seo'
import { SERVICES } from '../content/services'
import { SOLUTIONS, INDUSTRIES } from '../content/solutions'
import { visibleProjects } from '../content/projects'
import { LEADERS } from '../content/leadership'
import { TEAM } from '../content/team'
import { COMPANIES } from '../data/companies'
import { ERP_PRODUCTS, GROUP_SITES, HRMS_MODULES, AUDIT_MODULES } from '../content/erp'

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'page', label: 'Pages' },
  { id: 'service', label: 'Services' },
  { id: 'solution', label: 'Solutions' },
  { id: 'project', label: 'Projects' },
  { id: 'erp', label: 'ERP' },
  { id: 'faq', label: 'FAQ' },
  { id: 'people', label: 'People' },
  { id: 'tech', label: 'Technology' },
]

const join = (...a) => a.flat().filter(Boolean).join(' ')

function build() {
  const items = []
  const add = (o) => items.push({ ...o, _t: norm(join(o.title, o.badge)), _x: norm(join(o.title, o.badge, o.subtitle, o.keywords)) })

  // Pages
  const labels = Object.fromEntries(NAV.flatMap((n) => (n.children ? n.children : [n])).map((n) => [n.to, n.label]))
  Object.entries(PAGE_SEO).forEach(([path, s]) => {
    add({ id: 'p' + path, cat: 'page', icon: 'file', title: labels[path] || s.title.split(' — ')[0], subtitle: s.description, to: path, keywords: s.title })
  })
  add({ id: 'p-intern', cat: 'page', icon: 'graduation', title: 'Apply for an internship', subtitle: 'Send your application and CV to our team.', to: '/careers#internship', keywords: join('intern internship student fresher cv resume apply', INTERNSHIP.areas) })

  SERVICES.forEach((s) => add({ id: 's-' + s.id, cat: 'service', icon: s.icon, title: s.title, subtitle: s.summary, to: `/services#${s.id}`, keywords: s.includes }))
  SOLUTIONS.forEach((s) => add({ id: 'so-' + s.id, cat: 'solution', icon: s.icon, title: s.title, subtitle: s.value, to: `/solutions#${s.id}`, keywords: [s.problem] }))
  INDUSTRIES.filter((x) => x.show).forEach((x) => add({ id: 'i-' + x.id, cat: 'solution', icon: x.icon, title: x.title, subtitle: x.body, to: `/industries#${x.id}`, keywords: ['industry', x.examples] }))

  visibleProjects().forEach((p) => add({
    id: 'pr-' + p.slug, cat: 'project', icon: p.category === 'Website' ? 'globe' : 'dashboard',
    title: p.name, subtitle: p.summary, to: `/projects/${p.slug}`, badge: p.code,
    keywords: [p.code, p.category, p.industry, p.features, p.tech, 'case study'],
  }))

  // ERP portfolio
  COMPANIES.forEach((c) => {
    add({ id: 'c-' + c.id, cat: 'erp', icon: 'building', title: c.fullName, subtitle: `${c.sector} · ${c.apps.length} applications`, to: `/erp/companies/${c.id}`, badge: c.name, keywords: [c.name, c.sector, c.tagline, 'company group'] })
    c.apps.forEach((a) => add({
      id: `a-${c.id}-${a.id}`, cat: 'erp', icon: 'boxes', title: a.name, subtitle: `${c.name} · ${a.description || ''}`,
      to: `/erp/companies/${c.id}`, badge: a.code, keywords: [a.code, a.modules, c.name, 'application erp'],
    }))
  })
  ERP_PRODUCTS.forEach((p) => add({ id: 'ep-' + p.code, cat: 'erp', icon: 'layers', title: p.full, subtitle: 'Voltech ERP product suite', to: '/erp', badge: p.code, keywords: [p.code, 'product suite'] }))
  add({ id: 'hrms', cat: 'erp', icon: 'users', title: 'HR Management System — modules', subtitle: HRMS_MODULES.map((m) => m.label).join(', '), to: '/erp#shared-systems', keywords: HRMS_MODULES.map((m) => m.desc) })
  add({ id: 'audit', cat: 'erp', icon: 'shield', title: 'Audit Management System — modules', subtitle: AUDIT_MODULES.map((m) => m.label).join(', '), to: '/erp#shared-systems', keywords: AUDIT_MODULES.map((m) => m.desc) })
  GROUP_SITES.forEach((s) => add({ id: 'gs-' + s.id, cat: 'erp', icon: 'globe', title: `${s.name} website`, subtitle: s.tagline, to: '/erp/websites', href: s.url, keywords: [s.tags, s.seoKw, 'website'] }))

  FAQS.forEach((f, i) => add({ id: 'f' + i, cat: 'faq', icon: 'file', title: f.q, subtitle: f.a, to: '/faq', keywords: [] }))

  LEADERS.forEach((l) => add({ id: 'l-' + l.id, cat: 'people', icon: 'briefcase', title: l.name, subtitle: l.role, to: '/leadership', keywords: ['leadership', l.intro] }))
  TEAM.forEach((t) => add({ id: 't-' + t.id, cat: 'people', icon: 'users', title: t.name, subtitle: t.role, to: '/team', keywords: ['team', t.group] }))

  TECH_GROUPS.forEach((g) => g.items.forEach((t) => add({ id: `tg-${g.id}-${t.name}`, cat: 'tech', icon: 'code', title: t.name, subtitle: `${g.title} — ${g.note}`, to: '/technology', keywords: [g.title] })))
  TECH_LAYERS.forEach((l) => add({ id: 'tl-' + l.id, cat: 'tech', icon: l.icon, title: l.name, subtitle: l.summary, to: '/technology', keywords: [l.short, l.does, l.tools.map((t) => t.name)] }))

  return items
}

export function norm(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9+#.\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

let INDEX = null
export const getIndex = () => (INDEX ||= build())

/** Token search: every word must match; title matches rank highest. */
export function search(query, cat = 'all', limit = 40) {
  const q = norm(query)
  if (!q) return []
  const words = q.split(' ')
  const out = []
  for (const it of getIndex()) {
    if (cat !== 'all' && it.cat !== cat) continue
    let score = 0, ok = true
    for (const w of words) {
      const inTitle = it._t.indexOf(w)
      if (inTitle === 0) score += 40
      else if (inTitle > 0) score += it._t[inTitle - 1] === ' ' ? 28 : 14
      else if (it._x.includes(w)) score += 6
      else { ok = false; break }
    }
    if (!ok) continue
    if (it._t === q || norm(it.badge) === q) score += 60
    if (it.cat === 'page' && score >= 28) score += 6
    out.push({ ...it, score })
  }
  return out.sort((a, b) => b.score - a.score).slice(0, limit)
}

export const SUGGESTIONS = ['ERP', 'HRMS', 'Website design', 'React', 'Payroll', 'Internship', 'Supply chain', 'Contact']
