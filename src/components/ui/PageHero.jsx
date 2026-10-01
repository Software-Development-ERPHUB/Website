import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import BannerArt from '../art/BannerArt'
import { img } from '../../content/images'

/**
 * Inner-page banner with breadcrumb and the page's single H1.
 *   art    — illustration variant from components/art/BannerArt.jsx
 *   image  — key from content/images.js; a real photo used as the banner
 *            background instead of the illustration
 *   visual — any custom node for the right-hand side (e.g. a mockup)
 */
export default function PageHero({ title, lead, crumbs = [], children, art, image, visual }) {
  const photo = img(image)
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {photo ? (
        <>
          <img src={photo.src} srcSet={photo.srcSet} sizes="100vw" alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" aria-hidden="true" />
        </>
      ) : (
        <>
          <div className="grid-bg-dark absolute inset-0 -z-10" aria-hidden="true" />
          <div className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-brand/40 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-48 left-1/4 -z-10 h-[360px] w-[360px] rounded-full bg-steel/30 blur-3xl" aria-hidden="true" />
        </>
      )}

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

        {!photo && (visual || art) && (
          <div className="slide-in mx-auto -mt-2 w-full max-w-[260px] sm:max-w-[440px] lg:mt-0 lg:max-w-none" style={{ animationDelay: '.15s' }}>
            {visual || <BannerArt variant={art} />}
          </div>
        )}
      </div>
    </section>
  )
}
