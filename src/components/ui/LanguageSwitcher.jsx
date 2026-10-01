import { useEffect, useId, useRef, useState } from 'react'
import { Languages, Check, ChevronDown, Search } from 'lucide-react'
import { LANGUAGES, getLanguage, setLanguage, findLanguage } from '../../lib/translate'

export function useLanguage() {
  const [lang, setLang] = useState(() => getLanguage())
  useEffect(() => {
    const fn = (e) => setLang(e.detail)
    window.addEventListener('site-language', fn)
    return () => window.removeEventListener('site-language', fn)
  }, [])
  return lang
}

/**
 * Language menu. `variant="header"` — compact button with a dropdown;
 * `variant="list"` — inline grid (used in the mobile menu).
 * The whole control is marked translate="no" so language names never change.
 */
export default function LanguageSwitcher({ variant = 'header' }) {
  const lang = useLanguage()
  const cur = findLanguage(lang) || LANGUAGES[0]
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const ref = useRef(null)
  const btn = useRef(null)
  const input = useRef(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    const esc = (e) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus() } }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    requestAnimationFrame(() => input.current?.focus())
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc) }
  }, [open])

  const choose = (code) => { setOpen(false); setQ(''); if (code !== lang) setLanguage(code) }
  const s = q.trim().toLowerCase()
  const list = LANGUAGES.filter((l) => !s || l.name.toLowerCase().includes(s) || l.native.toLowerCase().includes(s) || l.code.toLowerCase().startsWith(s))
  const groups = ['Global', 'India', 'International'].map((g) => [g, list.filter((l) => l.region === g)]).filter(([, l]) => l.length)

  const Item = ({ l }) => {
    const on = l.code === lang
    return (
      <li>
        <button type="button" role="menuitemradio" aria-checked={on} lang={l.code} onClick={() => choose(l.code)}
          className={`flex min-h-[44px] w-full items-center gap-3 rounded-lg px-3 text-left transition-colors ${on ? 'bg-brand-soft text-brand' : 'text-ink hover:bg-paper'}`}>
          <span className="flex h-7 w-9 shrink-0 items-center justify-center rounded-md bg-paper text-[11px] font-bold uppercase text-muted">{l.code.split('-')[0]}</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[0.94rem] font-semibold">{l.native}</span>
            {l.native !== l.name && <span className="block truncate text-xs text-muted">{l.name}</span>}
          </span>
          {on && <Check size={17} aria-hidden="true" />}
        </button>
      </li>
    )
  }

  if (variant === 'list') {
    return (
      <div translate="no" className="notranslate">
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink"><Languages size={17} aria-hidden="true" />Language</p>
        <ul role="menu" aria-label="Choose language" className="grid grid-cols-2 gap-1">
          {LANGUAGES.map((l) => <Item key={l.code} l={l} />)}
        </ul>
        <p className="mt-2 text-xs text-muted">Automatic translation by Google.</p>
      </div>
    )
  }

  return (
    <div ref={ref} className="notranslate relative" translate="no">
      <button ref={btn} type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open} aria-controls={id}
        aria-label={`Language: ${cur.name}. Change language`}
        className={`group inline-flex h-11 items-center gap-1.5 rounded-lg border px-2.5 text-sm font-semibold transition-colors ${open ? 'border-brand bg-brand-soft text-brand' : 'border-line text-ink hover:border-brand hover:text-brand'}`}>
        <Languages size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-12" />
        <span className="uppercase">{cur.code.split('-')[0]}</span>
        <ChevronDown size={14} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div id={id} className="dropdown-anim absolute right-0 top-full z-50 mt-2 w-[290px] overflow-hidden rounded-xl border border-line bg-white shadow-pop">
          <div className="border-b border-line p-2">
            <label className="flex items-center gap-2 rounded-lg bg-paper px-3">
              <Search size={16} className="text-muted" aria-hidden="true" />
              <span className="sr-only">Search languages</span>
              <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search language…"
                className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted/70" />
            </label>
          </div>
          <div className="max-h-[360px] overflow-y-auto p-2" role="menu" aria-label="Choose language">
            {groups.length ? groups.map(([g, l]) => (
              <div key={g} className="mb-1">
                <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted">{g}</p>
                <ul>{l.map((x) => <Item key={x.code} l={x} />)}</ul>
              </div>
            )) : <p className="p-4 text-center text-sm text-muted">No language found</p>}
          </div>
          <p className="border-t border-line bg-paper px-4 py-2.5 text-xs text-muted">Automatic translation by Google. Names and technical terms stay in English.</p>
        </div>
      )}
    </div>
  )
}
