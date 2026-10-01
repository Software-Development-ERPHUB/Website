import { Link } from 'react-router-dom'
import { ArrowUpRight, Lock, User } from 'lucide-react'
import { AnimIcon } from './AnimIcon'
import { ERP_CONFIG } from '../../content/erp'

export default function ErpAppCard({ app }) {
  const live = !!app.url && ERP_CONFIG.showLoginLinks
  return (
    <article className="lift ia group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white">
      <div className="relative h-28 overflow-hidden" style={{ background: app.gradient }}>
        {[120, 80, 48].map((s, i) => (
          <span key={i} className="absolute rounded-full border transition-transform duration-1000 group-hover:scale-125 group-hover:rotate-12"
            style={{ top: -s * 0.3, right: -s * 0.3, width: s, height: s, borderColor: `rgba(255,255,255,${0.12 + i * 0.06})` }} />
        ))}
        <span translate="no" className="notranslate absolute left-3 top-3 rounded-full bg-black/25 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white backdrop-blur">{app.code}</span>
        {app.status === 'live' && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-0.5 text-[11px] font-semibold text-[#4ade80] backdrop-blur">
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
