import { Linkedin } from 'lucide-react'
import { img } from '../../content/images'
import { LEADERSHIP_PLACEHOLDERS as PH } from '../../content/leadership'

export default function LeaderCard({ leader }) {
  const photo = img(leader.photo)
  const who = leader.name || PH.name
  return (
    <article id={`profile-${leader.id}`} className="card grid scroll-mt-28 overflow-hidden sm:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
      <div className="relative aspect-[4/5] bg-paper sm:aspect-auto sm:min-h-full">
        {photo ? (
          <img src={photo.src} width={photo.w} height={photo.h} alt={leader.sample ? `Placeholder image for the ${leader.role}` : `${who}, ${leader.role}`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="grid-bg absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white font-display text-2xl font-semibold text-muted shadow-lift" aria-hidden="true">
              {leader.role.split(/\s+/).filter((w) => /[A-Z]/.test(w[0])).map((w) => w[0]).join('').slice(0, 3)}
            </span>
            <span className="text-xs text-muted">Photo to be provided</span>
          </div>
        )}
      </div>
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-brand">{leader.role}</p>
          {leader.sample && <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800">Sample profile</span>}
        </div>
        <h3 translate="no" className={`notranslate mt-1 font-display text-2xl font-semibold ${leader.name ? '' : '!text-muted'}`}>{who}</h3>
        <div className="mt-4 max-w-prose space-y-3 text-muted">
          {(Array.isArray(leader.bio) ? leader.bio : [leader.bio || PH.bio]).map((para, i) => <p key={i}>{para}</p>)}
        </div>
        {leader.linkedin && (
          <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-6">
            <Linkedin size={18} aria-hidden="true" /> LinkedIn<span className="sr-only"> profile of {who} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  )
}
