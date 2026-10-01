import { Link } from 'react-router-dom'
import { ArrowUpRight, Search, BarChart3, Activity, MousePointerClick } from 'lucide-react'
import Seo from '../../components/ui/Seo'
import SectionHeading from '../../components/ui/SectionHeading'
import CtaBand from '../../components/sections/CtaBand'
import ErpSubnav from '../../components/erp/ErpSubnav'
import { AnimIcon, IconTile } from '../../components/erp/AnimIcon'
import { Reveal, CountUp, Slider } from '../../components/erp/Motion'
import { GROUP_SITES, WEB_ANALYTICS, GA_FEATURES, SEO_FEATURES } from '../../content/erp'

function Browser({ site, className = '' }) {
  return (
    <a href={site.url} target="_blank" rel="noopener noreferrer" className={`browser-shot block overflow-hidden rounded-xl bg-[#0b1a15] ring-1 ring-white/10 shadow-[0_30px_70px_rgb(0_0_0/.45)] ${className}`}>
      <div className="flex items-center gap-1.5 bg-white/[.06] px-3 py-2.5">
        <i className="h-2.5 w-2.5 rounded-full bg-red-400" /><i className="h-2.5 w-2.5 rounded-full bg-amber-400" /><i className="h-2.5 w-2.5 rounded-full bg-green-500" />
        <span className="ml-2 flex-1 truncate rounded-md bg-white/[.07] px-3 py-1 text-[11px] text-white/60">{site.url.replace('https://', '')}</span>
      </div>
      <div className="aspect-[16/10] overflow-hidden"><img src={site.thumb} alt={`${site.name} website`} className="h-full w-full object-cover object-top" /></div>
      <span className="sr-only">Open {site.name} (new tab)</span>
    </a>
  )
}

export default function ErpWebsites() {
  return (
    <>
      <Seo title="Group Websites — Design, SEO & Analytics" description="Corporate and product websites we designed, built and optimised for Voltech Group companies, with SEO best practice and Google Analytics 4 on every site." />

      {/* ── HERO SLIDER ── */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grid-bg-dark absolute inset-0 -z-10" aria-hidden="true" />
        <div className="absolute -left-32 -top-40 -z-10 h-[480px] w-[480px] rounded-full bg-brand/40 blur-3xl" aria-hidden="true" />
        <div className="container-page pb-12 pt-9 sm:pt-12">
          <nav aria-label="Breadcrumb" className="mb-7 text-sm text-white/60">
            <Link to="/" className="hover:text-white hover:underline">Home</Link><span className="mx-1.5">/</span>
            <Link to="/erp" className="hover:text-white hover:underline">ERP Portfolio</Link><span className="mx-1.5">/</span>
            <span className="text-white" aria-current="page">Group websites</span>
          </nav>
          <h1 className="sr-only">Voltech Group websites</h1>
          <Slider dark interval={6500} accent="rgb(var(--c-accent))">
            {GROUP_SITES.map((s) => (
              <div key={s.id} className="grid items-center gap-8 lg:grid-cols-[.9fr_1.3fr] lg:gap-12">
                <div>
                  <span className="hs-anim inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent ring-1 ring-white/15"><span className="live-dot !h-1.5 !w-1.5" />Live website</span>
                  <p className="hs-anim mt-4 font-display text-[clamp(1.8rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.06] text-white">{s.name}</p>
                  <p className="hs-anim mt-2 font-medium text-accent">{s.tagline}</p>
                  <p className="hs-anim mt-4 max-w-lg leading-relaxed text-white/70">{s.desc}</p>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="btn-on-dark ia mt-7">Visit website<span className="ai ai-nudge"><ArrowUpRight size={17} /></span></a>
                </div>
                <Browser site={s} />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <ErpSubnav />

      {/* ── SITE ROWS ── */}
      <section className="section">
        <div className="container-page">
          <SectionHeading title="Four websites, one team" lead="Professionally designed and SEO-optimised, each with Google Analytics tracking and its own digital presence." />
          <div className="space-y-8">
            {GROUP_SITES.map((s, i) => (
              <Reveal key={s.id} dir={i % 2 ? 'right' : 'left'}>
                <article className="lift grid overflow-hidden rounded-2xl border border-line bg-white lg:grid-cols-2">
                  <div className={`flex flex-col justify-center p-6 sm:p-8 ${i % 2 ? 'lg:order-2' : ''}`}>
                    <ul className="flex flex-wrap gap-1.5">{s.tags.map((t) => <li key={t} className="rounded-md px-2 py-0.5 text-xs font-semibold" style={{ color: s.color, background: s.color + '12' }}>{t}</li>)}</ul>
                    <h2 className="mt-4 font-display text-2xl font-semibold">{s.name}</h2>
                    <p className="mt-1 text-sm font-semibold" style={{ color: s.color }}>{s.tagline}</p>
                    <p className="mt-3 text-muted">{s.desc}</p>
                    <div className="mt-5 rounded-lg border border-line bg-paper p-4 text-sm">
                      <p className="flex items-center gap-2 font-semibold text-brand"><Search size={15} />SEO details</p>
                      <p className="mt-2 text-ink"><strong>Title:</strong> {s.seoTitle}</p>
                      <p className="mt-1 text-muted"><strong>Keywords:</strong> {s.seoKw}</p>
                      <p className="mt-2 flex items-center gap-2 text-muted"><AnimIcon icon={BarChart3} size={14} color="rgb(var(--c-primary))" anim="bounce" always />GA4 integrated · real-time tracking active</p>
                    </div>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="ia mt-6 inline-flex min-h-[46px] w-fit items-center gap-2 rounded-lg px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5" style={{ background: s.color, boxShadow: `0 10px 22px -10px ${s.color}` }}>
                      Visit website<span className="ai ai-nudge"><ArrowUpRight size={16} /></span>
                    </a>
                  </div>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className={`browser-shot group relative block min-h-[240px] overflow-hidden ${i % 2 ? 'lg:order-1' : ''}`} aria-label={`Open ${s.name}`}>
                    <img src={s.thumb} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `linear-gradient(135deg,${s.color}e6,${s.color}99)` }}>
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40"><AnimIcon icon={MousePointerClick} size={26} color="#fff" anim="bounce" always /></span>
                      <span className="font-display text-lg font-semibold text-white">Visit website</span>
                    </span>
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur"><span className="live-dot !h-1.5 !w-1.5" />Live</span>
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANALYTICS ── */}
      <section className="section bg-paper">
        <div className="container-page">
          <SectionHeading title="Live analytics on every site" lead="Google Analytics 4 shows how many people are active, where they are, which device they use and what they read." />
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WEB_ANALYTICS.map((m, i) => (
              <Reveal key={m.label} dir="up" delay={i * 90} className="lift ia rounded-xl border border-line bg-white p-6">
                <IconTile icon={m.icon} size={46} color={m.color} radius={12} />
                <dd className="mt-4 font-display text-3xl font-semibold" style={{ color: m.color }}><CountUp value={m.value} /></dd>
                <dt className="mt-1 text-sm text-muted">{m.label}</dt>
              </Reveal>
            ))}
          </dl>
          <Reveal dir="up" className="relative mt-8 overflow-hidden rounded-2xl bg-ink p-6 sm:p-8">
            <div className="grid-bg-dark absolute inset-0" aria-hidden="true" />
            <p className="relative flex items-center gap-2 font-semibold text-accent"><AnimIcon icon={Activity} size={17} anim="pulse" always />GA4 features active on all websites</p>
            <ul className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {GA_FEATURES.map((f) => (
                <li key={f.l} className="ia flex gap-3 rounded-xl bg-white/[.05] p-4 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/[.09]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 ring-1 ring-accent/30"><AnimIcon icon={f.icon} size={18} color="rgb(var(--c-accent))" /></span>
                  <span><span className="block font-semibold text-white">{f.l}</span><span className="block text-sm text-white/55">{f.d}</span></span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── SEO ── */}
      <section className="section">
        <div className="container-page">
          <SectionHeading title="SEO done properly" lead="Every group website follows Google-recommended practice for visibility in search." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SEO_FEATURES.map((f, i) => (
              <Reveal as="li" key={f.t} dir="up" delay={(i % 3) * 90} className="lift ia rounded-xl border border-line bg-white p-6">
                <IconTile icon={f.icon} size={44} radius={10} color="rgb(var(--c-primary))" />
                <h3 className="mt-4 font-display text-base font-semibold">{f.t}</h3>
                <p className="mt-1.5 text-sm text-muted">{f.d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Need a website that works this hard?" body="We design, build, host and optimise business websites — and keep them fast and secure after launch." />
    </>
  )
}
