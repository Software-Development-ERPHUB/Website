import { Link } from 'react-router-dom'
import { ArrowRight, Linkedin } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { Eyebrow, useParallax } from './shared'
import { img } from '../../content/images'
import { LEADERS } from '../../content/leadership'

/**
 * Chairman & Managing Director feature, placed straight after the home hero.
 * Uses the real banner photo and the profile in content/leadership.js.
 */
export default function MdSpotlight() {
  const md = LEADERS.find((l) => l.id === 'cmd') || LEADERS[0]
  const banner = img(md.banner)
  const portrait = img(md.photo)
  const photo = useParallax(0.06)
  return (
    <section className="relative isolate overflow-hidden bg-paper" aria-labelledby="md-h">
      <div className="container-page grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:py-24">
        <Reveal className="order-2 lg:order-1">
          <Eyebrow>Our Founder · Chairman &amp; Managing Director</Eyebrow>
          <h2 id="md-h" className="mt-4 font-display text-[clamp(2rem,1.4rem+2.4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
            {md.name}
          </h2>
          <p className="mt-2 text-lg font-medium text-brand">{md.role}, Voltech Group</p>
          <p className="mt-7 border-l-4 border-accent pl-5 font-display text-[clamp(1.15rem,1rem+.6vw,1.45rem)] font-medium leading-snug text-ink">
            From a car shed with four young engineers in 1995 to a ₹600 crore group in 40+ countries. The systems built to run Voltech are now ready for your business.
          </p>
          <p className="mt-5 max-w-xl text-muted">{md.intro}</p>
          <dl className="mt-8 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl bg-line">
            {[['1995', 'Founded'], ['40+', 'Countries'], ['6,000+', 'Professionals']].map(([v, l]) => (
              <div key={l} className="bg-white p-4">
                <dd className="font-display text-2xl font-semibold text-ink">{v}</dd>
                <dt className="text-sm text-muted">{l}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row">
            <Link to="/leadership" className="btn-primary group">Meet our leadership<ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></Link>
            {md.linkedin && (
              <a href={md.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary"><Linkedin size={17} aria-hidden="true" />LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>
            )}
          </div>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/30 via-transparent to-[#3B82F6]/20 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-3xl shadow-pop ring-1 ring-ink/10">
              {banner ? (
                <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
                  <img ref={photo} src={banner.src} srcSet={banner.srcSet} sizes="(min-width:1024px) 640px, 100vw" alt={`${md.name}, ${md.role} of Voltech Group`}
                    width={banner.w} height={banner.h} className="absolute inset-0 h-[112%] w-full object-cover object-[75%_center] will-change-transform" loading="eager" />
                </div>
              ) : portrait && <img src={portrait.src} alt={md.name} width={portrait.w} height={portrait.h} className="w-full" />}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/85 to-transparent p-5 pt-16 text-white">
                <p className="font-display text-lg font-semibold">{md.name}</p>
                <p className="text-sm text-white/75">{md.role}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
