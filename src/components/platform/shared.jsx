import { useEffect, useRef, useState } from 'react'
import {
  Users, Landmark, Factory, UserPlus, Fingerprint, Wallet, Target, GraduationCap, Smartphone, BookOpen,
  ArrowLeftRight, PieChart, Building, FileBarChart, Receipt, CalendarRange, Boxes, ShoppingCart, BadgeCheck,
  Wrench, HardHat, Workflow, LayoutGrid, Layers, Eye, GitBranch,
} from 'lucide-react'

const ICONS = {
  Users, Landmark, Factory, UserPlus, Fingerprint, Wallet, Target, GraduationCap, Smartphone, BookOpen,
  ArrowLeftRight, PieChart, Building, FileBarChart, Receipt, CalendarRange, Boxes, ShoppingCart, BadgeCheck,
  Wrench, HardHat, Workflow, LayoutGrid, Layers, Eye, GitBranch,
}

/** Icon by name from content/platform.js. */
export function PIcon({ name, ...rest }) {
  const C = ICONS[name] || Layers
  return <C aria-hidden="true" {...rest} />
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Subtle parallax: moves the element by `factor` × its distance from the
 * viewport centre. Uses transform only, runs only while on screen, and is
 * off for reduced-motion users.
 */
export function useParallax(factor = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let raf = 0
    let visible = true
    const update = () => {
      raf = 0
      const r = el.parentElement.getBoundingClientRect()
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -factor
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    }
    const onScroll = () => { if (visible && !raf) raf = requestAnimationFrame(update) }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) onScroll() })
    io.observe(el.parentElement)
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [factor])
  return ref
}

/** true once the element has scrolled into view (for counters and charts). */
export function useInView(options = { threshold: 0.25 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { setInView(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } }, options)
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}

/** Counts up to `to` when `run` turns true. Formats with Indian grouping. */
export function Counter({ to, run, prefix = '', suffix = '', decimals = 0, duration = 1400 }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    if (prefersReducedMotion()) { setN(to); return }
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1)
      setN(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to, duration])
  const shown = n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return <span>{prefix}{shown}{suffix}</span>
}

/** Small uppercase label above a section heading. */
export function Eyebrow({ children, color = 'rgb(var(--c-primary))', dark = false }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em] ${dark ? 'text-white/80' : ''}`} style={dark ? undefined : { color }}>
      <span className="h-px w-6" style={{ background: dark ? 'rgb(var(--c-accent))' : color }} aria-hidden="true" />
      {children}
    </span>
  )
}
