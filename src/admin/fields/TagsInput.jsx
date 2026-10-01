import { useState } from 'react'
import { X } from 'lucide-react'

export default function TagsInput({ id, value = [], onChange }) {
  const [text, setText] = useState('')
  const add = () => {
    const t = text.trim().replace(/,$/, '')
    if (t && !value.includes(t)) onChange([...value, t].slice(0, 20))
    setText('')
  }
  return (
    <div className="flex min-h-[48px] flex-wrap items-center gap-1.5 rounded-lg border border-line bg-white px-2 py-1.5 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
      {value.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 rounded-md bg-brand-soft py-1 pl-2.5 pr-1 text-sm font-medium text-brand">
          {t}
          <button type="button" onClick={() => onChange(value.filter((x) => x !== t))} className="rounded p-0.5 hover:bg-white" aria-label={`Remove ${t}`}><X size={13} /></button>
        </span>
      ))}
      <input id={id} value={text} onChange={(e) => setText(e.target.value)} onBlur={add}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add() }
          if (e.key === 'Backspace' && !text && value.length) onChange(value.slice(0, -1))
        }}
        placeholder={value.length ? '' : 'Type and press Enter'} className="min-w-[120px] flex-1 bg-transparent px-1 py-1 text-sm outline-none" />
    </div>
  )
}
