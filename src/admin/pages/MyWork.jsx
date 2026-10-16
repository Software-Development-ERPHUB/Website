import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CircleAlert, Hand, KanbanSquare, Save } from 'lucide-react'
import { cms } from '../api'
import { useAuth } from '../auth'
import { PageTitle, Empty, Spinner, useToast } from '../ui'
import { STATUS_STYLE } from '../fields/StagesField'
import StageFiles, { timeAgo } from '../tracker/StageFiles'

/** One stage assigned to me: status, dates, note and files. */
function StageCard({ item, statuses, files, onSaved, reloadFiles }) {
  const toast = useToast()
  const { app, stage, row, last } = item
  const init = { status: row.status || statuses[0], start: row.start || '', end: row.end || '', notes: row.notes || '' }
  const [f, setF] = useState(init)
  const [busy, setBusy] = useState(false)
  const dirty = JSON.stringify(f) !== JSON.stringify(init)
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }))

  async function save() {
    setBusy(true)
    try {
      const body = { ...f }
      // finishing a stage with no dates fills in today
      const today = new Date().toISOString().slice(0, 10)
      if (body.status === 'Done' && !body.end) body.end = today
      if (body.status !== 'Not started' && !body.start) body.start = today
      await cms(`/cms/tracker/apps/${app.id}/stages/${stage.id}`, { method: 'PATCH', body })
      toast(`${stage.label} saved`)
      onSaved()
    } catch (e) { toast(e.message, 'error') } finally { setBusy(false) }
  }

  const id = `w-${app.id}-${stage.id}`
  return (
    <li className="rounded-xl border border-line bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">{app.code ? `${app.code} · ` : ''}{app.name}</p>
          <h3 className="mt-0.5 flex items-center gap-2 font-display text-lg font-semibold">
            <span className={`h-3 w-3 rounded-full ring-1 ${STATUS_STYLE[row.status || statuses[0]]}`} aria-hidden="true" />{stage.label}
          </h3>
        </div>
        <span className="text-xs text-muted">{last ? `Updated ${timeAgo(last)}` : 'No updates yet'}</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="text-xs font-semibold text-muted" htmlFor={`${id}-s`}>Status
          <select id={`${id}-s`} className="field mt-1 !min-h-[40px] !py-1" value={f.status} onChange={set('status')}>{statuses.map((s) => <option key={s}>{s}</option>)}</select>
        </label>
        <label className="text-xs font-semibold text-muted">Started<input type="date" className="field mt-1 !min-h-[40px] !py-1" value={f.start} onChange={set('start')} /></label>
        <label className="text-xs font-semibold text-muted">Finished<input type="date" className="field mt-1 !min-h-[40px] !py-1" value={f.end} onChange={set('end')} /></label>
      </div>
      <label className="mt-3 block text-xs font-semibold text-muted">What did you do / what is pending?
        <textarea rows={2} maxLength={300} className="field mt-1 resize-y !py-2 text-sm" value={f.notes} onChange={set('notes')} placeholder="e.g. SRS shared with client, waiting for feedback" />
      </label>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 flex-1"><StageFiles appId={app.id} stage={stage.id} files={files} canUpload onChange={reloadFiles} /></div>
        <button type="button" onClick={save} disabled={!dirty || busy} className="btn-primary !min-h-[40px]">{busy ? <Spinner /> : <Save size={16} />}Save</button>
      </div>
    </li>
  )
}

/** A developer's own page: the stages assigned to them, and picking up new ones. */
export default function MyWork() {
  const { user } = useAuth()
  const toast = useToast()
  const [data, setData] = useState(null)
  const [files, setFiles] = useState([])
  const [pick, setPick] = useState({ app: '', stage: '' })
  const [v, setV] = useState(0) // remount cards after a save so they show saved values

  const load = useCallback(() => cms('/cms/tracker').then((d) => { setData(d); setV((x) => x + 1) }).catch((e) => toast(e.message, 'error')), [toast])
  const loadFiles = useCallback(() => cms('/cms/tracker/files').then((d) => setFiles(d.rows)).catch(() => {}), [])
  useEffect(() => { load(); loadFiles() }, [load, loadFiles])

  const mine = useMemo(() => {
    if (!data?.me) return []
    return data.apps.flatMap((app) => data.stages.filter((s) => app.stages?.[s.id]?.owner === data.me)
      .map((stage) => ({ app, stage, row: app.stages[stage.id], last: data.lastUpdate[`${app.id}:${stage.id}`] })))
  }, [data])

  if (!data) return <p className="flex items-center gap-2 text-muted"><Spinner />Loading…</p>
  const first = user.name.split(' ')[0]

  if (!data.me) {
    return (
      <>
        <PageTitle title={`Hi ${first}`} desc="Your development work" />
        <div role="alert" className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          <CircleAlert size={20} className="shrink-0" />
          <p>Your login ({user.email}) is not linked to a team member yet. Ask an admin to open <strong>Development → Team members</strong>, pick your name and set <strong>Login email</strong> to {user.email}.</p>
        </div>
      </>
    )
  }

  const by = (st) => mine.filter((x) => (x.row.status || 'Not started') === st)
  const groups = [
    ['In progress', by('In progress')],
    ['To do', [...by('Not started'), ...by('On hold')]],
    ['Done', by('Done').sort((a, b) => String(b.row.end || '').localeCompare(String(a.row.end || ''))).slice(0, 12)],
  ]
  const filesFor = (appId, stage) => files.filter((f) => f.app_id === appId && f.stage === stage)
  const modules = data.apps.filter((a) => a.kind === 'Module' || a.kind === 'Suite' || a.kind === 'Enterprise application')
  const pickApp = data.apps.find((a) => String(a.id) === pick.app)
  const free = pickApp ? data.stages.filter((s) => !pickApp.stages?.[s.id]?.owner) : []

  async function take() {
    try {
      await cms(`/cms/tracker/apps/${pick.app}/stages/${pick.stage}`, { method: 'PATCH', body: {} })
      toast('Stage added to your work')
      setPick({ app: '', stage: '' })
      load()
    } catch (e) { toast(e.message, 'error') }
  }

  return (
    <>
      <PageTitle title={`Hi ${first}`} desc="Your stages across all applications. Update the status as you go and attach your documents."
        actions={<Link to="/admin/tracker" className="btn-secondary !min-h-[42px]"><KanbanSquare size={17} />Team dashboard</Link>} />

      <dl className="mb-6 grid grid-cols-3 gap-3">
        {groups.map(([l, list]) => (
          <div key={l} className="rounded-xl border border-line bg-white p-4"><dt className="text-sm text-muted">{l}</dt><dd className="mt-1 font-display text-2xl font-semibold">{l === 'Done' ? by('Done').length : list.length}</dd></div>
        ))}
      </dl>

      {!mine.length && <Empty icon={Hand} title="Nothing assigned to you yet">Pick up a stage below, or ask your manager to assign one.</Empty>}

      {groups.map(([title, list]) => list.length > 0 && (
        <section key={title} className="mb-8" aria-label={title}>
          <h2 className="mb-3 font-display text-lg font-semibold">{title}</h2>
          <ul className="grid gap-4 xl:grid-cols-2">
            {list.map((item) => (
              <StageCard key={`${item.app.id}-${item.stage.id}-${v}`} item={item} statuses={data.statuses}
                files={filesFor(item.app.id, item.stage.id)} onSaved={load} reloadFiles={() => { loadFiles(); load() }} />
            ))}
          </ul>
        </section>
      ))}

      <section className="rounded-xl border border-line bg-white p-5" aria-labelledby="pick-h">
        <h2 id="pick-h" className="font-display text-lg font-semibold">Pick up a stage</h2>
        <p className="mt-1 text-sm text-muted">Started work nobody is assigned to? Add it to your list so the credit goes to you.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-[2fr_1.2fr_auto]">
          <select aria-label="Application" className="field !min-h-[42px] !py-1" value={pick.app} onChange={(e) => setPick({ app: e.target.value, stage: '' })}>
            <option value="">Choose application…</option>
            {modules.map((a) => <option key={a.id} value={a.id}>{a.code ? `${a.code}. ` : ''}{a.name}</option>)}
          </select>
          <select aria-label="Stage" className="field !min-h-[42px] !py-1" value={pick.stage} onChange={(e) => setPick({ ...pick, stage: e.target.value })} disabled={!pickApp}>
            <option value="">{pickApp && !free.length ? 'All stages are taken' : 'Choose stage…'}</option>
            {free.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          <button type="button" className="btn-primary !min-h-[42px]" disabled={!pick.app || !pick.stage} onClick={take}><Hand size={16} />Take this stage</button>
        </div>
      </section>
    </>
  )
}
