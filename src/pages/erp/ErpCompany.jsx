import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ChevronRight, Settings, Users, Rocket, CheckCircle2, Building2 } from 'lucide-react'
import Seo from '../../components/ui/Seo'
import SectionHeading from '../../components/ui/SectionHeading'
import CtaBand from '../../components/sections/CtaBand'
import CompanyLogo from '../../components/CompanyLogo'
import ErpSubnav from '../../components/erp/ErpSubnav'
import ErpAppCard from '../../components/erp/ErpAppCard'
import { AnimIcon, IconTile } from '../../components/erp/AnimIcon'
import { Reveal, CountUp, CardRail } from '../../components/erp/Motion'
import { COMPANIES } from '../../data/companies'
import { ERP_CONFIG, VOMS_MODULES } from '../../content/erp'

export default function ErpCompany() {
  const { companyId } = useParams()
  const navigate = useNavigate()
  const company = COMPANIES.find((c) => c.id === companyId)

  if (!company) {
    return (
      <section className="section">
        <Seo title="Company not found" noindex />
        <div className="container-page flex flex-col items-center text-center">
          <IconTile icon={Building2} size={72} radius={18} anim="bounce" always />
          <h1 className="h-section mt-6">Company not found</h1>
          <p className="lead mt-3">This company page doesn’t exist. Pick one from the ERP portfolio.</p>
          <Link to="/erp#companies" className="btn-primary mt-6"><ArrowLeft size={17} />Back to group companies</Link>
        </div>
      </section>
    )
  }

  const c = company.color
  const upcoming = company.apps.length === 1 && company.apps[0]?.status === 'upcoming'
  const users = company.apps.reduce((s, a) => s + (a.users || 0), 0)
  const others = COMPANIES.filter((x) => x.id !== company.id)
  const stats = [
    { v: upcoming ? 'Soon' : company.apps.length, l: 'Applications', icon: Settings, a: 'spin' },
    ...(ERP_CONFIG.showUserCounts ? [{ v: upcoming ? '0' : users.toLocaleString() + '+', l: 'Users', icon: Users, a: 'bounce' }] : []),
  ]

  return (
    <>
      <Seo title={`${company.fullName} — ERP applications`} description={`${company.tagline}. The ERP applications our team built and supports for ${company.fullName}.`} />

      {/* ── BANNER ── */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grid-bg-dark absolute inset-0 -z-10" aria-hidden="true" />
        <div className="absolute -right-32 -top-32 -z-10 h-[460px] w-[460px] rounded-full blur-3xl" style={{ background: c + '66' }} aria-hidden="true" />
        {[340, 230, 140].map((s, i) => (
          <span key={i} aria-hidden="true" className="absolute -z-10 rounded-full border border-dashed"
            style={{ top: -s * 0.3, right: -s * 0.2, width: s, height: s, borderColor: 'rgb(255 255 255 / .14)', animation: `orbit-spin ${50 + i * 15}s linear infinite ${i % 2 ? 'reverse' : ''}` }} />
        ))}
        <div className="container-page pb-12 pt-9 sm:pb-14 sm:pt-12">
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-white/60">
              <li><Link to="/" className="hover:text-white hover:underline">Home</Link></li>
              <li className="flex items-center gap-1"><ChevronRight size={14} aria-hidden="true" /><Link to="/erp" className="hover:text-white hover:underline">ERP Portfolio</Link></li>
              <li className="flex items-center gap-1"><ChevronRight size={14} aria-hidden="true" /><span aria-current="page" className="text-white">{company.name}</span></li>
            </ol>
          </nav>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="slide-in flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="w-fit rounded-2xl bg-white p-2 shadow-[0_18px_40px_rgb(0_0_0/.35)]">
                <CompanyLogo companyId={company.id} size={76} rounded={12} padding={6} />
              </div>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent ring-1 ring-white/15"><span className="live-dot !h-1.5 !w-1.5" />{company.sector}</span>
                <h1 translate="no" className="notranslate mt-3 font-display text-[clamp(2rem,1.4rem+2.6vw,3.2rem)] font-semibold leading-[1.05] !text-white">{company.name}</h1>
                <p translate="no" className="notranslate mt-1 text-white/75">{company.fullName}</p>
                <p className="mt-1 text-sm italic text-white/55">{company.tagline}</p>
              </div>
            </div>
            <dl className="slide-in flex gap-3" style={{ animationDelay: '.12s' }}>
              {stats.map((s) => (
                <div key={s.l} className="ia min-w-[120px] rounded-xl bg-white/[.07] px-5 py-4 text-center ring-1 ring-white/15">
                  <div className="flex justify-center"><AnimIcon icon={s.icon} size={20} color="rgb(var(--c-accent))" anim={s.a} /></div>
                  <dd className="mt-1 font-display text-2xl font-semibold text-white"><CountUp value={s.v} /></dd>
                  <dt className="text-xs text-white/60">{s.l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <ErpSubnav />

      {/* ── APPS ── */}
      <section className="section">
        <div className="container-page">
          {upcoming ? (
            <Reveal dir="zoom" className="mx-auto max-w-3xl rounded-2xl border border-dashed border-[#0f766e]/40 bg-[#0f766e]/[.04] p-8 text-center sm:p-12">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f766e] to-[#14b8a6] shadow-[0_14px_30px_rgb(15_118_110/.35)]">
                <AnimIcon icon={Rocket} size={36} color="#fff" anim="float" always />
              </span>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0f766e]/10 px-3 py-1 text-sm font-semibold text-[#0f766e]"><span className="live-dot !bg-[#14b8a6]" />In development</span>
              <h2 className="h-section mt-4">An operations ERP is on the way</h2>
              <p className="lead mx-auto mt-4 max-w-xl">{company.name} is digitising its operation and maintenance workflows. Our team is building a dedicated operations management system.</p>
              <ul className="mx-auto mt-8 grid max-w-2xl gap-2.5 text-left sm:grid-cols-2">
                {VOMS_MODULES.map((m, i) => (
                  <Reveal as="li" key={m} dir={i % 2 ? 'right' : 'left'} delay={i * 70} className="ia flex items-center gap-2.5 rounded-lg border border-line bg-white px-4 py-3 text-sm">
                    <AnimIcon icon={CheckCircle2} size={17} color="#0f766e" anim="pop" />{m}
                  </Reveal>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary mt-8">Enquire about this system</Link>
            </Reveal>
          ) : (
            <>
              <SectionHeading title={`${company.name} applications`} lead="Built, deployed and supported by our team."
                action={<button type="button" onClick={() => navigate('/erp#companies')} className="btn-secondary ia"><span className="ai ai-nudge-l"><ArrowLeft size={17} /></span>All companies</button>} />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {company.apps.map((app, i) => (
                  <Reveal key={app.id} dir="up" delay={(i % 3) * 90}><ErpAppCard app={app} /></Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── OTHER COMPANIES ── */}
      <section className="section-tight border-t border-line bg-paper">
        <div className="container-page">
          <h2 className="mb-6 font-display text-2xl font-semibold">Other group companies</h2>
          <CardRail itemWidth={230} gap={12}>
            {others.map((co) => (
              <button key={co.id} type="button" onClick={() => navigate(`/erp/companies/${co.id}`)}
                className="lift ia flex w-full items-center gap-3 rounded-xl border bg-white p-3 text-left" style={{ borderColor: co.color + '33' }}>
                <CompanyLogo companyId={co.id} size={42} rounded={9} padding={3} />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold" style={{ color: co.color }}>{co.name}</span>
                  <span className="block text-xs text-muted">{co.apps.length} applications</span>
                </span>
                <span className="ai ai-nudge" style={{ color: co.color }}><ArrowRight size={17} /></span>
              </button>
            ))}
          </CardRail>
        </div>
      </section>

      <CtaBand title="Need something similar?" body="We can build the same kind of system around your own process — one module at a time or as a full suite." />
    </>
  )
}
