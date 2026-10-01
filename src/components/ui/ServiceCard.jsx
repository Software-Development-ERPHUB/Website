import { Link } from 'react-router-dom'
import { IconTile } from './Icon'

export default function ServiceCard({ service, headingLevel = 3 }) {
  const H = `h${headingLevel}`
  return (
    <article className="group flex gap-4 py-6 sm:gap-5">
      <IconTile name={service.icon} />
      <div className="min-w-0">
        <H className="h-card">{service.title}</H>
        <p className="mt-1.5 text-[0.95rem] text-muted">{service.summary}</p>
        <Link to={`/services#${service.id}`} className="link mt-2.5 inline-block text-sm" aria-label={`Learn more about ${service.title}`}>
          Learn more
        </Link>
      </div>
    </article>
  )
}
