import { Link } from 'react-router-dom'
import { ArrowRight, LogIn } from 'lucide-react'
import { projectLogins } from '../../lib/appLinks'
import ProjectVisual from './ProjectVisual'

export default function ProjectCard({ project, headingLevel = 3 }) {
  const H = `h${headingLevel}`
  const dev = project.status !== 'Live'
  const logins = projectLogins(project)
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-pop">
      <ProjectVisual project={project} className="aspect-[16/9] border-b border-line" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="rounded bg-steel-soft px-2 py-1 text-steel">{project.category}</span>
          <span className={`rounded px-2 py-1 ${dev ? 'bg-amber-50 text-amber-800' : 'bg-brand-soft text-brand-strong'}`}>{project.status}</span>
        </div>
        <H className="h-card">
          <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none group-focus-within:underline">
            {project.name}
          </Link>
        </H>
        <p className="mt-2 text-[0.95rem] text-muted">{project.summary}</p>
        {project.tech.length > 0 && (
          <p className="mt-4 text-sm text-muted"><span className="sr-only">Technologies: </span><span translate="no" className="notranslate">{project.tech.join(', ')}</span></p>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
            View case study <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </span>
          {/* relative z-10 keeps this button clickable above the card-wide link */}
          {logins.length === 1 && (
            <a href={logins[0].url} target="_blank" rel="noopener noreferrer"
              className="relative z-10 inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-brand px-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-strong">
              <LogIn size={15} aria-hidden="true" />Login<span className="sr-only"> to {project.name} (opens in a new tab)</span>
            </a>
          )}
          {logins.length > 1 && (
            <Link to={`/projects/${project.slug}#login`}
              className="relative z-10 inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-brand px-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-strong">
              <LogIn size={15} aria-hidden="true" />Login ({logins.length})<span className="sr-only"> — choose company for {project.name}</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
