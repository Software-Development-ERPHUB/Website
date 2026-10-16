/**
 * CMS COLLECTIONS — the content types editors can manage.
 * ------------------------------------------------------------------
 * The dashboard builds its forms from this file (GET /api/cms/collections),
 * so adding a field here is all it takes to show it in the editor.
 *
 * Field types: text · textarea · slug · richtext · image · tags · select · number · date · boolean
 *   required   — needed to PUBLISH (drafts can be saved incomplete)
 *   max        — max characters
 *   from       — (slug) field the slug is generated from
 *   options    — (select) allowed values
 *   list       — shown as a column in the entry list
 *
 * Collections marked  internal: true  are for the team only: the public API
 * never returns them and they have no Publish step (saving is enough).
 */

/** Lifecycle every application goes through, in order (Development tracker). */
export const STAGES = [
  { id: 'discussion', label: 'Client discussion', short: 'Discuss' },
  { id: 'srs', label: 'SRS document', short: 'SRS' },
  { id: 'mom', label: 'MOM sign-off', short: 'MOM' },
  { id: 'suggestions', label: 'Client suggestions', short: 'Suggest' },
  { id: 'html', label: 'HTML demo', short: 'Demo' },
  { id: 'review', label: 'Client review', short: 'Review' },
  { id: 'frontend', label: 'Frontend', short: 'FE' },
  { id: 'backend', label: 'Backend', short: 'BE' },
  { id: 'testing', label: 'Testing', short: 'Test' },
  { id: 'deploy', label: 'Deployment', short: 'Deploy' },
]
export const STAGE_STATUSES = ['Not started', 'In progress', 'Done', 'On hold']

/** Catalogue sections. A = suite letter; each numbered product is its own application. */
export const SUITES = [
  'A. Finance, Procurement & Supply Chain',
  'B. HRMS, Workforce & Employee Productivity',
  'C. Assets, Field Operations & Service Management',
  'D. Governance, Automation & Business Intelligence',
  'E. Customer, Projects & Digital',
]
export const APP_KINDS = ['Enterprise application', 'Suite', 'Module']

export const COLLECTIONS = {
  news: {
    label: 'News & insights',
    singular: 'Article',
    icon: 'newspaper',
    titleField: 'title',
    publicPath: '/news/:slug',
    sort: 'date',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, max: 160 },
      { name: 'slug', label: 'URL slug', type: 'slug', from: 'title', required: true, help: 'Used in the page address: /news/your-slug' },
      { name: 'category', label: 'Category', type: 'select', options: ['Company news', 'Project update', 'Insight', 'Event'], list: true },
      { name: 'excerpt', label: 'Short summary', type: 'textarea', max: 300, required: true, help: 'Shown on the news list and in search results.' },
      { name: 'coverImage', label: 'Cover image', type: 'image' },
      { name: 'body', label: 'Article', type: 'richtext', required: true },
      { name: 'tags', label: 'Tags', type: 'tags' },
      { name: 'seoTitle', label: 'SEO title', type: 'text', max: 70, group: 'SEO' },
      { name: 'seoDescription', label: 'SEO description', type: 'textarea', max: 160, group: 'SEO' },
    ],
  },
  jobs: {
    label: 'Job openings',
    singular: 'Job',
    icon: 'briefcase',
    titleField: 'position',
    publicPath: '/careers#openings',
    sort: 'order',
    fields: [
      { name: 'position', label: 'Position', type: 'text', required: true, max: 120 },
      { name: 'slug', label: 'URL slug', type: 'slug', from: 'position', required: true },
      { name: 'type', label: 'Employment type', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Internship'], required: true, list: true },
      { name: 'experience', label: 'Experience', type: 'text', max: 60, required: true, help: 'e.g. 2–4 years', list: true },
      { name: 'location', label: 'Location', type: 'text', max: 80, required: true, default: 'Chennai (on-site)' },
      { name: 'description', label: 'Short description', type: 'textarea', max: 400, required: true },
      { name: 'details', label: 'Full job description', type: 'richtext' },
      { name: 'skills', label: 'Skills', type: 'tags' },
    ],
  },
  faqs: {
    label: 'FAQs',
    singular: 'FAQ',
    icon: 'help',
    titleField: 'q',
    publicPath: '/faq',
    sort: 'order',
    fields: [
      { name: 'q', label: 'Question', type: 'text', required: true, max: 200 },
      { name: 'slug', label: 'Slug', type: 'slug', from: 'q', required: true },
      { name: 'a', label: 'Answer', type: 'textarea', required: true, max: 1500 },
    ],
  },

  /* ── Development tracker (internal) ── */
  apps: {
    label: 'Applications',
    singular: 'Application',
    icon: 'layers',
    internal: true,
    titleField: 'name',
    sort: 'order',
    fields: [
      { name: 'name', label: 'Application name', type: 'text', required: true, max: 120 },
      { name: 'slug', label: 'Slug', type: 'slug', from: 'name', required: true },
      { name: 'code', label: 'Catalogue no.', type: 'text', max: 10, list: true, help: 'Suite letter (A, B …) or product number (1, 2 …).' },
      { name: 'kind', label: 'Type', type: 'select', options: APP_KINDS, required: true, list: true, default: 'Module',
        help: 'Enterprise application = everything together · Suite = a lettered section · Module = one standalone application.' },
      { name: 'suite', label: 'Suite', type: 'select', options: SUITES, list: true },
      { name: 'priority', label: 'Priority', type: 'select', options: ['P1', 'P2', 'P3'] },
      { name: 'summary', label: 'Core capabilities', type: 'textarea', max: 600 },
      { name: 'note', label: 'Portfolio note', type: 'text', max: 160 },
      { name: 'demoUrl', label: 'Demo link', type: 'text', max: 300, help: 'e.g. /client-demo/procurement or a live https:// link.' },
      { name: 'stages', label: 'Lifecycle', type: 'stages', stages: STAGES, statuses: STAGE_STATUSES, people: 'team', group: 'Development stages' },
    ],
  },
  team: {
    label: 'Team members',
    singular: 'Team member',
    icon: 'users',
    internal: true,
    titleField: 'name',
    sort: 'order',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true, max: 80 },
      { name: 'slug', label: 'Slug', type: 'slug', from: 'name', required: true },
      { name: 'role', label: 'Role', type: 'text', max: 80, list: true, default: 'Developer' },
      { name: 'email', label: 'Login email', type: 'text', max: 190, list: true,
        help: 'The email this person signs in with (Settings → Users, role Developer). Links their login to their stages.' },
      { name: 'active', label: 'Currently on the team', type: 'boolean', default: true },
    ],
  },
}

export const isCollection = (c) => Object.prototype.hasOwnProperty.call(COLLECTIONS, c)
export const isPublic = (c) => isCollection(c) && !COLLECTIONS[c].internal

export function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 150)
}
