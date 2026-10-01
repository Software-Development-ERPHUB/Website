import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ChevronRight as Crumb, Pause, Play, ArrowRight, Linkedin } from 'lucide-react'
import { img } from '../../content/images'
import { LEADERSHIP_PLACEHOLDERS as PH } from '../../content/leadership'

const INTERVAL = 7000
const shortRole = (role) => ({ 'Chairman & Managing Director': 'CMD', 'Chief Executive Officer': 'CEO' }[role] || role)

/**
 * Leadership banner carousel — full-width photo with a white intro card,
 * matching the team banner style used on voltechgroup.com.
 * Accessible: role tabs, labelled slides, pause control, arrow keys,
 * inactive slides inert, no autoplay for reduced-motion users.
 */
export default function LeadershipSlider({ leaders }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hold, setHold] = useState(false)
  const [reduced, setReduced] = useState(false)
  const rootRef = useRef(null)
  const focusTab = useRef(false)
  const count = leaders.length

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const upd = () => setReduced(mq.matches)
    upd()
    mq.addEventListener?.('change', upd)
    return () => mq.removeEventListener?.('change', upd)
  }, [])

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count])

  useEffect(() => {
    if (!playing || hold || reduced || count < 2) return
    const t = setTimeout(() => go(index + 1), INTERVAL)
    return () => clearTimeout(t)
  }, [index, playing, hold, reduced, count, go])

  useEffect(() => {
    if (!focusTab.current) return
    focusTab.current = false
    document.getElementById(`lead-tab-${leaders[index].id}`)?.focus()
  }, [index, leaders])

  const onKey = (e) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    focusTab.current = e.target.getAttribute('role') === 'tab'
    go(index + dir)
  }

  const autoplayOn = playing && !reduced && count > 1
  const current = leaders[index]

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="Leadership"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => { if (!rootRef.current?.contains(e.relatedTarget)) setHold(false) }}
      onKeyDown={onKey}
    >
      {/* Title bar: breadcrumb, H1, role tabs */}
      <div className="border-b border-line bg-white">
        <div className="container-page flex flex-col gap-4 py-6 md:flex-row md:items-end md:justify-between">
          <div>
            <nav aria-label="Breadcrumb" className="mb-2">
              <ol className="flex items-center gap-1 text-sm text-muted">
                <li><Link to="/" className="hover:text-ink hover:underline">Home</Link></li>
                <li className="flex items-center gap-1"><Crumb size={14} aria-hidden="true" /><span aria-current="page" className="text-ink">Leadership</span></li>
              </ol>
            </nav>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">Our leadership</h1>
          </div>
          <div role="tablist" aria-label="Choose a leader" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
            {leaders.map((l, i) => (
              <button
                key={l.id}
                role="tab"
                id={`lead-tab-${l.id}`}
                aria-selected={i === index}
                aria-controls={`lead-slide-${l.id}`}
                tabIndex={i === index ? 0 : -1}
                onClick={() => go(i)}
                className={`relative min-h-[44px] shrink-0 overflow-hidden rounded-lg px-4 text-sm font-semibold transition-colors ${
                  i === index ? 'bg-ink text-white' : 'bg-paper text-ink hover:bg-line'
                }`}
              >
                {shortRole(l.role)}
                {i === index && autoplayOn && !hold && (
                  <span key={`p-${index}`} aria-hidden="true" className="absolute bottom-0 left-0 h-[3px] bg-accent"
                    style={{ animation: `lead-progress ${INTERVAL}ms linear forwards` }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stage */}
      <div className="relative grid bg-paper">
        {leaders.map((l, i) => {
          const active = i === index
          const banner = img(l.banner) || img(l.photo)
          const name = l.name || PH.name
          return (
            <div
              key={l.id}
              id={`lead-slide-${l.id}`}
              role="tabpanel"
              aria-roledescription="slide"
              aria-labelledby={`lead-tab-${l.id}`}
              aria-hidden={!active}
              inert={!active ? '' : undefined}
              className={`col-start-1 row-start-1 transition-opacity duration-700 ease-out ${active ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}
            >
              <div className="relative lg:min-h-[600px]">
                {/* Photo */}
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
                  {banner && (
                    <img
                      src={banner.src}
                      srcSet={banner.srcSet}
                      sizes="100vw"
                      width={banner.w}
                      height={banner.h}
                      alt={l.sample ? `Placeholder image for the ${l.role}` : `${name}, ${l.role}`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      fetchpriority={i === 0 ? 'high' : undefined}
                      decoding="async"
                      className="h-full w-full object-cover object-[80%_center]"
                    />
                  )}
                </div>

                {/* White intro card */}
                <div className="relative lg:absolute lg:inset-0 lg:flex lg:items-center">
                  <div className="container-page">
                    <div className="relative -mt-12 rounded-xl bg-white p-6 shadow-pop sm:-mt-16 sm:p-9 lg:mt-0 lg:max-w-[520px] lg:rounded-none lg:p-14">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-brand">Our {l.role}</p>
                        {l.sample && <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800">Sample profile</span>}
                      </div>
                      <h2 translate="no" className="notranslate mt-3 font-display text-[clamp(1.9rem,1.4rem+2.2vw,3rem)] font-semibold leading-[1.05]">{name}</h2>
                      <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">{l.intro || PH.intro}</p>
                      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                        <a href={`#profile-${l.id}`} className="btn inline-flex bg-ink text-white hover:bg-ink/90">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-ink"><ArrowRight size={15} aria-hidden="true" /></span>
                          Know more<span className="sr-only"> about {name}</span>
                        </a>
                        {l.linkedin ? (
                          <a href={l.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-steel hover:underline">
                            <Linkedin size={18} aria-hidden="true" /> LinkedIn<span className="sr-only"> profile of {name} (opens in a new tab)</span>
                          </a>
                        ) : (
                          <div className="leading-tight">
                            <p translate="no" className="notranslate font-display font-semibold">{name}</p>
                            <p className="text-xs font-medium text-brand">{l.role}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Controls */}
        {count > 1 && (
          <div className="z-20 col-start-1 row-start-2 lg:row-start-1 lg:self-end lg:justify-self-end">
            <div className="container-page flex items-center justify-between gap-3 py-5 lg:w-auto lg:justify-end lg:py-8">
              <p className="text-sm text-muted lg:rounded-lg lg:bg-white/90 lg:px-3 lg:py-2 lg:text-ink" aria-live={autoplayOn && !hold ? 'off' : 'polite'} aria-atomic="true">
                <span className="font-semibold text-ink">{index + 1}</span> / {count}
                <span className="sr-only">: {current.name || PH.name}, {current.role}</span>
              </p>
              <div className="flex items-center gap-2">
                {!reduced && (
                  <button type="button" onClick={() => setPlaying((p) => !p)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-lift hover:bg-paper"
                    aria-label={playing ? 'Pause automatic slide change' : 'Play automatic slide change'}>
                    {playing ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
                  </button>
                )}
                <button type="button" onClick={() => go(index - 1)} aria-label="Previous leader"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-lift hover:bg-paper">
                  <ChevronLeft size={22} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(index + 1)} aria-label="Next leader"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-lift hover:bg-brand-strong">
                  <ChevronRight size={22} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes lead-progress{from{width:0}to{width:100%}}`}</style>
    </section>
  )
}
