import { Link } from 'react-router-dom'
import { ArrowRight, MonitorPlay, Users, AppWindow, Building2 } from 'lucide-react'
import { PLATFORM } from '../../content/platform'
import { LEADERS } from '../../content/leadership'
import { COMPANIES } from '../../data/companies'
import mdHero from '../../assets/img/md-hero.webp'
import energy from '../../assets/img/bg-energy.webp'
import { photo } from '../../content/photos'
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

const TOTAL_USERS = COMPANIES.reduce((s, c) => s + c.totalUsers, 0)
const APP_COUNT = COMPANIES.reduce((s, c) => s + c.apps.length, 0) + 1

const STATS = [
  { icon: Users, value: `${TOTAL_USERS.toLocaleString()}+`, label: 'Employees use our applications daily' },
  { icon: AppWindow, value: `${APP_COUNT}+`, label: 'Applications built & live' },
  { icon: Building2, value: `${COMPANIES.length}`, label: 'Group companies served' },
]

/**
 * Home page hero: software message on the left, the Chairman & MD on the
 * right (clients know Voltech through him), with a clean track-record strip.
 * Sits under the transparent header (negative top margin).
 */
export default function HeroSection() {
  const md = LEADERS.find((l) => l.id === 'cmd') || LEADERS[0]
  const bg = photo('home-hero')
  return (
    <section className="relative isolate -mt-[var(--header-h)] overflow-hidden bg-ink pt-[var(--header-h)] text-white" aria-labelledby="hero-h">
      {bg ? (
        <>
          <img src={bg} alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-ink/80" aria-hidden="true" />
        </>
      ) : (
        <>
          <img src={energy} alt="" aria-hidden="true" className="absolute inset-y-0 right-0 -z-20 h-full w-full object-cover object-right lg:w-3/4" />
          <div className="absolute inset-0 -z-10 bg-ink/85" aria-hidden="true" />
        </>
      )}

      <div className="container-page grid min-h-[min(92vh,860px)] items-center gap-12 py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-20">
        <div className="max-w-2xl">
          <p className="float-in mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[0.82rem] font-semibold tracking-wide text-white/85 ring-1 ring-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />{PLATFORM.brand} · {PLATFORM.identity}
          </p>
          <HeroHeadline lines={PLATFORM.headline} accentWords={['Possibility']} className="text-[clamp(2.4rem,1.5rem+3.6vw,4.4rem)]" />
          <span id="hero-h" className="sr-only">{PLATFORM.headline.join(' ')}</span>
          <p className="float-in mt-7 max-w-xl text-[clamp(1.05rem,.98rem+.35vw,1.22rem)] leading-relaxed text-white/80" style={{ animationDelay: '.55s' }}>{PLATFORM.lead}</p>
          <div className="float-in mt-9 flex flex-col gap-3 xs:flex-row" style={{ animationDelay: '.7s' }}>
            <Link to="/client-demo" className="btn group bg-accent text-ink hover:bg-white"><MonitorPlay size={18} aria-hidden="true" />See the Client Demo<ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></Link>
            <Link to="/platform" className="btn-ghost-dark group">Explore the platform</Link>
          </div>
          <ul className="float-in mt-10 grid max-w-lg grid-cols-3 gap-3" style={{ animationDelay: '.85s' }} aria-label="Our track record">
            {STATS.map((s) => (
              <li key={s.label} className="rounded-xl bg-white/[.06] p-3.5 ring-1 ring-white/10">
                <s.icon size={18} className="text-accent" aria-hidden="true" />
                <p className="mt-2.5 font-display text-xl font-semibold text-white">{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium leading-tight text-white/65">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Chairman & MD — full photo, no crop */}
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <figure className="overflow-hidden rounded-[1.75rem] bg-white/[.04] shadow-pop ring-1 ring-white/15">
            <img src={mdHero} width="1040" height="780" alt={`${md.name}, ${md.role} of Voltech Group`} loading="eager" fetchpriority="high"
              className="block h-auto w-full" />
            <figcaption className="px-6 py-5">
              <p className="font-display text-xl font-semibold text-white">{md.name}</p>
              <p className="text-sm text-white/75">{md.role}, Voltech Group</p>
            </figcaption>
          </figure>
        </div>
      </div>
      <div className="hero-fade pointer-events-none absolute inset-x-0 bottom-0 h-16" aria-hidden="true" />
    </section>
  )
}
