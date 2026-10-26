import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Settings, Users, MonitorPlay, AppWindow } from 'lucide-react'
import Seo from '../components/ui/Seo'
import Reveal from '../components/ui/Reveal'
import CountUp from '../components/ui/CountUp'
import ServiceCard from '../components/ui/ServiceCard'
import Accordion from '../components/ui/Accordion'
import { SITE, CONTACT } from '../content/site'
import { SERVICES } from '../content/services'
import { FAQS } from '../content/company'
import ProductOrbit from '../components/erp/ProductOrbit'
import ErpCarousel from '../components/erp/ErpCarousel'
import CompanyLogo from '../components/CompanyLogo'
import { Marquee } from '../components/erp/Motion'
import { COMPANIES } from '../data/companies'
import { ERP_CONFIG } from '../content/erp'
import HeroSection from '../components/platform/HeroSection'
import { ModulesShowcase, EnterpriseArchitecture, ModuleSpotlight, IndustryCarousel, BenefitsSection, DemoCTA } from '../components/platform/sections'
import { Eyebrow } from '../components/platform/shared'
import { MODULES } from '../content/platform'
import { PRODUCTS, PRODUCT_CATEGORIES } from '../content/products'
import { img } from '../content/images'

const ERP_APPS = COMPANIES.reduce((s, c) => s + c.apps.length, 0) + 1
const ERP_USERS = COMPANIES.reduce((s, c) => s + c.totalUsers, 0)


const orgLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  legalName: SITE.legalName,
  parentOrganization: { '@type': 'Organization', name: SITE.parent, url: 'https://voltechgroup.com/' },
  url: SITE.url,
  logo: `${SITE.url}/favicon.svg`,
  email: CONTACT.email || undefined,
  telephone: CONTACT.phone || undefined,
  address: { '@type': 'PostalAddress', streetAddress: 'No. 2/429, Voltech Eco Tower, Mount Poonamallee Road, Ayyappanthangal', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', postalCode: '600056', addressCountry: 'IN' },
  geo: { '@type': 'GeoCoordinates', latitude: 13.041664, longitude: 80.1308672 },
  areaServed: 'IN',
})

export default function Home() {
  return (
    <>
      <Seo jsonLd={orgLd()} />

      <HeroSection />

      {/* ── GROUP COMPANIES (logo scroll) ─────────────── */}
      <section className="border-b border-line bg-white py-6" aria-label="Voltech Group companies running our software">
        <p className="container-page mb-4 text-center text-sm font-semibold uppercase tracking-wider text-muted">Running every day across the Voltech Group</p>
        <Marquee speed={34} gap={18}>
          {COMPANIES.map((co) => (
            <Link key={co.id} to={`/erp/companies/${co.id}`} className="flex items-center gap-3 rounded-xl border border-line bg-white py-2 pl-2 pr-5 transition hover:border-brand/40 hover:shadow-lift">
              <CompanyLogo companyId={co.id} size={44} rounded={8} padding={3} />
              <span>
                <span translate="no" className="notranslate block text-sm font-semibold text-ink">{co.name}</span>
                <span className="block text-xs text-muted">{co.sector}</span>
              </span>
            </Link>
          ))}
        </Marquee>
      </section>

      {/* ── ERP PORTFOLIO (our own track record) ───────── */}
      <section className="relative isolate overflow-hidden bg-ink text-white" aria-labelledby="erp-h">
        <div className="grid-bg-dark absolute inset-0 -z-10" aria-hidden="true" />
        <div className="absolute -left-40 top-10 -z-10 h-[480px] w-[480px] rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
        <div className="container-page section grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-accent ring-1 ring-white/15"><span className="live-dot !h-1.5 !w-1.5" />ERP portfolio · since {SITE.since}</span>
            <h2 id="erp-h" className="h-section mt-5 !text-white">We run the ERP for an entire group of companies</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">
              Before serving clients, our team built the applications Voltech Group runs on — HR, supply chain, design, finance, audit and more, across every group company. They are all still live today.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10">
              {[
                { v: COMPANIES.length, l: 'Group companies', icon: Building2, a: 'bounce' },
                { v: ERP_APPS, l: 'Live applications', icon: Settings, a: 'spin' },
                ERP_CONFIG.showUserCounts ? { v: ERP_USERS.toLocaleString() + '+', l: 'Active users', icon: Users, a: 'bounce' } : { v: '24×7', l: 'Support', icon: Users, a: 'bounce' },
              ].map((x) => (
                <div key={x.l} className="ia bg-ink p-4 sm:p-5">
                  <span className={`ai ai-${x.a} text-accent`}><x.icon size={18} aria-hidden="true" /></span>
                  <dd className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl"><CountUp value={x.v} /></dd>
                  <dt className="text-xs text-white/60 sm:text-sm">{x.l}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <Link to="/erp" className="btn-on-dark group">Explore the ERP portfolio<ArrowRight size={17} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" /></Link>
              <Link to="/erp/websites" className="btn-ghost-dark">Group websites</Link>
            </div>
          </Reveal>
          <Reveal delay={120}><ProductOrbit className="max-w-[440px]" /></Reveal>
        </div>
      </section>

      {/* ── COMPANY-WISE PROJECTS ──────────────────────── */}
      <section className="section bg-paper" aria-labelledby="projects-h">
        <div className="container-page">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Projects, company by company</Eyebrow>
              <h2 id="projects-h" className="h-section mt-3">The software each group company runs on</h2>
              <p className="lead mt-4">Every application below was built by our team and is in daily use.</p>
            </div>
            <Link to="/erp" className="link inline-flex items-center gap-1.5">Full ERP portfolio <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COMPANIES.map((co, i) => (
              <Reveal as="li" key={co.id} delay={(i % 3) * 80}>
                <Link to={`/erp/companies/${co.id}`} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-line transition hover:-translate-y-1 hover:shadow-pop">
                  <span className="relative block aspect-[16/9] overflow-hidden">
                    <img src={co.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" aria-hidden="true" />
                    <span className="absolute bottom-3 left-3 flex items-center gap-2.5">
                      <CompanyLogo companyId={co.id} size={40} rounded={8} padding={3} />
                      <span translate="no" className="notranslate font-display text-lg font-semibold text-white">{co.name}</span>
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="text-sm font-semibold text-ink">{co.fullName}</span>
                    <span className="text-xs text-muted">{co.sector}</span>
                    <span className="mt-4 flex flex-wrap gap-1.5">
                      {co.apps.slice(0, 6).map((a) => (
                        <span key={a.code} className="rounded-md bg-paper px-2 py-1 text-xs font-medium text-ink ring-1 ring-line">{a.name.replace(/^Voltech (International )?/, '')}</span>
                      ))}
                      {co.apps.length > 6 && <span className="rounded-md px-2 py-1 text-xs font-medium text-muted">+{co.apps.length - 6} more</span>}
                    </span>
                    <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand"><AppWindow size={16} aria-hidden="true" />{co.apps.length} applications<ArrowRight size={15} aria-hidden="true" className="ml-auto transition-transform group-hover:translate-x-1" /></span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────── */}
      <section className="section" aria-labelledby="services-h">
        <div className="container-page">
          <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 id="services-h" className="h-section">What we do</h2>
              <p className="lead mt-4">From a single website to a multi-company ERP — planned, built, deployed and supported by one team.</p>
            </div>
            <Link to="/services" className="link inline-flex items-center gap-1.5">All services <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="grid divide-y divide-line border-y border-line md:grid-cols-2 md:gap-x-12 md:divide-y-0 lg:gap-x-16">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={(i % 2) * 90} className={`md:border-line ${i >= 2 ? 'md:border-t' : ''}`}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ModulesShowcase />

      <EnterpriseArchitecture />

      {MODULES.map((m, i) => <ModuleSpotlight key={m.id} m={m} flip={i % 2 === 1} photo={m.id === 'manufacturing' ? img('indManufacturing') : null} />)}

      {/* ── CLIENT DEMO ───────────────────────────────── */}
      <section className="section-tight bg-white" aria-labelledby="demo-h">
        <div className="container-page">
          <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink to-[#1E3A66] p-8 text-white sm:p-12">
            <div className="grid-bg-dark absolute inset-0 opacity-50" aria-hidden="true" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <Eyebrow dark>Client Demo</Eyebrow>
                <h2 id="demo-h" className="mt-4 font-display text-[clamp(1.8rem,1.3rem+1.8vw,2.6rem)] font-semibold leading-tight !text-white">Click through the real applications</h2>
                <p className="mt-4 max-w-xl text-white/75">{PRODUCTS.filter((p) => p.status !== 'soon').length} working demos across HRMS, Finance and Manufacturing, with sample data, ready to explore.</p>
                <Link to="/client-demo" className="btn-on-dark group mt-7"><MonitorPlay size={18} aria-hidden="true" />Open Client Demo<ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></Link>
              </div>
              <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {PRODUCT_CATEGORIES.map((c) => {
                  const m = MODULES.find((x) => x.id === c.id)
                  const n = PRODUCTS.filter((p) => p.category === c.id).length
                  return (
                    <li key={c.id}>
                      <Link to={`/client-demo#${c.id}`} className="flex items-center gap-3 rounded-xl bg-white/[.07] p-3 ring-1 ring-white/10 transition hover:bg-white/[.14]">
                        <span className="h-9 w-1.5 rounded-full" style={{ background: m?.color }} aria-hidden="true" />
                        <span className="flex-1 font-semibold">{c.title}</span>
                        <span className="text-sm text-white/60">{n} apps</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <IndustryCarousel />

      <BenefitsSection />


      {/* ── FAQ PREVIEW ────────────────────────────────── */}
      <section className="section" aria-labelledby="faq-h">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <h2 id="faq-h" className="h-section">Common questions</h2>
            <p className="lead mt-4">Straight answers about cost, timelines, hosting and support.</p>
            <Link to="/faq" className="btn-secondary mt-6">Read all FAQs</Link>
          </div>
          <Accordion items={FAQS.slice(0, 5)} />
        </div>
      </section>

      <DemoCTA />
    </>
  )
}
