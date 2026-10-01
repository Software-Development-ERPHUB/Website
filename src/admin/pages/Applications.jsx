import { useCallback, useEffect, useState } from 'react'
import { GraduationCap, Download, Mail, ExternalLink } from 'lucide-react'
import { cms, fmtDate, fmtSize } from '../api'
import { API_BASE } from '../../lib/api'
import { PageTitle, Empty, Pager, Spinner, Modal, useToast } from '../ui'

const STATUSES = ['new', 'shortlisted', 'interview', 'selected', 'rejected']
const cap = (s) => s[0].toUpperCase() + s.slice(1)

export default function Applications() {
  const toast = useToast()
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)
  const [open, setOpen] = useState(null)

  const load = useCallback(() => {
    cms(`/admin/internships?page=${page}&limit=20${status ? `&status=${status}` : ''}`).then(setData).catch((e) => toast(e.message, 'error'))
  }, [page, status, toast])
  useEffect(() => { load() }, [load])

  async function setRowStatus(row, s) {
    try { await cms(`/admin/internships/${row.id}`, { method: 'PATCH', body: { status: s } }); toast('Status updated'); load(); if (open) setOpen({ ...open, status: s }) }
    catch (e) { toast(e.message, 'error') }
  }
  const cv = (r) => `${API_BASE}/api/admin/internships/${r.id}/cv`

  return (
    <>
      <PageTitle title="Internship applications" desc="Applications from the Careers page, with CVs." />
      <div className="mb-4 flex flex-wrap gap-1.5">
        {['', ...STATUSES].map((s) => (
          <button key={s} type="button" onClick={() => { setStatus(s); setPage(1) }} aria-pressed={status === s}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${status === s ? 'bg-ink text-white' : 'bg-white ring-1 ring-line hover:ring-ink/30'}`}>{s ? cap(s) : 'All'}</button>
        ))}
      </div>
      {!data ? <p className="flex items-center gap-2 text-muted"><Spinner />Loading…</p> : !data.rows.length ? <Empty icon={GraduationCap} title="No applications here" /> : (
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-line bg-paper text-xs uppercase tracking-wider text-muted">
                <tr><th className="px-4 py-3">Applicant</th><th className="px-4 py-3">Education</th><th className="px-4 py-3">Interest</th><th className="px-4 py-3">CV</th><th className="px-4 py-3">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-line">
                {data.rows.map((r) => (
                  <tr key={r.id} className="hover:bg-paper/60">
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => setOpen(r)} className="text-left font-semibold hover:text-brand hover:underline">{r.full_name}</button>
                      <span className="block text-xs text-muted">{fmtDate(r.created_at)}</span>
                    </td>
                    <td className="px-4 py-3">{r.course}<span className="block text-xs text-muted">{r.college} · {r.year_of_study}</span></td>
                    <td className="px-4 py-3">{r.area_of_interest}<span className="block text-xs text-muted">{r.duration || '—'}</span></td>
                    <td className="px-4 py-3"><a href={cv(r)} className="link inline-flex items-center gap-1"><Download size={14} />CV</a></td>
                    <td className="px-4 py-3">
                      <select value={r.status} onChange={(e) => setRowStatus(r, e.target.value)} className="field !min-h-[38px] !w-36" aria-label={`Status for ${r.full_name}`}>
                        {STATUSES.map((s) => <option key={s} value={s}>{cap(s)}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {data && <Pager page={data.page} limit={data.limit} total={data.total} onPage={setPage} />}
      {open && (
        <Modal title={open.full_name} onClose={() => setOpen(null)}>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div><dt className="text-muted">Email</dt><dd><a className="link break-all" href={`mailto:${open.email}`}>{open.email}</a></dd></div>
            <div><dt className="text-muted">Phone</dt><dd><a className="link" href={`tel:${open.phone}`}>{open.phone}</a></dd></div>
            <div><dt className="text-muted">College</dt><dd>{open.college}</dd></div>
            <div><dt className="text-muted">Course · year</dt><dd>{open.course} · {open.year_of_study}</dd></div>
            <div><dt className="text-muted">Area of interest</dt><dd>{open.area_of_interest}</dd></div>
            <div><dt className="text-muted">Duration · from</dt><dd>{open.duration || '—'} · {open.start_date || '—'}</dd></div>
            {open.skills && <div className="sm:col-span-2"><dt className="text-muted">Skills</dt><dd>{open.skills}</dd></div>}
            {(open.portfolio_url || open.linkedin_url) && (
              <div className="sm:col-span-2 flex flex-wrap gap-4">
                {open.portfolio_url && <a className="link inline-flex items-center gap-1" href={open.portfolio_url} target="_blank" rel="noopener noreferrer">Portfolio <ExternalLink size={13} /></a>}
                {open.linkedin_url && <a className="link inline-flex items-center gap-1" href={open.linkedin_url} target="_blank" rel="noopener noreferrer">LinkedIn <ExternalLink size={13} /></a>}
              </div>
            )}
            {open.message && <div className="sm:col-span-2"><dt className="text-muted">Message</dt><dd className="mt-1 whitespace-pre-wrap rounded-lg bg-paper p-3">{open.message}</dd></div>}
          </dl>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <a href={cv(open)} className="btn-primary"><Download size={17} />Download CV ({fmtSize(open.cv_size)})</a>
            <a href={`mailto:${open.email}?subject=${encodeURIComponent('Your internship application')}`} className="btn-secondary"><Mail size={17} />Email applicant</a>
          </div>
        </Modal>
      )}
    </>
  )
}
