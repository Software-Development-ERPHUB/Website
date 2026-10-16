import { useEffect, useState } from 'react'
import { cms } from '../api'

export const STATUS_STYLE = {
  'Done': 'bg-green-600 text-white ring-green-600',
  'In progress': 'bg-amber-400 text-ink ring-amber-400',
  'On hold': 'bg-slate-300 text-ink ring-slate-300',
  'Not started': 'bg-white text-muted ring-line',
}

/** A stage row stores owners as an array; fall back to a legacy single owner. */
export const ownersOf = (row) => (Array.isArray(row?.owners) ? row.owners : (row?.owner ? [row.owner] : []))

/** Load team members (for the "Done by" pickers). */
export function useTeam(collection = 'team') {
  const [team, setTeam] = useState([])
  useEffect(() => {
    cms(`/cms/entries/${collection}?limit=100`).then((r) => setTeam(r.rows.filter((x) => x.status !== 'archived').map((x) => ({ slug: x.slug, name: x.title, active: x.draft?.active !== false })))).catch(() => setTeam([]))
  }, [collection])
  return team
}

/** Compact toggle pills — one or more people can own a stage. */
function OwnersPicker({ label, team, owners, onChange }) {
  const toggle = (slug) => onChange(owners.includes(slug) ? owners.filter((s) => s !== slug) : [...owners, slug])
  const gone = owners.filter((s) => !team.some((t) => t.slug === s))
  return (
    <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={`${label}: done by`}>
      <span className="w-full text-xs text-muted">Done by{owners.length > 1 ? ` (${owners.length})` : ''}</span>
      {team.filter((t) => t.active || owners.includes(t.slug)).map((t) => {
        const on = owners.includes(t.slug)
        return (
          <button type="button" key={t.slug} onClick={() => toggle(t.slug)} aria-pressed={on} title={t.name}
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${on ? 'border-brand bg-brand-soft text-brand' : 'border-line text-muted hover:border-brand hover:text-ink'}`}>
            <span className={`grid h-3.5 w-3.5 place-items-center rounded-full border text-[9px] leading-none ${on ? 'border-brand bg-brand text-white' : 'border-line'}`}>{on ? '✓' : ''}</span>
            {t.name}
          </button>
        )
      })}
      {gone.map((s) => (
        <button type="button" key={s} onClick={() => toggle(s)} title="No longer on the team — click to remove"
          className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
          {s} (removed) ×
        </button>
      ))}
      {!owners.length && <span className="text-xs text-muted">· unassigned</span>}
    </div>
  )
}

/**
 * Editor for the 10 lifecycle stages of an application:
 * who did it (one or more people), status, dates and a short note per stage.
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
          const owners = ownersOf(row)
          return (
            <li key={st.id} className="grid gap-2 py-3 md:grid-cols-[180px_1fr_150px] md:items-center">
              <p className="flex items-center font-medium text-ink">
                <span className={`mr-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ring-1 ${STATUS_STYLE[status]}`}>{i + 1}</span>{st.label}
              </p>
              <OwnersPicker label={st.label} team={team} owners={owners} onChange={(next) => set(st.id, 'owners', next)} />
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
