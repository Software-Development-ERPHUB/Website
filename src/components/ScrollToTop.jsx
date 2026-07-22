import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 420)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      onClick={goTop}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        right: 'clamp(14px,3vw,28px)',
        bottom: 'clamp(14px,3vw,28px)',
        zIndex: 600,
        width: 46,
        height: 46,
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        background: 'linear-gradient(135deg,var(--g1),var(--g2))',
        color: '#fff',
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 20px rgba(0,107,51,0.4)',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.85)',
        pointerEvents: show ? 'auto' : 'none',
        transition: 'opacity .25s ease, transform .25s ease, box-shadow .2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,107,51,0.55)'; e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,107,51,0.4)'; e.currentTarget.style.transform = show ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.85)' }}
    >
      ↑
    </button>
  )
}
