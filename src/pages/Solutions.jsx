import { Link } from 'react-router-dom'
import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import { IconTile } from '../components/ui/Icon'
import CtaBand from '../components/sections/CtaBand'
import { SOLUTIONS } from '../content/solutions'
import { getProject } from '../content/projects'
import Reveal from '../components/ui/Reveal'

export default function Solutions() {
  return (
    <>
      <Seo />
      <PageHero
        title="Business solutions, built around the problem"
        lead="Each solution below starts from a situation we have seen inside real companies — and the working system we built to fix it."
        crumbs={[{ label: 'Solutions' }]}
        art="solutions"
      />
      <section className="section">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {SOLUTIONS.map((s, idx) => {
            const refs = s.projects.map(getProject).filter(Boolean)
            return (
              <Reveal as="article" key={s.id} id={s.id} delay={(idx % 2) * 90} className="card group flex scroll-mt-28 flex-col p-6 transition-shadow duration-300 hover:shadow-pop sm:p-8">
                <div className="flex items-center gap-4">
                  <IconTile name={s.icon} />
                  <h2 className="font-display text-xl font-semibold sm:text-2xl">{s.title}</h2>
                </div>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-sm font-semibold text-muted">The problem</dt>
                    <dd className="mt-1">{s.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-brand">The business value</dt>
                    <dd className="mt-1">{s.value}</dd>
                  </div>
                </dl>
                {refs.length > 0 && (
                  <div className="mt-auto pt-6">
                    <p className="text-sm text-muted">Related work:</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {refs.map((p) => (
                        <li key={p.slug}><Link to={`/projects/${p.slug}`} className="inline-flex min-h-[40px] items-center rounded-lg bg-paper px-3 text-sm font-medium hover:text-brand hover:underline">{p.name}</Link></li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>
            )
          })}
        </div>
      </section>
      <CtaBand />
    </>
  )
}
