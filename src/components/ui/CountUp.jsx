import { useEffect, useRef, useState } from 'react'

/** Animates the numeric part of a value like "20+" when it scrolls into view. */
export default function CountUp({ value, duration = 1400 }) {
  // Only plain counts like "20+" or "4" animate — never years or labelled text.
  const raw = String(value).match(/^(\d+)(\D*)$/)
  const m = raw && parseInt(raw[1], 10) < 1000 ? ['', '', raw[1], raw[2]] : null
  const [n, setN] = useState(m ? 0 : null)
  const ref = useRef(null)
  useEffect(() => {
    if (!m) return
    const target = parseInt(m[2], 10)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) { setN(target); return }
    let raf
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration)
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    obs.observe(ref.current)
    return () => { obs.disconnect(); cancelAnimationFrame(raf) }
  }, [value])
  if (!m) return <span>{value}</span>
  return (
    <span ref={ref}>
      <span aria-hidden="true">{m[1]}{n}{m[3]}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
