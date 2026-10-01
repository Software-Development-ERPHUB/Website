import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Building2, Users, Globe } from 'lucide-react'

const LINKS = [
  { to: '/erp', label: 'Overview', icon: LayoutDashboard, anim: 'ai-pop', end: true },
  { to: '/erp#companies', label: 'Group companies', icon: Building2, anim: 'ai-bounce' },
  { to: '/erp#shared-systems', label: 'HRMS & Audit', icon: Users, anim: 'ai-bounce' },
  { to: '/erp/websites', label: 'Group websites', icon: Globe, anim: 'ai-spin' },
]

/** Sticky secondary navigation for the ERP portfolio section. */
export default function ErpSubnav() {
  const { pathname, hash } = useLocation()
  const isOn = (to) => {
    const [p, h] = to.split('#')
    if (h) return pathname === p && hash === '#' + h
    if (p === '/erp') return pathname === '/erp' && !hash
    return pathname.startsWith(p)
  }
  return (
    <nav aria-label="ERP portfolio" className="sticky top-[var(--header-h)] z-40 border-b border-line bg-white/90 backdrop-blur">
      <ul className="container-page flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        {LINKS.map((l) => {
          const I = l.icon
          const on = isOn(l.to)
          return (
            <li key={l.to} className="shrink-0">
              <NavLink to={l.to} end={l.end}
                className={`ia inline-flex min-h-[40px] items-center gap-2 rounded-lg px-3.5 text-sm font-medium transition-colors ${on ? 'bg-brand text-white shadow-lift' : 'text-ink hover:bg-paper hover:text-brand'}`}
                aria-current={on ? 'page' : undefined}>
                <span className={`ai ${l.anim}`}><I size={16} aria-hidden="true" /></span>{l.label}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
