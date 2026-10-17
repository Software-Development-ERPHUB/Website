import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Seo from '../components/ui/Seo'
import Reveal from '../components/ui/Reveal'
import { ScreenBackdrop } from '../components/platform/ModulePreview'
import { HeroHeadline } from '../components/platform/HeroSection'
import { MiniPreview } from '../components/platform/ModulePreview'
import { ModulesShowcase, EnterpriseArchitecture, DeploymentOptions, BenefitsSection, DemoCTA } from '../components/platform/sections'
import { Eyebrow, useParallax } from '../components/platform/shared'
import { MODULES, PLATFORM } from '../content/platform'

/** /platform — the integrated enterprise platform overview (umbrella for the three modules). */
export default function Platform() {
  const bg = useParallax(0.18)
  return (
    <>
      <Seo title="Enterprise Platform — HRMS, Finance & Manufacturing" description={PLATFORM.summary} />

      <section className="relative isolate -mt-[var(--header-h)] overflow-hidden bg-ink pt-[var(--header-h)] text-white" aria-labelledby="pf-h">
        <div className="absolute inset-0 -z-20"><div ref={bg} className="absolute -inset-y-16 inset-x-0"><ScreenBackdrop pk="banner-platform" /></div></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B1830]/95 via-[#10233F]/80 to-[#10233F]/30" aria-hidden="true" />
        <div className="container-page py-16 lg:py-24">
          <nav aria-label="Breadcrumb" className="float-in mb-6 text-sm text-white/60">
            <ol className="flex items-center gap-1"><li><Link to="/" className="hover:text-white hover:underline">Home</Link></li><li className="flex items-center gap-1"><ChevronRight size={14} aria-hidden="true" /><span aria-current="page" className="text-white">Enterprise Platform</span></li></ol>
          </nav>
          <h1 id="pf-h" className="sr-only">Voltech {PLATFORM.identity}</h1>
          <HeroHeadline as="p" lines={['Integrated Enterprise', 'Solutions.']} accentWords={['Solutions']} className="max-w-4xl text-[clamp(2.4rem,1.5rem+4vw,4.6rem)]" />
          <p className="float-in mt-6 max-w-2xl text-lg leading-relaxed text-white/80" style={{ animationDelay: '.45s' }}>{PLATFORM.summary}</p>
          <div className="float-in mt-8 flex flex-col gap-3 xs:flex-row" style={{ animationDelay: '.6s' }}>
            <a href="#solutions" className="btn group bg-accent text-ink hover:bg-white">Explore Our Solutions<ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></a>
            <Link to="/client-demo" className="btn-ghost-dark">Open Client Demo</Link>
          </div>
          <div className="mt-14 flex flex-wrap gap-5" aria-hidden="true">
            {MODULES.map((m, i) => (
              <div key={m.id} className="float-in" style={{ animationDelay: `${0.6 + i * 0.18}s` }}><div className={['bob', 'bob-2', 'bob-3'][i]}><MiniPreview m={m} /></div></div>
            ))}
          </div>
        </div>
      </section>

      <EnterpriseArchitecture cta={false} />

      <ModulesShowcase title="Choose your modules" lead="Each module is a complete application. Start with one, or run all three on one platform." />

      {/* storytelling: how a business day flows across modules */}
      <section className="section bg-paper" aria-labelledby="flow-h">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="lg:sticky lg:top-40 lg:self-start">
            <Eyebrow>How it fits together</Eyebrow>
            <h2 id="flow-h" className="h-section mt-4">One process, three modules</h2>
            <p className="lead mt-4">A typical example of work moving across the platform. The exact flow depends on the modules you deploy and how they are configured.</p>
          </Reveal>
          <ol className="relative space-y-6 border-l-2 border-line pl-8">
            {[
              [MODULES[2], 'A production order needs material', 'Manufacturing raises an indent, compares vendor quotations and issues the purchase order.'],
              [MODULES[1], 'The purchase is budgeted and paid', 'Finance checks the PO against the department budget, books the vendor bill and schedules payment.'],
              [MODULES[0], 'People and hours are accounted for', 'HRMS records the shift attendance and overtime of the team on the line, ready for payroll.'],
              [MODULES[1], 'Management sees the full picture', 'Production cost, spend and labour come together in reports for the month.'],
            ].map(([m, t, b], i) => (
              <Reveal as="li" key={t} delay={i * 100} className="relative rounded-2xl bg-white p-6 shadow-lift">
                <span className="absolute -left-[45px] top-6 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ring-4 ring-paper" style={{ background: m.color }}>{i + 1}</span>
                <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: m.text }}>{m.name}</span>
                <h3 className="mt-1 font-display text-lg font-semibold">{t}</h3>
                <p className="mt-1 text-muted">{b}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <DeploymentOptions />
      <BenefitsSection />
      <DemoCTA />
    </>
  )
}
