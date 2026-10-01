import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE } from '../../content/site'
import { PAGE_SEO } from '../../content/seo'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.setAttribute('content', content)
}
function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el) }
  el.setAttribute('href', href)
}
function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!data) { el?.remove(); return }
  if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.id = id; document.head.appendChild(el) }
  el.textContent = JSON.stringify(data)
}

/**
 * Per-route SEO without extra dependencies. Pass explicit props to override
 * the defaults from content/seo.js (e.g. on case-study pages).
 */
export default function Seo({ title, description, image, type = 'website', noindex = false, jsonLd = null }) {
  const { pathname } = useLocation()
  const page = PAGE_SEO[pathname] || {}
  const t = title || page.title || SITE.defaultTitle
  const fullTitle = pathname === '/' ? `${SITE.name} | ${t}` : `${t} | ${SITE.name}`
  const desc = description || page.description || SITE.defaultDescription
  const url = SITE.url + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''))
  const ogImg = (image || SITE.ogImage).startsWith('http') ? image || SITE.ogImage : SITE.url + (image || SITE.ogImage)

  useEffect(() => {
    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setLink('canonical', url)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:site_name', SITE.name)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', ogImg)
    setMeta('property', 'og:locale', SITE.locale)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'twitter:image', ogImg)
    setJsonLd('ld-page', jsonLd)
  }, [fullTitle, desc, url, ogImg, type, noindex, jsonLd])

  return null
}
