import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Inbox, GraduationCap, ArrowRight, FileText } from 'lucide-react'
import { cms, fmtDate } from '../api'
import { useAuth } from '../auth'
import { PageTitle, StatusBadge, Spinner } from '../ui'

export default function Dashboard({ cols }) {
  const { user } = useAuth()
  const [d, setD] = useState(null)
  useEffect(() => { cms('/cms/stats').then(setD).catch(() => setD({ counts: [], recent: [], inbox: {} })) }, [])
  const count = (c, s) => (d?.counts || []).filter((x) => x.collection === c && (!s || x.status === s)).reduce((a, x) => a + Number(x.n), 0)
  const changes = (c) => (d?.counts || []).filter((x) => x.collection === c && x.status === 'published').reduce((a, x) => a + Number(x.changes || 0), 0)
  const label = (id) => cols?.find((c) => c.id === id)?.label || id
  const hour = new Date().getHours()

  return (
    <>
      <PageTitle title={`Good ${hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'}, ${user.name.split(' ')[0]}`} desc="Here is what is happening with the website content." />
      {!d ? <p className="flex items-center gap-2 text-muted"><Spinner />Loading…</p> : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link to="/admin/enquiries" className="lift rounded-xl border border-line bg-white p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand"><Inbox size={20} /></span>
              <p className="mt-4 font-display text-3xl font-semibold">{d.inbox.enquiries ?? 0}</p>
              <p className="text-sm text-muted">New enquiries</p>
            </Link>
            <Link to="/admin/applications" className="lift rounded-xl border border-line bg-white p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-steel-soft text-steel"><GraduationCap size={20} /></span>
              <p className="mt-4 font-display text-3xl font-semibold">{d.inbox.applications ?? 0}</p>
              <p className="text-sm text-muted">New internship applications</p>
            </Link>
            {(cols || []).slice(0, 2).map((c) => (
              <Link key={c.id} to={`/admin/content/${c.id}`} className="lift rounded-xl border border-line bg-white p-5">
                <p className="text-sm font-semibold text-muted">{c.label}</p>
                <p className="mt-3 font-display text-3xl font-semibold">{count(c.id, 'published')}<span className="text-base font-normal text-muted"> live</span></p>
                <p className="mt-1 text-sm text-muted">{count(c.id, 'draft')} drafts · {changes(c.id)} with unpublished changes</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <section className="rounded-xl border border-line bg-white">
              <h2 className="border-b border-line px-5 py-4 font-display text-lg font-semibold">Recently edited</h2>
              {d.recent.length ? (
                <ul className="divide-y divide-line">
                  {d.recent.map((r) => (
                    <li key={r.id}>
                      <Link to={`/admin/content/${r.collection}/${r.id}`} className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-paper">
                        <FileText size={18} className="shrink-0 text-muted" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium">{r.title}</span>
                          <span className="block text-xs text-muted">{label(r.collection)} · {fmtDate(r.updatedAt)}{r.updatedByName ? ` · ${r.updatedByName}` : ''}</span>
                        </span>
                        <StatusBadge status={r.status} hasChanges={r.hasChanges} />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : <p className="p-5 text-sm text-muted">Nothing yet — create your first entry.</p>}
            </section>
            <section className="rounded-xl border border-line bg-white p-5">
              <h2 className="font-display text-lg font-semibold">Quick create</h2>
              <ul className="mt-4 space-y-2">
                {(cols || []).map((c) => (
                  <li key={c.id}>
                    <Link to={`/admin/content/${c.id}/new`} className="group flex min-h-[48px] items-center gap-3 rounded-lg border border-line px-4 font-medium transition-colors hover:border-brand hover:text-brand">
                      <Plus size={18} />New {c.singular.toLowerCase()}
                      <ArrowRight size={16} className="ml-auto transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg bg-paper p-4 text-sm text-muted">
                <p className="font-semibold text-ink">How publishing works</p>
                <p className="mt-1"><strong>Save draft</strong> keeps your changes private. The website only changes when you press <strong>Publish</strong>.</p>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  )
}
