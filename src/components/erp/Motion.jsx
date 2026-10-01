import { useEffect, useRef, useState, useCallback, Children } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/* ─────────────── shared in-view observer ─────────────── */
const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function useInView(opts = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { setInView(true); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect() }
    }, opts)
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}

/* ─────────────── Reveal: slide-in on scroll ───────────────
   dir: up | down | left | right | zoom          */
export function Reveal({ as: Tag = 'div', dir = 'up', delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView()
  const [done, setDone] = useState(false)
  // once the entrance finishes, drop the delay so hover transitions stay snappy
  useEffect(() => {
    if (!inView) return
    const id = setTimeout(() => setDone(true), delay + 750)
    return () => clearTimeout(id)
  }, [inView])
  return (
    <Tag ref={ref} className={`erp-rv erp-rv-${dir}${inView ? ' in' : ''}${done ? ' done' : ''} ${className}`}
      style={{ transitionDelay: done ? '0ms' : `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  )
}

/* ─────────────── CountUp: animates numbers like "2,152+" / "24×7" ─────────────── */
export function CountUp({ value, duration = 1400, style, className }) {
  const str = String(value)
  const m = str.match(/^([^\d]*)([\d,]+)(.*)$/)
  const [ref, inView] = useInView({ threshold: 0.4 })
  const target = m ? parseInt(m[2].replace(/,/g, ''), 10) : 0
  const hasComma = m ? m[2].includes(',') : false
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!m || !inView) return
    // strings like "24×7" — digits followed by more digits after a symbol: don't animate
    if (/\d/.test(m[3])) { setN(target); return }
    if (reduceMotion()) { setN(target); return }
    let raf, start
    const tick = t => {
      if (!start) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView])

  if (!m) return <span ref={ref} style={style} className={className}>{str}</span>
  const shown = hasComma || target >= 1000 ? n.toLocaleString() : String(n)
  return <span ref={ref} style={style} className={className}><span aria-hidden="true">{m[1]}{shown}{m[3]}</span><span className="sr-only">{str}</span></span>
}

/* ─────────────── Slider: full-width sliding carousel ───────────────
   children = slides. Autoplay, pause on hover, arrows, dots, progress bar, swipe. */
export function Slider({ children, interval = 5500, arrows = true, dots = true, accent = 'var(--g1)', dark = false, height, className = '', onChange }) {
  const slides = Children.toArray(children)
  const count = slides.length
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const touch = useRef(null)

  const go = useCallback(i => setIdx(((i % count) + count) % count), [count])

  useEffect(() => { onChange?.(idx) }, [idx])

  useEffect(() => {
    if (paused || count < 2 || reduceMotion()) return
    const id = setTimeout(() => go(idx + 1), interval)
    return () => clearTimeout(id)
  }, [idx, paused, count, interval, go])

  const onKey = e => {
    if (e.key === 'ArrowRight') go(idx + 1)
    if (e.key === 'ArrowLeft') go(idx - 1)
  }

  return (
    <div className={`slider ${dark ? 'slider-dark' : ''} ${className}`}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      onKeyDown={onKey} tabIndex={0} role="region" aria-roledescription="carousel"
      onTouchStart={e => { touch.current = e.touches[0].clientX; setPaused(true) }}
      onTouchEnd={e => {
        if (touch.current == null) return
        const dx = e.changedTouches[0].clientX - touch.current
        if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1))
        touch.current = null; setPaused(false)
      }}
      style={{ '--accent': accent }}>
      <div className="slider-viewport" style={height ? { height } : undefined}>
        <div className="slider-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {slides.map((s, i) => (
            <div key={i} className={`slider-slide${i === idx ? ' active' : ''}`} aria-hidden={i !== idx}>
              {s}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="slider-controls">
          {dots && (
            <div className="slider-dots">
              {slides.map((_, i) => (
                <button key={i} type="button" aria-label={`Go to slide ${i + 1}`}
                  className={`slider-dot${i === idx ? ' active' : ''}`} onClick={() => go(i)}>
                  {i === idx && !paused && (
                    <span className="slider-dot-fill" style={{ animationDuration: `${interval}ms` }} key={idx} />
                  )}
                </button>
              ))}
            </div>
          )}
          {arrows && (
            <div className="slider-arrows">
              <button type="button" className="slider-arrow ia" aria-label="Previous slide" onClick={() => go(idx - 1)}>
                <span className="ai ai-nudge-l"><ChevronLeft size={18} /></span>
              </button>
              <button type="button" className="slider-arrow ia" aria-label="Next slide" onClick={() => go(idx + 1)}>
                <span className="ai ai-nudge"><ChevronRight size={18} /></span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ─────────────── CardRail: horizontal snap-scrolling row with arrows ─────────────── */
export function CardRail({ children, itemWidth = 240, gap = 16, autoplay = 0 }) {
  const ref = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })
  const hover = useRef(false)

  const update = () => {
    const el = ref.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 })
  }

  const scroll = dir => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * (itemWidth + gap) * Math.max(1, Math.floor(el.clientWidth / (itemWidth + gap)) - 0), behavior: 'smooth' })
  }

  useEffect(() => {
    update()
    const el = ref.current
    el?.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { el?.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])

  useEffect(() => {
    if (!autoplay || reduceMotion()) return
    const id = setInterval(() => {
      const el = ref.current
      if (!el || hover.current) return
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) el.scrollTo({ left: 0, behavior: 'smooth' })
      else el.scrollBy({ left: itemWidth + gap, behavior: 'smooth' })
    }, autoplay)
    return () => clearInterval(id)
  }, [autoplay, itemWidth, gap])

  return (
    <div className="rail" onMouseEnter={() => (hover.current = true)} onMouseLeave={() => (hover.current = false)}>
      <button type="button" className={`rail-btn rail-prev ia${edge.start ? ' hide' : ''}`} onClick={() => scroll(-1)} aria-label="Scroll left">
        <span className="ai ai-nudge-l"><ChevronLeft size={20} /></span>
      </button>
      <div ref={ref} className="rail-track" style={{ gap, gridAutoColumns: `minmax(${itemWidth}px, ${itemWidth}px)` }}>
        {Children.toArray(children).map((c, i) => <div key={i} className="rail-item">{c}</div>)}
      </div>
      <button type="button" className={`rail-btn rail-next ia${edge.end ? ' hide' : ''}`} onClick={() => scroll(1)} aria-label="Scroll right">
        <span className="ai ai-nudge"><ChevronRight size={20} /></span>
      </button>
    </div>
  )
}

/* ─────────────── Marquee: infinite sliding strip ─────────────── */
export function Marquee({ children, speed = 30, gap = 14, reverse = false }) {
  const items = Children.toArray(children)
  return (
    <div className="erp-marquee" style={{ '--gap': `${gap}px`, '--speed': `${speed}s` }}>
      <div className={`erp-marquee-track${reverse ? ' rev' : ''}`}>
        {items.map((c, i) => <div key={'a' + i} className="erp-marquee-item">{c}</div>)}
        {items.map((c, i) => <div key={'b' + i} className="erp-marquee-item" aria-hidden="true">{c}</div>)}
      </div>
    </div>
  )
}
