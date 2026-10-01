import { useEffect, useRef } from 'react'

let io = null
const getObserver = () => {
  if (io || typeof window === 'undefined' || !('IntersectionObserver' in window)) return io
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
    }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  )
  return io
}

/** Fade/slide content in once when it scrolls into view. One shared observer. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = getObserver()
    if (!obs) { el.classList.add('is-in'); return }
    obs.observe(el)
    return () => obs.unobserve(el)
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  )
}
