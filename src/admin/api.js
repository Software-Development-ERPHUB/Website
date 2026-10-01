import { API_BASE, ApiError } from '../lib/api'

/**
 * Dashboard API client. Sends the session cookie and the X-Requested-With
 * header the server requires on every write (CSRF protection).
 */
export async function cms(path, { method = 'GET', body, form, signal } = {}) {
  const headers = { Accept: 'application/json', 'X-Requested-With': 'cms' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  const res = await fetch(API_BASE + '/api' + path, {
    method, headers, credentials: 'include', signal,
    body: form || (body !== undefined ? JSON.stringify(body) : undefined),
  })
  let data = {}
  try { data = await res.json() } catch { /* empty */ }
  if (!res.ok || data.ok === false) throw new ApiError(data.message || `Request failed (${res.status})`, res.status, data.errors)
  return data
}

/** Upload with progress (XHR) — used by the media library. */
export function cmsUpload(path, formData, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', API_BASE + '/api' + path)
    xhr.withCredentials = true
    xhr.setRequestHeader('X-Requested-With', 'cms')
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.upload.onprogress = (e) => { if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100)) }
    xhr.onload = () => {
      let d = {}
      try { d = JSON.parse(xhr.responseText) } catch { /* */ }
      if (xhr.status >= 200 && xhr.status < 300 && d.ok !== false) resolve(d)
      else reject(new ApiError(d.message || d.errors?.file || `Upload failed (${xhr.status})`, xhr.status, d.errors))
    }
    xhr.onerror = () => reject(new ApiError('Network error', 0))
    xhr.send(formData)
  })
}

export const mediaUrl = (url) => (url && url.startsWith('/') ? API_BASE + url : url)

export const fmtDate = (d) => {
  if (!d) return '—'
  const x = new Date(String(d).replace(' ', 'T'))
  return isNaN(x) ? d : x.toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
export const fmtSize = (b) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`)
