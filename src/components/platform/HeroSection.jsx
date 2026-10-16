import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle } from 'lucide-react'
import HeroArt from './HeroArt'
import { MiniPreview } from './ModulePreview'
import { useParallax } from './shared'
import { MODULES, PLATFORM } from '../../content/platform'

/** Animated headline: each word rises in; words in `accent` get the orange highlight. */
export function HeroHeadline({ lines, accentWords = [], accent = 'rgb(var(--c-accent))', as: H = 'h1', className = '' }) {
  let i = 0
  return (
    <H className={`font-display font-semibold leading-[1.02] tracking-[-0.03em] !text-white ${className}`}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((w) => {
            const d = i++ * 90
            const hl = accentWords.includes(w.replace(/[.,]/g, ''))
            return (
              <span key={w + d} className="hero-word mr-[0.22em]" style={{ animationDelay: `${120 + d}ms`, color: hl ? accent : undefined }}>{w}</span>
            )
          })}
        </span>
      ))}
    </H>
  )
}

/**
 * Home page hero: full-bleed cinematic scene with parallax, animated
 * headline and floating HRMS / Finance / Manufacturing previews.
 * Sits under the transparent header (negative top margin).
 */
export default function HeroSection() {
  const bg = useParallax(0.18)
  const cards = useParallax(-0.06)
  return (
    <section className="relative isolate -mt-[var(--header-h)] overflow-hidden bg-ink pt-[var(--header-h)] text-white" aria-labelledby="hero-h">
      <div className="absolute inset-0 -z-20">
        <div ref={bg} className="absolute -inset-y-16 inset-x-0 will-change-transform">
          <HeroArt className="h-full w-full" />
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B1830]/95 via-[#10233F]/75 to-[#10233F]/20" aria-hidden="true" />
      <div className="light-sweep pointer-events-none absolute -top-1/2 left-1/3 -z-10 h-[200%] w-40 bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />

      <div className="container-page grid min-h-[min(92vh,860px)] items-center gap-12 py-16 lg:grid-cols-[1.25fr_1fr] lg:py-20">
        <div className="max-w-2xl">
          <p className="float-in mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[0.82rem] font-semibold tracking-wide text-white/85 ring-1 ring-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />{PLATFORM.brand} · {PLATFORM.identity}
          </p>
          <HeroHeadline lines={PLATFORM.headline} accentWords={['Possibility']} className="text-[clamp(2.5rem,1.5rem+4vw,4.6rem)]" />
          <span id="hero-h" className="sr-only">{PLATFORM.headline.join(' ')}</span>
          <p className="float-in mt-7 max-w-xl text-[clamp(1.05rem,.98rem+.35vw,1.25rem)] leading-relaxed text-white/80" style={{ animationDelay: '.55s' }}>{PLATFORM.lead}</p>
          <div className="float-in mt-9 flex flex-col gap-3 xs:flex-row" style={{ animationDelay: '.7s' }}>
            <a href="#solutions" className="btn group bg-accent text-ink hover:bg-white">Explore Solutions<ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></a>
            <Link to="/platform" className="btn-ghost-dark group"><PlayCircle size={18} aria-hidden="true" className="transition-transform group-hover:scale-110" />Watch Platform Overview</Link>
          </div>
          <ul className="float-in mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70" style={{ animationDelay: '.85s' }} aria-label="Modules">
            {MODULES.map((m) => (
              <li key={m.id}><Link to={m.route} className="inline-flex items-center gap-2 hover:text-white"><span className="h-2 w-2 rounded-full" style={{ background: m.color }} aria-hidden="true" />{m.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* floating module previews */}
        <div ref={cards} className="relative hidden h-[460px] lg:block" aria-hidden="true">
          {MODULES.map((m, i) => (
            <div key={m.id} className="float-in absolute" style={{ animationDelay: `${0.5 + i * 0.22}s`, ...[{ top: 10, left: 40 }, { top: 150, right: 0 }, { top: 300, left: 0 }][i] }}>
              <div className={['bob', 'bob-2', 'bob-3'][i]}><MiniPreview m={m} /></div>
            </div>
          ))}
          <svg className="absolute inset-0 -z-10 h-full w-full" viewBox="0 0 460 460" fill="none">
            <path d="M150 120 C 260 140, 300 170, 330 200" stroke="rgb(255 255 255 / .25)" strokeWidth="1.5" className="dash-flow" />
            <path d="M330 300 C 260 330, 200 330, 150 350" stroke="rgb(255 255 255 / .25)" strokeWidth="1.5" className="dash-flow" />
          </svg>
        </div>
      </div>
      <div className="hero-fade pointer-events-none absolute inset-x-0 bottom-0 h-20" aria-hidden="true" />
    </section>
  )
}
