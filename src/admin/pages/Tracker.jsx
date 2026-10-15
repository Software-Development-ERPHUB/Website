import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, Download, ExternalLink, KanbanSquare, Plus, Search, Users } from 'lucide-react'
import { cms } from '../api'
import { useAuth } from '../auth'
import { PageTitle, Empty, Spinner, useToast } from '../ui'
import { STATUS_STYLE } from '../fields/StagesField'

const initials = (name = '') => name.split(/\s+/).filter(Boolean).map((p) => p[0]).slice(0, 2).join('').toUpperCase() || '?'
const num = (code) => (/^\d+$/.test(code || '') ? Number(code) : -1)

/**
 * Development tracker — who did which stage of every application.
 * Data: CMS collections "apps" (applications + their 10 stages) and "team".
 */
export default function Tracker({ cols }) {
  const { user } = useAuth()
  const toast = useToast()
  const [data, setData] = useState(null)
  const [tab, setTab] = useState('pipeline')
  const [suite, setSuite] = useState('')
  const [person, setPerson] = useState('')
  const [q, setQ] = useState('')
  const [seeding, setSeeding] = useState(false)

  const def = cols?.find((c) => c.id === 'apps')
  const stageField = def?.fields.find((f) => f.type === 'stages')
  const STAGES = stageField?.stages || []
  const SUITES = def?.fields.find((f) => f.name === 'suite')?.options || []

  const load = useCallback(() => cms('/cms/tracker').then(setData).catch((e) => { toast(e.message, 'error'); setData({ apps: [], team: [] }) }), [toast])
  useEffect(() => { load() }, [load])

  async function seed() {
    setSeeding(true)
    try {
      const r = await cms('/cms/tracker/seed', { method: 'POST' })
      toast(`Added ${r.added.apps} applications and ${r.added.team} team members`)
      await load()
    } catch (e) { toast(e.message, 'error') } finally { setSeeding(false) }
  }

  const people = useMemo(() => Object.fromEntries((data?.team || []).map((t) => [t.slug, t])), [data])
  const nameOf = (slug) => people[slug]?.name || slug

  const stageOf = (a, id) => a.stages?.[id] || {}
  const doneCount = (a) => STAGES.filter((s) => stageOf(a, s.id).status === 'Done').length
  const nowStage = (a) => STAGES.find((s) => stageOf(a, s.id).status !== 'Done')

  // group: Enterprise application, then suites A–E (suite row first, modules by number)
  const groups = useMemo(() => {
    if (!data) return []
    const ql = q.trim().toLowerCase()
    const match = (a) => (!ql || `${a.code} ${a.name}`.toLowerCase().includes(ql))
      && (!suite || a.suite === suite || (suite === '_all' && a.kind === 'Enterprise application'))
      && (!person || STAGES.some((s) => stageOf(a, s.id).owner === person))
    const apps = data.apps.filter(match)
    const out = []
    const top = apps.filter((a) => a.kind === 'Enterprise application')
    if (top.length) out.push({ key: '_all', title: 'Enterprise application', apps: top })
    for (const s of SUITES) {
      const list = apps.filter((a) => a.suite === s && a.kind !== 'Enterprise application')
        .sort((x, y) => (x.kind === 'Suite' ? -1 : y.kind === 'Suite' ? 1 : num(x.code) - num(y.code)))
      if (list.length) out.push({ key: s, title: s, apps: list })
    }
    const rest = apps.filter((a) => a.kind !== 'Enterprise application' && !SUITES.includes(a.suite))
    if (rest.length) out.push({ key: '_other', title: 'Not in a suite', apps: rest })
    return out
  }, [data, q, suite, person, SUITES]) // eslint-disable-line react-hooks/exhaustive-deps

  const stats = useMemo(() => {
    const apps = data?.apps || []
    const started = apps.filter((a) => STAGES.some((s) => ['Done', 'In progress'].includes(stageOf(a, s.id).status)))
    return {
      total: apps.length,
      active: started.filter((a) => stageOf(a, 'deploy').status !== 'Done').length,
      deployed: apps.filter((a) => stageOf(a, 'deploy').status === 'Done').length,
      done: apps.reduce((n, a) => n + doneCount(a), 0),
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  // credits: every Done stage goes to its owner
  const credits = useMemo(() => {
    const by = {}
    const blank = () => ({ done: [], active: 0 })
    for (const a of data?.apps || []) {
      for (const s of STAGES) {
        const r = stageOf(a, s.id)
        const k = r.owner || '_none'
        if (r.status === 'Done') (by[k] ||= blank()).done.push({ app: a, stage: s, end: r.end })
        else if (r.status === 'In progress' && r.owner) (by[k] ||= blank()).active++
      }
    }
    Object.values(by).forEach((c) => c.done.sort((x, y) => String(y.end || '').localeCompare(String(x.end || ''))))
    return by
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  function downloadCsv() {
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const head = ['No.', 'Application', 'Type', 'Suite', ...STAGES.flatMap((s) => [`${s.label} - by`, `${s.label} - status`, `${s.label} - finished`])]
    const lines = groups.flatMap((g) => g.apps).map((a) => [a.code, a.name, a.kind, a.suite,
      ...STAGES.flatMap((s) => { const r = stageOf(a, s.id); return [r.owner ? nameOf(r.owner) : '', r.status || 'Not started', r.end || ''] })])
    const csv = [head, ...lines].map((l) => l.map(esc).join(',')).join('\r\n')
    const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }))
    const el = Object.assign(document.createElement('a'), { href: url, download: `development-tracker-${new Date().toISOString().slice(0, 10)}.csv` })
    el.click(); URL.revokeObjectURL(url)
  }

  if (!def || !data) return <p className="flex items-center gap-2 text-muted"><Spinner />Loading…</p>

  const actions = (
    <>
      <Link to="/admin/content/team" className="btn-secondary !min-h-[42px]"><Users size={17} />Team members</Link>
      <Link to="/admin/content/apps/new" className="btn-primary !min-h-[42px]"><Plus size={18} />New application</Link>
    </>
  )

  if (!data.apps.length) {
    return (
      <>
        <PageTitle title="Development tracker" desc="Who did each stage of every application, from client discussion to deployment." actions={actions} />
        <Empty icon={KanbanSquare} title="No applications yet">
          <p>Load the ERP product catalogue (suites A–E and modules 1–33) with five placeholder developers, then rename them under Team members.</p>
          {user.role === 'admin'
            ? <button type="button" onClick={seed} disabled={seeding} className="btn-primary mx-auto mt-4">{seeding && <Spinner />}Load catalogue</button>
            : <p className="mt-3">Ask an admin to load the catalogue.</p>}
        </Empty>
      </>
    )
  }

  return (
    <>
      <PageTitle title="Development tracker" desc="Who did each stage of every application. Internal only, never shown on the website." actions={actions} />

      <dl className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[['Applications', stats.total], ['In development', stats.active], ['Deployed', stats.deployed], ['Stages completed', stats.done]].map(([l, v]) => (
          <div key={l} className="rounded-xl border border-line bg-white p-4"><dt className="text-sm text-muted">{l}</dt><dd className="mt-1 font-display text-2xl font-semibold">{v}</dd></div>
        ))}
      </dl>

      <div className="mb-4 flex flex-col gap-3">
        <div className="flex gap-1.5" role="tablist" aria-label="View">
          {[['pipeline', 'Pipeline', KanbanSquare], ['credits', 'Team credits', Award]].map(([v, l, I]) => (
            <button key={v} type="button" role="tab" aria-selected={tab === v} onClick={() => setTab(v)}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium ${tab === v ? 'bg-ink text-white' : 'bg-white text-ink ring-1 ring-line hover:ring-ink/30'}`}><I size={15} />{l}</button>
          ))}
        </div>
        {tab === 'pipeline' && (
          <div className="flex flex-wrap gap-2">
            <select aria-label="Suite" className="field !min-h-[40px] !w-full !py-1 sm:!w-auto sm:max-w-sm" value={suite} onChange={(e) => setSuite(e.target.value)}>
              <option value="">All suites</option><option value="_all">Enterprise application</option>
              {SUITES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select aria-label="Developer" className="field !min-h-[40px] !w-auto !py-1" value={person} onChange={(e) => setPerson(e.target.value)}>
              <option value="">Everyone</option>
              {data.team.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
            </select>
            <label className="flex items-center gap-2 rounded-lg border border-line bg-white px-3">
              <Search size={16} className="text-muted" /><span className="sr-only">Search</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="h-9 w-32 bg-transparent text-sm outline-none" />
            </label>
            <button type="button" onClick={downloadCsv} className="btn-secondary !min-h-[40px] !px-3"><Download size={16} />CSV</button>
          </div>
        )}
      </div>

      {tab === 'pipeline' ? (
        <>
          <ul className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted" aria-label="Legend">
            {stageField.statuses.map((s) => <li key={s} className="flex items-center gap-1.5"><span className={`h-3.5 w-3.5 rounded ring-1 ${STATUS_STYLE[s]}`} />{s}</li>)}
            <li>Letters = who did the stage. Hover a box for details.</li>
          </ul>
          {!groups.length ? <Empty icon={Search} title="Nothing matches">Try another filter.</Empty> : (
            <div className="overflow-hidden rounded-xl border border-line bg-white">
              <div className="relative overflow-x-auto">
                <table className="w-full min-w-[1080px] text-left text-sm">
                  <thead className="border-b border-line bg-paper text-[11px] uppercase tracking-wider text-muted">
                    <tr>
                      <th className="w-14 px-3 py-3 font-semibold">No.</th>
                      <th className="px-3 py-3 font-semibold">Application</th>
                      {STAGES.map((s, i) => <th key={s.id} className="px-1 py-3 text-center font-semibold" title={s.label}><span className="block text-[10px] text-muted/70">{i + 1}</span>{s.short}</th>)}
                      <th className="px-3 py-3 font-semibold">Progress</th>
                    </tr>
                  </thead>
                  {groups.map((g) => (
                    <tbody key={g.key} className="divide-y divide-line">
                      <tr className="bg-ink/[0.04]"><th colSpan={STAGES.length + 3} scope="colgroup" className="px-3 py-2 text-left text-xs font-bold uppercase tracking-wider text-ink">{g.title}</th></tr>
                      {g.apps.map((a) => {
                        const d = doneCount(a)
                        const now = nowStage(a)
                        const strong = a.kind !== 'Module'
                        return (
                          <tr key={a.id} className="hover:bg-paper/60">
                            <td className="px-3 py-2.5 font-semibold text-muted">{a.code || '—'}</td>
                            <td className="px-3 py-2.5">
                              <span className="flex items-center gap-1.5">
                                <Link to={`/admin/content/apps/${a.id}`} className={`text-ink hover:text-brand hover:underline ${strong ? 'font-bold' : 'font-semibold'}`}>{a.name}</Link>
                                {a.demoUrl && <a href={a.demoUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-brand" title="Open demo" aria-label={`Open ${a.name} demo`}><ExternalLink size={13} /></a>}
                              </span>
                              {strong && <span className="text-xs text-muted">{a.kind}</span>}
                            </td>
                            {STAGES.map((s) => {
                              const r = stageOf(a, s.id)
                              const st = r.status || 'Not started'
                              const who = r.owner ? nameOf(r.owner) : ''
                              const tip = `${s.label}: ${st}${who ? ` · ${who}` : ''}${r.end ? ` · finished ${r.end}` : r.start ? ` · started ${r.start}` : ''}${r.notes ? ` · ${r.notes}` : ''}`
                              const dim = person && r.owner !== person
                              return (
                                <td key={s.id} className="px-1 py-2 text-center">
                                  <span title={tip} className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-[11px] font-bold ring-1 transition-opacity ${STATUS_STYLE[st]} ${dim ? 'opacity-25' : ''}`}>
                                    {who ? initials(who) : ''}<span className="sr-only">{tip}</span>
                                  </span>
                                </td>
                              )
                            })}
                            <td className="px-3 py-2.5">
                              <span className="block h-1.5 w-24 overflow-hidden rounded-full bg-line"><span className="block h-full rounded-full bg-green-600" style={{ width: `${(d / STAGES.length) * 100}%` }} /></span>
                              <span className="mt-1 block text-xs text-muted">{now ? `Next: ${now.label}` : 'Deployed'}</span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted">Every stage marked <strong className="text-ink">Done</strong> is credited to the person who did it.</p>
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.team.map((t) => {
              const c = credits[t.slug] || { done: [], active: 0 }
              const perStage = STAGES.map((s) => [s, c.done.filter((x) => x.stage.id === s.id).length]).filter(([, n]) => n)
              return (
                <li key={t.slug} className="rounded-xl border border-line bg-white p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft font-semibold text-brand">{initials(t.name)}</span>
                    <span className="min-w-0 flex-1"><Link to={`/admin/content/team/${t.id}`} className="block truncate font-display text-lg font-semibold hover:underline">{t.name}</Link><span className="block text-sm text-muted">{t.role || 'Team member'}{t.active === false ? ' · left the team' : ''}</span></span>
                    <span className="text-right"><span className="block font-display text-2xl font-semibold">{c.done.length}</span><span className="block text-xs text-muted">stages done</span></span>
                  </div>
                  {c.active > 0 && <p className="mt-3 text-sm text-amber-800">{c.active} stage{c.active > 1 ? 's' : ''} in progress</p>}
                  {perStage.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">{perStage.map(([s, n]) => <li key={s.id} className="rounded-full bg-paper px-2.5 py-0.5 text-xs font-medium">{s.label} × {n}</li>)}</ul>
                  )}
                  {c.done.length ? (
                    <ul className="mt-4 space-y-1.5 border-t border-line pt-3 text-sm">
                      {c.done.slice(0, 6).map((x) => (
                        <li key={x.app.id + x.stage.id} className="flex justify-between gap-3"><span className="truncate" title={x.app.name}>{x.app.name}</span><span className="shrink-0 text-muted">{x.stage.label}</span></li>
                      ))}
                      {c.done.length > 6 && <li className="text-xs text-muted">and {c.done.length - 6} more</li>}
                    </ul>
                  ) : <p className="mt-4 border-t border-line pt-3 text-sm text-muted">No completed stages yet.</p>}
                </li>
              )
            })}
          </ul>
          {credits._none?.done.length > 0 && (
            <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              {credits._none.done.length} completed stage{credits._none.done.length > 1 ? 's have' : ' has'} nobody assigned, so no one gets credit yet: {[...new Set(credits._none.done.map((x) => x.app.name))].slice(0, 5).join(', ')}{credits._none.done.length > 5 ? '…' : ''}. Open the application and pick who did it.
            </p>
          )}
        </>
      )}
    </>
  )
}
