import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, CornerDownLeft, ArrowUp, ArrowDown, Clock, ArrowUpRight, Sparkles } from 'lucide-react'
import Icon from './Icon'
import { search, CATEGORIES, SUGGESTIONS } from '../../lib/searchIndex'

const RECENT_KEY = 'site-search-recent'
const readRecent = () => { try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || [] } catch { return [] } }
const saveRecent = (q) => { try { localStorage.setItem(RECENT_KEY, JSON.stringify([q, ...readRecent().filter((x) => x !== q)].slice(0, 5))) } catch { /* ignore */ } }

const QUICK = [
  { title: 'ERP Portfolio', to: '/erp', icon: 'boxes' },
  { title: 'Services', to: '/services', icon: 'layers' },
  { title: 'Projects', to: '/projects', icon: 'dashboard' },
  { title: 'Apply for an internship', to: '/careers#internship', icon: 'graduation' },
  { title: 'Contact us', to: '/contact', icon: 'file' },
]

function Highlight({ text, query }) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return text
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'ig')
  return String(text).split(re).map((part, i) => (re.test(part) && i % 2 === 1
    ? <mark key={i} className="rounded bg-accent/25 px-0.5 text-ink">{part}</mark>
    : <span key={i}>{part}</span>))
}

/** Site-wide search dialog — open with the header button, Ctrl/⌘ + K or "/". */
export default function SearchPalette({ onClose }) {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [active, setActive] = useState(0)
  const [recent, setRecent] = useState(readRecent)
  const input = useRef(null)
  const listRef = useRef(null)
  const dialog = useRef(null)

  const results = useMemo(() => search(q, cat), [q, cat])
  const counts = useMemo(() => {
    const all = search(q, 'all', 500)
    return Object.fromEntries(CATEGORIES.map((c) => [c.id, c.id === 'all' ? all.length : all.filter((r) => r.cat === c.id).length]))
  }, [q])

  useEffect(() => { setActive(0) }, [q, cat])
  useEffect(() => {
    input.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const go = (r) => {
    if (q.trim()) saveRecent(q.trim())
    onClose()
    if (r.href && !r.to) window.open(r.href, '_blank', 'noopener')
    else navigate(r.to)
  }

  const onKey = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose() }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter' && results[active]) { e.preventDefault(); go(results[active]) }
    else if (e.key === 'Tab') {
      // keep focus inside the dialog
      const f = dialog.current.querySelectorAll('input,button,[href]')
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }

  const catLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label || id

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-3 pt-[8vh] sm:p-6 sm:pt-[12vh]" onKeyDown={onKey}>
      <div className="search-backdrop absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div ref={dialog} role="dialog" aria-modal="true" aria-label="Search the website"
        className="search-panel relative flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_40px_80px_-20px_rgb(15_42_34/.45)]">

        {/* input */}
        <div className="flex items-center gap-3 border-b border-line px-4 sm:px-5">
          <Search size={20} className="shrink-0 text-brand" aria-hidden="true" />
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} type="search"
            placeholder="Search services, projects, ERP apps, FAQs…" aria-label="Search"
            aria-controls="search-results" aria-activedescendant={results[active] ? `sr-${results[active].id}` : undefined}
            className="h-16 min-w-0 flex-1 bg-transparent text-lg text-ink outline-none placeholder:text-muted/70 [&::-webkit-search-cancel-button]:hidden" />
          {q && <button type="button" onClick={() => { setQ(''); input.current?.focus() }} className="rounded-md p-1.5 text-muted hover:bg-paper" aria-label="Clear search"><X size={18} /></button>}
          <button type="button" onClick={onClose} className="hidden rounded-md border border-line px-2 py-1 text-xs font-semibold text-muted hover:bg-paper sm:block">Esc</button>
        </div>

        {/* category chips */}
        {q && (
          <div className="flex gap-1.5 overflow-x-auto border-b border-line px-4 py-2.5 [scrollbar-width:none] sm:px-5" role="tablist" aria-label="Filter results">
            {CATEGORIES.filter((c) => c.id === 'all' || counts[c.id]).map((c) => (
              <button key={c.id} type="button" role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${cat === c.id ? 'bg-brand text-white' : 'bg-paper text-ink hover:bg-brand-soft hover:text-brand'}`}>
                {c.label}<span className={`text-xs ${cat === c.id ? 'text-white/75' : 'text-muted'}`}>{counts[c.id]}</span>
              </button>
            ))}
          </div>
        )}

        <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto p-2">
          {!q ? (
            <div className="space-y-5 p-3">
              {recent.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted">
                    Recent searches
                    <button type="button" className="normal-case tracking-normal text-brand hover:underline" onClick={() => { try { localStorage.removeItem(RECENT_KEY) } catch { /* */ } setRecent([]) }}>Clear</button>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((r) => <button key={r} type="button" onClick={() => setQ(r)} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm hover:border-brand hover:text-brand"><Clock size={14} aria-hidden="true" />{r}</button>)}
                  </div>
                </div>
              )}
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted"><Sparkles size={13} aria-hidden="true" />Popular</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => <button key={s} type="button" onClick={() => setQ(s)} className="rounded-full bg-paper px-3 py-1.5 text-sm transition-colors hover:bg-brand-soft hover:text-brand">{s}</button>)}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Quick links</p>
                <ul className="grid gap-1 sm:grid-cols-2">
                  {QUICK.map((x) => (
                    <li key={x.to}>
                      <button type="button" onClick={() => go(x)} className="group flex min-h-[48px] w-full items-center gap-3 rounded-lg px-3 text-left hover:bg-paper">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-soft text-brand"><Icon name={x.icon} size={18} className="icon-anim" /></span>
                        <span className="font-medium">{x.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : results.length ? (
            <ul id="search-results" role="listbox" aria-label="Search results">
              {results.map((r, i) => {
                const on = i === active
                return (
                  <li key={r.id} id={`sr-${r.id}`} role="option" aria-selected={on} data-idx={i}>
                    <button type="button" tabIndex={-1} onMouseMove={() => setActive(i)} onClick={() => go(r)}
                      className={`group flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors ${on ? 'bg-brand-soft' : ''}`}>
                      <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${on ? 'bg-brand text-white' : 'bg-paper text-brand'}`}>
                        <Icon name={r.icon} size={19} className={on ? 'icon-anim' : ''} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="min-w-0 break-words font-semibold text-ink sm:truncate"><Highlight text={r.title} query={q} /></span>
                          {r.badge && <span translate="no" className="notranslate shrink-0 rounded bg-white px-1.5 py-0.5 text-[11px] font-bold text-muted ring-1 ring-line">{r.badge}</span>}
                        </span>
                        <span className="mt-0.5 line-clamp-2 block text-sm text-muted">{r.subtitle}</span>
                      </span>
                      <span className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
                        <span className="rounded-full bg-paper px-2 py-0.5 text-[11px] font-semibold text-muted">{catLabel(r.cat)}</span>
                        {on && (r.href && !r.to ? <ArrowUpRight size={16} className="text-brand" aria-hidden="true" /> : <CornerDownLeft size={16} className="text-brand" aria-hidden="true" />)}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="p-10 text-center">
              <Search size={36} className="mx-auto text-line" aria-hidden="true" />
              <p className="mt-3 font-semibold">No results for “{q}”</p>
              <p className="mt-1 text-sm text-muted">Try a different word, or <button type="button" onClick={() => go({ to: '/contact' })} className="link">ask our team</button>.</p>
            </div>
          )}
        </div>

        <div className="hidden items-center justify-between gap-4 border-t border-line bg-paper px-5 py-2.5 text-xs text-muted sm:flex">
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="kbd"><ArrowUp size={11} /></kbd><kbd className="kbd"><ArrowDown size={11} /></kbd>move</span>
            <span className="flex items-center gap-1"><kbd className="kbd"><CornerDownLeft size={11} /></kbd>open</span>
            <span className="flex items-center gap-1"><kbd className="kbd">Esc</kbd>close</span>
          </span>
          <span aria-live="polite">{q ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Type to search'}</span>
        </div>
      </div>
    </div>
  )
}
