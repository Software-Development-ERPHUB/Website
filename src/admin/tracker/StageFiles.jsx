import { useRef, useState } from 'react'
import { FileText, Paperclip, Trash2, Upload } from 'lucide-react'
import { cms, cmsUpload, fmtSize } from '../api'
import { API_BASE } from '../../lib/api'
import { useAuth } from '../auth'
import { Spinner, useToast } from '../ui'

export const ACCEPT = '.pdf,.docx,.xlsx,.pptx,.jpg,.jpeg,.png,.webp,.zip'
export const fileUrl = (id) => `${API_BASE}/api/cms/tracker/files/${id}`

/** "3 hours ago" style text for activity and last-update times. */
export function timeAgo(d) {
  if (!d) return ''
  const t = new Date(String(d).replace(' ', 'T'))
  const s = (Date.now() - t) / 1000
  if (isNaN(s)) return ''
  if (s < 60) return 'just now'
  const units = [[60, 'minute'], [3600, 'hour'], [86400, 'day'], [604800, 'week'], [2629800, 'month']]
  let [div, name] = units[0]
  for (const u of units) if (s >= u[0]) [div, name] = u
  const n = Math.floor(s / div)
  return `${n} ${name}${n > 1 ? 's' : ''} ago`
}
export const daysSince = (d) => (d ? (Date.now() - new Date(String(d).replace(' ', 'T'))) / 86400000 : Infinity)

/**
 * Files attached to one stage of one application, with an upload button
 * when `canUpload`. `files` is the stage's list; `onChange` reloads it.
 */
export default function StageFiles({ appId, stage, files = [], canUpload, onChange }) {
  const { user } = useAuth()
  const toast = useToast()
  const input = useRef(null)
  const [pct, setPct] = useState(null)

  async function pick(e) {
    const f = e.target.files?.[0]
    e.target.value = ''
    if (!f) return
    const fd = new FormData()
    fd.append('file', f)
    setPct(0)
    try { await cmsUpload(`/cms/tracker/apps/${appId}/stages/${stage}/files`, fd, setPct); toast(`Uploaded ${f.name}`); onChange?.() }
    catch (err) { toast(err.message, 'error') } finally { setPct(null) }
  }
  async function remove(f) {
    try { await cms(`/cms/tracker/files/${f.id}`, { method: 'DELETE' }); toast('File deleted'); onChange?.() } catch (err) { toast(err.message, 'error') }
  }

  return (
    <div>
      {files.length > 0 && (
        <ul className="space-y-1">
          {files.map((f) => (
            <li key={f.id} className="flex items-center gap-2 text-sm">
              <FileText size={15} className="shrink-0 text-muted" aria-hidden="true" />
              <a href={fileUrl(f.id)} className="min-w-0 truncate font-medium text-brand hover:underline">{f.original_name}</a>
              <span className="shrink-0 text-xs text-muted">{fmtSize(f.size)} · {f.uploaded_name || '—'} · {timeAgo(f.created_at)}</span>
              {(user.role === 'admin' || f.uploaded_by === user.id) && (
                <button type="button" onClick={() => remove(f)} className="ml-auto shrink-0 rounded p-1 text-muted hover:bg-red-50 hover:text-red-700" aria-label={`Delete ${f.original_name}`}><Trash2 size={14} /></button>
              )}
            </li>
          ))}
        </ul>
      )}
      {canUpload && (
        <>
          <input ref={input} type="file" accept={ACCEPT} className="sr-only" onChange={pick} tabIndex={-1} aria-hidden="true" />
          <button type="button" onClick={() => input.current?.click()} disabled={pct !== null}
            className="mt-1.5 inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-brand hover:bg-brand-soft">
            {pct !== null ? <><Spinner />Uploading {pct}%</> : <><Upload size={15} />Upload file</>}
          </button>
        </>
      )}
      {!canUpload && !files.length && <p className="flex items-center gap-1.5 text-xs text-muted"><Paperclip size={13} />No files</p>}
    </div>
  )
}
