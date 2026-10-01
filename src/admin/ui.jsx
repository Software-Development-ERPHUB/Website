import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { CheckCircle2, CircleAlert, Loader2, X } from 'lucide-react'

/* ── Status badge ── */
export function StatusBadge({ status, hasChanges }) {
  const map = {
    draft: ['Draft', 'bg-amber-50 text-amber-800 ring-amber-200'],
    published: ['Published', 'bg-green-50 text-green-800 ring-green-200'],
    archived: ['Archived', 'bg-slate-100 text-slate-600 ring-slate-200'],
  }
  const [label, cls] = map[status] || map.draft
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${cls}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${status === 'published' ? 'bg-green-600' : status === 'archived' ? 'bg-slate-400' : 'bg-amber-500'}`} />{label}
      </span>
      {status === 'published' && hasChanges && (
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-800 ring-1 ring-blue-200">Unpublished changes</span>
      )}
    </span>
  )
}

export function Spinner({ className = '' }) {
  return <Loader2 className={`animate-spin ${className}`} size={18} aria-hidden="true" />
}

export function PageTitle({ title, desc, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-[1.7rem]">{title}</h1>
        {desc && <p className="mt-1 text-sm text-muted">{desc}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function Empty({ icon: I, title, children }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-line bg-white px-6 py-14 text-center">
      {I && <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand"><I size={26} aria-hidden="true" /></span>}
      <p className="mt-4 font-display text-lg font-semibold">{title}</p>
      {children && <div className="mt-1 max-w-sm text-sm text-muted">{children}</div>}
    </div>
  )
}

/* ── Modal ── */
export function Modal({ title, onClose, children, wide = false, footer }) {
  const ref = useRef(null)
  useEffect(() => {
    const prev = document.activeElement
    ref.current?.querySelector('input,button,textarea,select')?.focus()
    const esc = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', esc)
    const o = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = o; prev?.focus?.() }
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div className="search-backdrop absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div ref={ref} role="dialog" aria-modal="true" aria-label={title}
        className={`search-panel relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-pop sm:rounded-2xl ${wide ? 'sm:max-w-5xl' : 'sm:max-w-lg'}`}>
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-muted hover:bg-paper" aria-label="Close"><X size={18} /></button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-line bg-paper px-5 py-3">{footer}</div>}
      </div>
    </div>
  )
}

/* ── Confirm dialog ── */
export function useConfirm() {
  const [state, setState] = useState(null)
  const confirm = useCallback((opts) => new Promise((resolve) => setState({ ...opts, resolve })), [])
  const el = state && (
    <Modal title={state.title || 'Are you sure?'} onClose={() => { state.resolve(false); setState(null) }}
      footer={<>
        <button type="button" className="btn-secondary !min-h-[40px]" onClick={() => { state.resolve(false); setState(null) }}>Cancel</button>
        <button type="button" className={`${state.danger ? 'btn-danger' : 'btn-primary'} !min-h-[40px]`} onClick={() => { state.resolve(true); setState(null) }}>{state.confirm || 'Confirm'}</button>
      </>}>
      <p className="text-muted">{state.message}</p>
    </Modal>
  )
  return [confirm, el]
}

/* ── Toasts ── */
const ToastCtx = createContext(() => {})
export function ToastProvider({ children }) {
  const [list, setList] = useState([])
  const push = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setList((l) => [...l, { id, message, type }])
    setTimeout(() => setList((l) => l.filter((t) => t.id !== id)), 4200)
  }, [])
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[300] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2" role="status" aria-live="polite">
        {list.map((t) => (
          <div key={t.id} className={`slide-in pointer-events-auto flex items-start gap-3 rounded-xl border bg-white p-4 shadow-pop ${t.type === 'error' ? 'border-red-200' : 'border-green-200'}`}>
            {t.type === 'error' ? <CircleAlert className="shrink-0 text-red-600" size={20} /> : <CheckCircle2 className="shrink-0 text-green-600" size={20} />}
            <p className="text-sm text-ink">{t.message}</p>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}
export const useToast = () => useContext(ToastCtx)

export function Pager({ page, limit, total, onPage }) {
  const pages = Math.max(1, Math.ceil(total / limit))
  if (pages <= 1) return null
  return (
    <div className="mt-4 flex items-center justify-between text-sm text-muted">
      <span>Page {page} of {pages} · {total} items</span>
      <div className="flex gap-2">
        <button type="button" className="btn-secondary !min-h-[36px] !px-3" disabled={page <= 1} onClick={() => onPage(page - 1)}>Previous</button>
        <button type="button" className="btn-secondary !min-h-[36px] !px-3" disabled={page >= pages} onClick={() => onPage(page + 1)}>Next</button>
      </div>
    </div>
  )
}
