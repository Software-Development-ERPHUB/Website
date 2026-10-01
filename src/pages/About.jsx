import { Link } from 'react-router-dom'
import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import { IconTile } from '../components/ui/Icon'
import CtaBand from '../components/sections/CtaBand'
import { SITE } from '../content/site'
import { PROCESS, STRENGTHS } from '../content/company'
import Reveal from '../components/ui/Reveal'
import Timeline from '../components/sections/Timeline'

const EXPERIENCE = [
  ['Enterprise applications', 'Systems used daily by office, site and field teams across several companies.'],
  ['ERP systems', 'CRM, orders, BOM, purchase, GRN, QC, inventory and invoicing modules.'],
  ['Business workflows', 'Approvals, reminders, scheduled reports and automated client emails.'],
  ['Custom software', 'Applications shaped around each department’s real process.'],
  ['UI/UX', 'Simplifying complex data-entry screens for everyday users.'],
  ['Web applications & websites', 'Browser-based tools and corporate websites with SEO and analytics.'],
  ['Application maintenance', 'Keeping long-running systems healthy while modernising them.'],
]

export default function About() {
  return (
    <>
      <Seo />
      <PageHero
        title="An in-house engineering team, now working for your business"
        lead={`Since ${SITE.since}, we have built and run the software behind a group of engineering, manufacturing and services companies. We are now opening that experience to external clients.`}
        crumbs={[{ label: 'About Us' }]}
        art="about"
      />

      <section className="section" aria-labelledby="who-h">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <h2 id="who-h" className="h-section">Who we are</h2>
          <div className="space-y-5 text-lg text-muted">
            <p>
              We started as the internal software team of Voltech Group. Our job was simple to describe and hard to do: replace paper, spreadsheets and email chains with reliable systems that people across several companies could depend on every day.
            </p>
            <p>
              Over the years that grew into more than twenty applications — from HR and payroll to supply chain, project costing, audit and compliance — along with the group’s corporate websites. We designed them, built them, deployed them and still support them.
            </p>
            <p>
              We are now operating as a professional IT and software services organisation, taking on projects for businesses outside the group while continuing to support the systems we built.
            </p>
          </div>
        </div>
      </section>

      <Timeline />

      <section className="section bg-paper" aria-labelledby="exp-h">
        <div className="container-page">
          <h2 id="exp-h" className="h-section max-w-2xl">Our experience</h2>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCE.map(([t, d]) => (
              <div key={t} className="bg-white p-6">
                <dt className="font-display text-lg font-semibold">{t}</dt>
                <dd className="mt-2 text-[0.95rem] text-muted">{d}</dd>
              </div>
            ))}
            <div className="flex items-center bg-white p-6">
              <Link to="/projects" className="link">See the projects</Link>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="approach-h">
        <div className="container-page">
          <h2 id="approach-h" className="h-section max-w-2xl">Our approach</h2>
          <p className="lead mt-4 max-w-2xl">Discovery, design, development, testing, deployment and support — the same steps whether the project takes three weeks or a year.</p>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 3) * 90} className="relative border-t-2 border-ink pt-5">
                <span className="font-display text-sm font-semibold text-brand">Step {i + 1}</span>
                <h3 className="mt-1 font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-paper" aria-labelledby="why-h">
        <div className="container-page">
          <h2 id="why-h" className="h-section max-w-2xl">Why work with us</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {STRENGTHS.map((s, i) => (
              <Reveal as="article" key={s.title} delay={(i % 3) * 90} className="group flex gap-4">
                <IconTile name={s.icon} size="sm" />
                <div>
                  <h3 className="h-card">{s.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Link to="/leadership" className="btn-secondary mt-12">Meet our leadership</Link>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
