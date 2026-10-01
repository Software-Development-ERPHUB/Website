import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Newspaper, Briefcase, HelpCircle, Image as ImageIcon, Inbox, GraduationCap, Users, LogOut,
  ExternalLink, Menu, X, KeyRound, FileText,
} from 'lucide-react'
import { AuthProvider, useAuth } from './auth'
import { ToastProvider, Spinner } from './ui'
import { cms } from './api'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EntryList from './pages/EntryList'
import EntryEditor from './pages/EntryEditor'
import MediaLibrary from './pages/MediaLibrary'
import Enquiries from './pages/Enquiries'
import Applications from './pages/Applications'
import UsersPage from './pages/Users'
import Account from './pages/Account'

const ICONS = { newspaper: Newspaper, briefcase: Briefcase, help: HelpCircle }

function useCollections() {
  const [cols, setCols] = useState(null)
  useEffect(() => { cms('/cms/collections').then((d) => setCols(d.collections)).catch(() => setCols([])) }, [])
  return cols
}

function Shell() {
  const { user, logout } = useAuth()
  const cols = useCollections()
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const navigate = useNavigate()
  useEffect(() => setOpen(false), [loc.pathname])

  const item = ({ isActive }) =>
    `group flex min-h-[42px] items-center gap-3 rounded-lg px-3 text-[0.93rem] font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/65 hover:bg-white/5 hover:text-white'}`
  const Section = ({ children }) => <p className="mb-1 mt-5 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">{children}</p>

  const nav = (
    <nav aria-label="Dashboard" className="flex h-full flex-col">
      <Link to="/admin" className="flex items-center gap-2.5 px-3 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand font-display font-bold text-white">V</span>
        <span className="leading-tight"><span className="block font-display font-semibold text-white">Voltech CMS</span><span className="block text-xs text-white/50">Content dashboard</span></span>
      </Link>
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <NavLink to="/admin" end className={item}><LayoutDashboard size={18} />Dashboard</NavLink>
        <Section>Content</Section>
        {(cols || []).map((c) => { const I = ICONS[c.icon] || FileText; return (
          <NavLink key={c.id} to={`/admin/content/${c.id}`} className={item}><I size={18} />{c.label}</NavLink>
        ) })}
        <NavLink to="/admin/media" className={item}><ImageIcon size={18} />Media library</NavLink>
        <Section>Inbox</Section>
        <NavLink to="/admin/enquiries" className={item}><Inbox size={18} />Enquiries</NavLink>
        <NavLink to="/admin/applications" className={item}><GraduationCap size={18} />Internship applications</NavLink>
        <Section>Settings</Section>
        {user.role === 'admin' && <NavLink to="/admin/users" className={item}><Users size={18} />Users</NavLink>}
        <NavLink to="/admin/account" className={item}><KeyRound size={18} />My account</NavLink>
      </div>
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-3 px-1">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">{user.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}</span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-sm font-semibold text-white">{user.name}</span>
            <span className="block text-xs capitalize text-white/50">{user.role}</span>
          </span>
          <button type="button" onClick={async () => { await logout(); navigate('/admin/login') }} className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white" aria-label="Sign out" title="Sign out"><LogOut size={18} /></button>
        </div>
      </div>
    </nav>
  )

  return (
    <div className="min-h-screen bg-[#F4F6F5] lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="sticky top-0 hidden h-screen bg-ink lg:block">{nav}</aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} aria-hidden="true" />
          <aside className="slide-in absolute inset-y-0 left-0 w-[270px] bg-ink">{nav}</aside>
        </div>
      )}
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6">
          <button type="button" onClick={() => setOpen((o) => !o)} className="rounded-lg p-2 text-ink hover:bg-paper lg:hidden" aria-label="Menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
          <span className="text-sm text-muted">Signed in as <strong className="text-ink">{user.email}</strong></span>
          <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">View website<ExternalLink size={14} /></a>
        </header>
        <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route index element={<Dashboard cols={cols} />} />
            <Route path="content/:collection" element={<EntryList cols={cols} />} />
            <Route path="content/:collection/new" element={<EntryEditor cols={cols} />} />
            <Route path="content/:collection/:id" element={<EntryEditor cols={cols} />} />
            <Route path="media" element={<MediaLibrary />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="applications" element={<Applications />} />
            <Route path="users" element={user.role === 'admin' ? <UsersPage /> : <Navigate to="/admin" replace />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function Gate() {
  const { user, loading } = useAuth()
  const loc = useLocation()
  useEffect(() => {
    document.title = 'Voltech CMS'
    let m = document.querySelector('meta[name="robots"]')
    if (!m) { m = document.createElement('meta'); m.name = 'robots'; document.head.appendChild(m) }
    m.content = 'noindex, nofollow'
  }, [loc.pathname])
  if (loading) return <div className="flex min-h-screen items-center justify-center text-muted"><Spinner className="mr-2" />Loading…</div>
  return (
    <Routes>
      <Route path="login" element={user ? <Navigate to="/admin" replace /> : <Login />} />
      <Route path="*" element={user ? <Shell /> : <Navigate to="/admin/login" replace state={{ from: loc.pathname }} />} />
    </Routes>
  )
}

/** The dashboard lives at /admin — separate from the public layout. */
export default function AdminApp() {
  return (
    <div translate="no" className="notranslate">
      <AuthProvider><ToastProvider><Gate /></ToastProvider></AuthProvider>
    </div>
  )
}
