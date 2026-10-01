import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import ProjectCard from '../components/ui/ProjectCard'
import CtaBand from '../components/sections/CtaBand'
import { PROJECT_CATEGORIES, visibleProjects } from '../content/projects'
import Reveal from '../components/ui/Reveal'

const ALL = visibleProjects()

export default function Projects() {
  const [params, setParams] = useSearchParams()
  const type = PROJECT_CATEGORIES.includes(params.get('type')) ? params.get('type') : 'All'
  const all = ALL
  const list = useMemo(() => (type === 'All' ? all : all.filter((p) => p.category === type)), [type])
  const count = (c) => (c === 'All' ? all.length : all.filter((p) => p.category === c).length)

  return (
    <>
      <Seo />
      <PageHero
        title="Projects and case studies"
        lead="Business applications and websites our team has designed, built and maintained. Internal system names, links and figures are left out to protect our clients’ information."
        crumbs={[{ label: 'Projects' }]}
        art="projects"
      />
      <section className="section !pt-10">
        <div className="container-page">
          <div role="group" aria-label="Filter projects by type" className="mb-8 flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={type === c}
                onClick={() => setParams(c === 'All' ? {} : { type: c }, { replace: true })}
                className={`min-h-[44px] rounded-lg border px-4 text-sm font-semibold transition-colors ${type === c ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink/40'}`}
              >
                {c === 'All' ? 'All work' : `${c}s`} <span className={type === c ? 'text-white/70' : 'text-muted'}>({count(c)})</span>
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">{list.length} projects shown</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => <Reveal key={`${type}-${p.slug}`} delay={(i % 3) * 90}><ProjectCard project={p} headingLevel={2} /></Reveal>)}
          </div>
        </div>
      </section>
      <CtaBand title="Want something similar for your business?" />
    </>
  )
}
