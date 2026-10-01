import { useEffect, useRef, useState } from 'react'
import { Check, ArrowDown, Pause, Play } from 'lucide-react'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import { TECH_LAYERS } from '../../content/company'

/**
 * Interactive "how the stack fits together" explorer.
 * Cycles through the layers automatically until the visitor picks one.
 */
export default function LayerExplorer() {
  const [idx, setIdx] = useState(0)
  const [auto, setAuto] = useState(true)
  const L = TECH_LAYERS[idx]
  const hovering = useRef(false)

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => { if (!hovering.current) setIdx((i) => (i + 1) % TECH_LAYERS.length) }, 4200)
    return () => clearInterval(id)
  }, [auto])

  const pick = (i) => { setIdx(i); setAuto(false) }

  return (
    <section className="section bg-paper" aria-labelledby="layers-h">
      <div className="container-page">
        <div className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="layers-h" className="h-section">How the stack fits together</h2>
            <p className="lead mt-4">Every application we build has the same five layers. Pick a layer to see what it does, the tools we use and where it runs in our own systems.</p>
          </div>
          <button type="button" onClick={() => setAuto((a) => !a)} className="btn-secondary !min-h-[44px] shrink-0" aria-pressed={!auto}>
            {auto ? <><Pause size={16} aria-hidden="true" />Pause tour</> : <><Play size={16} aria-hidden="true" />Play tour</>}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-12"
          onMouseEnter={() => (hovering.current = true)} onMouseLeave={() => (hovering.current = false)}>

          {/* layer stack */}
          <div role="tablist" aria-label="Technology layers" aria-orientation="vertical" className="relative flex flex-col gap-2.5 [perspective:1200px]">
            {TECH_LAYERS.map((x, i) => {
              const on = i === idx
              return (
                <div key={x.id} className="relative">
                  <button type="button" role="tab" id={`tab-${x.id}`} aria-selected={on} aria-controls={`panel-${x.id}`}
                    onClick={() => pick(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') { e.preventDefault(); pick((i + 1) % TECH_LAYERS.length); document.getElementById(`tab-${TECH_LAYERS[(i + 1) % TECH_LAYERS.length].id}`)?.focus() }
                      if (e.key === 'ArrowUp') { e.preventDefault(); const n = (i - 1 + TECH_LAYERS.length) % TECH_LAYERS.length; pick(n); document.getElementById(`tab-${TECH_LAYERS[n].id}`)?.focus() }
                    }}
                    className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border p-4 text-left transition-all duration-500 [transform-style:preserve-3d] ${on ? 'border-transparent text-white shadow-pop' : 'border-line bg-white hover:border-ink/25'}`}
                    style={{
                      background: on ? `linear-gradient(120deg, ${x.color}, #0F2A22)` : undefined,
                      transform: on ? 'translateX(12px) rotateY(-6deg)' : 'none',
                    }}>
                    {/* progress bar while the tour runs */}
                    {on && auto && <span key={idx} className="layer-progress absolute bottom-0 left-0 h-[3px] w-full bg-white/60" aria-hidden="true" />}
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors ${on ? 'bg-white/15' : 'bg-brand-soft text-brand'}`}>
                      <Icon name={x.icon} size={21} className="icon-anim" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-xs font-semibold uppercase tracking-wider ${on ? 'text-white/70' : 'text-muted'}`}>Layer {i + 1}</span>
                      <span className="block font-display text-lg font-semibold">{x.name}</span>
                    </span>
                    <span className={`hidden text-sm sm:block ${on ? 'text-white/80' : 'text-muted'}`}>{x.short}</span>
                  </button>
                  {i < TECH_LAYERS.length - 1 && (
                    <span className="absolute -bottom-2.5 left-9 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-line bg-white text-muted" aria-hidden="true"><ArrowDown size={11} /></span>
                  )}
                </div>
              )
            })}
          </div>

          {/* detail panel */}
          <div role="tabpanel" id={`panel-${L.id}`} aria-labelledby={`tab-${L.id}`}
            className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-lift sm:p-8">
            <span className="absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl transition-colors duration-700" style={{ background: L.color + '33' }} aria-hidden="true" />
            <div key={L.id} className="slide-in relative">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl text-white" style={{ background: L.color }}><Icon name={L.icon} size={22} /></span>
                <div>
                  <p className="text-sm font-semibold text-muted">Layer {idx + 1} of {TECH_LAYERS.length}</p>
                  <h3 className="font-display text-2xl font-semibold">{L.name}</h3>
                </div>
              </div>
              <p className="lead mt-5">{L.summary}</p>

              <h4 className="mt-7 font-sans text-sm font-semibold uppercase tracking-wider text-muted">What it does</h4>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {L.does.map((d, i) => (
                  <li key={d} className="slide-in flex items-start gap-2.5 text-[0.95rem]" style={{ animationDelay: `${0.05 + i * 0.07}s` }}>
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"><Check size={13} strokeWidth={3} aria-hidden="true" /></span>{d}
                  </li>
                ))}
              </ul>

              <h4 className="mt-7 font-sans text-sm font-semibold uppercase tracking-wider text-muted">Tools</h4>
              <ul translate="no" className="notranslate mt-3 flex flex-wrap gap-2">
                {L.tools.map((t, i) => (
                  <li key={t.name} className={`slide-in inline-flex min-h-[38px] items-center gap-2 rounded-lg border px-3 text-sm font-medium ${t.tier === 'core' ? 'border-ink/15 bg-white' : 'border-dashed border-line bg-paper text-muted'}`}
                    style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
                    {t.tier === 'core' && <span className="h-2 w-2 rounded-full" style={{ background: L.color }} aria-hidden="true" />}
                    {t.name}{t.tier !== 'core' && <span className="text-xs">(where applicable)</span>}
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-xl border-l-4 bg-paper p-4" style={{ borderColor: L.color }}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">In our own systems</p>
                <p className="mt-1.5 text-[0.95rem] text-ink">{L.example}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
