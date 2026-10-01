import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/** Floating back-to-top button with a scroll-progress ring. */
export default function BackToTop() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setP(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    window.addEventListener('resize', fn)
    return () => { window.removeEventListener('scroll', fn); window.removeEventListener('resize', fn) }
  }, [])
  const show = p > 0.08
  const R = 21, C = 2 * Math.PI * R
  return (
    <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`ia fixed bottom-5 right-5 z-40 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-brand shadow-pop transition-all duration-300 sm:bottom-7 sm:right-7 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
      <svg width="52" height="52" viewBox="0 0 52 52" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="26" cy="26" r={R} fill="none" stroke="rgb(var(--c-primary-soft))" strokeWidth="3" />
        <circle cx="26" cy="26" r={R} fill="none" stroke="rgb(var(--c-primary))" strokeWidth="3" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - p)} />
      </svg>
      <span className="ai ai-bounce relative"><ArrowUp size={20} strokeWidth={2.4} aria-hidden="true" /></span>
    </button>
  )
}
