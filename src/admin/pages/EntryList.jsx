import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Plus, Search, ArrowUp, ArrowDown, FileText } from 'lucide-react'
import { cms, fmtDate } from '../api'
import { PageTitle, StatusBadge, Empty, Pager, Spinner, useToast } from '../ui'

const FILTERS = [['', 'All'], ['published', 'Published'], ['draft', 'Drafts'], ['changes', 'Unpublished changes'], ['archived', 'Archived']]

export default function EntryList({ cols }) {
  const { collection } = useParams()
  const def = cols?.find((c) => c.id === collection)
  const toast = useToast()
  const [status, setStatus] = useState('')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)

  const load = useCallback(() => {
    const p = new URLSearchParams({ page, limit: 20, ...(status && { status }), ...(q && { q }) })
    cms(`/cms/entries/${collection}?${p}`).then(setData).catch((e) => toast(e.message, 'error'))
  }, [collection, status, q, page, toast])
  useEffect(() => { setData(null); const t = setTimeout(load, q ? 250 : 0); return () => clearTimeout(t) }, [load, q])
  useEffect(() => { setPage(1); setStatus(''); setQ('') }, [collection])

  const listCols = def?.fields.filter((f) => f.list) || []
  const ordered = def?.sort === 'order' && !status && !q

  async function move(i, dir) {
    const rows = [...data.rows]
    const j = i + dir
    if (j < 0 || j >= rows.length) return
    ;[rows[i], rows[j]] = [rows[j], rows[i]]
    setData({ ...data, rows })
    try { await cms(`/cms/entries/${collection}/reorder`, { method: 'PUT', body: { ids: rows.map((r) => r.id) } }); toast('Order saved — it applies to published entries straight away.') }
    catch (e) { toast(e.message, 'error'); load() }
  }

  if (!def) return <p className="flex items-center gap-2 text-muted"><Spinner />Loading…</p>

  return (
    <>
      <PageTitle title={def.label} desc={`Create and manage ${def.label.toLowerCase()} shown on the website.`}
        actions={<Link to={`/admin/content/${collection}/new`} className="btn-primary !min-h-[42px]"><Plus size={18} />New {def.singular.toLowerCase()}</Link>} />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter by status">
          {FILTERS.map(([v, l]) => (
            <button key={v} type="button" role="tab" aria-selected={status === v} onClick={() => { setStatus(v); setPage(1) }}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${status === v ? 'bg-ink text-white' : 'bg-white text-ink ring-1 ring-line hover:ring-ink/30'}`}>{l}</button>
          ))}
        </div>
        <label className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 lg:w-72">
          <Search size={16} className="text-muted" /><span className="sr-only">Search</span>
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1) }} placeholder="Search title or slug…" className="h-10 w-full bg-transparent text-sm outline-none" />
        </label>
      </div>

      {!data ? <p className="flex items-center gap-2 py-10 text-muted"><Spinner />Loading…</p>
        : data.rows.length === 0 ? (
          <Empty icon={FileText} title={q || status ? 'Nothing matches' : `No ${def.label.toLowerCase()} yet`}>
            {q || status ? 'Try another filter or search.' : <Link to={`/admin/content/${collection}/new`} className="link">Create the first one</Link>}
          </Empty>
        ) : (
          <div className="overflow-hidden rounded-xl border border-line bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-line bg-paper text-xs uppercase tracking-wider text-muted">
                  <tr>
                    {ordered && <th className="w-20 px-4 py-3 font-semibold">Order</th>}
                    <th className="px-4 py-3 font-semibold">Title</th>
                    {listCols.map((f) => <th key={f.name} className="px-4 py-3 font-semibold">{f.label}</th>)}
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Last edited</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {data.rows.map((r, i) => (
                    <tr key={r.id} className="transition-colors hover:bg-paper/60">
                      {ordered && (
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="rounded p-1 text-muted hover:bg-white hover:text-ink disabled:opacity-25" aria-label={`Move ${r.title} up`}><ArrowUp size={15} /></button>
                            <button type="button" onClick={() => move(i, 1)} disabled={i === data.rows.length - 1} className="rounded p-1 text-muted hover:bg-white hover:text-ink disabled:opacity-25" aria-label={`Move ${r.title} down`}><ArrowDown size={15} /></button>
                          </div>
                        </td>
                      )}
                      <td className="px-4 py-3">
                        <Link to={`/admin/content/${collection}/${r.id}`} className="font-semibold text-ink hover:text-brand hover:underline">{r.title}</Link>
                        <p className="text-xs text-muted">/{r.slug}</p>
                      </td>
                      {listCols.map((f) => <td key={f.name} className="px-4 py-3 text-muted">{String(r.draft?.[f.name] || '—')}</td>)}
                      <td className="px-4 py-3"><StatusBadge status={r.status} hasChanges={r.hasChanges} /></td>
                      <td className="px-4 py-3 text-muted">{fmtDate(r.updatedAt)}{r.updatedByName && <span className="block text-xs">{r.updatedByName}</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      {data && <Pager page={data.page} limit={data.limit} total={data.total} onPage={setPage} />}
    </>
  )
}
