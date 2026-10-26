import { Link } from 'react-router-dom'
import { ArrowUpRight, Lock, User } from 'lucide-react'
import { AnimIcon } from './AnimIcon'
import { ERP_CONFIG } from '../../content/erp'
import { photo } from '../../content/photos'
import Scene, { sceneForApp } from '../art/Scene'

export const appPhotoKey = (app) => `app-${(/coming soon/i.test(app.code) ? 'oms' : String(app.code)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`

export default function ErpAppCard({ app }) {
  const ph = photo(appPhotoKey(app))
  const live = !!app.url && ERP_CONFIG.showLoginLinks
  return (
    <article className="lift ia group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white">
      <div className="relative h-44 overflow-hidden">
        {/* picture: src/assets/photos/app-<code>.webp when added, else a drawn scene of the work */}
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          {ph ? <img src={ph} alt="" loading="lazy" className="h-full w-full object-cover" /> : <Scene kind={sceneForApp(app)} color={app.color} soft="#F1F5F9" tiles={false} />}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden="true" />
        <span translate="no" className="notranslate absolute left-3 top-3 rounded-full bg-ink/75 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white backdrop-blur">{app.code}</span>
        {app.status === 'live' && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-2.5 py-0.5 text-[11px] font-semibold text-[#4ade80] backdrop-blur">
            <span className="live-dot !h-1.5 !w-1.5 !bg-[#4ade80]" />Live
          </span>
        )}
        <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-white/20 backdrop-blur">
          <AnimIcon icon={app.icon} size={22} color="#fff" />
        </span>
        {ERP_CONFIG.showUserCounts && app.users != null && (
          <span className="absolute bottom-3.5 right-3 inline-flex items-center gap-1 text-xs font-semibold text-white/95"><User size={12} />{app.users.toLocaleString()}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 translate="no" className="notranslate h-card !text-base">{app.name}</h3>
        <p className="mt-2 flex-1 text-sm text-muted">{app.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Modules">
          {app.modules.map((m) => (
            <li key={m} className="rounded-md border px-2 py-0.5 text-[11.5px] font-medium" style={{ color: app.color, background: app.color + '0f', borderColor: app.color + '26' }}>{m}</li>
          ))}
        </ul>
        {live ? (
          <a href={app.url} target="_blank" rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110"
            style={{ background: app.gradient, boxShadow: `0 8px 18px -8px ${app.color}` }}>
            Open login page <span className="ai ai-nudge"><ArrowUpRight size={16} /></span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : (
          <Link to="/contact" className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-line text-sm font-semibold text-muted transition hover:border-brand hover:text-brand">
            <span className="ai ai-swing"><Lock size={15} /></span>Contact the ERP team
          </Link>
        )}
      </div>
    </article>
  )
}
