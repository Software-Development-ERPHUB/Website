import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Layers } from 'lucide-react'
import { Slider, Reveal } from './Motion'
import { screen } from '../../content/screens'
import { appScreenKey } from '../../content/appScreens'
import { COMPANIES } from '../../data/companies'

/**
 * ERP PORTFOLIO CAROUSEL — the landing-page "spin": an auto-rotating carousel
 * of the applications our team built and runs for Voltech Group. Each slide
 * uses a real application screenshot where one exists, otherwise the company's
 * own site photo. Sits high on the home page so visitors see the portfolio first.
 */

/** Featured applications: app id in data/companies.js + its marketing tag. */
const FEATURED = [
  { app: 'vepl-hrms', tag: 'HRMS' },
  { app: 'prime', tag: 'Voltech Prime · SCM' },
  { app: 'vmcl-erp', tag: 'Voltech Prime · Production' },
  { app: 'vefm', tag: 'Finance' },
  { app: 'ehs', tag: 'EHS' },
  { app: 'expenseflow', tag: 'Expense Flow' },
  { app: 'vpmt', tag: 'Project Cost' },
  { app: 'ems', tag: 'Employee Management' },
  { app: 'vbms', tag: 'Field Workforce' },
  { app: 'ims', tag: 'Information System' },
]

const SLIDES = FEATURED.map(({ app, tag }) => {
  for (const company of COMPANIES) {
    const found = company.apps.find((a) => a.id === app)
    if (found) return { ...found, company, tag, image: screen(appScreenKey(found)) || company.image }
  }
  return null
}).filter(Boolean)

function Slide({ a }) {
  return (
    <div className="grid items-center gap-8 py-2 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-30px_rgb(0_0_0/.6)] ring-1 ring-white/15">
        <div className="flex items-center gap-2 border-b border-line bg-paper px-3 py-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#F87171]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]" />
          <span className="ml-2 truncate rounded-md bg-white px-2 py-0.5 text-[11px] text-muted">{a.url ? a.url.replace(/^https?:\/\//, '') : `app.voltech/${a.id}`}</span>
        </div>
        <img src={a.image} alt={`${a.name} screen`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
      </div>

      <div className="min-w-0">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent ring-1 ring-white/15">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />{a.tag}
        </span>
        <h3 className="mt-4 font-display text-[clamp(1.4rem,1.1rem+1.1vw,2rem)] font-semibold leading-tight !text-white">{a.name}</h3>
        <p className="mt-1 text-sm font-medium text-white/60">{a.company.fullName}</p>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-white/75">{a.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Modules">
          {a.modules.slice(0, 6).map((m) => (
            <li key={m} className="rounded-full bg-white/[.07] px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/10">{m}</li>
          ))}
          {a.modules.length > 6 && <li className="rounded-full px-3 py-1 text-xs font-medium text-white/50">+{a.modules.length - 6} more</li>}
        </ul>
        <Link to={`/erp/companies/${a.company.id}`} className="btn-on-dark group mt-7">
          View application<ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

export default function ErpCarousel() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 text-white sm:py-20" aria-labelledby="erp-spin-h">
      <div className="container-page">
        <Reveal className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-accent ring-1 ring-white/15">
              <Layers size={15} aria-hidden="true" />ERP Portfolio
            </span>
            <h2 id="erp-spin-h" className="mt-4 h-section !text-white">The applications we built for Voltech Group</h2>
            <p className="mt-3 text-lg text-white/70">A decade of in-house systems, running every day across the group — HRMS, supply chain, finance, safety and more.</p>
          </div>
          <Link to="/erp" className="link shrink-0 inline-flex items-center gap-1.5 !text-accent">Full ERP portfolio <ArrowRight size={16} aria-hidden="true" /></Link>
        </Reveal>

        <div className="rounded-3xl border border-white/10 bg-white/[.04] p-5 sm:p-8">
          <Slider dark interval={6000} accent="rgb(var(--c-accent))">
            {SLIDES.map((a) => <Slide key={a.company.id + a.id} a={a} />)}
          </Slider>
        </div>
      </div>
    </section>
  )
}
