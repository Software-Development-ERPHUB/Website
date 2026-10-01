import { useEffect, useRef, useState } from 'react'
import HeroDiagram from '../ui/HeroDiagram'
import AppMockup from '../art/AppMockup'
import { IMAGES } from '../../content/images'
import { getProject } from '../../content/projects'

const INTERVAL = 5500

function WebsitesSlide() {
  const desk = IMAGES.siteVg, phone = IMAGES.siteVmcl
  return (
    <div className="relative mx-auto aspect-[560/400] w-full">
      <div className="float-b absolute left-0 top-[6%] w-[86%] overflow-hidden rounded-xl bg-white shadow-pop ring-1 ring-line">
        <div className="flex h-6 items-center gap-1.5 bg-[#E2E8E5] px-3" aria-hidden="true">
          {['#F87171', '#FBBF24', '#34D399'].map((c) => <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />)}
        </div>
        <img src={desk.src} width={desk.w} height={desk.h} alt="Voltech Group corporate website on desktop" loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover object-top" />
      </div>
      <div className="float-a absolute bottom-0 right-0 w-[30%] overflow-hidden rounded-[18px] border-[5px] border-ink bg-white shadow-pop">
        <img src={phone.src} width={phone.w} height={phone.h} alt="Manufacturing products website on mobile" loading="lazy" decoding="async" className="aspect-[9/17] w-full object-cover object-left-top" />
      </div>
    </div>
  )
}

function DashboardSlide() {
  const p = getProject('project-cost-management')
  return (
    <div className="float-a mx-auto w-full overflow-hidden rounded-xl shadow-pop ring-1 ring-line">
      <AppMockup project={p} />
    </div>
  )
}

const SLIDES = [
  { id: 'apps', label: 'Business applications', caption: 'Connected ERP modules on one shared database', node: <HeroDiagram /> },
  { id: 'web', label: 'Websites', caption: 'Responsive corporate and product websites', node: <WebsitesSlide /> },
  { id: 'dash', label: 'Dashboards', caption: 'Live reports drawn from operational data', node: <DashboardSlide /> },
]

/** Hero visual carousel — rotates through what we build. */
export default function HeroShowcase() {
  const [i, setI] = useState(0)
  const [hold, setHold] = useState(false)
  const [reduced, setReduced] = useState(false)
  const ref = useRef(null)

  useEffect(() => { setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches) }, [])
  useEffect(() => {
    if (hold || reduced) return
    const t = setTimeout(() => setI((n) => (n + 1) % SLIDES.length), INTERVAL)
    return () => clearTimeout(t)
  }, [i, hold, reduced])

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      aria-label="What we build"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => { if (!ref.current?.contains(e.relatedTarget)) setHold(false) }}
    >
      <div className="grid">
        {SLIDES.map((s, n) => (
          <div key={s.id} role="group" aria-roledescription="slide" aria-label={`${n + 1} of ${SLIDES.length}: ${s.label}`}
            aria-hidden={n !== i} inert={n !== i ? '' : undefined}
            className={`col-start-1 row-start-1 flex items-center transition-all duration-700 ease-out ${n === i ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}>
            <div className="w-full">{s.node}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2" role="tablist" aria-label="Choose a slide">
        {SLIDES.map((s, n) => (
          <button key={s.id} type="button" role="tab" aria-selected={n === i} onClick={() => setI(n)}
            className="group min-h-[44px] text-left">
            <span className="block h-1 overflow-hidden rounded-full bg-line">
              <span
                key={n === i ? `on-${i}` : 'off'}
                className={`block h-full rounded-full ${n === i ? 'bg-brand' : 'bg-transparent'}`}
                style={n === i && !hold && !reduced ? { animation: `lead-progress ${INTERVAL}ms linear forwards` } : { width: n === i ? '100%' : 0 }}
              />
            </span>
            <span className={`mt-2 block text-xs font-semibold sm:text-sm ${n === i ? 'text-ink' : 'text-muted group-hover:text-ink'}`}>{s.label}</span>
            <span className="hidden text-xs text-muted md:block">{s.caption}</span>
          </button>
        ))}
      </div>
      <style>{`@keyframes lead-progress{from{width:0}to{width:100%}}`}</style>
    </div>
  )
}
