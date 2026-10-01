import { MapPin, Clock, Briefcase } from 'lucide-react'
import { CONTACT } from '../../content/site'

export default function JobCard({ job }) {
  const to = CONTACT.careersEmail || CONTACT.email
  const href = `mailto:${to}?subject=${encodeURIComponent('Application: ' + job.position)}`
  return (
    <article className="card flex flex-col p-6">
      <h3 className="h-card">{job.position}</h3>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
        <li className="flex items-center gap-1.5"><Briefcase size={16} aria-hidden="true" />{job.experience}</li>
        <li className="flex items-center gap-1.5"><MapPin size={16} aria-hidden="true" />{job.location}</li>
        <li className="flex items-center gap-1.5"><Clock size={16} aria-hidden="true" />{job.type}</li>
      </ul>
      <p className="mt-4 text-muted">{job.description}</p>
      {job.skills?.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Skills">
          {job.skills.map((s) => <li key={s} className="chip">{s}</li>)}
        </ul>
      )}
      {job.details && (
        <details className="group mt-5 rounded-lg border border-line bg-paper open:bg-white">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between px-4 font-semibold [&::-webkit-details-marker]:hidden">
            Full job description<span className="text-brand transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          {/* sanitised by the CMS on save */}
          <div className="cms-prose border-t border-line px-4 py-4 text-[0.95rem]" dangerouslySetInnerHTML={{ __html: job.details }} />
        </details>
      )}
      <a href={href} className="btn-primary mt-6 self-start">Apply for this role</a>
    </article>
  )
}
