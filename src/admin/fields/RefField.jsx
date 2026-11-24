import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cms } from '../api'

/** Entries of a setup collection (e.g. clients) as { slug, name, active } for dropdowns. */
export function useEntryOptions(collection) {
  const [rows, setRows] = useState([])
  useEffect(() => {
    if (!collection) return
    cms(`/cms/entries/${collection}?limit=100`)
      .then((r) => setRows(r.rows.filter((x) => x.status !== 'archived').map((x) => ({ slug: x.slug, name: x.title, active: x.draft?.active !== false }))))
      .catch(() => setRows([]))
  }, [collection])
  return rows
}

/**
 * Dropdown filled from another collection (field type "ref", e.g. Client from Clients).
 * Inactive entries are hidden unless this entry already uses one.
 */
export default function RefField({ f, common, value, onChange, cols }) {
  const rows = useEntryOptions(f.ref)
  const label = cols?.find((c) => c.id === f.ref)?.label || f.ref
  const known = !value || rows.some((r) => r.slug === value)
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <select {...common} className="field sm:flex-1" value={value || ''} onChange={(e) => onChange(e.target.value)}>
        <option value="">Choose…</option>
        {rows.filter((r) => r.active || r.slug === value).map((r) => <option key={r.slug} value={r.slug}>{r.name}</option>)}
        {!known && <option value={value}>{value} (removed)</option>}
      </select>
      <Link to={`/admin/content/${f.ref}`} className="link whitespace-nowrap text-sm">Manage {label.toLowerCase()}</Link>
    </div>
  )
}
