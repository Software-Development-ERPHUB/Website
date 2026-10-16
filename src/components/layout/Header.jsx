import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, Mail, Phone, ArrowRight, Search, Layers, MonitorPlay } from 'lucide-react'
import Logo from '../ui/Logo'
import SocialLinks from '../ui/SocialLinks'
import LanguageSwitcher from '../ui/LanguageSwitcher'

// Loaded on first open so the search index doesn't weigh down the first page load
const SearchPalette = lazy(() => import('../ui/SearchPalette'))
import { NAV } from '../../content/company'
import { CONTACT } from '../../content/site'
import { MODULES, PLATFORM } from '../../content/platform'
import { PIcon } from '../platform/shared'

// Pages whose first section is a dark full-bleed hero: the header starts transparent over it
const OVER_HERO = /^\/(platform|solutions\/(hrms|finance|manufacturing))?$/

const linkCls = (light) => ({ isActive }) =>
  `nav-u relative inline-flex min-h-[44px] items-center whitespace-nowrap rounded-md px-3 text-[0.94rem] font-medium transition-colors ${light ? 'hover:text-accent' : 'hover:text-brand'} ${
    isActive ? `${light ? 'text-accent after:bg-accent' : 'text-brand after:bg-brand'} after:absolute after:inset-x-3 after:-bottom-[13px] after:h-[2px]` : light ? 'text-white' : 'text-ink'
  }`

function Dropdown({ item, light }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const btn = useRef(null)
  const { pathname } = useLocation()
  const moduleRoute = /^\/(platform|solutions\/(hrms|finance|manufacturing))\/?$/.test(pathname)
  const active = item.mega ? moduleRoute : !moduleRoute && item.children.some((c) => {
    const base = c.to.split('#')[0]
    return pathname === base || pathname.startsWith(base + '/')
  })
  const menuId = `nav-${item.label.toLowerCase().replace(/\W+/g, '-')}`

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    const esc = (e) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus() } }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc) }
  }, [open])

  return (
    <div ref={ref} className="relative" onBlur={(e) => { if (!ref.current?.contains(e.relatedTarget)) setOpen(false) }}>
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className={`nav-u inline-flex min-h-[44px] items-center gap-1 whitespace-nowrap rounded-md px-3 text-[0.94rem] font-medium ${light ? 'hover:text-accent' : 'hover:text-brand'} ${active ? (light ? 'text-accent' : 'text-brand') : light ? 'text-white' : 'text-ink'}`}
      >
        {item.label}
        <ChevronDown size={16} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {item.mega ? (
        <div id={menuId} hidden={!open} className="mega-anim fixed inset-x-0 top-[var(--header-h)] z-50 border-b border-line bg-white shadow-pop">
          <MegaMenu />
        </div>
      ) : (
      <ul id={menuId} hidden={!open} className="dropdown-anim absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-line bg-white p-2 shadow-pop">
        {item.children.map((c) => (
          <li key={c.to}>
            <NavLink to={c.to} className={({ isActive }) => `flex min-h-[44px] items-center rounded-lg px-3 text-[0.94rem] transition-[padding,background] hover:bg-paper hover:pl-4 ${isActive ? 'font-semibold text-brand' : 'text-ink'}`} end>
              {c.label}
            </NavLink>
          </li>
        ))}
      </ul>
      )}
    </div>
  )
}

/** Desktop mega menu: previews the three modules and links to the platform and client demos. */
function MegaMenu() {
  return (
    <div className="container-page grid gap-6 py-7 lg:grid-cols-[0.8fr_2.2fr]">
      <div className="flex flex-col justify-between rounded-2xl bg-ink p-6 text-white">
        <div>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-ink"><Layers size={20} aria-hidden="true" /></span>
          <p className="mt-4 font-display text-lg font-semibold">{PLATFORM.identity}</p>
          <p className="mt-2 text-sm text-white/70">HRMS, Finance and Manufacturing as one platform or as standalone applications.</p>
        </div>
        <div className="mt-6 space-y-2">
          <NavLink to="/platform" className="flex min-h-[40px] items-center gap-2 text-sm font-semibold text-white hover:text-accent">Platform overview<ArrowRight size={15} aria-hidden="true" /></NavLink>
          <NavLink to="/client-demo" className="flex min-h-[40px] items-center gap-2 text-sm font-semibold text-white hover:text-accent"><MonitorPlay size={15} aria-hidden="true" />Client Demo</NavLink>
        </div>
      </div>
      <ul className="grid gap-4 md:grid-cols-3">
        {MODULES.map((m) => (
          <li key={m.id}>
            <NavLink to={m.route} className="group flex h-full flex-col rounded-2xl border border-line p-5 transition hover:-translate-y-0.5 hover:shadow-lift" style={{ borderTop: `3px solid ${m.color}` }}>
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ background: m.gradient }}><PIcon name={m.icon} size={19} /></span>
                <span>
                  <span className="block font-display text-base font-semibold text-ink">{m.name}</span>
                  <span className="block text-xs text-muted">{m.full}</span>
                </span>
              </span>
              <span className="mt-3 text-sm text-muted">{m.description}</span>
              <span className="mt-3 flex flex-wrap gap-1.5">
                {m.features.slice(0, 4).map((f) => <span key={f} className="rounded-md px-2 py-0.5 text-[11px] font-medium" style={{ background: m.soft, color: m.text }}>{f}</span>)}
              </span>
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold" style={{ color: m.text }}>Explore {m.name}<ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchBtn = useRef(null)
  const toggleRef = useRef(null)
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  // Ctrl/⌘ + K or "/" opens search from anywhere
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable
      if ((e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        setOpen(false)
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  const closeSearch = () => { setSearchOpen(false); requestAnimationFrame(() => searchBtn.current?.focus()) }
  const panelRef = useRef(null)
  const { pathname } = useLocation()
  const light = OVER_HERO.test(pathname) && !scrolled && !open

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 4)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  // Mobile menu: lock scroll, Esc to close, keep focus inside, restore focus
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = panelRef.current?.querySelector('a,button')
    first?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus() }
      if (e.key === 'Tab' && panelRef.current) {
        const f = [toggleRef.current, ...panelRef.current.querySelectorAll('a,button')]
        const i = f.indexOf(document.activeElement)
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus() }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus() }
      }
    }
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false) }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize) }
  }, [open])

  return (
    <header className={`sticky top-0 z-50 transition-[background,box-shadow,border-color] duration-300 ${open ? 'border-b border-line bg-white' : light ? 'border-b border-white/10 bg-transparent' : scrolled ? 'border-b border-line bg-white/90 shadow-[0_8px_30px_-18px_rgb(16_35_63/.35)] backdrop-blur-md' : 'border-b border-transparent bg-white'}`}>
      <span className="scroll-progress w-full" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Logo tone={light ? 'light' : 'dark'} onClick={() => setOpen(false)} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            {NAV.map((item) =>
              item.children ? (
                <li key={item.label}><Dropdown item={item} light={light} /></li>
              ) : (
                <li key={item.to} className={item.to === '/contact' ? 'hidden 2xl:block' : ''}>
                  <NavLink to={item.to} className={linkCls(light)}>{item.label}</NavLink>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button ref={searchBtn} type="button" onClick={() => { setOpen(false); setSearchOpen(true) }} aria-label="Search the website" aria-keyshortcuts="Control+K"
            className={`group inline-flex h-11 items-center gap-2 rounded-lg border px-3 text-sm transition-colors ${light ? 'border-white/25 text-white hover:border-accent hover:text-accent' : 'border-line text-muted hover:border-brand hover:text-brand'}`}>
            <Search size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:scale-110" />
            <span className="sr-only">Search</span>
            <kbd className="kbd notranslate hidden" translate="no">{isMac ? '⌘' : 'Ctrl'} K</kbd>
          </button>
          <div className={`hidden sm:block ${light ? '[&_button]:border-white/25 [&_button]:text-white' : ''}`}><LanguageSwitcher /></div>
          <Link to="/contact?demo=platform" className={`group hidden !min-h-[44px] whitespace-nowrap !px-4 sm:inline-flex lg:hidden xl:inline-flex ${light ? 'btn bg-accent text-ink hover:bg-white' : 'btn-primary'}`}>Request a Demo<ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" /></Link>
          <button
            ref={toggleRef}
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-lg lg:hidden ${light ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-paper'}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="divide-y divide-line">
            <li><NavLink to="/" end className={({ isActive }) => `flex min-h-[52px] items-center text-lg font-medium ${isActive ? 'text-brand' : 'text-ink'}`}>Home</NavLink></li>
            {NAV.flatMap((item) => (item.children ? item.children : [item])).map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => `flex min-h-[52px] items-center text-lg font-medium ${isActive ? 'text-brand' : 'text-ink'}`}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-line p-4 sm:hidden"><LanguageSwitcher variant="list" /></div>
          <Link to="/contact?demo=platform" className="btn-primary mt-6 w-full">Request a Demo</Link>
          <div className="mt-6 space-y-3 pb-8 text-sm text-muted">
            {CONTACT.email && <a href={`mailto:${CONTACT.email}`} className="flex min-h-[44px] items-center gap-2 break-all"><Mail size={18} aria-hidden="true" />{CONTACT.email}</a>}
            {CONTACT.phone && <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="flex min-h-[44px] items-center gap-2"><Phone size={18} aria-hidden="true" />{CONTACT.phone}</a>}
            <SocialLinks size={42} className="pt-2" />
          </div>
        </nav>
      </div>
      {searchOpen && (
        // portal: the sticky, blurred header would otherwise trap the fixed dialog inside it
        createPortal(<Suspense fallback={null}><SearchPalette onClose={closeSearch} /></Suspense>, document.body)
      )}
    </header>
  )
}
