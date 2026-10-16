import { useCallback, useEffect, useState } from 'react'
import { History, Paperclip } from 'lucide-react'
import { cms } from '../api'
import StageFiles, { timeAgo } from './StageFiles'

/** Below an application in the editor: files per stage and the full change history. */
export default function AppHistory({ appId, stages, version }) {
  const [files, setFiles] = useState([])
  const [log, setLog] = useState(null)
  const load = useCallback(() => {
    cms(`/cms/tracker/files?app=${appId}`).then((d) => setFiles(d.rows)).catch(() => {})
    cms(`/cms/tracker/activity?app=${appId}&limit=100`).then((d) => setLog(d.rows)).catch(() => setLog([]))
  }, [appId])
  useEffect(() => { load() }, [load, version])

  return (
    <>
      <section className="rounded-xl border border-line bg-white p-5 sm:p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold"><Paperclip size={18} />Stage files</h2>
        <ul className="mt-4 divide-y divide-line">
          {stages.map((s) => (
            <li key={s.id} className="grid gap-1 py-3 sm:grid-cols-[170px_1fr]">
              <span className="text-sm font-medium">{s.label}</span>
              <StageFiles appId={appId} stage={s.id} files={files.filter((f) => f.stage === s.id)} canUpload onChange={load} />
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-xl border border-line bg-white p-5 sm:p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold"><History size={18} />History</h2>
        {!log ? null : log.length ? (
          <ol className="mt-4 space-y-3 border-l-2 border-line pl-4 text-sm">
            {log.map((r) => (
              <li key={r.id}><p>{r.message}</p><p className="text-xs text-muted">{r.user_name || 'Someone'} · {timeAgo(r.created_at)}</p></li>
            ))}
          </ol>
        ) : <p className="mt-3 text-sm text-muted">No changes recorded yet.</p>}
      </section>
    </>
  )
}
