import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { img } from '../../content/images'
import { photo as dropIn } from '../../content/photos'
import Scene from '../art/Scene'

/**
 * Drawn scene shown on the right of each banner variant until a photo named
 * banner-<art>.webp is added to src/assets/photos. About keeps the MD photo.
 */
const ART_PHOTO = { about: 'cmdBanner' }
const ART_SCENE = {
  team: ['hrms', '#3686FC', '#EEF5FF'], projects: ['project', '#FE8428', '#FFF3E8'], services: ['services', '#1A7CFF', '#EAF3FF'],
  contact: ['manufacturing-crm', '#049D83', '#E8F8F4'], careers: ['hrms-employees', '#3686FC', '#EEF5FF'],
  industries: ['manufacturing', '#FE8428', '#FFF3E8'], solutions: ['hrms', '#3686FC', '#EEF5FF'], faq: ['audit', '#049D83', '#E8F8F4'],
  legal: ['hrms-statutory', '#FE8428', '#FFF3E8'], news: ['finance-budget', '#1A7CFF', '#EAF3FF'],
}

/**
 * Inner-page banner with breadcrumb and the page's single H1.
 *   A photo named banner-<art>.webp in src/assets/photos wins.
 *   image  — key from content/images.js used as the banner photo
 *   art    — page variant; picks the drawn scene from ART_SCENE
 *   visual — any custom node for the right-hand side (e.g. a mockup)
 */
export default function PageHero({ title, lead, crumbs = [], children, art, image, visual }) {
  const dropped = dropIn(art && `banner-${art}`)
  const photo = dropped ? { src: dropped } : img(image || ART_PHOTO[art])
  const scene = !photo && (ART_SCENE[art] || ART_SCENE.services)
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {photo ? (
        <>
          <img src={photo.src} srcSet={photo.srcSet} sizes="100vw" alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover object-[75%_center]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" aria-hidden="true" />
        </>
      ) : <div className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />}

      <div className="container-page grid items-center gap-6 pb-10 pt-9 sm:pb-16 sm:pt-12 lg:min-h-[420px] lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:pb-16">
        <div className="slide-in">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-white/60">
              <li><Link to="/" className="hover:text-white hover:underline">Home</Link></li>
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1">
                  <ChevronRight size={14} aria-hidden="true" />
                  {c.to ? <Link to={c.to} className="hover:text-white hover:underline">{c.label}</Link> : <span aria-current="page" className="text-white">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="max-w-3xl font-display text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.025em] !text-white">{title}</h1>
          {lead && <p className="mt-5 max-w-2xl text-[clamp(1.02rem,.95rem+.35vw,1.2rem)] leading-relaxed text-white/75">{lead}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>

        {(visual || scene) && (
          <div className={`slide-in mx-auto -mt-2 w-full lg:mt-0 lg:max-w-none ${visual ? 'max-w-[260px] sm:max-w-[440px]' : 'hidden max-w-[440px] sm:block'}`} style={{ animationDelay: '.15s' }}>
            {visual || (
              <div className="aspect-[16/10] overflow-hidden rounded-3xl shadow-[0_40px_80px_-30px_rgb(0_0_0/.7)] ring-4 ring-white/10">
                <Scene kind={scene[0]} color={scene[1]} soft={scene[2]} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
