import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowUpRight, Play, Clock, Boxes, LayoutGrid, MonitorPlay, Headset,
  HardHat, Users, Wallet, Factory, Timer, Target, TrendingUp, BookOpen, Receipt, CreditCard, PieChart, Handshake, ShoppingCart,
} from 'lucide-react'
import Seo from '../components/ui/Seo'
import CtaBand from '../components/sections/CtaBand'
import { AnimIcon } from '../components/erp/AnimIcon'
import { Reveal, CountUp, Slider } from '../components/erp/Motion'
import { PRODUCT_CATEGORIES, PRODUCTS, productsIn, productHref } from '../content/products'

const ICONS = { HardHat, Users, Wallet, Factory, Timer, Target, TrendingUp, BookOpen, Receipt, CreditCard, PieChart, Handshake, ShoppingCart }
const icon = (name) => ICONS[name] || Boxes
const catOf = (id) => PRODUCT_CATEGORIES.find((c) => c.id === id)
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const STATUS = {
  live: { label: 'Live demo', cls: 'text-[#4ade80]', dot: true },
  demo: { label: 'Interactive demo', cls: 'text-white' },
  soon: { label: 'Coming soon', cls: 'text-white/85' },
}

function ProductCard({ p }) {
  const cat = catOf(p.category)
  const s = STATUS[p.status]
  const live = p.status === 'live'
  const btnCls = 'mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg text-sm font-semibold transition hover:-translate-y-0.5'
  const inner = live
    ? <>Open live demo <span className="ai ai-nudge"><ArrowUpRight size={16} /></span><span className="sr-only">(opens in a new tab)</span></>
    : p.status === 'demo'
      ? <>View demo <span className="ai ai-nudge"><Play size={15} /></span></>
      : <>Preview <span className="ai ai-nudge"><ArrowRight size={16} /></span></>

  return (
    <article className="lift ia group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white">
      <div className="relative h-28 overflow-hidden" style={{ background: cat.gradient }}>
        {[120, 80, 48].map((sz, i) => (
          <span key={i} className="absolute rounded-full border transition-transform duration-1000 group-hover:rotate-12 group-hover:scale-125"
            style={{ top: -sz * 0.3, right: -sz * 0.3, width: sz, height: sz, borderColor: `rgba(255,255,255,${0.12 + i * 0.06})` }} />
        ))}
        <span translate="no" className="notranslate absolute left-3 top-3 rounded-full bg-black/25 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white backdrop-blur">{p.code}</span>
        <span className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur ${s.cls}`}>
          {s.dot ? <span className="live-dot !h-1.5 !w-1.5 !bg-[#4ade80]" /> : p.status === 'soon' ? <Clock size={11} aria-hidden="true" /> : <MonitorPlay size={11} aria-hidden="true" />}
          {s.label}
        </span>
        <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-white/20 backdrop-blur">
          <AnimIcon icon={icon(p.icon)} size={22} color="#fff" anim="pop" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="h-card !text-base">{p.name}</h3>
        <p className="mt-1 text-sm font-medium" style={{ color: cat.color }}>{p.tagline}</p>
        <p className="mt-2 flex-1 text-sm text-muted">{p.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Features">
          {p.features.map((f) => (
            <li key={f} className="rounded-md border px-2 py-0.5 text-[11.5px] font-medium" style={{ color: cat.color, background: cat.color + '0f', borderColor: cat.color + '26' }}>{f}</li>
          ))}
        </ul>
        {live ? (
          <a href={productHref(p)} target="_blank" rel="noopener noreferrer" className={`${btnCls} text-white hover:brightness-110`}
            style={{ background: cat.gradient, boxShadow: `0 8px 18px -8px ${cat.color}` }}>{inner}</a>
        ) : p.status === 'demo' ? (
          <Link to={productHref(p)} className={`${btnCls} text-white hover:brightness-110`}
            style={{ background: cat.gradient, boxShadow: `0 8px 18px -8px ${cat.color}` }}>{inner}</Link>
        ) : (
          <Link to={productHref(p)} className={`${btnCls} border border-line text-muted hover:border-brand hover:text-brand`}>{inner}</Link>
        )}
      </div>
    </article>
  )
}

/** Hero visual: the three suites stacked as app windows. */
function SuiteStack() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      {PRODUCT_CATEGORIES.map((c, i) => {
        const I = icon(c.icon)
        const items = productsIn(c.id)
        return (
          <button key={c.id} type="button" onClick={() => scrollTo(c.id)}
            className="ia group relative mb-3 block w-full overflow-hidden rounded-2xl border border-white/15 bg-white/[.06] p-4 text-left backdrop-blur transition hover:-translate-y-1 hover:bg-white/[.1]"
            style={{ marginLeft: `${i * 6}%`, width: `${100 - 12}%` }}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: c.gradient }}>
                <AnimIcon icon={I} size={19} color="#fff" anim="bounce" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display font-semibold text-white">{c.title}</p>
                <p className="truncate text-xs text-white/60">{items.map((p) => p.name).join(' · ')}</p>
              </div>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-accent">{items.length}</span>
            </div>
            <div className="mt-3 flex gap-1.5" aria-hidden="true">
              {items.map((p) => <span key={p.slug} className="h-1.5 flex-1 rounded-full" style={{ background: p.status === 'soon' ? 'rgba(255,255,255,.15)' : c.color }} />)}
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default function Products() {
  const ready = PRODUCTS.filter((p) => p.status !== 'soon').length

  const SLIDES = [
    { icon: LayoutGrid, tag: 'Ready-made business applications', title: 'Products built from a decade of real ERP work',
      body: 'The applications we built and run for our own group, now packaged for your business. Try a demo, then we tailor it to the way you work.',
      primary: { label: 'Browse products', on: () => scrollTo('hrms') } },
    { icon: Users, tag: 'HRMS', title: 'Attendance, payroll and performance in one suite',
      body: 'Biometric attendance through to payroll, plus KRA & KPI performance reviews you can add when you need them.',
      primary: { label: 'See HRMS products', on: () => scrollTo('hrms') } },
    { icon: Wallet, tag: 'Finance', title: 'Books, billing and budgets that stay in sync',
      body: 'Accounts, invoicing, employee claims and budget control, with approvals and audit trails built in.',
      primary: { label: 'See finance products', on: () => scrollTo('finance') } },
    { icon: Factory, tag: 'Manufacturing', title: 'From customer enquiry to purchase order',
      body: 'A CRM for your sales team, procurement for your buyers and EHS for every site. Open the live CRM demo or click through the others.',
      primary: { label: 'See manufacturing products', on: () => scrollTo('manufacturing') } },
  ]

  const STATS = [
    { v: PRODUCTS.length, l: 'Applications', icon: Boxes, a: 'bounce' },
    { v: PRODUCT_CATEGORIES.length, l: 'Product suites', icon: LayoutGrid, a: 'pop' },
    { v: ready, l: 'Demos to try now', icon: MonitorPlay, a: 'pulse' },
    { v: '24×7', l: 'Support after go-live', icon: Headset, a: 'wiggle' },
  ]

  return (
    <>
      <Seo title="Products — HRMS, Finance & Manufacturing Applications" description="Ready-made business applications for HR, payroll, finance, CRM and procurement. Try a live demo and see how it fits your business." />

      {/* ── HERO: slider + suite stack ── */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grid-bg-dark absolute inset-0 -z-10" aria-hidden="true" />
        <div className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-brand/40 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-48 left-1/4 -z-10 h-[360px] w-[360px] rounded-full bg-steel/30 blur-3xl" aria-hidden="true" />

        <div className="container-page grid grid-cols-1 items-center gap-10 pb-12 pt-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:pb-16 lg:pt-14">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
              <Link to="/" className="hover:text-white hover:underline">Home</Link><span className="mx-1.5">/</span><span className="text-white" aria-current="page">Products</span>
            </nav>
            <Slider dark interval={6000} accent="rgb(var(--c-accent))">
              {SLIDES.map((s, i) => (
                <div key={i} className="pr-2">
                  <span className="hs-anim inline-flex items-center gap-2 rounded-full bg-white/10 py-1 pl-1 pr-3.5 text-xs font-semibold text-accent ring-1 ring-white/15">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent"><AnimIcon icon={s.icon} size={13} color="#fff" anim="pulse" always /></span>
                    {s.tag}
                  </span>
                  {i === 0
                    ? <h1 className="hs-anim mt-5 max-w-[18ch] font-display text-[clamp(2rem,1.3rem+2.8vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.025em] !text-white">{s.title}</h1>
                    : <p className="hs-anim mt-5 max-w-[18ch] font-display text-[clamp(2rem,1.3rem+2.8vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-white">{s.title}</p>}
                  <p className="hs-anim mt-5 max-w-xl text-[clamp(1rem,.95rem+.3vw,1.15rem)] leading-relaxed text-white/75">{s.body}</p>
                  <div className="hs-anim mt-7 flex flex-col gap-3 xs:flex-row">
                    <button type="button" onClick={s.primary.on} className="btn-on-dark ia">{s.primary.label}<span className="ai ai-nudge"><ArrowRight size={17} /></span></button>
                    <Link to="/contact" className="btn-ghost-dark">Request a walkthrough</Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="slide-in min-w-0" style={{ animationDelay: '.15s' }}><SuiteStack /></div>
        </div>

        <div className="border-t border-white/10 bg-white/[.03]">
          <dl className="container-page grid grid-cols-2 gap-px lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.l} dir="up" delay={i * 90} className="ia flex items-center gap-4 py-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15"><AnimIcon icon={s.icon} size={20} color="rgb(var(--c-accent))" anim={s.a} /></span>
                <div>
                  <dd className="font-display text-2xl font-semibold text-white sm:text-3xl"><CountUp value={s.v} /></dd>
                  <dt className="text-sm text-white/60">{s.l}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ── suite subnav ── */}
      <nav aria-label="Product suites" className="sticky top-[var(--header-h)] z-40 border-b border-line bg-white/90 backdrop-blur">
        <ul className="container-page flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {PRODUCT_CATEGORIES.map((c) => {
            const I = icon(c.icon)
            return (
              <li key={c.id} className="shrink-0">
                <a href={`#${c.id}`} onClick={(e) => { e.preventDefault(); scrollTo(c.id) }}
                  className="ia inline-flex min-h-[40px] items-center gap-2 rounded-lg px-3.5 text-sm font-medium text-ink transition-colors hover:bg-paper hover:text-brand">
                  <span className="ai ai-bounce"><I size={16} aria-hidden="true" /></span>{c.title}
                  <span className="rounded-full bg-paper px-1.5 text-xs text-muted">{productsIn(c.id).length}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* ── one section per suite ── */}
      {PRODUCT_CATEGORIES.map((c, ci) => {
        const I = icon(c.icon)
        return (
          <section key={c.id} id={c.id} className={`section scroll-mt-32 ${ci % 2 ? 'bg-paper' : ''}`}>
            <div className="container-page">
              <Reveal dir="up" className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm font-semibold" style={{ color: c.color }}>
                    <AnimIcon icon={I} size={15} anim="pop" always />{c.full}
                  </span>
                  <h2 className="h-section mt-4">{c.title}</h2>
                  <p className="lead mt-4">{c.summary}</p>
                </div>
              </Reveal>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {productsIn(c.id).map((p, i) => (
                  <Reveal as="li" key={p.slug} dir="up" delay={i * 80}><ProductCard p={p} /></Reveal>
                ))}
              </ul>
            </div>
          </section>
        )
      })}

      <CtaBand title="Need a product tailored to your business?" body="Tell us how your team works today. We will walk you through the right product and the changes it needs to fit you." />
    </>
  )
}
