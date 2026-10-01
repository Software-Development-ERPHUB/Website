import { ArrowUpRight } from 'lucide-react'
import { AnimIcon } from './AnimIcon'
import { Reveal, CountUp } from './Motion'
import PanelArt from './PanelArt'

/**
 * Banner with a background illustration + module grid.
 * Used for the group-wide HRMS and Audit systems.
 *   art    — 'hrms' | 'audit' built-in SVG background
 *   image  — optional real photo (import it and pass the URL); replaces the art
 *   tech   — ['React', …] technology chips
 *   stats  — [{ v, l }] optional
 *   link   — { href, label } optional external button
 */
export default function ModulePanel({ icon, eyebrow, title, body, modules, stats, link, tech, art, image, tone = 'ink', cols = 5 }) {
  const colCls = cols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-5'
  const bg = tone === 'green'
    ? 'linear-gradient(120deg,#00361A 0%,#006B33 55%,#00923F 100%)'
    : 'linear-gradient(120deg,#0B211A 0%,#143629 55%,#1c4a37 100%)'
  return (
    <Reveal dir="up" className="overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
      <div className="relative isolate overflow-hidden p-6 sm:p-8 lg:min-h-[320px] lg:p-10" style={{ background: bg }}>
        {image ? (
          <>
            <img src={image} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10" style={{ background: tone === 'green' ? 'linear-gradient(90deg,#00361A 30%,rgb(0 107 51 / .55))' : 'linear-gradient(90deg,#0B211A 30%,rgb(15 42 34 / .5))' }} aria-hidden="true" />
          </>
        ) : (
          <>
            <div className="grid-bg-dark pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[420px] w-[420px] rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
            {art && <PanelArt variant={art} />}
          </>
        )}

        <div className="relative max-w-lg">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
              <AnimIcon icon={icon} size={26} color="#fff" anim="pulse" always />
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent ring-1 ring-white/15 backdrop-blur">
              <span className="live-dot !h-1.5 !w-1.5" />{eyebrow}
            </span>
          </div>
          <h3 className="mt-5 font-display text-2xl font-semibold !text-white sm:text-3xl">{title}</h3>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-white/75">{body}</p>

          {tech && (
            <ul translate="no" className="notranslate mt-5 flex flex-wrap gap-2" aria-label="Built with">
              {tech.map((t, i) => (
                <li key={t} className="slide-in inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur" style={{ animationDelay: `${i * 0.08}s` }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />{t}
                </li>
              ))}
            </ul>
          )}

          {stats && (
            <dl className="mt-6 flex flex-wrap gap-2">
              {stats.map((s) => (
                <div key={s.l} className="min-w-[80px] rounded-lg bg-white/10 px-3.5 py-2 text-center ring-1 ring-white/15 backdrop-blur">
                  <dd className="font-display text-lg font-semibold text-accent"><CountUp value={s.v} /></dd>
                  <dt className="text-[11px] text-white/60">{s.l}</dt>
                </div>
              ))}
            </dl>
          )}
          {link && (
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="btn-on-dark ia mt-6 !min-h-[44px]">
              {link.label}<span className="ai ai-nudge"><ArrowUpRight size={16} /></span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
      <ul className={`grid gap-px bg-line sm:grid-cols-2 ${colCls}`}>
        {modules.map((m) => (
          <li key={m.label} className="ia group relative bg-white p-5 transition-colors duration-300 hover:bg-[#F2F8F4]">
            <span className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100" aria-hidden="true" />
            <span className="icon-tile mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft">
              <AnimIcon icon={m.icon} size={19} color="rgb(var(--c-primary))" />
            </span>
            <h4 className="font-sans text-sm font-semibold text-ink">{m.label}</h4>
            <p className="mt-1 text-[13px] leading-snug text-muted">{m.desc}</p>
          </li>
        ))}
        {/* fill empty cells so the grid lines stay clean */}
        {Array.from({ length: (cols - (modules.length % cols)) % cols }).map((_, i) => <li key={'f' + i} className="hidden bg-white lg:block" aria-hidden="true" />)}
      </ul>
    </Reveal>
  )
}
