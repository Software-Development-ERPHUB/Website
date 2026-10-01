import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import { IconTile } from '../components/ui/Icon'
import CtaBand from '../components/sections/CtaBand'
import { SERVICES } from '../content/services'
import Reveal from '../components/ui/Reveal'

export default function Services() {
  return (
    <>
      <Seo />
      <PageHero
        title="Software, web and ERP development services"
        lead="Ten services, one team. Pick the one you need today — we will make sure it fits with what you add tomorrow."
        crumbs={[{ label: 'Services' }]}
        art="services"
      >
        <nav aria-label="Jump to a service">
          <ul className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <li key={s.id}><a href={`#${s.id}`} className="inline-flex min-h-[40px] items-center rounded-lg border border-white/20 bg-white/10 px-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-ink">{s.title}</a></li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="container-page py-8 sm:py-12">
        {SERVICES.map((s) => (
          <Reveal as="section" key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="group grid gap-6 border-b border-line py-10 last:border-b-0 sm:py-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div className="flex gap-5">
              <IconTile name={s.icon} />
              <div>
                <h2 id={`${s.id}-h`} className="font-display text-2xl font-semibold sm:text-[1.75rem]">{s.title}</h2>
                <p className="mt-3 max-w-prose text-lg text-muted">{s.summary}</p>
                <Link to={`/contact?service=${s.id}`} className="link mt-5 inline-block">Discuss this service</Link>
              </div>
            </div>
            <div className="rounded-xl bg-paper p-6 transition-shadow duration-300 group-hover:shadow-lift">
              <h3 className="text-sm font-semibold !font-sans text-ink">What’s included</h3>
              <ul className="mt-4 space-y-3">
                {s.includes.map((x) => (
                  <li key={x} className="flex gap-3 text-[0.95rem]"><Check size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />{x}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <CtaBand title="Not sure which service you need?" body="Describe the problem in your own words. We will suggest the simplest way to solve it." />
    </>
  )
}
