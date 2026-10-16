import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check, ChevronRight, MonitorPlay } from 'lucide-react'
import Seo from '../components/ui/Seo'
import Reveal from '../components/ui/Reveal'
import NotFound from './NotFound'
import HeroArt from '../components/platform/HeroArt'
import { HeroHeadline } from '../components/platform/HeroSection'
import { BrowserFrame, ModuleDashboard } from '../components/platform/ModulePreview'
import { DeploymentOptions, DemoLinks, DemoCTA } from '../components/platform/sections'
import { PIcon, Eyebrow, useParallax } from '../components/platform/shared'
import { findModule, MODULES } from '../content/platform'

/**
 * One reusable landing page per module: /solutions/hrms, /finance, /manufacturing.
 * Everything module-specific (colours, copy, features, demos) comes from
 * content/platform.js — this file only decides the layout.
 */
export default function SolutionPage() {
  const { moduleId } = useParams()
  const m = findModule(moduleId)
  const bg = useParallax(0.18)
  if (!m) return <NotFound />
  const others = MODULES.filter((x) => x.id !== m.id)

  return (
    <div style={{ '--m': m.rgb }}>
      <Seo title={`${m.name} — ${m.full} Software`} description={m.description} />

      {/* ── module hero ── */}
      <section className="relative isolate -mt-[var(--header-h)] overflow-hidden bg-ink pt-[var(--header-h)] text-white" aria-labelledby="sol-h">
        <div className="absolute inset-0 -z-20"><div ref={bg} className="absolute -inset-y-16 inset-x-0"><HeroArt accent={m.color} className="h-full w-full" /></div></div>
        <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(100deg, #0B1830 0%, rgb(16 35 63 / .88) 45%, ${m.color}33 100%)` }} aria-hidden="true" />
        <div className="container-page grid items-center gap-12 py-16 lg:min-h-[640px] lg:grid-cols-[1fr_1.15fr] lg:py-20">
          <div>
            <nav aria-label="Breadcrumb" className="float-in mb-6 text-sm text-white/60">
              <ol className="flex flex-wrap items-center gap-1">
                <li><Link to="/" className="hover:text-white hover:underline">Home</Link></li>
                <li className="flex items-center gap-1"><ChevronRight size={14} aria-hidden="true" /><Link to="/platform" className="hover:text-white hover:underline">Enterprise Platform</Link></li>
                <li className="flex items-center gap-1"><ChevronRight size={14} aria-hidden="true" /><span aria-current="page" className="text-white">{m.name}</span></li>
              </ol>
            </nav>
            <p className="float-in mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.82rem] font-semibold text-white ring-1 ring-white/20" style={{ background: `${m.color}40` }}>
              <PIcon name={m.icon} size={15} />Voltech {m.name} · {m.full}
            </p>
            <h1 id="sol-h" className="sr-only">Voltech {m.name}: {m.heroTitle.join(' ')}</h1>
            <HeroHeadline as="p" lines={m.heroTitle} accentWords={[]} className="text-[clamp(2.3rem,1.5rem+3.6vw,4.3rem)]" />
            <p className="float-in mt-6 max-w-xl text-lg leading-relaxed text-white/80" style={{ animationDelay: '.5s' }}>{m.heroLead}</p>
            <div className="float-in mt-8 flex flex-col gap-3 xs:flex-row" style={{ animationDelay: '.65s' }}>
              <Link to={`/contact?demo=${m.id}`} className="btn group text-white hover:brightness-110" style={{ background: m.color }}>Request a Demo<ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></Link>
              <a href="#capabilities" className="btn-ghost-dark">See capabilities</a>
            </div>
          </div>
          <div className="float-in" style={{ animationDelay: '.35s' }}>
            <BrowserFrame url={`app.voltech/${m.id}`} color={m.color}><ModuleDashboard m={m} /></BrowserFrame>
            <p className="mt-3 text-center text-xs text-white/55">Illustrative dashboard with sample data.</p>
          </div>
        </div>
      </section>

      {/* ── module subnav ── */}
      <nav aria-label="Solutions" className="sticky top-[var(--header-h)] z-40 border-b border-line bg-white/90 backdrop-blur">
        <ul className="container-page flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {MODULES.map((x) => (
            <li key={x.id} className="shrink-0">
              <Link to={x.route} aria-current={x.id === m.id ? 'page' : undefined}
                className={`inline-flex min-h-[40px] items-center gap-2 rounded-lg px-3.5 text-sm font-medium transition-colors ${x.id === m.id ? 'text-white' : 'text-ink hover:bg-paper'}`}
                style={x.id === m.id ? { background: x.color } : undefined}>
                <PIcon name={x.icon} size={16} />{x.name}
              </Link>
            </li>
          ))}
          <li className="shrink-0"><Link to="/platform" className="inline-flex min-h-[40px] items-center gap-2 rounded-lg px-3.5 text-sm font-medium text-ink hover:bg-paper">Enterprise Platform</Link></li>
          <li className="ml-auto shrink-0"><Link to={`/client-demo#${m.id}`} className="inline-flex min-h-[40px] items-center gap-2 rounded-lg px-3.5 text-sm font-semibold hover:bg-paper" style={{ color: m.text }}><MonitorPlay size={16} aria-hidden="true" />Client Demo</Link></li>
        </ul>
      </nav>

      {/* ── capabilities ── */}
      <section id="capabilities" className="section scroll-mt-32 bg-white" aria-labelledby="cap-h">
        <div className="container-page">
          <Reveal className="mb-12 max-w-2xl">
            <Eyebrow color={m.text}>{m.emphasis}</Eyebrow>
            <h2 id="cap-h" className="h-section mt-4">Everything {m.name} needs, in one application</h2>
            <p className="lead mt-4">{m.description}</p>
          </Reveal>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {m.capabilities.map((c, i) => (
              <Reveal as="li" key={c.title} delay={(i % 3) * 100} className="group relative overflow-hidden rounded-2xl border border-line p-6 transition hover:-translate-y-1 hover:shadow-lift">
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: m.color }} aria-hidden="true" />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110" style={{ background: m.soft, color: m.text }}><PIcon name={c.icon} size={22} /></span>
                <h3 className="mt-5 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{c.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── feature list + benefits ── */}
      <section className="section relative overflow-hidden text-white" style={{ background: m.gradient }} aria-labelledby="ben-h">
        <div className="grid-bg-dark absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="container-page relative grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 id="ben-h" className="font-display text-[clamp(1.8rem,1.3rem+1.8vw,2.6rem)] font-semibold leading-tight !text-white">What changes for your team</h2>
            <ul className="mt-8 space-y-4">
              {m.benefits.map((b, i) => (
                <li key={b} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 font-display font-semibold ring-1 ring-white/25">{i + 1}</span>
                  <span className="text-lg font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/20 backdrop-blur sm:p-8">
            <h3 className="font-display text-lg font-semibold !text-white">{m.name} feature set</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {m.features.map((f) => <li key={f} className="flex items-start gap-2"><Check size={18} className="mt-0.5 shrink-0" aria-hidden="true" />{f}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      <DemoLinks m={m} />

      <DeploymentOptions m={m} />

      {/* ── other modules ── */}
      <section className="section-tight bg-white" aria-labelledby="more-h">
        <div className="container-page">
          <h2 id="more-h" className="font-display text-2xl font-semibold">Works even better together</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {others.map((x) => (
              <li key={x.id}>
                <Link to={x.route} className="group flex items-center gap-4 rounded-2xl border border-line p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: x.gradient }}><PIcon name={x.icon} size={22} /></span>
                  <span className="flex-1"><span className="block font-display text-lg font-semibold">{x.name}</span><span className="block text-sm text-muted">{x.description}</span></span>
                  <ArrowRight size={20} className="shrink-0 transition-transform group-hover:translate-x-1" style={{ color: x.text }} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DemoCTA m={m} title={`Ready to see ${m.name} in action?`} body={`We'll walk you through ${m.name} with your own processes in mind, as a standalone application or as part of the Voltech platform.`} />
    </div>
  )
}
