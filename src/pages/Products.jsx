import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowUpRight, Check, Clock, Layers, Puzzle, ChevronDown, Boxes,
  Users, Landmark, Factory, UserSquare, Fingerprint, CalendarClock, CalendarCheck, Wallet, FileCheck2, Smartphone, Target,
  BookOpen, Receipt, CreditCard, PieChart, Handshake, ShoppingCart, HardHat,
} from 'lucide-react'
import Seo from '../components/ui/Seo'
import CtaBand from '../components/sections/CtaBand'
import { Reveal } from '../components/erp/Motion'
import { BrowserFrame } from '../components/platform/ModulePreview'
import { findProduct, productHref } from '../content/products'
import { SUITES } from '../content/suites'
import { screen } from '../content/screens'
import { photo } from '../content/photos'
import Scene from '../components/art/Scene'

const ICONS = { Users, Landmark, Factory, UserSquare, Fingerprint, CalendarClock, CalendarCheck, Wallet, FileCheck2, Smartphone, Target, BookOpen, Receipt, CreditCard, PieChart, Handshake, ShoppingCart, HardHat }
const icon = (name) => ICONS[name] || Boxes
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
const num = (i) => String(i + 1).padStart(2, '0')
const urlOf = (p) => (p?.status === 'live' ? p.liveUrl.replace(/^https?:\/\//, '') : `voltech.app/${p?.slug || ''}`)

/** Open-demo button for one module; CRM opens its live site in a new tab. */
function DemoButton({ p, color, small }) {
  if (!p) return null
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110 ${small ? 'min-h-[40px] px-4 text-sm' : 'min-h-[46px] px-5'}`
  if (p.status === 'live') {
    return <a href={productHref(p)} target="_blank" rel="noopener noreferrer" className={cls} style={{ background: color }}>Open live demo<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span></a>
  }
  if (p.status === 'soon') {
    return <Link to={productHref(p)} className={`${cls} !text-ink ring-1 ring-line hover:!brightness-100`} style={{ background: '#fff' }}><Clock size={16} aria-hidden="true" />Demo coming soon</Link>
  }
  return <Link to={productHref(p)} className={cls} style={{ background: color }}>Open demo<ArrowRight size={17} aria-hidden="true" /></Link>
}

/** A photo from src/assets/photos when one is there, else the module's real screen, else its icon. */
function Shot({ k, pk, suite, branch, className = '' }) {
  const ph = photo(pk)
  if (ph) return <img src={ph} alt="" loading="lazy" className={`h-full w-full object-cover ${className}`} />
  const src = screen(k)
  if (src) return <img src={src} alt="" loading="lazy" className={`h-full w-full object-cover ${suite.shotAspect ? 'object-left-top' : 'object-top'} ${className}`} />
  const I = icon(branch.icon)
  return (
    <span className={`flex h-full w-full items-center justify-center ${className}`} style={{ background: suite.soft }}>
      <I size={34} style={{ color: suite.color }} aria-hidden="true" />
    </span>
  )
}

/** Picture for a suite or module: the dropped-in photo, else a drawn scene. */
function Pic({ pk, kind, suite, tiles = true, className = '' }) {
  const ph = photo(pk)
  if (ph) return <img src={ph} alt="" loading="lazy" className={`h-full w-full object-cover ${className}`} />
  return <Scene kind={kind} color={suite.color} soft={suite.soft} tiles={tiles} className={className} />
}

/* ── 0. Suite banner: a photo with the name over it (plain heading without one) ── */
function SuiteHeader({ suite }) {
  const ph = photo(`suite-${suite.id}`)
  const heading = (dark) => (
    <>
      <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold" style={dark ? { color: '#fff', background: suite.color } : { color: suite.text, background: suite.soft }}>{suite.full}</span>
      <h2 id={`${suite.id}-h`} className={`h-section mt-4 ${dark ? '!text-white' : ''}`}>{suite.name}</h2>
      <p className={`mt-3 text-lg ${dark ? 'text-white/85' : 'lead'}`}>{suite.line}</p>
    </>
  )
  if (!ph) return <Reveal dir="up" className="mb-10 max-w-2xl">{heading(false)}</Reveal>
  return (
    <Reveal dir="up" className="relative mb-12 overflow-hidden rounded-3xl shadow-pop">
      <img src={ph} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-transparent" aria-hidden="true" />
      <div className="relative flex min-h-[300px] flex-col justify-center p-8 sm:min-h-[360px] sm:p-12">
        <div className="max-w-lg">{heading(true)}</div>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${suite.name} modules`}>
          {suite.branches.map((b) => { const I = icon(b.icon); return <li key={b.id} className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink"><I size={13} style={{ color: suite.color }} aria-hidden="true" />{b.name}</li> })}
        </ul>
      </div>
    </Reveal>
  )
}

/* ── 1. The tree: suite at the root, modules as branches, start to end ── */
function SuiteTree({ suite }) {
  const Root = icon(suite.icon)
  return (
    <div className="suite-tree" style={{ '--tree-c': suite.color }}>
      <Reveal dir="up" className="tree-root relative max-w-md lg:mx-auto lg:max-w-[380px]">
        <div className="overflow-hidden rounded-2xl bg-white shadow-pop ring-1 ring-line">
          <div className="aspect-[16/10] overflow-hidden"><Pic pk={`suite-${suite.id}`} kind={suite.id} suite={suite} /></div>
          <div className="flex items-center gap-3 p-4" style={{ background: suite.color }}>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20"><Root size={22} color="#fff" aria-hidden="true" /></span>
            <span className="text-white">
              <span className="block font-display text-xl font-semibold leading-tight">{suite.name}</span>
              <span className="block text-sm text-white/80">{suite.branches.length} modules · one login</span>
            </span>
          </div>
        </div>
      </Reveal>

      <ol className="tree-branches" aria-label={`${suite.name} modules, in order`}>
        {suite.branches.map((b, i) => {
          const I = icon(b.icon)
          return (
            <Reveal as="li" key={b.id} dir="up" delay={i * 60}>
              <a href={`#${suite.id}-${b.id}`} onClick={(e) => { e.preventDefault(); scrollTo(`${suite.id}-${b.id}`) }}
                className="group flex h-full items-center gap-3 rounded-xl bg-white p-2 pr-3 shadow-lift lg:flex-col lg:items-stretch lg:gap-2 lg:pr-2 ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-pop">
                <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-1 ring-line lg:aspect-[16/10] lg:h-auto lg:w-full">
                  <Pic pk={`${suite.id}-${b.id}`} kind={`${suite.id}-${b.id}`} suite={suite} tiles={false} className="transition-transform duration-500 group-hover:scale-110" />
                  <span className="absolute left-1 top-1 rounded bg-ink/80 px-1 text-[10px] font-bold text-white">{num(i)}</span>
                </span>
                <span className="min-w-0 flex-1 lg:px-1 lg:pb-1">
                  <span className="flex items-center gap-1.5 text-[15px] font-semibold leading-tight text-ink lg:text-sm"><I size={15} style={{ color: suite.color }} aria-hidden="true" />{b.name}</span>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium" style={{ color: suite.text }}><Puzzle size={12} aria-hidden="true" />Standalone too</span>
                </span>
                <ChevronDown size={16} className="shrink-0 text-muted lg:hidden transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
            </Reveal>
          )
        })}
      </ol>
    </div>
  )
}

/* ── 2. One module in detail: big real screen, switchable thumbnails ── */
function ModuleDetail({ suite, b, i }) {
  const [cur, setCur] = useState(0)
  const p = findProduct(b.demo)
  const I = icon(b.icon)
  const flip = i % 2 === 1
  return (
    <article id={`${suite.id}-${b.id}`} className="scroll-mt-36 grid items-center gap-8 py-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
      <Reveal dir={flip ? 'left' : 'right'} className={`min-w-0 ${flip ? 'lg:order-2' : ''}`}>
          <div className="relative pb-10 sm:pb-14">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-pop">
              <Pic pk={`${suite.id}-${b.id}`} kind={`${suite.id}-${b.id}`} suite={suite} />
            </div>
            {b.screens[0] && (
              <div className="absolute bottom-0 left-[-3%] w-[42%]">
                <BrowserFrame url={urlOf(p)} color={suite.color}>
                  <div className="overflow-hidden bg-paper" style={{ aspectRatio: suite.shotAspect || '16 / 10' }}><Shot key={cur} k={b.screens[cur]} suite={suite} branch={b} className="fade-in" /></div>
                </BrowserFrame>
              </div>
            )}
          </div>
        {b.screens.length > 1 && (
          <div className="mt-3 flex gap-2" role="group" aria-label={`${b.name} screens`}>
            {b.screens.map((k, si) => (
              <button key={k} type="button" onClick={() => setCur(si)} aria-pressed={cur === si} aria-label={`Screen ${si + 1}`}
                className={`h-14 w-24 overflow-hidden rounded-lg ring-2 transition ${cur === si ? '' : 'opacity-60 ring-transparent hover:opacity-100'}`}
                style={cur === si ? { '--tw-ring-color': suite.color } : undefined}>
                <img src={screen(k)} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
              </button>
            ))}
          </div>
        )}
      </Reveal>

      <Reveal dir="up" delay={80} className="min-w-0">
        <div className="flex items-center gap-3">
          <span className="font-display text-4xl font-semibold text-line">{num(i)}</span>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: suite.soft }}><I size={22} style={{ color: suite.color }} aria-hidden="true" /></span>
        </div>
        <p className="mt-4 text-sm font-semibold uppercase tracking-wider" style={{ color: suite.text }}>{suite.name} module</p>
        <h3 className="mt-1 font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.1rem)] font-semibold leading-tight">{b.name}</h3>
        <ul className="mt-5 space-y-2.5">
          {b.points.map((pt) => (
            <li key={pt} className="flex items-start gap-2.5"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: suite.color }}><Check size={13} color="#fff" aria-hidden="true" /></span>{pt}</li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <DemoButton p={p} color={suite.color} />
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ring-1" style={{ color: suite.text, background: suite.soft, '--tw-ring-color': suite.color + '40' }}>
            <Puzzle size={15} aria-hidden="true" />Available standalone
          </span>
        </div>
      </Reveal>
    </article>
  )
}

/* ── 3. Whole suite or one module ── */
function StandaloneBand({ suite }) {
  const Root = icon(suite.icon)
  return (
    <Reveal dir="up" className="mt-6 grid gap-5 md:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 ring-1 ring-line">
        <p className="flex items-center gap-2 font-display text-lg font-semibold"><Layers size={19} style={{ color: suite.color }} aria-hidden="true" />The full {suite.name} suite</p>
        <div className="mt-5 flex flex-wrap items-center gap-2" aria-hidden="true">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: suite.color }}><Root size={22} color="#fff" /></span>
          <span className="h-0.5 w-5" style={{ background: suite.color }} />
          {suite.branches.map((b) => { const I = icon(b.icon); return <span key={b.id} className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: suite.soft }}><I size={18} style={{ color: suite.color }} /></span> })}
        </div>
        <p className="mt-5 text-sm text-muted">Every module, one login, data shared between them.</p>
      </div>
      <div className="rounded-2xl bg-white p-6 ring-1 ring-line">
        <p className="flex items-center gap-2 font-display text-lg font-semibold"><Puzzle size={19} style={{ color: suite.color }} aria-hidden="true" />Just the module you need</p>
        <div className="mt-5 flex flex-wrap items-center gap-2" aria-hidden="true">
          {suite.branches.map((b, i) => { const I = icon(b.icon); return <span key={b.id} className={`flex h-10 w-10 items-center justify-center rounded-lg ${i === 0 ? 'h-12 w-12 shadow-pop' : 'opacity-30'}`} style={{ background: i === 0 ? suite.color : suite.soft }}><I size={i === 0 ? 22 : 18} color={i === 0 ? '#fff' : suite.color} /></span> })}
        </div>
        <p className="mt-5 text-sm text-muted">Start with one, add the rest later. Each module runs on its own.</p>
      </div>
    </Reveal>
  )
}

export default function Products() {
  const heroPhoto = photo('banner-client-demo')
  return (
    <>
      <Seo title="Client Demo — HRMS, Finance & Manufacturing Applications" description="See every module of our HRMS, Finance and Manufacturing applications, with real screens, and open the demos. Each module is also available standalone." />

      {/* ── HERO: real screens ── */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {heroPhoto ? (
          <>
            <img src={heroPhoto} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/10" aria-hidden="true" />
          </>
        ) : (
          <>
            <div className="absolute -right-40 -top-40 -z-10 h-[560px] w-[560px] rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
          </>
        )}
        <div className="container-page grid items-center gap-10 pb-14 pt-10 lg:grid-cols-[1fr_1.1fr] lg:pb-20 lg:pt-14">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
              <Link to="/" className="hover:text-white hover:underline">Home</Link><span className="mx-1.5">/</span><span className="text-white" aria-current="page">Client Demo</span>
            </nav>
            <h1 className="max-w-[16ch] font-display text-[clamp(2rem,1.3rem+2.8vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.025em] !text-white">See the software, module by module</h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75">Three suites. Every module works together, or on its own.</p>
            <ul className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
              {SUITES.map((s) => {
                const I = icon(s.icon)
                return (
                  <li key={s.id}>
                    <button type="button" onClick={() => scrollTo(s.id)} className="group w-full overflow-hidden rounded-xl bg-white/[.06] text-left ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/[.12]">
                      <span className="block aspect-[16/9] overflow-hidden"><Pic pk={`suite-${s.id}`} kind={s.id} suite={s} tiles={false} className="transition-transform duration-500 group-hover:scale-105" /></span>
                      <span className="flex min-w-0 items-center gap-1.5 px-2 py-2 text-sm font-semibold sm:gap-2 sm:px-3 sm:py-2.5 sm:text-base"><I size={16} className="hidden shrink-0 xs:block" style={{ color: s.color }} aria-hidden="true" /><span className="truncate">{s.name}</span><span className="ml-auto hidden text-xs font-medium text-white/60 sm:inline">{s.branches.length}</span></span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          {heroPhoto ? (
            <ul className="relative hidden h-[440px] sm:block" aria-hidden="true">
              {SUITES.map((s, i) => {
                const I = icon(s.icon)
                return (
                  <li key={s.id} className={`absolute ${['left-[6%] top-[6%]', 'right-0 top-[36%]', 'left-[14%] bottom-[4%]'][i]}`}>
                    <div className="float-in" style={{ animationDelay: `${0.3 + i * 0.2}s` }}>
                      <div className={`${['bob', 'bob-2', 'bob-3'][i]} flex w-[250px] items-center gap-3 rounded-2xl bg-white p-3.5 text-ink shadow-pop`}>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: s.color }}><I size={20} color="#fff" /></span>
                        <span className="min-w-0"><span className="block font-semibold">{s.name}</span><span className="block truncate text-xs text-muted">{s.branches.slice(0, 3).map((b) => b.name.split(' ')[0]).join(' · ')}</span></span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
          <div className="relative hidden h-[440px] sm:block" aria-hidden="true">
            {SUITES.map((s, i) => (
              <div key={s.id} className={`absolute ${['left-0 top-[4%] w-[66%] h-[58%]', 'right-0 top-[20%] w-[44%] h-[40%]', 'left-[18%] bottom-0 w-[50%] h-[38%]'][i]}`} style={{ zIndex: i }}>
                <div className="float-in h-full" style={{ animationDelay: `${0.2 + i * 0.18}s` }}>
                  <div className="h-full overflow-hidden rounded-2xl shadow-pop ring-4 ring-white/10"><Scene kind={s.id} color={s.color} soft={s.soft} tiles={i === 0} /></div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* ── suite tabs ── */}
      <nav aria-label="Demo suites" className="sticky top-[var(--header-h)] z-40 border-b border-line bg-white/90 backdrop-blur">
        <ul className="container-page flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {SUITES.map((s) => {
            const I = icon(s.icon)
            return (
              <li key={s.id} className="shrink-0">
                <a href={`#${s.id}`} onClick={(e) => { e.preventDefault(); scrollTo(s.id) }}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg px-3.5 text-sm font-medium text-ink transition-colors hover:bg-paper">
                  <I size={16} style={{ color: s.color }} aria-hidden="true" />{s.name}
                  <span className="rounded-full bg-paper px-1.5 text-xs text-muted">{s.branches.length}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* ── one story per suite: tree → each module → standalone ── */}
      {SUITES.map((s, si) => (
        <section key={s.id} id={s.id} className={`section scroll-mt-32 ${si % 2 ? 'bg-paper' : ''}`} aria-labelledby={`${s.id}-h`}>
          <div className="container-page">
            <SuiteHeader suite={s} />

            <SuiteTree suite={s} />

            <div className="mt-14 divide-y divide-line border-t border-line">
              {s.branches.map((b, i) => <ModuleDetail key={b.id} suite={s} b={b} i={i} />)}
            </div>

            <StandaloneBand suite={s} />
          </div>
        </section>
      ))}

      <CtaBand title="Want a guided walkthrough?" body="Tell us how your team works today. We will walk you through the right modules and the changes they need to fit you." />
    </>
  )
}
