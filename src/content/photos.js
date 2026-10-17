/**
 * PHOTOS — drop-in pictures for banners, suites and modules.
 *
 * Put an image in src/assets/photos/ with one of the names listed in
 * src/assets/photos/README.md (e.g. home-hero.webp, suite-hrms.webp,
 * hrms-payroll.webp) and it appears on the site automatically. Until a
 * photo exists, each place falls back to a real application screen.
 */
const files = import.meta.glob('../assets/photos/*.{webp,jpg,jpeg,png,avif}', { eager: true, import: 'default' })

export const PHOTOS = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace(/\.(webp|jpe?g|png|avif)$/i, ''), url]),
)

export const photo = (key) => (key ? PHOTOS[key] || null : null)
