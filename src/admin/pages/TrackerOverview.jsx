import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, AlarmClock, FolderKanban, UserRound } from 'lucide-react'
import { cms } from '../api'
import { Spinner } from '../ui'
import { timeAgo, daysSince } from '../tracker/StageFiles'

const STALE_DAYS = 7
const initials = (name = '') => name.split(/\s+/).filter(Boolean).map((p) => p[0]).slice(0, 2).join('').toUpperCase() || '?'

function Panel({ icon: I, title, count, children }) {
  return (
    <section className="rounded-xl border border-line bg-white">
      <h2 className="flex items-center gap-2 border-b border-line px-5 py-3.5 font-display text-base font-semibold">
        <I size={17} className="text-brand" aria-hidden="true" />{title}{count != null && <span className="ml-auto rounded-full bg-paper px-2 py-0.5 text-xs font-semibold text-muted">{count}</span>}
      </h2>
      {children}
    </section>
  )
}

/**
 * Admin overview: who is working on what, projects in progress,
 * stages nobody has updated for a week, and the latest activity.
 */
export default function TrackerOverview({ data, staff }) {
  const [activity, setActivity] = useState(null)
  useEffect(() => { cms('/cms/tracker/activity?limit=40').then((d) => setActivity(d.rows)).catch(() => setActivity([])) }, [data])

  const name = useMemo(() => Object.fromEntries(data.team.map((t) => [t.slug, t.name])), [data])
  const appLink = (a, cls = '') => (staff ? <Link to={`/admin/content/apps/${a.id}`} className={`font-semibold text-ink hover:text-brand hover:underline ${cls}`}>{a.name}</Link> : <span className={`font-semibold ${cls}`}>{a.name}</span>)

  // every stage that is in progress, with who and when it was last touched
  const active = useMemo(() => data.apps.flatMap((a) => data.stages
    .filter((s) => a.stages?.[s.id]?.status === 'In progress')
    .map((s) => {
      const r = a.stages[s.id]
      const last = data.lastUpdate[`${a.id}:${s.id}`] || r.start
      return { app: a, stage: s, owner: r.owner, last }
    })), [data])

  const people = data.team.filter((t) => t.active !== false).map((t) => ({
    ...t, now: active.filter((x) => x.owner === t.slug), last: data.lastSeen[t.slug],
    done: data.apps.reduce((n, a) => n + data.stages.filter((s) => a.stages?.[s.id]?.owner === t.slug && a.stages[s.id].status === 'Done').length, 0),
  }))

  const projects = data.apps.filter((a) => active.some((x) => x.app.id === a.id))
  const stale = active.filter((x) => daysSince(x.last) >= STALE_DAYS)
  const unowned = active.filter((x) => !x.owner)

  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
      <div className="min-w-0 space-y-6">
        <Panel icon={UserRound} title="Who is working on what" count={people.length}>
          <ul className="grid sm:grid-cols-2">
            {people.map((p) => (
              <li key={p.slug} className="border-b border-line p-5 last:border-b-0 sm:odd:border-r sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand">{initials(p.name)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{p.name}</span>
                    <span className="block text-xs text-muted">{p.last ? `Last update ${timeAgo(p.last)}` : 'No updates yet'} · {p.done} done</span>
                  </span>
                </div>
                {p.now.length ? (
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {p.now.map((x) => (
                      <li key={x.app.id + x.stage.id} className="flex items-baseline gap-2">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
                        <span className="min-w-0">{appLink(x.app)} <span className="text-muted">· {x.stage.label}</span></span>
                      </li>
                    ))}
                  </ul>
                ) : <p className="mt-3 text-sm text-muted">Nothing in progress</p>}
              </li>
            ))}
            {!people.length && <li className="bg-white p-5 text-sm text-muted">Add people under Team members.</li>}
          </ul>
        </Panel>

        <Panel icon={FolderKanban} title="Projects in progress" count={projects.length}>
          {projects.length ? (
            <ul className="divide-y divide-line">
              {projects.map((a) => {
                const done = data.stages.filter((s) => a.stages?.[s.id]?.status === 'Done').length
                return (
                  <li key={a.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3 text-sm">
                    <span className="min-w-0 flex-1">{appLink(a)}<span className="block text-xs text-muted">{a.suite || a.kind}</span></span>
                    <span className="text-muted">{active.filter((x) => x.app.id === a.id).map((x) => `${x.stage.label}${x.owner ? ` (${name[x.owner] || x.owner})` : ''}`).join(', ')}</span>
                    <span className="flex items-center gap-2"><span className="block h-1.5 w-20 overflow-hidden rounded-full bg-line"><span className="block h-full bg-green-600" style={{ width: `${(done / data.stages.length) * 100}%` }} /></span><span className="w-10 text-xs text-muted">{done}/{data.stages.length}</span></span>
                  </li>
                )
              })}
            </ul>
          ) : <p className="p-5 text-sm text-muted">No stage is in progress right now.</p>}
        </Panel>
      </div>

      <div className="min-w-0 space-y-6">
        <Panel icon={AlarmClock} title="Needs attention" count={stale.length + unowned.length}>
          {stale.length + unowned.length ? (
            <ul className="divide-y divide-line text-sm">
              {stale.map((x) => (
                <li key={'s' + x.app.id + x.stage.id} className="px-5 py-3">{appLink(x.app)} · {x.stage.label}
                  <span className="block text-xs text-amber-800">In progress, no update {x.last ? `for ${Math.floor(daysSince(x.last))} days` : 'yet'}{x.owner ? ` · ${name[x.owner] || x.owner}` : ''}</span></li>
              ))}
              {unowned.map((x) => (
                <li key={'u' + x.app.id + x.stage.id} className="px-5 py-3">{appLink(x.app)} · {x.stage.label}<span className="block text-xs text-amber-800">In progress but nobody is assigned</span></li>
              ))}
            </ul>
          ) : <p className="p-5 text-sm text-muted">Everything in progress was updated in the last {STALE_DAYS} days.</p>}
        </Panel>

        <Panel icon={Activity} title="Recent activity">
          {!activity ? <p className="flex items-center gap-2 p-5 text-sm text-muted"><Spinner />Loading…</p> : activity.length ? (
            <ol className="max-h-[560px] divide-y divide-line overflow-y-auto text-sm">
              {activity.map((r) => (
                <li key={r.id} className="px-5 py-3">
                  <p><strong className="font-semibold">{r.user_name || 'Someone'}</strong> · <span className="text-muted">{r.app_name}</span></p>
                  <p className="mt-0.5 text-ink/90">{r.message}</p>
                  <p className="mt-0.5 text-xs text-muted">{timeAgo(r.created_at)}</p>
                </li>
              ))}
            </ol>
          ) : <p className="p-5 text-sm text-muted">Changes to stages and uploads will show here.</p>}
        </Panel>
      </div>
    </div>
  )
}
