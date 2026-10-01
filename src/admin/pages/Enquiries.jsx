import { useCallback, useEffect, useState } from 'react'
import { Inbox, Mail, Phone } from 'lucide-react'
import { cms, fmtDate } from '../api'
import { PageTitle, Empty, Pager, Spinner, Modal, useToast } from '../ui'

const STATUSES = ['new', 'in_progress', 'replied', 'closed', 'spam']
const label = (s) => s.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase())

export default function Enquiries() {
  const toast = useToast()
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)
  const [open, setOpen] = useState(null)

  const load = useCallback(() => {
    cms(`/admin/contacts?page=${page}&limit=20${status ? `&status=${status}` : ''}`).then(setData).catch((e) => toast(e.message, 'error'))
  }, [page, status, toast])
  useEffect(() => { load() }, [load])

  async function setRowStatus(row, s) {
    try { await cms(`/admin/contacts/${row.id}`, { method: 'PATCH', body: { status: s } }); toast('Status updated'); load(); if (open) setOpen({ ...open, status: s }) }
    catch (e) { toast(e.message, 'error') }
  }

  return (
    <>
      <PageTitle title="Enquiries" desc="Messages sent through the Contact Us form." />
      <div className="mb-4 flex flex-wrap gap-1.5">
        {['', ...STATUSES].map((s) => (
          <button key={s} type="button" onClick={() => { setStatus(s); setPage(1) }} aria-pressed={status === s}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${status === s ? 'bg-ink text-white' : 'bg-white ring-1 ring-line hover:ring-ink/30'}`}>{s ? label(s) : 'All'}</button>
        ))}
      </div>
      {!data ? <p className="flex items-center gap-2 text-muted"><Spinner />Loading…</p> : !data.rows.length ? <Empty icon={Inbox} title="No enquiries here" /> : (
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <ul className="divide-y divide-line">
            {data.rows.map((r) => (
              <li key={r.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <button type="button" onClick={() => setOpen(r)} className="min-w-0 flex-1 text-left">
                  <span className="flex items-center gap-2">
                    {r.status === 'new' && <span className="h-2 w-2 rounded-full bg-brand" aria-label="New" />}
                    <span className="font-semibold hover:text-brand hover:underline">{r.name}</span>
                    {r.company && <span className="text-sm text-muted">· {r.company}</span>}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">{r.service} · {fmtDate(r.created_at)}</span>
                  <span className="mt-1 line-clamp-1 block text-sm">{r.message}</span>
                </button>
                <select value={r.status} onChange={(e) => setRowStatus(r, e.target.value)} className="field !min-h-[40px] sm:!w-40" aria-label={`Status for ${r.name}`}>
                  {STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}
                </select>
              </li>
            ))}
          </ul>
        </div>
      )}
      {data && <Pager page={data.page} limit={data.limit} total={data.total} onPage={setPage} />}
      {open && (
        <Modal title={`Enquiry from ${open.name}`} onClose={() => setOpen(null)}>
          <dl className="grid gap-3 text-sm">
            <div><dt className="text-muted">Email</dt><dd><a className="link inline-flex items-center gap-1.5" href={`mailto:${open.email}`}><Mail size={14} />{open.email}</a></dd></div>
            {open.phone && <div><dt className="text-muted">Phone</dt><dd><a className="link inline-flex items-center gap-1.5" href={`tel:${open.phone}`}><Phone size={14} />{open.phone}</a></dd></div>}
            <div className="grid grid-cols-2 gap-3"><div><dt className="text-muted">Service</dt><dd>{open.service}</dd></div><div><dt className="text-muted">Budget</dt><dd>{open.budget || '—'}</dd></div></div>
            <div><dt className="text-muted">Received</dt><dd>{fmtDate(open.created_at)}</dd></div>
            <div><dt className="text-muted">Message</dt><dd className="mt-1 whitespace-pre-wrap rounded-lg bg-paper p-3">{open.message}</dd></div>
          </dl>
          <a href={`mailto:${open.email}?subject=${encodeURIComponent('Re: your enquiry')}`} className="btn-primary mt-5 w-full" onClick={() => open.status === 'new' && setRowStatus(open, 'replied')}><Mail size={17} />Reply by email</a>
        </Modal>
      )}
    </>
  )
}
