import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, ExternalLink, LogIn } from 'lucide-react'
import { projectLogins } from '../lib/appLinks'
import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import ProjectVisual from '../components/ui/ProjectVisual'
import ProjectCard from '../components/ui/ProjectCard'
import CtaBand from '../components/sections/CtaBand'
import NotFound from './NotFound'
import { getProject, visibleProjects } from '../content/projects'
import { img } from '../content/images'

/** Reusable case-study layout — every project in content/projects.js gets one. */
export default function ProjectDetail() {
  const { slug } = useParams()
  const p = getProject(slug)
  if (!p) return <NotFound />

  const related = visibleProjects().filter((x) => x.slug !== p.slug && (x.industry === p.industry || x.category === p.category)).slice(0, 3)
  const image = img(p.image)
  const logins = projectLogins(p)

  return (
    <>
      <Seo
        title={`${p.name} — Case Study`}
        description={p.summary}
        type="article"
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CreativeWork', name: p.name, description: p.summary, genre: p.type }}
      />
      <PageHero
        title={p.name}
        lead={p.summary}
        crumbs={[{ label: 'Projects', to: '/projects' }, { label: p.name }]}
        visual={<div className="group float-a overflow-hidden rounded-xl shadow-pop ring-1 ring-white/15"><ProjectVisual project={p} eager className="aspect-[16/9]" /></div>}
      >
        {logins.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-3">
            {logins.length === 1
              ? <a href={logins[0].url} target="_blank" rel="noopener noreferrer" className="btn-on-dark"><LogIn size={17} aria-hidden="true" />Open login page<span className="sr-only"> (opens in a new tab)</span></a>
              : <a href="#login" className="btn-on-dark"><LogIn size={17} aria-hidden="true" />Login — choose company ({logins.length})</a>}
          </div>
        )}
        <dl className="grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-4">
          {[['Project type', p.type], ['Industry', p.industry], ['Category', p.category], ['Status', p.status]].map(([k, v]) => (
            <div key={k}><dt className="text-white/55">{k}</dt><dd className="mt-0.5 font-semibold text-white">{v}</dd></div>
          ))}
        </dl>
      </PageHero>

      <section className="section !pt-10 sm:!pt-14">
        <div className="container-page grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            <div className="grid gap-10 md:grid-cols-2">
              <section aria-labelledby="cs-problem">
                <h2 id="cs-problem" className="font-display text-2xl font-semibold">The business problem</h2>
                <p className="mt-3 text-muted">{p.problem}</p>
              </section>
              <section aria-labelledby="cs-solution">
                <h2 id="cs-solution" className="font-display text-2xl font-semibold">Our solution</h2>
                <p className="mt-3 text-muted">{p.solution}</p>
              </section>
            </div>

            <section aria-labelledby="cs-features" className="mt-12">
              <h2 id="cs-features" className="font-display text-2xl font-semibold">Key modules and features</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 rounded-lg border border-line p-3.5 transition-colors hover:border-brand/40 hover:bg-brand-soft/40"><Check size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />{f}</li>
                ))}
              </ul>
            </section>

            {p.outcome && p.status === 'Live' && (
              <section aria-labelledby="cs-outcome" className="mt-12 border-l-4 border-brand bg-paper p-6">
                <h2 id="cs-outcome" className="font-display text-xl font-semibold">What changed</h2>
                <p className="mt-2">{p.outcome}</p>
              </section>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-6">
              <h2 className="text-sm font-semibold !font-sans">Technologies</h2>
              {p.tech.length ? (
                <ul translate="no" className="notranslate mt-3 flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
              ) : (
                <p className="mt-2 text-sm italic text-muted">To be confirmed.</p>
              )}
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-6 w-full">
                  Visit live website <ExternalLink size={16} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {logins.length > 0 && (
                <div id="login" className="mt-6 scroll-mt-28 border-t border-line pt-5">
                  <h2 className="text-sm font-semibold !font-sans">Application login</h2>
                  <p className="mt-1 text-xs text-muted">For authorised users. Opens the login page in a new tab.</p>
                  <div className="mt-3 grid gap-2">
                    {logins.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="btn-primary w-full !justify-between">
                        <span className="inline-flex items-center gap-2"><LogIn size={17} aria-hidden="true" />Open login page</span>
                        {logins.length > 1 && <span translate="no" className="notranslate rounded bg-white/20 px-2 py-0.5 text-xs">{l.company}</span>}
                        <span className="sr-only">{logins.length > 1 ? ` for ${l.company}` : ''} (opens in a new tab)</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {!p.liveUrl && !logins.length && p.category !== 'Website' && (
                <p className="mt-6 text-sm text-muted">This is a private business application. A walkthrough can be arranged on request.</p>
              )}
            </div>
            <div className="card bg-ink p-6 text-white">
              <h2 className="font-display text-xl font-semibold !text-white">Need something like this?</h2>
              <p className="mt-2 text-white/75">We can adapt what we learned here to your process.</p>
              <Link to="/contact" className="btn-on-dark mt-5 w-full">Start a project</Link>
            </div>
            <Link to="/projects" className="link inline-flex items-center gap-1.5"><ArrowLeft size={16} aria-hidden="true" />All projects</Link>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-paper" aria-labelledby="related-h">
          <div className="container-page">
            <h2 id="related-h" className="h-section mb-8">Related work</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <ProjectCard key={r.slug} project={r} />)}
            </div>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  )
}
