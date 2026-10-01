/**
 * Tiny API client for the Express + MySQL backend in /server.
 *
 * VITE_API_URL — base URL of the API, e.g. https://api.yourdomain.com
 *   Leave empty when the API is served from the same domain under /api
 *   (and in development, where vite.config.js proxies /api to the server).
 */
export const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message)
    this.status = status
    this.errors = errors || {}
  }
}

async function handle(res) {
  let data = {}
  try { data = await res.json() } catch { /* non-JSON response */ }
  if (!res.ok || data.ok === false) throw new ApiError(data.message || `Request failed (${res.status})`, res.status, data.errors)
  return data
}

export function postJSON(path, body) {
  return fetch(API_BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  }).then(handle)
}

/** multipart/form-data upload with progress (fetch cannot report upload progress). */
export function postForm(path, formData, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', API_BASE + path)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.upload.onprogress = (e) => { if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100)) }
    xhr.onload = () => {
      let data = {}
      try { data = JSON.parse(xhr.responseText) } catch { /* ignore */ }
      if (xhr.status >= 200 && xhr.status < 300 && data.ok !== false) resolve(data)
      else reject(new ApiError(data.message || `Request failed (${xhr.status})`, xhr.status, data.errors))
    }
    xhr.onerror = () => reject(new ApiError('Network error — check your connection and try again.', 0))
    xhr.send(formData)
  })
}
