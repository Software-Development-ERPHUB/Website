import { useEffect, useState } from 'react'
import { API_BASE } from './api'

/**
 * Read PUBLISHED content from the CMS. If the API is unreachable the hook
 * returns `null` items so pages can fall back to their built-in content.
 */
export async function fetchPublic(path, { preview = false, signal } = {}) {
  const url = preview ? `${API_BASE}/api/cms/preview/${path}` : `${API_BASE}/api/public/${path}`
  const res = await fetch(url, { signal, credentials: preview ? 'include' : 'same-origin', headers: { Accept: 'application/json' } })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.ok === false) { const e = new Error(data.message || 'Not found'); e.status = res.status; throw e }
  return data
}

export function useCmsList(collection, query = '') {
  const [state, setState] = useState({ items: null, loading: true, error: null })
  useEffect(() => {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 6000)
    fetchPublic(`${collection}${query ? `?${query}` : ''}`, { signal: ctrl.signal })
      .then((d) => setState({ items: d.items, loading: false, error: null }))
      .catch((error) => setState({ items: null, loading: false, error }))
      .finally(() => clearTimeout(timer))
    return () => { clearTimeout(timer); ctrl.abort() }
  }, [collection, query])
  return state
}

export const formatDate = (d) => {
  if (!d) return ''
  const x = new Date(String(d).replace(' ', 'T'))
  return isNaN(x) ? '' : x.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })
}

export const readingTime = (html) => Math.max(1, Math.round(String(html || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 200))

export const assetUrl = (u) => (u && u.startsWith('/') ? API_BASE + u : u)
