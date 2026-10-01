import { useCallback, useEffect, useRef, useState } from 'react'
import { UploadCloud, Search, Copy, Trash2, FileText, Image as ImageIcon } from 'lucide-react'
import { cms, cmsUpload, mediaUrl, fmtDate, fmtSize } from '../api'
import { PageTitle, Empty, Pager, Spinner, useToast, useConfirm } from '../ui'

export default function MediaLibrary() {
  const toast = useToast()
  const [confirm, confirmEl] = useConfirm()
  const [data, setData] = useState(null)
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [sel, setSel] = useState(null)
  const [uploads, setUploads] = useState([])
  const [drag, setDrag] = useState(false)
  const fileRef = useRef(null)

  const load = useCallback(() => {
    cms(`/cms/media?limit=36&page=${page}${q ? `&q=${encodeURIComponent(q)}` : ''}`).then(setData).catch((e) => toast(e.message, 'error'))
  }, [page, q, toast])
  useEffect(() => { const t = setTimeout(load, 200); return () => clearTimeout(t) }, [load])

  async function uploadFiles(files) {
    for (const file of [...files].slice(0, 10)) {
      const key = Math.random().toString(36).slice(2)
      setUploads((u) => [...u, { key, name: file.name, p: 0 }])
      const fd = new FormData(); fd.append('file', file)
      try {
        await cmsUpload('/cms/media', fd, (p) => setUploads((u) => u.map((x) => (x.key === key ? { ...x, p } : x))))
        toast(`Uploaded ${file.name}`)
      } catch (e) { toast(`${file.name}: ${e.message}`, 'error') }
      setUploads((u) => u.filter((x) => x.key !== key))
    }
    setPage(1); load()
  }

  async function saveAlt() {
    try { await cms(`/cms/media/${sel.id}`, { method: 'PATCH', body: { alt: sel.alt } }); toast('Alt text saved'); load() } catch (e) { toast(e.message, 'error') }
  }
  async function remove() {
    if (!(await confirm({ title: 'Delete file?', message: 'Pages that use this file will show a broken image. This cannot be undone.', confirm: 'Delete', danger: true }))) return
    try { await cms(`/cms/media/${sel.id}`, { method: 'DELETE' }); toast('File deleted'); setSel(null); load() } catch (e) { toast(e.message, 'error') }
  }

  return (
    <>
      {confirmEl}
      <PageTitle title="Media library" desc="Images and PDFs used in your content. JPG, PNG, WEBP, GIF or PDF · up to 8 MB each."
        actions={<>
          <button type="button" className="btn-primary !min-h-[42px]" onClick={() => fileRef.current?.click()}><UploadCloud size={18} />Upload files</button>
          <input ref={fileRef} type="file" multiple className="sr-only" accept="image/jpeg,image/png,image/webp,image/gif,application/pdf" onChange={(e) => { uploadFiles(e.target.files); e.target.value = '' }} />
        </>} />

      <label className="mb-4 flex items-center gap-2 rounded-lg border border-line bg-white px-3 sm:w-80">
        <Search size={16} className="text-muted" /><span className="sr-only">Search</span>
        <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1) }} placeholder="Search by name or alt text…" className="h-10 w-full bg-transparent text-sm outline-none" />
      </label>

      {uploads.map((u) => (
        <div key={u.key} className="mb-2 rounded-lg border border-line bg-white p-3 text-sm">
          <div className="flex justify-between"><span className="truncate">{u.name}</span><span>{u.p}%</span></div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper"><div className="h-full bg-brand transition-[width]" style={{ width: `${u.p}%` }} /></div>
        </div>
      ))}

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div onDragOver={(e) => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); uploadFiles(e.dataTransfer.files) }}
          className={`rounded-xl transition-all ${drag ? 'bg-brand-soft ring-2 ring-brand' : ''}`}>
          {!data ? <p className="flex items-center gap-2 py-10 text-muted"><Spinner />Loading…</p>
            : data.rows.length === 0 ? <Empty icon={ImageIcon} title="No files yet">Drag files here or press <strong>Upload files</strong>.</Empty>
              : (
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                  {data.rows.map((m) => (
                    <li key={m.id}>
                      <button type="button" onClick={() => setSel({ ...m })} aria-pressed={sel?.id === m.id}
                        className={`group block w-full overflow-hidden rounded-xl border-2 bg-white text-left transition-all ${sel?.id === m.id ? 'border-brand ring-4 ring-brand/15' : 'border-line hover:-translate-y-0.5 hover:shadow-lift'}`}>
                        <span className="block aspect-square overflow-hidden bg-paper">
                          {m.mime.startsWith('image/')
                            ? <img src={mediaUrl(m.url)} alt={m.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            : <span className="flex h-full items-center justify-center text-muted"><FileText size={36} /></span>}
                        </span>
                        <span className="block truncate px-3 py-2 text-xs font-medium">{m.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
          {data && <Pager page={data.page} limit={data.limit} total={data.total} onPage={setPage} />}
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          {sel ? (
            <div className="slide-in rounded-xl border border-line bg-white p-5">
              {sel.mime.startsWith('image/') && <img src={mediaUrl(sel.url)} alt={sel.alt} className="mb-4 w-full rounded-lg border border-line" />}
              <p className="break-all font-semibold">{sel.name}</p>
              <p className="mt-1 text-xs text-muted">{fmtSize(sel.size)} · {sel.mime} · {fmtDate(sel.createdAt)}</p>
              <label htmlFor="m-alt" className="field-label mt-4">Alt text</label>
              <textarea id="m-alt" className="field min-h-[80px]" value={sel.alt} onChange={(e) => setSel({ ...sel, alt: e.target.value })} placeholder="Describe the image for people who can't see it" />
              <div className="mt-3 grid gap-2">
                <button type="button" className="btn-secondary !min-h-[40px]" onClick={saveAlt}>Save alt text</button>
                <button type="button" className="btn-secondary !min-h-[40px]" onClick={() => { navigator.clipboard?.writeText(new URL(mediaUrl(sel.url), window.location.origin).href); toast('Link copied') }}><Copy size={16} />Copy link</button>
                <button type="button" className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-lg text-sm font-semibold text-red-700 hover:bg-red-50" onClick={remove}><Trash2 size={16} />Delete file</button>
              </div>
            </div>
          ) : <p className="rounded-xl border border-dashed border-line p-5 text-sm text-muted">Select a file to see its details, edit alt text or copy its link.</p>}
        </aside>
      </div>
    </>
  )
}
