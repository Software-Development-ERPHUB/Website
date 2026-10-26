/**
 * SCREENS — real screenshots of the client demos (public/demo/*), used as the
 * pictures on the Client Demo, Home and Solutions pages.
 * To refresh one, replace the file in src/assets/screens (WebP, 1200px wide)
 * and keep the same name.
 */
const files = import.meta.glob('../assets/screens/*.webp', { eager: true, import: 'default' })
export const SCREENS = Object.fromEntries(Object.entries(files).map(([path, url]) => [path.split('/').pop().replace('.webp', ''), url]))
export const screen = (key) => SCREENS[key] || null
