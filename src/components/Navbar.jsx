import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const loc = useLocation()
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [loc.pathname])

  const NAV = [
    { to: '/',          label: t('nav_home') },
    { to: '/companies', label: t('nav_companies') },
    { to: '/websites',  label: t('nav_websites') },
    { to: '/contact',   label: t('nav_contact') },
  ]

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500 }}>
      <nav style={{
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(0,107,51,0.15)' : '1px solid #E5E7EB',
        boxShadow: scrolled ? '0 2px 20px rgba(0,107,51,0.08)' : 'none',
        transition: 'all .3s',
      }}>
        {/* Green top strip */}
        <div style={{ height: 3, background: 'linear-gradient(90deg,var(--g1),var(--g3),var(--g1))' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 58 }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,var(--g1),var(--g3))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 12px rgba(0,107,51,0.28)', flexShrink: 0 }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 13 }}>VG</span>
            </div>
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--g1)' }}>Voltech <span style={{ color: 'var(--text1)' }}>Group</span></div>
              <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--g2)', marginTop: 2 }}>ERP Ecosystem</div>
            </div>
          </Link>

          {/* Desktop nav — responsive show/hide is owned entirely by the
              Tailwind classes now. No inline `display` here, since an
              inline style would always beat `hidden`/`md:flex`. */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 2 }}>
            {NAV.map(l => {
              const active = l.to === '/' ? loc.pathname === '/' : loc.pathname.startsWith(l.to)
              return (
                <Link key={l.to} to={l.to} style={{
                  padding: '6px 13px', borderRadius: 8, fontSize: 13.5, fontWeight: 600,
                  color: active ? 'var(--g1)' : 'var(--text2)',
                  background: active ? 'var(--g4)' : 'transparent',
                  borderBottom: active ? '2px solid var(--g1)' : '2px solid transparent',
                  textDecoration: 'none', transition: 'all .18s', whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'var(--g1)'; e.currentTarget.style.background = 'var(--g5)' } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.background = 'transparent' } }}>
                  {l.label}
                </Link>
              )
            })}
            <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 6px' }} />
            <LanguageSwitcher />
            <Link to="/contact" style={{ marginLeft: 8, padding: '7px 18px', borderRadius: 9, fontSize: 12.5, fontWeight: 700, background: 'linear-gradient(135deg,var(--g1),var(--g2))', color: '#fff', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0,107,51,0.28)', transition: 'all .2s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 7px 20px rgba(0,107,51,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,107,51,0.28)' }}>
              ✉ {t('nav_contact')}
            </Link>
          </div>

          {/* Mobile: lang + burger — same fix, no inline display fighting the class */}
          <div className="flex md:hidden" style={{ alignItems: 'center', gap: 8 }}>
            <LanguageSwitcher compact />
            <button onClick={() => setMobileOpen(o => !o)} style={{ background: 'var(--g4)', border: '1px solid rgba(0,107,51,0.2)', borderRadius: 8, padding: '6px 10px', fontSize: 16, color: 'var(--g1)', cursor: 'pointer', lineHeight: 1 }}>
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '10px 16px 16px' }}>
            {NAV.map(l => {
              const active = l.to === '/' ? loc.pathname === '/' : loc.pathname.startsWith(l.to)
              return (
                <Link key={l.to} to={l.to} style={{ display: 'flex', alignItems: 'center', padding: '11px 14px', borderRadius: 10, marginBottom: 4, fontWeight: 600, fontSize: 14, textDecoration: 'none', color: active ? 'var(--g1)' : 'var(--text2)', background: active ? 'var(--g4)' : 'transparent' }}>
                  {l.label}
                </Link>
              )
            })}
          </div>
        )}
      </nav>
    </header>
  )
}
