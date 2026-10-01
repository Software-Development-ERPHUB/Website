import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Layers, Users, ShieldCheck, Globe, CheckCircle2, Building2, Settings, Headset, Trophy } from 'lucide-react'
import Seo from '../../components/ui/Seo'
import SectionHeading from '../../components/ui/SectionHeading'
import CtaBand from '../../components/sections/CtaBand'
import CompanyLogo from '../../components/CompanyLogo'
import ErpSubnav from '../../components/erp/ErpSubnav'
import ErpCompanyCard from '../../components/erp/ErpCompanyCard'
import ModulePanel from '../../components/erp/ModulePanel'
import { AnimIcon, IconTile } from '../../components/erp/AnimIcon'
import { Reveal, CountUp, Slider, CardRail, Marquee } from '../../components/erp/Motion'
import ProductOrbit from '../../components/erp/ProductOrbit'
import { COMPANIES } from '../../data/companies'
import { ERP_PRODUCTS, ERP_HIGHLIGHTS, ERP_FEATURES, HRMS_MODULES, AUDIT_MODULES, GROUP_SITES, ERP_CONFIG, HRMS_TECH } from '../../content/erp'

const totalApps = COMPANIES.reduce((s, c) => s + c.apps.length, 0) + 1
const totalUsers = COMPANIES.reduce((s, c) => s + c.totalUsers, 0)
const HRMS_COMPANIES = COMPANIES.filter((c) => c.apps.some((a) => /hrms/i.test(a.id) || /hr management/i.test(a.name))).length

export default function ErpHome() {
  const navigate = useNavigate()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const SLIDES = [
    { icon: Layers, tag: 'Voltech Group · built in-house', title: 'Driving digital transformation across Voltech Group',
      body: 'Our ERP team has built and deployed enterprise applications across the group — design, finance, HR, supply chain, safety and more, used every day by thousands of people.',
      primary: { label: 'Explore group companies', on: () => scrollTo('companies') }, secondary: { label: 'Start a project', to: '/contact' } },
    { icon: Users, tag: 'HRMS · every group company', title: 'One HR system for every company in the group',
      body: 'Recruitment, payroll, leave, attendance, statutory compliance and insurance — the complete employee lifecycle on a single platform.',
      primary: { label: 'See HRMS modules', on: () => scrollTo('shared-systems') }, secondary: { label: 'HR solutions', to: '/solutions' } },
    { icon: ShieldCheck, tag: 'Audit & compliance', title: 'ISO, audits and safety on one live dashboard',
      body: 'Audit scheduling, document control, ISO certificates and non-conformance tracking for all group companies — monitored 24×7.',
      primary: { label: 'See audit modules', on: () => scrollTo('shared-systems') }, secondary: { label: 'View case studies', to: '/projects' } },
    { icon: Globe, tag: 'Group websites', title: 'Corporate websites built and SEO-tuned in-house',
      body: 'Corporate, product and service websites for group companies — responsive, fast, and tracked with Google Analytics 4.',
      primary: { label: 'See group websites', on: () => navigate('/erp/websites') }, secondary: { label: 'Website services', to: '/services' } },
  ]

  const STATS = [
    { v: COMPANIES.length, l: 'Group companies', icon: Building2, a: 'bounce' },
    { v: totalApps, l: 'ERP applications', icon: Settings, a: 'spin' },
    ...(ERP_CONFIG.showUserCounts ? [{ v: totalUsers.toLocaleString() + '+', l: 'Active users', icon: Users, a: 'bounce' }] : []),
    { v: '24×7', l: 'Dedicated support', icon: Headset, a: 'wiggle' },
  ]

  return (
    <>
      <Seo title="ERP Portfolio — In-house ERP for Voltech Group" description="The ERP applications our team designed, built and runs for Voltech Group since 2015 — HRMS, supply chain, design management, audit and more across every group company." />

      {/* ── HERO: slider + product orbit ── */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grid-bg-dark absolute inset-0 -z-10" aria-hidden="true" />
        <div className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-brand/40 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-48 left-1/4 -z-10 h-[360px] w-[360px] rounded-full bg-steel/30 blur-3xl" aria-hidden="true" />

        <div className="container-page grid items-center gap-10 pb-12 pt-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:pb-16 lg:pt-14">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
              <Link to="/" className="hover:text-white hover:underline">Home</Link><span className="mx-1.5">/</span><span className="text-white" aria-current="page">ERP Portfolio</span>
            </nav>
            <Slider dark interval={6500} accent="rgb(var(--c-accent))">
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
                    <Link to={s.secondary.to} className="btn-ghost-dark">{s.secondary.label}</Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="slide-in" style={{ animationDelay: '.15s' }}><ProductOrbit /></div>
        </div>

        {/* stats strip */}
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

      <ErpSubnav />

      {/* ── SINCE 2015 ── */}
      <section className="section bg-paper">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal dir="left">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm font-semibold text-brand">
              <AnimIcon icon={Trophy} size={15} anim="swing" always />Since 2015
            </span>
            <h2 className="h-section mt-4">A decade of dedicated ERP development</h2>
            <p className="lead mt-5">Since 2015 our team has designed, built, deployed and maintained 20+ ERP applications exclusively for Voltech Group — every one of them still running and supporting daily operations.</p>
            <p className="mt-4 text-muted">We own the full lifecycle: requirement analysis, development, testing, deployment, database management, performance tuning and ongoing support. It is the same experience we now bring to client projects.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/services#erp" className="btn-primary ia">ERP services<span className="ai ai-nudge"><ArrowRight size={17} /></span></Link>
              <Link to="/projects" className="btn-secondary">Case studies</Link>
            </div>
          </Reveal>
          <ul className="grid content-start gap-3 sm:grid-cols-2">
            {ERP_HIGHLIGHTS.map((h, i) => (
              <Reveal as="li" key={h} dir={i % 2 ? 'right' : 'up'} delay={i * 70}
                className={`lift ia flex items-start gap-3 rounded-xl border border-line bg-white p-4 ${i === ERP_HIGHLIGHTS.length - 1 ? 'sm:col-span-2' : ''}`}>
                <AnimIcon icon={CheckCircle2} size={20} color="rgb(var(--c-primary))" anim="pop" style={{ marginTop: 2, flexShrink: 0 }} />
                <span className="text-[0.95rem] text-ink">{h}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── GROUP COMPANIES ── */}
      <section id="companies" className="section scroll-mt-32">
        <div className="container-page">
          <SectionHeading title="Group companies we build for"
            lead="Each company runs its own set of applications. Pick a company to see what we built for it."
            action={<span className="inline-flex items-center gap-2 text-sm text-muted"><span className="live-dot" />{totalApps} live applications</span>} />
          <Reveal dir="up" className="mb-10 rounded-2xl border border-line bg-gradient-to-r from-paper via-white to-paper py-6">
            <Marquee speed={38} gap={18}>
              {COMPANIES.map((co) => (
                <button key={co.id} type="button" title={co.fullName} onClick={() => navigate(`/erp/companies/${co.id}`)}
                  className="group flex w-[196px] flex-col items-center gap-2 rounded-2xl border border-line bg-white px-4 pb-3 pt-4 shadow-[0_6px_20px_-12px_rgb(15_42_34/.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-lift">
                  <CompanyLogo companyId={co.id} width={160} height={80} rounded={10} padding={3} shadow={false} />
                  <span translate="no" className="notranslate text-sm font-semibold text-ink transition-colors group-hover:text-brand">{co.name}</span>
                  <span className="sr-only">{co.fullName}</span>
                </button>
              ))}
            </Marquee>
          </Reveal>
          <Reveal dir="left">
            <CardRail itemWidth={320} gap={22} autoplay={4000}>
              {COMPANIES.map((co) => <ErpCompanyCard key={co.id} company={co} />)}
            </CardRail>
          </Reveal>
        </div>
      </section>

      {/* ── PRODUCT SUITE ── */}
      <section className="section bg-paper">
        <div className="container-page">
          <SectionHeading title="The Voltech ERP product suite" lead={`${ERP_PRODUCTS.length} product lines, each built around how the team using it actually works.`} />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ERP_PRODUCTS.map((p, i) => (
              <Reveal as="li" key={p.code} dir="up" delay={(i % 4) * 70} className="lift ia rounded-xl border border-line bg-white p-5">
                <IconTile icon={p.icon} anim={p.anim} size={44} color={p.color} radius={10} />
                <h3 translate="no" className="notranslate mt-4 font-display text-base font-semibold">{p.code}</h3>
                <p className="mt-1 text-sm text-muted">{p.full}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SHARED SYSTEMS ── */}
      <section id="shared-systems" className="section scroll-mt-32">
        <div className="container-page space-y-8">
          <SectionHeading title="Shared across every group company" lead="Two platforms run group-wide, configured per company with each company’s data kept separate." className="!mb-2" />
          <ModulePanel icon={Users} eyebrow="Used by all companies" title="HR Management System"
            body="The complete employee lifecycle — recruitment and onboarding through payroll, statutory compliance and exit."
            modules={HRMS_MODULES} art="hrms" tech={HRMS_TECH}
            stats={[{ v: String(HRMS_MODULES.length), l: 'Modules' }, { v: String(HRMS_COMPANIES), l: 'Companies' }]} />
          <ModulePanel tone="green" cols={3} icon={ShieldCheck} eyebrow="Common to all companies" title="Audit Management System"
            body="ISO certification, document control, compliance monitoring and safety management in one real-time dashboard."
            modules={AUDIT_MODULES} art="audit"
            stats={[{ v: '17', l: 'Users' }, { v: '5', l: 'Companies' }, { v: String(AUDIT_MODULES.length), l: 'Modules' }, { v: '24×7', l: 'Monitoring' }]}
            link={ERP_CONFIG.showLoginLinks ? { href: ERP_CONFIG.auditUrl, label: 'Open audit system' } : null} />
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="section bg-ink text-white">
        <div className="container-page">
          <SectionHeading dark title="Built for industry, proven in production" lead="What a decade of running the group’s systems taught us — and what every client project now gets." />
          <ul className="grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {ERP_FEATURES.map((f, i) => (
              <Reveal as="li" key={f.title} dir="up" delay={(i % 3) * 100} className="ia group bg-ink p-6 transition-colors duration-300 hover:bg-[#143629] sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15 transition-colors group-hover:bg-accent/20">
                  <AnimIcon icon={f.icon} size={20} color="rgb(var(--c-accent))" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold !text-white">{f.title}</h3>
                <p className="mt-2 text-[0.95rem] text-white/70">{f.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── WEBSITES TEASER ── */}
      <section className="section">
        <div className="container-page">
          <SectionHeading title="Group websites" lead="Corporate and product websites we designed, built and keep optimised."
            action={<Link to="/erp/websites" className="btn-secondary ia">All websites<span className="ai ai-nudge"><ArrowRight size={17} /></span></Link>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GROUP_SITES.map((s, i) => (
              <Reveal key={s.id} dir="up" delay={i * 90}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="lift ia browser-shot group block overflow-hidden rounded-xl border border-line bg-white">
                  <div className="flex items-center gap-1.5 border-b border-line bg-paper px-3 py-2">
                    <i className="h-2 w-2 rounded-full bg-red-400" /><i className="h-2 w-2 rounded-full bg-amber-400" /><i className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="ml-2 truncate text-[11px] text-muted">{s.url.replace('https://', '')}</span>
                  </div>
                  <div className="aspect-[16/10] overflow-hidden"><img src={s.thumb} alt="" loading="lazy" className="h-full w-full object-cover object-top" /></div>
                  <div className="flex items-center justify-between gap-2 p-4">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-[0.98rem] font-semibold">{s.name}</h3>
                      <p className="truncate text-xs text-muted">{s.tagline}</p>
                    </div>
                    <span className="ai ai-nudge shrink-0" style={{ color: s.color }}><ArrowUpRight size={18} /></span>
                  </div>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Want this for your business?" body="The systems we built for Voltech Group are available as custom implementations. Tell us about your process and we will show you what fits." />
    </>
  )
}
