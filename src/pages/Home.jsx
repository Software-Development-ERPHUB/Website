import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Settings, Users } from 'lucide-react'
import Seo from '../components/ui/Seo'
import SectionHeading from '../components/ui/SectionHeading'
import HeroShowcase from '../components/sections/HeroShowcase'
import TechMarquee from '../components/sections/TechMarquee'
import Reveal from '../components/ui/Reveal'
import CountUp from '../components/ui/CountUp'
import ServiceCard from '../components/ui/ServiceCard'
import ProjectCard from '../components/ui/ProjectCard'
import Accordion from '../components/ui/Accordion'
import Icon from '../components/ui/Icon'
import CtaBand from '../components/sections/CtaBand'
import { SITE, CONTACT } from '../content/site'
import { SERVICES } from '../content/services'
import { SOLUTIONS, INDUSTRIES } from '../content/solutions'
import { featuredProjects } from '../content/projects'
import { PROCESS, FAQS } from '../content/company'
import ProductOrbit from '../components/erp/ProductOrbit'
import CompanyLogo from '../components/CompanyLogo'
import { Marquee } from '../components/erp/Motion'
import { COMPANIES } from '../data/companies'
import { ERP_CONFIG } from '../content/erp'

const ERP_APPS = COMPANIES.reduce((s, c) => s + c.apps.length, 0) + 1
const ERP_USERS = COMPANIES.reduce((s, c) => s + c.totalUsers, 0)

const DOMAINS = ['ERP modules', 'HR & payroll', 'Workflow & approvals', 'Document management', 'Project & cost management', 'Compliance & audit', 'CRM & applicant tracking', 'Corporate websites']

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
  const featured = featuredProjects().slice(0, 3)
  return (
    <>
      <Seo jsonLd={orgLd()} />

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-10 pb-14 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-24 lg:pt-20">
          <div className="slide-in">
            <h1 className="h-display max-w-[15ch]">Building digital solutions that move businesses forward</h1>
            <p className="lead mt-6 max-w-xl">
              We design and develop scalable software, websites and business applications that help organisations streamline operations, improve efficiency and grow with confidence.
            </p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <Link to="/contact" className="btn-primary">Start a project</Link>
              <Link to="/projects" className="btn-secondary">Explore our work</Link>
            </div>
            <p className="mt-8 max-w-md text-sm text-muted">
              A Chennai engineering team that has built and run business applications for engineering, manufacturing and services companies since {SITE.since}.
            </p>
          </div>
          <div className="mx-auto w-full max-w-[560px] lg:max-w-none">
            <HeroShowcase />
          </div>
        </div>
      </section>

      <TechMarquee />

      {/* ── CAPABILITY ─────────────────────────────────── */}
      <section className="section bg-paper">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <h2 className="h-section">Technology expertise built through real-world business applications</h2>
            <p className="lead mt-5">
              Before taking on external clients, our team spent a decade building and maintaining the systems a group of engineering, manufacturing, HR services and facility management companies run on every day.
            </p>
            <p className="mt-4 text-muted">
              That means we know what happens after launch: month-end payroll, audit weeks, new branches, new modules and users who need answers quickly. We now bring the same experience to businesses of every size.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Areas of experience">
              {DOMAINS.map((d) => <li key={d} className="chip">{d}</li>)}
            </ul>
          </div>
          <dl className="grid content-start gap-px overflow-hidden rounded-xl border border-line bg-line">
            {SITE.facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-1 bg-white p-6 sm:flex-row sm:items-baseline sm:gap-6 sm:p-7">
                <dt className="order-2 text-muted sm:order-2">{f.label}</dt>
                <dd className="order-1 min-w-[7.5rem] font-display text-3xl font-semibold text-brand sm:text-4xl"><CountUp value={f.value} /></dd>
              </div>
            ))}
          </dl>
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

      {/* ── ERP PORTFOLIO (our own track record) ───────── */}
      <section className="relative isolate overflow-hidden bg-ink text-white" aria-labelledby="erp-h">
        <div className="grid-bg-dark absolute inset-0 -z-10" aria-hidden="true" />
        <div className="absolute -left-40 top-10 -z-10 h-[480px] w-[480px] rounded-full bg-brand/35 blur-3xl" aria-hidden="true" />
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
          <Reveal delay={120}><ProductOrbit /></Reveal>
        </div>
        <div className="border-t border-white/10 py-5">
          <Marquee speed={32} gap={14}>
            {COMPANIES.map((co) => (
              <Link key={co.id} to={`/erp/companies/${co.id}`} className="flex items-center gap-3 rounded-xl bg-white/[.06] py-2 pl-2 pr-4 ring-1 ring-white/10 transition hover:bg-white/[.12]">
                <CompanyLogo companyId={co.id} size={40} rounded={8} padding={3} />
                <span translate="no" className="notranslate text-sm font-semibold text-white">{co.name}</span>
              </Link>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ── FEATURED WORK ──────────────────────────────── */}
      <section className="section bg-paper" aria-labelledby="work-h">
        <div className="container-page">
          <SectionHeading
            title={<span id="work-h">Selected work</span>}
            lead="Applications and websites we designed, built and continue to maintain."
            action={<Link to="/projects" className="btn-secondary">View all projects</Link>}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => <Reveal key={p.slug} delay={i * 110}><ProjectCard project={p} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ──────────────────────────────────── */}
      <section className="section" aria-labelledby="sol-h">
        <div className="container-page">
          <SectionHeading
            title={<span id="sol-h">Solutions for everyday business problems</span>}
            lead="We start from the problem your team is living with, then choose the right software to fix it."
            action={<Link to="/solutions" className="link inline-flex items-center gap-1.5">Explore solutions <ArrowRight size={16} aria-hidden="true" /></Link>}
          />
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.slice(0, 6).map((s, i) => (
              <Reveal as="article" key={s.id} delay={(i % 3) * 90} className="group border-t-2 border-ink pt-5 transition-colors hover:border-brand">
                <h3 className="h-card flex items-center gap-2.5"><Icon name={s.icon} size={20} className="icon-anim text-brand" />{s.title}</h3>
                <p className="mt-3 text-[0.95rem] text-muted">{s.value}</p>
                <Link to={`/solutions#${s.id}`} className="link mt-3 inline-block text-sm" aria-label={`Learn more about ${s.title}`}>Learn more</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────── */}
      <section className="section bg-ink text-white" aria-labelledby="proc-h">
        <div className="container-page">
          <SectionHeading dark title={<span id="proc-h">How we deliver</span>} lead="A simple, visible process so you always know what is happening and what comes next." />
          <ol className="grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 3) * 110} className="group bg-ink p-6 transition-colors duration-300 hover:bg-[#143629] sm:p-7">
                <span className="flex items-center gap-3 font-display text-sm font-semibold text-accent"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/50 transition-colors group-hover:bg-accent group-hover:text-ink"><span className="sr-only">Step </span>{i + 1}</span></span>
                <h3 className="mt-2 font-display text-xl font-semibold !text-white">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] text-white/70">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── INDUSTRIES ─────────────────────────────────── */}
      <section className="section-tight border-b border-line" aria-labelledby="ind-h">
        <div className="container-page flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <h2 id="ind-h" className="font-display text-2xl font-semibold">Industries we know</h2>
            <p className="mt-2 text-muted">Experience from systems in daily use across these sectors.</p>
          </div>
          <ul className="flex flex-wrap gap-2 lg:max-w-2xl lg:justify-end">
            {INDUSTRIES.filter((x) => x.show).map((x) => (
              <li key={x.id}>
                <Link to={`/industries#${x.id}`} className="group inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-line px-3.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-lift">
                  <Icon name={x.icon} size={18} className="icon-anim" />{x.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

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

      <CtaBand />
    </>
  )
}
