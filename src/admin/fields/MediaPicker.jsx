import { useCallback, useEffect, useRef, useState } from 'react'
import { Search, UploadCloud, Check, FileText } from 'lucide-react'
import { Modal, Spinner } from '../ui'
import { cms, cmsUpload, mediaUrl } from '../api'

/** Choose an existing file or upload a new one. */
export default function MediaPicker({ onClose, onSelect, imagesOnly = false }) {
  const [rows, setRows] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState('')
  const [picked, setPicked] = useState(null)
  const fileRef = useRef(null)

  const load = useCallback(() => {
    setLoading(true)
    cms(`/cms/media?limit=60${imagesOnly ? '&type=image' : ''}${q ? `&q=${encodeURIComponent(q)}` : ''}`)
      .then((d) => setRows(d.rows)).catch((e) => setError(e.message)).finally(() => setLoading(false))
  }, [q, imagesOnly])
  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t) }, [load])

  async function upload(file) {
    if (!file) return
    setError(''); setProgress(0)
    const fd = new FormData(); fd.append('file', file)
    try {
      const d = await cmsUpload('/cms/media', fd, setProgress)
      setRows((r) => [d.media, ...r]); setPicked(d.media)
    } catch (e) { setError(e.message) } finally { setProgress(null) }
  }

  return (
    <Modal title="Media library" onClose={onClose} wide
      footer={<>
        <button type="button" className="btn-secondary !min-h-[40px]" onClick={onClose}>Cancel</button>
        <button type="button" className="btn-primary !min-h-[40px]" disabled={!picked} onClick={() => onSelect(picked)}>Use selected</button>
      </>}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center gap-2 rounded-lg border border-line px-3">
          <Search size={16} className="text-muted" aria-hidden="true" /><span className="sr-only">Search media</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search files…" className="h-10 w-full bg-transparent text-sm outline-none" />
        </label>
        <button type="button" className="btn-primary !min-h-[42px]" onClick={() => fileRef.current?.click()} disabled={progress !== null}>
          {progress !== null ? <><Spinner />Uploading {progress}%</> : <><UploadCloud size={17} />Upload</>}
        </button>
        <input ref={fileRef} type="file" className="sr-only" accept={imagesOnly ? 'image/jpeg,image/png,image/webp,image/gif' : 'image/jpeg,image/png,image/webp,image/gif,application/pdf'}
          onChange={(e) => { upload(e.target.files?.[0]); e.target.value = '' }} />
      </div>
      {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-800" role="alert">{error}</p>}

      <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); upload(e.dataTransfer.files?.[0]) }}
        className="mt-4 grid min-h-[200px] grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {loading ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-square animate-pulse rounded-lg bg-paper" />)
          : rows.length ? rows.map((m) => {
            const on = picked?.id === m.id
            return (
              <button key={m.id} type="button" onClick={() => setPicked(m)} onDoubleClick={() => onSelect(m)} aria-pressed={on} title={m.name}
                className={`group relative aspect-square overflow-hidden rounded-lg border-2 bg-paper transition-all ${on ? 'border-brand ring-4 ring-brand/15' : 'border-transparent hover:border-line'}`}>
                {m.mime.startsWith('image/')
                  ? <img src={mediaUrl(m.url)} alt={m.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  : <span className="flex h-full flex-col items-center justify-center gap-2 p-2 text-xs text-muted"><FileText size={28} />{m.name}</span>}
                {on && <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white"><Check size={14} /></span>}
              </button>
            )
          }) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-line py-12 text-center text-sm text-muted">
              <UploadCloud size={30} className="text-brand" />
              <p className="mt-2 font-semibold text-ink">No files yet</p>
              <p>Drop a file here or press Upload. JPG, PNG, WEBP, GIF{imagesOnly ? '' : ' or PDF'} · max 8 MB</p>
            </div>
          )}
      </div>
    </Modal>
  )
}
