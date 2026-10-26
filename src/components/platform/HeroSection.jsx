import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MonitorPlay } from 'lucide-react'
import { PIcon } from './shared'
import { MODULES, PLATFORM } from '../../content/platform'
import { LEADERS } from '../../content/leadership'
import mdBanner from '../../assets/img/hero-md.webp'
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

/** Short line under each module name in the hero (as in the Voltech ERP reference banner). */
const MODULE_LINE = { hrms: 'Empower your people', finance: 'Control your finances', manufacturing: 'Optimise your production' }

/** Words typed one letter at a time, then erased, in a loop. Shows the first word, still, for reduced motion. */
export function Typewriter({ words, className = '' }) {
  const [i, setI] = useState(0)
  const [n, setN] = useState(words[0].length)
  const [del, setDel] = useState(false)
  const [still, setStill] = useState(true)
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!reduce) { setStill(false); setN(0) }
  }, [])
  useEffect(() => {
    if (still) return undefined
    const w = words[i]
    let t
    if (!del && n < w.length) t = setTimeout(() => setN(n + 1), 75)
    else if (!del) t = setTimeout(() => setDel(true), 1900)
    else if (n > 0) t = setTimeout(() => setN(n - 1), 35)
    else t = setTimeout(() => { setDel(false); setI((i + 1) % words.length) }, 250)
    return () => clearTimeout(t)
  }, [n, del, i, still, words])
  return (
    <span className={className} aria-hidden="true">
      {words[i].slice(0, n)}<span className="type-caret" />
    </span>
  )
}

const TYPED = ['Every Possibility.', 'Smarter HR.', 'Clearer Finance.', 'Faster Production.']

/**
 * Home page hero: the message on the left with a typed second line, and on the
 * right the Chairman & MD banner (city skyline and the three modules).
 * Sits under the header (negative top margin). Drop a photo named
 * `home-hero` in src/assets/photos to use a different banner.
 */
export default function HeroSection() {
  const md = LEADERS.find((l) => l.id === 'cmd') || LEADERS[0]
  const art = photo('home-hero') || mdBanner
  const alt = `${md.name}, ${md.role} of Voltech Group, with the HRMS, Finance and Manufacturing modules over a city skyline`
  return (
    <section className="hero-sky relative isolate -mt-[var(--header-h)] overflow-hidden pt-[var(--header-h)]" aria-labelledby="hero-h">
      <div className="container-page grid items-center gap-10 pb-14 pt-10 sm:pt-14 lg:min-h-[640px] lg:grid-cols-[1fr_1.08fr] lg:gap-12 lg:pb-20 lg:pt-12">
        <div className="max-w-2xl">
          <p className="float-in mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-[0.8rem] font-semibold tracking-wide text-brand shadow-sm ring-1 ring-brand/10">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />{PLATFORM.brand} · {PLATFORM.identity}
          </p>
          <h1 id="hero-h" className="font-display text-[clamp(2.2rem,1.4rem+2.9vw,3.7rem)] font-bold leading-[1.06] tracking-[-0.03em] text-ink">
            <span className="sr-only">One Enterprise. Every Possibility.</span>
            <span className="float-in block" aria-hidden="true">One Enterprise.</span>
            <Typewriter words={TYPED} className="block min-h-[1.06em] text-accent" />
          </h1>
          <p className="float-in mt-5 max-w-xl text-[clamp(1rem,.95rem+.3vw,1.15rem)] leading-relaxed text-ink/80" style={{ animationDelay: '.35s' }}>{PLATFORM.lead}</p>
          <ul className="float-in mt-7 flex flex-wrap gap-x-6 gap-y-4" style={{ animationDelay: '.5s' }} aria-label="Modules">
            {MODULES.map((m) => (
              <li key={m.id}>
                <Link to={m.route} className="group flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-md transition-transform duration-300 group-hover:scale-110" style={{ background: m.color }}><PIcon name={m.icon} size={22} /></span>
                  <span>
                    <span className="block font-display text-lg font-semibold leading-tight text-ink group-hover:text-brand">{m.name}</span>
                    <span className="block text-xs text-muted">{MODULE_LINE[m.id]}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="float-in mt-8 flex flex-col gap-3 xs:flex-row" style={{ animationDelay: '.65s' }}>
            <Link to="/client-demo" className="btn-primary group rounded-full px-6"><MonitorPlay size={18} aria-hidden="true" />See the Client Demo<ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></Link>
            <Link to="/platform" className="btn group rounded-full border-2 border-brand bg-white/70 px-6 text-brand hover:bg-white">Explore the platform</Link>
          </div>
        </div>

        {/* right: the Chairman & MD banner with the three modules */}
        <figure className="float-in relative mx-auto w-full max-w-[640px]" style={{ animationDelay: '.25s' }}>
          <div className="absolute -inset-4 -z-10 rounded-[2.25rem] bg-gradient-to-br from-accent/25 via-white/0 to-[#049D83]/20 blur-2xl" aria-hidden="true" />
          <div className="overflow-hidden rounded-[1.75rem] shadow-pop ring-4 ring-white">
            <img src={art} alt={alt} width="1160" height="658" fetchpriority="high" className="aspect-[1160/658] w-full object-cover" />
          </div>
          <figcaption className="mt-5 text-center">
            <span className="block font-display font-semibold text-ink">{md.name}</span>
            <span className="block text-xs text-muted">{md.role}, Voltech Group</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
