import { useEffect, useState } from 'react'
import { cms } from '../api'

export const STATUS_STYLE = {
  'Done': 'bg-green-600 text-white ring-green-600',
  'In progress': 'bg-amber-400 text-ink ring-amber-400',
  'On hold': 'bg-slate-300 text-ink ring-slate-300',
  'Not started': 'bg-white text-muted ring-line',
}

/** Load team members (for the "Done by" pickers). */
export function useTeam(collection = 'team') {
  const [team, setTeam] = useState([])
  useEffect(() => {
    cms(`/cms/entries/${collection}?limit=100`).then((r) => setTeam(r.rows.filter((x) => x.status !== 'archived').map((x) => ({ slug: x.slug, name: x.title, active: x.draft?.active !== false })))).catch(() => setTeam([]))
  }, [collection])
  return team
}

/**
 * Editor for the 10 lifecycle stages of an application:
 * who did it, status, dates and a short note per stage.
 */
export default function StagesField({ id, f, value, onChange }) {
  const team = useTeam(f.people)
  const v = value && typeof value === 'object' ? value : {}
  const set = (stage, key, val) => onChange({ ...v, [stage]: { status: f.statuses[0], ...v[stage], [key]: val } })

  const sm = 'field !min-h-[40px] !py-1 text-sm'
  return (
    <div id={id}>
      <ol className="divide-y divide-line border-y border-line">
        {f.stages.map((st, i) => {
          const row = v[st.id] || {}
          const status = row.status || f.statuses[0]
          const known = !row.owner || team.some((t) => t.slug === row.owner)
          return (
            <li key={st.id} className="grid gap-2 py-3 md:grid-cols-[180px_1fr_150px] md:items-center">
              <p className="flex items-center font-medium text-ink">
                <span className={`mr-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ring-1 ${STATUS_STYLE[status]}`}>{i + 1}</span>{st.label}
              </p>
              <select aria-label={`${st.label}: done by`} className={sm} value={row.owner || ''} onChange={(e) => set(st.id, 'owner', e.target.value)}>
                <option value="">Done by: unassigned</option>
                {team.filter((t) => t.active || t.slug === row.owner).map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
                {!known && <option value={row.owner}>{row.owner} (removed)</option>}
              </select>
              <select aria-label={`${st.label}: status`} className={sm} value={status} onChange={(e) => set(st.id, 'status', e.target.value)}>
                {f.statuses.map((s) => <option key={s}>{s}</option>)}
              </select>
              <div className="grid gap-2 sm:grid-cols-[1fr_1fr_1.6fr] md:col-start-2 md:col-span-2">
                <label className="text-xs text-muted">Started<input type="date" aria-label={`${st.label}: started`} className={`${sm} mt-0.5`} value={row.start || ''} onChange={(e) => set(st.id, 'start', e.target.value)} /></label>
                <label className="text-xs text-muted">Finished<input type="date" aria-label={`${st.label}: finished`} className={`${sm} mt-0.5`} value={row.end || ''} onChange={(e) => set(st.id, 'end', e.target.value)} /></label>
                <label className="text-xs text-muted">Note<input type="text" maxLength={300} aria-label={`${st.label}: note`} className={`${sm} mt-0.5`} value={row.notes || ''} onChange={(e) => set(st.id, 'notes', e.target.value)} placeholder="Optional" /></label>
              </div>
            </li>
          )
        })}
      </ol>
      {!team.length && <p className="mt-2 text-xs text-muted">Add people under Team members to assign stages.</p>}
    </div>
  )
}
