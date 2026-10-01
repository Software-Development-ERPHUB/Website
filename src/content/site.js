/**
 * SITE CONFIGURATION
 * ------------------------------------------------------------------
 * Single place to change company identity, contact details, map and
 * social links. Anything marked TODO must be supplied by management —
 * nothing here should be invented.
 *
 * This file is plain data (no asset imports) so it can also be read by
 * scripts/generate-sitemap.mjs and later replaced by a CMS/API call.
 */

export const SITE = {
  name: 'Voltech IT Services',
  shortName: 'Voltech',
  descriptor: 'Software & IT Services',
  legalName: 'Voltech IT Services Private Limited',
  parent: 'Voltech Group',

  // TODO(devops): production domain, no trailing slash. Used for canonical
  // URLs, Open Graph and sitemap.xml.
  url: 'https://www.example.com',

  defaultTitle: 'Software Development & IT Services Company in Chennai',
  defaultDescription:
    'Custom software, web applications, websites and ERP business applications — designed, built and supported by an engineering team with a decade of real-world enterprise delivery in Chennai.',
  ogImage: '/og-default.jpg',
  locale: 'en_IN',

  // Facts taken from the supplied project. Confirm before launch.
  since: 2015,
  facts: [
    { value: 'Since 2015', label: 'Building and running business applications' },
    { value: '20+', label: 'Applications developed and in production use' },
    { value: '4', label: 'Corporate websites designed and maintained' },
  ],
}

export const CONTACT = {
  addressLines: [
    'No. 2/429, Voltech Eco Tower',
    'Mount Poonamallee Road, Ayyappanthangal',
    'Chennai, Tamil Nadu 600056',
  ],
  phone: '', // e.g. '+91 00000 00000'  TODO(management)
  email: 'erp.notification@voltechgroup.com', // existing address from the previous site — replace with a sales/enquiry inbox
  careersEmail: '', // TODO(management) e.g. careers@yourdomain.com — falls back to `email`
  hours: '', // TODO(management) e.g. 'Mon–Sat, 9:30 AM – 6:30 PM IST' — row is hidden while empty

  /**
   * Form endpoints on the Express + MySQL API (/server).
   * Paths are relative to VITE_API_URL (see src/lib/api.js).
   * Set `contactEndpoint` to '' to fall back to opening the visitor's mail client.
   */
  contactEndpoint: '/api/contact',
  internshipEndpoint: '/api/internship',
}

/**
 * GOOGLE MAP
 * `embedUrl` — paste the src="" from Google Maps › Share › Embed a map.
 *              Used as-is when present (preferred).
 * `lat/lng`  — fallback pin if embedUrl is empty.
 * `placeUrl` — "Open in Google Maps" link.
 */
export const MAP = {
  label: 'Voltech Eco Tower, Ayyappanthangal, Chennai',
  embedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24576.581836287078!2d80.1308672!3d13.041663999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52665655555555%3A0x6b1ae55dc0d4c0ff!2sVoltech%20Engineers%20Private%20Limited!5e1!3m2!1sen!2sin!4v1790661060584!5m2!1sen!2sin',
  lat: 13.041664,
  lng: 80.1308672,
  query: 'Voltech Engineers Private Limited, Mount Poonamallee Road, Ayyappanthangal, Chennai 600056',
  zoom: 15,
  placeUrl: 'https://www.google.com/maps/search/?api=1&query=Voltech+Engineers+Private+Limited+Ayyappanthangal+Chennai',
}

/**
 * SOCIAL MEDIA — paste each profile URL. All icons always show; while a URL
 * is empty the icon is marked "coming soon" and does not navigate.
 * Delete a line to hide that network completely.
 */
export const SOCIAL = {
  linkedin: '',  // TODO e.g. https://www.linkedin.com/company/your-company
  facebook: '',  // TODO e.g. https://www.facebook.com/yourpage
  instagram: '', // TODO e.g. https://www.instagram.com/yourhandle
  x: '',         // TODO e.g. https://x.com/yourhandle
  youtube: '',   // TODO e.g. https://www.youtube.com/@yourchannel
  whatsapp: '',  // TODO e.g. https://wa.me/919876543210
}

/** Public websites of the parent group (retained from the previous site). */
export const GROUP_LINKS = [
  { label: 'Voltech Group', url: 'https://voltechgroup.com/' },
]

export function mapEmbedSrc(m = MAP) {
  if (m.embedUrl) return m.embedUrl
  const q = m.lat != null && m.lng != null ? `${m.lat},${m.lng}` : m.query
  if (!q) return null
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=${m.zoom || 14}&output=embed`
}
