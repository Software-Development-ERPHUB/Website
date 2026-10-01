import { TECH_GROUPS } from '../../content/company'

/** Scrolling strip of the technologies we use (pauses on hover, static for reduced motion). */
export default function TechMarquee() {
  const items = TECH_GROUPS.flatMap((g) => g.items.filter((t) => t.tier === 'core').map((t) => t.name))
  const row = (hidden) => (
    <ul translate="no" className="notranslate flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />{t}
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-label="Technologies we use" className="marquee overflow-hidden border-b border-line bg-paper py-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="marquee-track">{row(false)}{row(true)}</div>
    </section>
  )
}
