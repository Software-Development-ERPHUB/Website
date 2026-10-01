import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'

/** Accessible accordion (button + region, aria-expanded/controls). */
export default function Accordion({ items, headingLevel = 3, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen)
  const base = useId()
  const H = `h${headingLevel}`
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it, i) => {
        const isOpen = open === i
        const bid = `${base}-b${i}`, pid = `${base}-p${i}`
        return (
          <div key={i}>
            <H className="!font-sans">
              <button
                id={bid}
                type="button"
                aria-expanded={isOpen}
                aria-controls={pid}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left text-base font-semibold text-ink hover:text-brand sm:text-[1.05rem]"
              >
                <span>{it.q}</span>
                <ChevronDown size={20} aria-hidden="true" className={`mt-0.5 shrink-0 text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            </H>
            <div id={pid} role="region" aria-labelledby={bid} hidden={!isOpen} className="pb-6 pr-8">
              <p className="max-w-prose text-muted">{it.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
