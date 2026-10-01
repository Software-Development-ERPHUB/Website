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
 */
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
}

export const isCollection = (c) => Object.prototype.hasOwnProperty.call(COLLECTIONS, c)

export function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 150)
}
