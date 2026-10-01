import { Mail, Phone } from 'lucide-react'
import { img } from '../../content/images'
import { TEAM_SHOW_CONTACT } from '../../content/team'

/** Team member card. `size="lg"` for the top (lead) row. */
export default function TeamCard({ member, size = 'md', headingLevel = 3 }) {
  const H = `h${headingLevel}`
  const photo = img(member.photo) || img('avatar')
  const isPlaceholder = !member.photo || member.photo === 'avatar'
  const lg = size === 'lg'
  const tel = member.phone?.replace(/[^\d+]/g, '')

  return (
    <article className={`card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-pop ${lg ? 'sm:flex-row' : ''}`}>
      <div className={`relative shrink-0 overflow-hidden bg-paper ${lg ? 'aspect-[5/4] sm:aspect-auto sm:w-[36%]' : 'aspect-[5/4]'}`}>
        <img
          src={photo.src}
          width={photo.w}
          height={photo.h}
          alt={isPlaceholder ? `Placeholder avatar for ${member.name}` : `${member.name}, ${member.role}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <span className="absolute bottom-0 left-0 h-1 w-0 bg-brand transition-all duration-500 group-hover:w-full" aria-hidden="true" />
      </div>

      <div className={`flex flex-1 flex-col ${lg ? 'p-6 sm:p-8' : 'p-5 sm:p-6'}`}>
        <p className="text-sm font-semibold text-brand">{member.role}</p>
        <H translate="no" className={`notranslate mt-1 font-display font-semibold ${lg ? 'text-2xl sm:text-[1.75rem]' : 'text-xl'}`}>{member.name}</H>

        {(TEAM_SHOW_CONTACT.email || TEAM_SHOW_CONTACT.phone) && (
          <ul className="mt-auto space-y-1 pt-5 text-[0.93rem]">
            {TEAM_SHOW_CONTACT.email && member.email && (
              <li>
                <a href={`mailto:${member.email}`} className="flex min-h-[40px] items-center gap-2.5 text-muted transition-colors hover:text-brand">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand"><Mail size={16} aria-hidden="true" className="icon-anim" /></span>
                  <span translate="no" className="notranslate min-w-0 break-words"><span className="sr-only">Email {member.name}: </span>{member.email.split('@')[0]}<wbr />@{member.email.split('@')[1]}</span>
                </a>
              </li>
            )}
            {TEAM_SHOW_CONTACT.phone && member.phone && (
              <li>
                <a href={`tel:${tel}`} className="flex min-h-[40px] items-center gap-2.5 text-muted transition-colors hover:text-brand">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-steel-soft text-steel"><Phone size={16} aria-hidden="true" className="icon-anim" /></span>
                  <span translate="no" className="notranslate"><span className="sr-only">Call {member.name}: </span>{member.phone}</span>
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </article>
  )
}
