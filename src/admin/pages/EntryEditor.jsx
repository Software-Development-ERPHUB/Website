import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Send, EyeOff, Undo2, Archive, Trash2, Eye, History, ImagePlus, X, CircleAlert, RotateCcw } from 'lucide-react'
import { cms, fmtDate, mediaUrl } from '../api'
import { useAuth } from '../auth'
import { StatusBadge, Spinner, useToast, useConfirm } from '../ui'
import RichTextEditor from '../fields/RichTextEditor'
import MediaPicker from '../fields/MediaPicker'
import TagsInput from '../fields/TagsInput'

const slugify = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 150)

function emptyData(def) {
  return Object.fromEntries(def.fields.map((f) => [f.name, f.type === 'tags' ? [] : f.type === 'image' ? null : f.type === 'boolean' ? false : f.default || '']))
}

function ImageField({ id, value, onChange }) {
  const [open, setOpen] = useState(false)
  return (
    <div id={id}>
      {value?.url ? (
        <div className="group relative overflow-hidden rounded-xl border border-line">
          <img src={mediaUrl(value.url)} alt={value.alt || ''} className="aspect-[16/9] w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 flex gap-2 bg-gradient-to-t from-black/60 to-transparent p-3">
            <button type="button" className="btn-secondary !min-h-[36px] !bg-white !px-3" onClick={() => setOpen(true)}>Replace</button>
            <button type="button" className="btn-secondary !min-h-[36px] !bg-white !px-3" onClick={() => onChange(null)}><X size={15} />Remove</button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-paper text-muted transition-colors hover:border-brand hover:text-brand">
          <ImagePlus size={28} /><span className="text-sm font-semibold">Choose or upload an image</span>
        </button>
      )}
      {value?.url && (
        <input className="field mt-2" placeholder="Alt text — describe the image for screen readers" value={value.alt || ''} onChange={(e) => onChange({ ...value, alt: e.target.value })} aria-label="Image alt text" />
      )}
      {open && <MediaPicker imagesOnly onClose={() => setOpen(false)} onSelect={(m) => { setOpen(false); onChange({ id: m.id, url: m.url, alt: m.alt }) }} />}
    </div>
  )
}

function Field({ f, value, onChange, error, slugTouched, onSlugTouch }) {
  const id = `fld-${f.name}`
  const common = { id, 'aria-invalid': error ? 'true' : undefined, 'aria-describedby': error ? `${id}-err` : f.help ? `${id}-help` : undefined }
  let input
  switch (f.type) {
    case 'richtext': input = <RichTextEditor id={id} value={value} onChange={onChange} invalid={!!error} />; break
    case 'textarea': input = <textarea {...common} className="field min-h-[110px] resize-y" rows={4} maxLength={f.max} value={value || ''} onChange={(e) => onChange(e.target.value)} />; break
    case 'select': input = (
      <select {...common} className="field" value={value || ''} onChange={(e) => onChange(e.target.value)}>
        <option value="">Choose…</option>{f.options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>); break
    case 'tags': input = <TagsInput id={id} value={value || []} onChange={onChange} />; break
    case 'image': input = <ImageField id={id} value={value} onChange={onChange} />; break
    case 'number': input = <input {...common} type="number" className="field" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />; break
    case 'date': input = <input {...common} type="date" className="field" value={value || ''} onChange={(e) => onChange(e.target.value)} />; break
    case 'boolean': input = <label className="flex items-center gap-2"><input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 accent-[rgb(var(--c-primary))]" />{f.label}</label>; break
    case 'slug': input = (
      <div className="flex items-stretch overflow-hidden rounded-lg border border-line focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
        <span className="flex items-center bg-paper px-3 text-sm text-muted">/</span>
        <input {...common} className="w-full px-3 text-[0.95rem] outline-none" style={{ minHeight: 46 }} value={value || ''}
          onChange={(e) => { onSlugTouch(); onChange(slugify(e.target.value)) }} />
        {slugTouched && <span className="flex items-center px-3 text-xs text-muted">custom</span>}
      </div>); break
    default: input = <input {...common} type="text" className="field" maxLength={f.max} value={value || ''} onChange={(e) => onChange(e.target.value)} />
  }
  const len = typeof value === 'string' && f.max && ['text', 'textarea'].includes(f.type) ? value.length : null
  return (
    <div>
      {f.type !== 'boolean' && (
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <label htmlFor={id} className="text-sm font-semibold text-ink">{f.label}{f.required && <span className="text-brand"> *</span>}</label>
          {len !== null && <span className={`text-xs ${len > f.max * 0.9 ? 'text-amber-700' : 'text-muted'}`}>{len}/{f.max}</span>}
        </div>
      )}
      {input}
      {f.help && !error && <p id={`${id}-help`} className="mt-1.5 text-xs text-muted">{f.help}</p>}
      {error && <p id={`${id}-err`} className="field-error">{error}</p>}
    </div>
  )
}

export default function EntryEditor({ cols }) {
  const { collection, id } = useParams()
  const isNew = !id
  const def = cols?.find((c) => c.id === collection)
  const nav = useNavigate()
  const toast = useToast()
  const { user } = useAuth()
  const [confirm, confirmEl] = useConfirm()
  const [entry, setEntry] = useState(null)
  const [data, setData] = useState(null)
  const [saved, setSaved] = useState('')
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [revs, setRevs] = useState(null)
  const errRef = useRef(null)

  useEffect(() => {
    if (!def) return
    setErrors({}); setRevs(null)
    if (isNew) { const d = emptyData(def); setData(d); setSaved(JSON.stringify(d)); setEntry(null); setSlugTouched(false); return }
    cms(`/cms/entries/${collection}/${id}`).then((r) => {
      const d = { ...emptyData(def), ...r.entry.draft }
      setEntry(r.entry); setData(d); setSaved(JSON.stringify(d)); setSlugTouched(true)
    }).catch((e) => { toast(e.message, 'error'); nav(`/admin/content/${collection}`) })
  }, [def, collection, id, isNew]) // eslint-disable-line react-hooks/exhaustive-deps

  const dirty = data && JSON.stringify(data) !== saved

  // warn before leaving with unsaved work
  useEffect(() => {
    const fn = (e) => { if (dirty) { e.preventDefault(); e.returnValue = '' } }
    window.addEventListener('beforeunload', fn)
    return () => window.removeEventListener('beforeunload', fn)
  }, [dirty])

  const set = (name) => (v) => setData((d) => {
    const next = { ...d, [name]: v }
    const slugF = def.fields.find((f) => f.type === 'slug')
    if (slugF && name === slugF.from && !slugTouched && entry?.status !== 'published') next[slugF.name] = slugify(v)
    return next
  })

  const showErrors = (e) => {
    setErrors(e.errors || {})
    toast(e.message || 'Please check the highlighted fields.', 'error')
    requestAnimationFrame(() => errRef.current?.focus())
  }

  const save = useCallback(async () => {
    if (!data) return null
    setBusy('save'); setErrors({})
    try {
      const r = isNew
        ? await cms(`/cms/entries/${collection}`, { method: 'POST', body: { data } })
        : await cms(`/cms/entries/${collection}/${id}`, { method: 'PUT', body: { data } })
      const d = { ...emptyData(def), ...r.entry.draft }
      setEntry(r.entry); setData(d); setSaved(JSON.stringify(d))
      if (isNew) nav(`/admin/content/${collection}/${r.entry.id}`, { replace: true })
      return r.entry
    } catch (e) { showErrors(e); return null } finally { setBusy('') }
  }, [data, isNew, collection, id, def]) // eslint-disable-line react-hooks/exhaustive-deps

  // Ctrl/⌘ + S saves the draft
  useEffect(() => {
    const fn = (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); save().then((x) => x && toast('Draft saved')) } }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [save, toast])

  async function action(name, opts = {}) {
    if (opts.confirm && !(await confirm(opts.confirm))) return
    let target = entry
    if (dirty || isNew) { target = await save(); if (!target) return }
    setBusy(name)
    try {
      const r = await cms(`/cms/entries/${collection}/${target.id}/${name}`, { method: 'POST' })
      const d = { ...emptyData(def), ...r.entry.draft }
      setEntry(r.entry); setData(d); setSaved(JSON.stringify(d)); setErrors({}); setRevs(null)
      toast(opts.done)
    } catch (e) { showErrors(e) } finally { setBusy('') }
  }

  async function remove() {
    if (!(await confirm({ title: 'Delete permanently?', message: `“${entry.title}” and its history will be deleted. This cannot be undone.`, confirm: 'Delete', danger: true }))) return
    try { await cms(`/cms/entries/${collection}/${entry.id}`, { method: 'DELETE' }); toast('Deleted'); nav(`/admin/content/${collection}`) }
    catch (e) { toast(e.message, 'error') }
  }

  async function loadRevs() {
    try { const r = await cms(`/cms/entries/${collection}/${entry.id}/revisions`); setRevs(r.rows) } catch (e) { toast(e.message, 'error') }
  }
  async function restore(rev) {
    if (!(await confirm({ title: 'Restore this version?', message: 'It will replace your current draft. The live website does not change until you publish.', confirm: 'Restore to draft' }))) return
    try {
      const r = await cms(`/cms/entries/${collection}/${entry.id}/restore/${rev.id}`, { method: 'POST' })
      const d = { ...emptyData(def), ...r.entry.draft }
      setEntry(r.entry); setData(d); setSaved(JSON.stringify(d)); toast('Version restored to draft')
    } catch (e) { toast(e.message, 'error') }
  }

  const groups = useMemo(() => {
    if (!def) return []
    const main = def.fields.filter((f) => !f.group)
    const g = {}
    def.fields.filter((f) => f.group).forEach((f) => { (g[f.group] ||= []).push(f) })
    return [['', main], ...Object.entries(g)]
  }, [def])

  if (!def || !data) return <p className="flex items-center gap-2 text-muted"><Spinner />Loading…</p>

  const published = entry?.status === 'published'
  const previewPath = def.publicPath?.includes(':slug') ? def.publicPath.replace(':slug', data.slug || entry?.slug || '') : def.publicPath
  const errCount = Object.keys(errors).length

  return (
    <>
      {confirmEl}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link to={`/admin/content/${collection}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink"><ArrowLeft size={16} />{def.label}</Link>
        <span className="text-sm text-muted" aria-live="polite">{busy === 'save' ? 'Saving…' : dirty ? <span className="text-amber-700">● Unsaved changes</span> : entry ? `Draft saved ${fmtDate(entry.updatedAt)}` : ''}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-6">
          <h1 className="font-display text-2xl font-semibold">{isNew ? `New ${def.singular.toLowerCase()}` : data[def.titleField] || entry?.title}</h1>
          {errCount > 0 && (
            <div ref={errRef} tabIndex={-1} role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <p className="flex items-center gap-2 font-semibold"><CircleAlert size={17} />Fix {errCount === 1 ? 'this field' : `these ${errCount} fields`}:</p>
              <ul className="mt-1 list-disc pl-6">{Object.entries(errors).map(([k, m]) => <li key={k}><a href={`#fld-${k}`} className="underline">{m}</a></li>)}</ul>
            </div>
          )}
          {groups.map(([g, fields]) => (
            <section key={g || 'main'} className="space-y-5 rounded-xl border border-line bg-white p-5 sm:p-6">
              {g && <h2 className="font-display text-lg font-semibold">{g}</h2>}
              {fields.map((f) => (
                <Field key={f.name} f={f} value={data[f.name]} onChange={set(f.name)} error={errors[f.name]}
                  slugTouched={slugTouched} onSlugTouch={() => setSlugTouched(true)} />
              ))}
            </section>
          ))}
        </div>

        {/* Publish panel */}
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <section className="rounded-xl border border-line bg-white p-5">
            <h2 className="font-display text-base font-semibold">Publishing</h2>
            <div className="mt-3">{entry ? <StatusBadge status={entry.status} hasChanges={entry.hasChanges} /> : <StatusBadge status="draft" />}</div>
            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between gap-3"><dt className="text-muted">First published</dt><dd>{fmtDate(entry?.publishedAt)}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-muted">Last edited</dt><dd className="text-right">{fmtDate(entry?.updatedAt)}{entry?.updatedByName && <span className="block text-xs text-muted">{entry.updatedByName}</span>}</dd></div>
            </dl>
            <p className="mt-4 rounded-lg bg-paper p-3 text-xs text-muted">
              {published ? (entry.hasChanges || dirty ? 'The website still shows the last published version. Publish to make your changes live.' : 'The website shows this version.') : 'Drafts are private. Nothing appears on the website until you publish.'}
            </p>

            <div className="mt-4 grid gap-2">
              <button type="button" className="btn-secondary w-full" onClick={() => save().then((x) => x && toast('Draft saved'))} disabled={!!busy || (!dirty && !isNew)}>
                {busy === 'save' ? <Spinner /> : <Save size={17} />}Save draft<kbd className="kbd ml-auto hidden sm:inline-flex">Ctrl S</kbd>
              </button>
              <button type="button" className="btn-primary w-full" disabled={!!busy || (published && !entry.hasChanges && !dirty)}
                onClick={() => action('publish', { done: published ? 'Changes are live on the website' : 'Published — now live on the website' })}>
                {busy === 'publish' ? <Spinner /> : <Send size={17} />}{published ? 'Publish changes' : 'Publish'}
              </button>
              {previewPath && entry && (
                <a href={`${previewPath}${previewPath.includes('?') ? '&' : '?'}preview=1`} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">
                  <Eye size={17} />{def.publicPath.includes(':slug') ? 'Preview draft' : 'View on website'}
                </a>
              )}
            </div>

            {entry && (
              <div className="mt-4 grid gap-1 border-t border-line pt-4 text-sm">
                {published && entry.hasChanges && (
                  <button type="button" className="flex min-h-[40px] items-center gap-2 rounded-lg px-2 text-left hover:bg-paper" disabled={!!busy}
                    onClick={() => action('discard', { done: 'Draft reset to the live version', confirm: { title: 'Discard unpublished changes?', message: 'The draft goes back to what the website shows now.', confirm: 'Discard changes', danger: true } })}>
                    <Undo2 size={16} />Discard unpublished changes
                  </button>
                )}
                {published && (
                  <button type="button" className="flex min-h-[40px] items-center gap-2 rounded-lg px-2 text-left hover:bg-paper" disabled={!!busy}
                    onClick={() => action('unpublish', { done: 'Unpublished — removed from the website', confirm: { title: 'Unpublish?', message: 'It will be removed from the website and kept as a draft.', confirm: 'Unpublish' } })}>
                    <EyeOff size={16} />Unpublish
                  </button>
                )}
                {entry.status !== 'archived' && (
                  <button type="button" className="flex min-h-[40px] items-center gap-2 rounded-lg px-2 text-left hover:bg-paper" disabled={!!busy}
                    onClick={() => action('archive', { done: 'Archived', confirm: { title: 'Archive?', message: 'Archived entries are hidden from the website and the default list.', confirm: 'Archive' } })}>
                    <Archive size={16} />Archive
                  </button>
                )}
                {user.role === 'admin' && (
                  <button type="button" onClick={remove} className="flex min-h-[40px] items-center gap-2 rounded-lg px-2 text-left text-red-700 hover:bg-red-50"><Trash2 size={16} />Delete permanently</button>
                )}
              </div>
            )}
          </section>

          {entry && (
            <section className="rounded-xl border border-line bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-display text-base font-semibold"><History size={17} />Published versions</h2>
                {!revs && <button type="button" className="text-sm font-semibold text-brand hover:underline" onClick={loadRevs}>Show</button>}
              </div>
              {revs && (revs.length ? (
                <ul className="mt-3 space-y-1">
                  {revs.map((r, i) => (
                    <li key={r.id} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-paper">
                      <span>{fmtDate(r.created_at)}<span className="block text-xs text-muted">{r.user_name || '—'}{i === 0 && published ? ' · live' : ''}</span></span>
                      <button type="button" onClick={() => restore(r)} className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"><RotateCcw size={13} />Restore</button>
                    </li>
                  ))}
                </ul>
              ) : <p className="mt-3 text-sm text-muted">Not published yet.</p>)}
            </section>
          )}
        </aside>
      </div>
    </>
  )
}
