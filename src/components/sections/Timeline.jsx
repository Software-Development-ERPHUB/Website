import { useEffect, useRef, useState } from 'react'
import { Rocket, Layers, Users, Factory, ShieldCheck, Globe, Code2, Briefcase, CalendarDays } from 'lucide-react'
import { JOURNEY } from '../../content/timeline'
import { SITE } from '../../content/site'
import Reveal from '../ui/Reveal'
import CountUp from '../ui/CountUp'

const ICONS = { rocket: Rocket, layers: Layers, users: Users, factory: Factory, shield: ShieldCheck, globe: Globe, code: Code2, briefcase: Briefcase }

/** Vertical journey timeline — the line fills and each milestone lights up as you scroll. */
export default function Timeline() {
  const wrap = useRef(null)
  const [fill, setFill] = useState(0)
  const [lit, setLit] = useState(-1)
  const nodes = useRef([])
  const nowYear = new Date().getFullYear()
  const years = nowYear - SITE.since

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fn = () => {
      const el = wrap.current
      if (!el) return
      if (reduce) { setFill(1); setLit(JOURNEY.length - 1); return }
      const r = el.getBoundingClientRect()
      const mid = window.innerHeight * 0.55
      setFill(Math.max(0, Math.min(1, (mid - r.top) / r.height)))
      let last = -1
      nodes.current.forEach((n, i) => { if (n && n.getBoundingClientRect().top < mid) last = i })
      setLit(last)
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    window.addEventListener('resize', fn)
    return () => { window.removeEventListener('scroll', fn); window.removeEventListener('resize', fn) }
  }, [])

  return (
    <section className="section relative overflow-hidden" aria-labelledby="journey-h">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden="true" />
      <div className="container-page relative">
        {/* header */}
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm font-semibold text-brand"><CalendarDays size={15} aria-hidden="true" />Our journey</span>
            <h2 id="journey-h" className="h-section mt-4">From {SITE.since} to today</h2>
            <p className="lead mt-4 max-w-2xl">How an internal software team grew into an IT services company — one application, one company and one lesson at a time.</p>
          </div>
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {[
              { v: String(SITE.since), l: 'Started' },
              { v: `${years}+`, l: 'Years running' },
              { v: '20+', l: 'Live applications' },
            ].map((s) => (
              <div key={s.l} className="bg-white p-4 text-center sm:p-5">
                <dd className="font-display text-2xl font-semibold text-brand sm:text-3xl"><CountUp value={s.v} /></dd>
                <dt className="mt-1 text-xs text-muted sm:text-sm">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* timeline */}
        <ol ref={wrap} className="relative">
          {/* track + animated fill */}
          <span className="absolute bottom-0 left-[19px] top-0 w-[3px] rounded-full bg-line md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
          <span className="absolute left-[19px] top-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-brand to-accent md:left-1/2 md:-translate-x-1/2"
            style={{ height: '100%', transform: `scaleY(${fill})`, transition: 'transform .15s linear' }} aria-hidden="true" />

          {JOURNEY.map((m, i) => {
            const I = ICONS[m.icon] || Rocket
            const right = i % 2 === 1
            const on = i <= lit
            const label = m.year === 'today' ? `Today · ${nowYear}` : m.year || `Chapter ${i + 1}`
            return (
              <li key={m.title} className="relative pb-10 pl-14 last:pb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0 md:[&:not(:first-child)]:-mt-16">
                {/* node */}
                <span ref={(el) => (nodes.current[i] = el)}
                  className={`absolute left-0 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 md:left-1/2 md:-translate-x-1/2 ${on ? 'scale-110 border-brand bg-brand text-white shadow-[0_0_0_6px_rgb(0_116_56/.15)]' : 'border-line bg-white text-muted'}`}
                  aria-hidden="true">
                  <I size={18} />
                  {on && i === lit && <span className="absolute inset-0 animate-ping rounded-full bg-brand/30" />}
                </span>

                <div className={right ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}>
                  {/* Reveal keeps a static className (it adds 'is-in' itself); the lit state lives on the inner card */}
                  <Reveal delay={60}>
                  <div className={`group rounded-xl border bg-white p-5 transition-[box-shadow,border-color,transform] duration-500 hover:-translate-y-1 hover:shadow-pop sm:p-6 ${on ? 'border-brand/40 shadow-lift' : 'border-line'}`}>
                    <span className={`inline-flex items-center rounded-md px-2.5 py-1 font-display text-sm font-semibold ${m.year ? 'bg-brand text-white' : 'bg-brand-soft text-brand'}`}>{label}</span>
                    <h3 className="h-card mt-3">{m.title}</h3>
                    <p className="mt-2 text-[0.95rem] text-muted">{m.body}</p>
                    {m.tags?.length > 0 && (
                      <ul translate="no" className={`notranslate mt-4 flex flex-wrap gap-1.5 ${right ? '' : 'md:justify-end'}`}>
                        {m.tags.map((t) => <li key={t} className="chip">{t}</li>)}
                      </ul>
                    )}
                  </div>
                  </Reveal>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
