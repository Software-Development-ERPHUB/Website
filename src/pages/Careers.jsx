import { Link } from 'react-router-dom'
import { Check, Mail } from 'lucide-react'
import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import { IconTile } from '../components/ui/Icon'
import JobCard from '../components/ui/JobCard'
import { CAREERS, INTERNSHIP } from '../content/company'
import InternshipForm from '../components/sections/InternshipForm'
import { useCmsList } from '../lib/cms'
import { CONTACT } from '../content/site'
import Reveal from '../components/ui/Reveal'

export default function Careers() {
  const to = CONTACT.careersEmail || CONTACT.email
  // Openings come from the CMS; the list in content/company.js is the fallback
  const { items: cmsJobs } = useCmsList('jobs')
  const jobs = cmsJobs || CAREERS.jobs
  return (
    <>
      <Seo />
      <PageHero
        title="Build your career with us"
        lead="Join a small team that designs, builds and supports software businesses rely on every day."
        crumbs={[{ label: 'Careers' }]}
        art="careers"
      >
        <div className="flex flex-col gap-3 xs:flex-row">
          <a href="#internship" className="btn-on-dark">Apply for an internship</a>
          <a href="#openings" className="btn-ghost-dark">See open positions</a>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="why-join-h">
        <div className="container-page">
          <h2 id="why-join-h" className="h-section">Why join us</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {CAREERS.why.map((w, i) => (
              <Reveal as="article" key={w.title} delay={i * 90} className="group">
                <IconTile name={w.icon} />
                <h3 className="h-card mt-4">{w.title}</h3>
                <p className="mt-2 text-muted">{w.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-page grid gap-12 md:grid-cols-2">
          {[['Engineering culture', CAREERS.culture], ['Learning & growth', CAREERS.growth]].map(([t, list]) => (
            <div key={t}>
              <h2 className="font-display text-2xl font-semibold">{t}</h2>
              <ul className="mt-5 space-y-3">
                {list.map((x) => <li key={x} className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-brand" aria-hidden="true" />{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="openings" className="section scroll-mt-20" aria-labelledby="open-h">
        <div className="container-page">
          <h2 id="open-h" className="h-section">Open positions</h2>
          {jobs.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2">{jobs.map((j) => <JobCard key={j.id} job={j} />)}</div>
          ) : (
            <div className="card mt-8 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="font-display text-xl font-semibold">No open positions right now</p>
                <p className="mt-1 text-muted">We still welcome applications from developers and designers. Send your CV and we will keep it on file.</p>
              </div>
              <a href={`mailto:${to}?subject=${encodeURIComponent('General application')}`} className="btn-secondary shrink-0"><Mail size={18} aria-hidden="true" />Send your CV</a>
            </div>
          )}

          <p className="mt-10 text-sm text-muted">Questions about working with us? <Link to="/contact" className="link">Contact our team</Link>.</p>
        </div>
      </section>

      <section id="internship" className="section scroll-mt-20 bg-paper" aria-labelledby="intern-h">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-12">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm font-semibold text-brand"><span className="live-dot !h-1.5 !w-1.5" />Applications open</span>
            <h2 id="intern-h" className="h-section mt-4">Internship programme</h2>
            <p className="lead mt-4">{CAREERS.internship}</p>
            <ul className="mt-8 space-y-5">
              {INTERNSHIP.perks.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 80} className="group flex gap-4">
                  <IconTile name={p.icon} size="sm" />
                  <div>
                    <h3 className="h-card">{p.title}</h3>
                    <p className="mt-1 text-[0.95rem] text-muted">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
          <InternshipForm />
        </div>
      </section>
    </>
  )
}
