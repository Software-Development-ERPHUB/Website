import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Layers, Box, MonitorPlay, SlidersHorizontal, ShieldCheck, Headset } from 'lucide-react'
import modulesArt from '../../assets/img/modules-art.webp'
import Reveal from '../ui/Reveal'
import { ScreenBackdrop } from './ModulePreview'
import Scene from '../art/Scene'
import { photo as dropIn } from '../../content/photos'
import { PIcon, Eyebrow, useParallax } from './shared'
import { MODULES, DEPLOYMENT, INDUSTRY_SHOWCASE, BENEFITS } from '../../content/platform'
import { findProduct, productHref } from '../../content/products'
import { img } from '../../content/images'

/* ───────────────────────── Module card ───────────────────────── */

/** Whole card is one link to the module's solution page. Extra features slide open on hover/focus. */
export function SolutionCard({ m, index = 0 }) {
  const shown = m.features.slice(0, 4)
  const extra = m.features.slice(4)
  return (
    <Reveal delay={index * 120} className="h-full">
      <Link to={m.route} className="mod-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-lift transition-[transform,box-shadow] duration-500 hover:-translate-y-2 hover:shadow-pop"
        style={{ '--m': m.rgb }} aria-label={`Explore ${m.name}: ${m.description}`}>
        <div className="relative h-52 overflow-hidden bg-ink">
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">{dropIn(`suite-${m.id}`) ? <img src={dropIn(`suite-${m.id}`)} alt="" className="h-full w-full object-cover" /> : <Scene kind={m.id} color={m.color} soft={m.soft} tiles={false} />}</div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" aria-hidden="true" />
          <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white ring-1 ring-white/30 backdrop-blur transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
            <PIcon name={m.icon} size={24} />
          </span>
          <span className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">{m.full}</span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <span className="accent-line mb-4 block h-1 w-full rounded-full" style={{ background: m.color }} aria-hidden="true" />
          <h3 className="font-display text-2xl font-semibold">{m.name}</h3>
          <p className="mt-2 text-muted">{m.description}</p>
          <ul className="mt-5 space-y-2 text-[0.95rem]">
            {shown.map((f) => <li key={f} className="flex items-start gap-2"><Check size={17} className="mt-0.5 shrink-0" style={{ color: m.color }} aria-hidden="true" />{f}</li>)}
          </ul>
          {extra.length > 0 && (
            <div className="mod-extra">
              <ul className="overflow-hidden text-[0.95rem]">
                {extra.map((f) => <li key={f} className="flex items-start gap-2 pt-2"><Check size={17} className="mt-0.5 shrink-0" style={{ color: m.color }} aria-hidden="true" />{f}</li>)}
              </ul>
            </div>
          )}
          <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold" style={{ color: m.text }}>
            Explore {m.name}<ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

/** The three promises under the modules section (from the Voltech ERP reference banner). */
const PROMISES = [
  { icon: SlidersHorizontal, title: 'Customisable for your needs', body: 'Adapt each module to your own processes.', color: '#7C3AED' },
  { icon: Layers, title: 'One platform, shared data', body: 'HR, finance and production use the same masters.', color: '#049D83' },
  { icon: ShieldCheck, title: 'Secure access by role', body: 'Each user sees only what their role allows.', color: '#1A7CFF' },
  { icon: Headset, title: 'Support from our team', body: 'The people who built it help you run it.', color: '#7C3AED' },
]

/**
 * "Three modules. One enterprise." Left: the modules as rows with icon, name and
 * key features, each linking to its page. Right: the Voltech ERP artwork
 * (people, finance, factory and the dashboard). Below: a strip of four promises.
 */
export function ModulesShowcase({ title = 'Three modules. One enterprise.', lead = 'Choose the module your business needs today, or bring them together as one integrated platform.' }) {
  const [first, ...rest] = title.split('. ')
  return (
    <section id="solutions" className="modules-sky relative isolate scroll-mt-20 overflow-hidden pb-14 pt-16 sm:pt-20 lg:pt-24" aria-labelledby="modules-h">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
        <Reveal>
          <Eyebrow>Enterprise Modules</Eyebrow>
          <h2 id="modules-h" className="mt-4 font-display text-[clamp(2rem,1.3rem+2.6vw,3.3rem)] font-bold leading-[1.06] tracking-[-0.03em] text-ink">
            {rest.length ? <>{first}.<br /><span className="text-accent">{rest.join('. ')}</span></> : title}
          </h2>
          <p className="lead mt-4 max-w-xl">{lead}</p>
          <ul className="mt-8 space-y-3">
            {MODULES.map((m, i) => (
              <Reveal as="li" key={m.id} delay={120 + i * 100}>
                <Link to={m.route} className="group flex items-center gap-4 rounded-2xl bg-white/80 p-3.5 pr-5 shadow-lift ring-1 ring-line backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-pop">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white shadow-md transition-transform duration-300 group-hover:scale-110" style={{ background: m.color }}><PIcon name={m.icon} size={24} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-display text-xl font-semibold text-ink">{m.name}</span>
                      <span className="text-sm text-muted">{m.full}</span>
                    </span>
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      {m.features.slice(0, 4).map((f) => <span key={f} className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ background: m.soft, color: m.text }}>{f}</span>)}
                    </span>
                  </span>
                  <ArrowRight size={20} aria-hidden="true" className="shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                  <span className="sr-only">Explore {m.name}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row">
            <Link to="/contact?demo=platform" className="btn-primary group rounded-full px-6">Request a Demo<ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></Link>
            <Link to="/platform" className="btn rounded-full border-2 border-brand bg-white/70 px-6 text-brand hover:bg-white">Explore our solutions</Link>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <img src={modulesArt} width="947" height="692" loading="lazy"
            alt="HRMS, Finance and Manufacturing pictured above a laptop and phone showing the Voltech ERP dashboard (sample figures)"
            className="modules-art mx-auto w-full max-w-[680px]" />
        </Reveal>
      </div>

      <div className="container-page mt-12">
        <ul className="grid gap-px overflow-hidden rounded-2xl bg-line shadow-lift ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 80} className="flex items-start gap-4 bg-white p-5 lg:p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: `${p.color}14`, color: p.color }}><p.icon size={24} aria-hidden="true" /></span>
              <span>
                <span className="block font-display font-semibold text-ink">{p.title}</span>
                <span className="mt-1 block text-sm text-muted">{p.body}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────────────────── Integrated architecture ───────────────────── */

const FLOWS = {
  hrms: 'Employees and workforce data',
  finance: 'Budgets, expenses and reporting',
  manufacturing: 'Production, inventory and procurement',
}

export function EnterpriseArchitecture({ cta = true }) {
  const [hr, fin, mfg] = MODULES
  return (
    <section className="relative isolate overflow-hidden bg-ink py-20 text-white sm:py-24 lg:py-28" aria-labelledby="arch-h">
      <div className="grid-bg-dark absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <Eyebrow dark>Integrated Enterprise Platform</Eyebrow>
          <h2 id="arch-h" className="mt-4 font-display text-[clamp(2rem,1.4rem+2.4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.025em] !text-white">Your Entire Enterprise, Connected.</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">HRMS, Finance and Manufacturing share one foundation: common users, masters and reporting, so information entered once can be used across the business.</p>
          <ul className="mt-7 space-y-3">
            {MODULES.map((m) => (
              <li key={m.id} className="flex items-start gap-3">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: m.color, boxShadow: `0 0 10px ${m.color}` }} aria-hidden="true" />
                <span><strong className="text-white">{m.name}:</strong> <span className="text-white/75">{FLOWS[m.id]}</span></span>
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-lg border border-white/10 bg-white/[.04] p-4 text-sm text-white/65">{DEPLOYMENT.note}</p>
          {cta && <Link to="/platform" className="btn-on-dark group mt-8">Explore the Enterprise Platform<ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></Link>}
        </Reveal>

        <Reveal delay={150}>
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <circle cx="260" cy="260" r="200" fill="none" stroke="#fff" strokeOpacity=".08" />
              <circle cx="260" cy="260" r="140" fill="none" stroke="#fff" strokeOpacity=".06" strokeDasharray="2 6" className="spin-slow" />
              {[[hr, 260, 70], [fin, 450, 390], [mfg, 70, 390]].map(([m, x, y]) => (
                <g key={m.id}>
                  <line x1="260" y1="260" x2={x} y2={y} stroke={m.color} strokeOpacity=".7" strokeWidth="2" className="dash-flow" />
                </g>
              ))}
              <path d="M260 70 Q 420 160 450 390" fill="none" stroke="#fff" strokeOpacity=".14" strokeWidth="1.5" className="dash-flow" />
              <path d="M450 390 Q 260 500 70 390" fill="none" stroke="#fff" strokeOpacity=".14" strokeWidth="1.5" className="dash-flow" />
              <path d="M70 390 Q 100 160 260 70" fill="none" stroke="#fff" strokeOpacity=".14" strokeWidth="1.5" className="dash-flow" />
            </svg>
            {/* core */}
            <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#002E7E] text-center shadow-[0_0_60px_rgb(255_107_44/.45)]">
              <Layers size={26} aria-hidden="true" />
              <span className="mt-1 font-display text-sm font-bold leading-tight">VOLTECH<br />Platform</span>
            </div>
            {[[hr, '50%', '13.5%'], [fin, '86.5%', '75%'], [mfg, '13.5%', '75%']].map(([m, l, t]) => (
              <Link key={m.id} to={m.route} className="group absolute -translate-x-1/2 -translate-y-1/2" style={{ left: l, top: t }}>
                <span className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl text-white shadow-lg ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110 sm:h-28 sm:w-28" style={{ background: m.gradient }}>
                  <PIcon name={m.icon} size={26} />
                  <span className="mt-1.5 font-display text-sm font-semibold">{m.name}</span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────── Module experience preview ─────────────────────── */

export function ModuleSpotlight({ m, flip = false, photo = null }) {
  const art = useParallax(0.08)
  return (
    <section className="section relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${m.soft}, #fff 70%)` }} aria-labelledby={`pv-${m.id}`}>
      <div className={`container-page grid items-center gap-12 lg:gap-14 ${flip ? 'lg:grid-cols-[1.3fr_0.9fr]' : 'lg:grid-cols-[0.9fr_1.3fr]'}`}>
        <Reveal className={flip ? 'lg:order-2' : ''}>
          <Eyebrow color={m.text}>{m.name} Experience</Eyebrow>
          <h2 id={`pv-${m.id}`} className="h-section mt-4">{m.tagline}</h2>
          <p className="lead mt-4">{m.previewLead}</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {m.features.slice(0, 6).map((f) => (
              <li key={f} className="flex items-center gap-2 text-[0.95rem]"><span className="flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ background: m.color }}><Check size={12} aria-hidden="true" /></span>{f}</li>
            ))}
          </ul>
          <Link to={m.route} className="btn group mt-8 text-white transition hover:brightness-110" style={{ background: m.text }}>Explore {m.name}<ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></Link>
        </Reveal>
        <Reveal delay={140} className={`relative ${flip ? 'lg:order-1' : ''}`}>
          {photo && (
            <div className="absolute -right-6 -top-10 hidden h-40 w-56 overflow-hidden rounded-2xl shadow-pop ring-4 ring-white xl:block">
              <img ref={art} src={photo.src} alt="" aria-hidden="true" loading="lazy" className="h-[120%] w-full object-cover" />
            </div>
          )}
          <div className="aspect-[16/11] overflow-hidden rounded-3xl shadow-pop ring-1 ring-line">
            {dropIn(`suite-${m.id}`) ? <img src={dropIn(`suite-${m.id}`)} alt="" loading="lazy" className="h-full w-full object-cover" /> : <Scene kind={m.id} color={m.color} soft={m.soft} />}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────── Industries ─────────────────────────── */

export function IndustryCarousel() {
  const row = useRef(null)
  const scroll = (dir) => row.current?.scrollBy({ left: dir * Math.min(row.current.clientWidth * 0.8, 420), behavior: 'smooth' })
  return (
    <section className="section bg-paper" aria-labelledby="ind-h">
      <div className="container-page">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <Eyebrow>Industries</Eyebrow>
            <h2 id="ind-h" className="h-section mt-4">Built where industry happens</h2>
            <p className="lead mt-4">Our modules grew out of the businesses of Voltech Group: power, engineering, projects and operations.</p>
          </Reveal>
          <div className="flex gap-2">
            <button type="button" onClick={() => scroll(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white transition hover:border-ink" aria-label="Previous industries"><ChevronLeft size={20} aria-hidden="true" /></button>
            <button type="button" onClick={() => scroll(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white transition hover:border-ink" aria-label="Next industries"><ChevronRight size={20} aria-hidden="true" /></button>
          </div>
        </div>
      </div>
      <ul ref={row} className="snap-row flex gap-5 overflow-x-auto px-5 pb-4 sm:px-6 lg:px-[max(2rem,calc((100vw_-_1200px)/2_+_2rem))]" aria-label="Industries">
        {INDUSTRY_SHOWCASE.map((x, i) => {
          const p = img(x.photo)
          return (
            <li key={x.id} className="w-[280px] shrink-0 sm:w-[340px]">
              <Reveal delay={i * 80}>
                <Link to={x.to} className="group block overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-line transition hover:-translate-y-1 hover:shadow-pop">
                  <div className="relative h-48 overflow-hidden bg-ink">
                    {p && <img src={p.src} width={p.w} height={p.h} alt={`${x.title} at a Voltech Group site`} loading="lazy" className="h-full w-full object-cover object-left-bottom transition-transform duration-700 group-hover:scale-110" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" aria-hidden="true" />
                    <h3 className="absolute bottom-4 left-5 right-5 font-display text-xl font-semibold !text-white">{x.title}</h3>
                  </div>
                  <p className="p-5 text-[0.95rem] text-muted">{x.body}</p>
                </Link>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* ─────────────────────────── Why Voltech ─────────────────────────── */

export function BenefitsSection() {
  return (
    <section className="section bg-white" aria-labelledby="why-h">
      <div className="container-page">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow>Why Voltech</Eyebrow>
          <h2 id="why-h" className="h-section mt-4">Built to grow with your business</h2>
        </Reveal>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal as="li" key={b.title} delay={(i % 3) * 100} className="ia group rounded-2xl border border-line p-6 transition hover:-translate-y-1 hover:border-accent/60 hover:shadow-lift">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                <PIcon name={b.icon} size={22} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{b.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ─────────────────── Integrated vs standalone ─────────────────── */

export function DeploymentOptions({ m = null }) {
  const color = m?.color || 'rgb(var(--c-accent))'
  const demo = m ? `/contact?demo=${m.id}` : '/contact?demo=platform'
  const label = m ? m.name : 'a module'
  return (
    <section className="section bg-paper" aria-labelledby="deploy-h">
      <div className="container-page">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow color={m?.text}>Deployment options</Eyebrow>
          <h2 id="deploy-h" className="h-section mt-4">Integrated or standalone. Your choice.</h2>
          <p className="lead mt-4">{m ? `${m.name} works on its own or as part of the full Voltech platform.` : 'Every module works on its own or as part of the full platform.'}</p>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            { k: 'integrated', icon: Layers, data: DEPLOYMENT.integrated, tag: 'Option A' },
            { k: 'standalone', icon: Box, data: DEPLOYMENT.standalone, tag: 'Option B' },
          ].map(({ k, icon: I, data, tag }, i) => (
            <Reveal key={k} delay={i * 120} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-lift sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{tag}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ background: k === 'integrated' ? 'rgb(var(--c-ink))' : color }}><I size={20} aria-hidden="true" /></span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold">{data.title}</h3>
                <p className="mt-2 text-muted">{k === 'standalone' && m ? `Deploy ${m.name} on its own for organizations that need only ${m.name}.` : data.body}</p>
                <DeployDiagram kind={k} m={m} />
                <ul className="mt-6 space-y-2">
                  {data.points.map((p) => <li key={p} className="flex items-start gap-2 text-[0.95rem]"><Check size={17} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />{p}</li>)}
                </ul>
                <Link to={demo} className={`mt-auto ${k === 'integrated' ? 'btn-primary' : 'btn-secondary'} group mt-8 self-start`}>
                  Request a Demo{k === 'standalone' ? ` of ${label}` : ''}<ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">{DEPLOYMENT.note}</p>
      </div>
    </section>
  )
}

function DeployDiagram({ kind, m }) {
  if (kind === 'integrated') {
    return (
      <svg viewBox="0 0 360 120" className="mt-6 w-full" role="img" aria-label="Three modules connected to one shared platform">
        <rect x="110" y="78" width="140" height="34" rx="8" fill="rgb(16 35 63)" />
        <text x="180" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">Shared platform</text>
        {MODULES.map((x, i) => (
          <g key={x.id}>
            <line x1={60 + i * 120} y1="44" x2="180" y2="78" stroke={x.color} strokeWidth="2" className="dash-flow" />
            <rect x={14 + i * 120} y="8" width="92" height="36" rx="8" fill={x.color} />
            <text x={60 + i * 120} y="31" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">{x.name}</text>
          </g>
        ))}
      </svg>
    )
  }
  const x = m || MODULES[0]
  return (
    <svg viewBox="0 0 360 120" className="mt-6 w-full" role="img" aria-label={`${x.name} deployed on its own`}>
      <rect x="120" y="8" width="120" height="40" rx="8" fill={x.color} />
      <text x="180" y="33" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">{m ? x.name : 'Any module'}</text>
      <line x1="180" y1="48" x2="180" y2="78" stroke={x.color} strokeWidth="2" className="dash-flow" />
      <rect x="110" y="78" width="140" height="34" rx="8" fill="none" stroke={x.color} strokeWidth="1.5" />
      <text x="180" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill={x.text}>Its own users &amp; data</text>
      {[0, 2].map((i) => (
        <rect key={i} x={14 + i * 120 + (i ? 26 : 0)} y="14" width="66" height="28" rx="8" fill="none" stroke="#CBD5E1" strokeDasharray="4 4" />
      ))}
      <text x="47" y="32" textAnchor="middle" fontSize="10" fill="#94A3B8">add later</text>
      <text x="313" y="32" textAnchor="middle" fontSize="10" fill="#94A3B8">add later</text>
    </svg>
  )
}

/* ─────────────────────────── Client demos strip ─────────────────────────── */

export function DemoLinks({ m }) {
  const items = m.demos.map(findProduct).filter(Boolean)
  if (!items.length) return null
  return (
    <section className="section-tight bg-white" aria-labelledby={`demos-${m.id}`}>
      <div className="container-page">
        <Reveal className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow color={m.text}>Client Demo</Eyebrow>
            <h2 id={`demos-${m.id}`} className="mt-3 font-display text-2xl font-semibold sm:text-3xl">Try {m.name} applications</h2>
          </div>
          <Link to={`/client-demo#${m.id}`} className="link inline-flex items-center gap-1.5">All client demos<ArrowRight size={16} aria-hidden="true" /></Link>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => {
            const live = p.status === 'live'
            const Tag = live ? 'a' : Link
            const props = live ? { href: productHref(p), target: '_blank', rel: 'noopener noreferrer' } : { to: productHref(p) }
            return (
              <Reveal as="li" key={p.slug} delay={i * 80}>
                <Tag {...props} className="group flex h-full flex-col rounded-xl border border-line p-5 transition hover:-translate-y-1 hover:shadow-lift" style={{ '--tw-shadow-color': m.color }}>
                  <span className="flex items-center gap-2 text-xs font-semibold" style={{ color: m.text }}>
                    <MonitorPlay size={14} aria-hidden="true" />{live ? 'Live demo' : p.status === 'demo' ? 'Interactive demo' : 'Preview'}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold">{p.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted">{p.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink group-hover:underline">
                    Open{live ? <ArrowUpRight size={15} aria-hidden="true" /> : <ArrowRight size={15} aria-hidden="true" />}{live && <span className="sr-only"> (opens in a new tab)</span>}
                  </span>
                </Tag>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ─────────────────────────── Closing CTA ─────────────────────────── */

export function DemoCTA({ m = null, title = "See What's Possible with Voltech.", body = 'Discover how connected enterprise solutions can support your people, finance and manufacturing operations.' }) {
  const bg = useParallax(0.12)
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white" aria-labelledby="cta-h">
      <div className="absolute inset-0 -z-20"><div ref={bg} className="absolute -inset-y-16 inset-x-0"><ScreenBackdrop m={m} /></div></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" aria-hidden="true" />
      <div className="container-page flex flex-col gap-10 py-20 sm:py-24 lg:flex-row lg:items-center lg:justify-between">
        <Reveal className="max-w-2xl">
          <h2 id="cta-h" className="font-display text-[clamp(2rem,1.4rem+2.4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.025em] !text-white">{title}</h2>
          <p className="mt-5 text-lg text-white/75">{body}</p>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-3 xs:flex-row">
          <Link to={m ? `/contact?demo=${m.id}` : '/contact?demo=platform'} className="btn group bg-accent text-white hover:bg-white hover:text-ink">Request a Demo<ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></Link>
          <Link to={m ? '/platform' : '/#solutions'} className="btn-ghost-dark">{m ? 'Explore the Platform' : 'Explore All Solutions'}</Link>
        </Reveal>
      </div>
    </section>
  )
}
