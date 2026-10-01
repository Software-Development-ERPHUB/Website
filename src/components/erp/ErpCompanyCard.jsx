import { useNavigate } from 'react-router-dom'
import { ArrowRight, Rocket, Users, LayoutGrid } from 'lucide-react'
import CompanyLogo from '../CompanyLogo'
import { ERP_CONFIG } from '../../content/erp'

export default function ErpCompanyCard({ company }) {
  const navigate = useNavigate()
  const upcoming = company.apps.length === 1 && company.apps[0]?.status === 'upcoming'
  const go = () => navigate(`/erp/companies/${company.id}`)
  const c = company.color

  return (
    <div className="co-card ia" role="link" tabIndex={0} aria-label={`${company.fullName} — view applications`}
      onClick={go} onKeyDown={(e) => { if (e.key === 'Enter') go() }} style={{ '--c': c }}>
      <div className="co-img relative h-48 overflow-hidden" style={{ background: c + '14' }}>
        <img src={company.image} alt="" loading="lazy" className="h-full w-full object-cover" onError={(e) => (e.target.style.display = 'none')} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg,transparent 20%,${company.gradientFrom}e6 100%)` }} />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {upcoming ? <><span className="ai ai-float ai-always"><Rocket size={11} /></span>Soon</> : <><LayoutGrid size={11} />{company.apps.length} apps</>}
        </span>
        <div className="absolute bottom-3.5 left-4 right-4">
          <div translate="no" className="notranslate font-display text-xl font-bold leading-tight text-white drop-shadow">{company.name}</div>
          <div className="mt-0.5 text-sm text-white/85">{company.sector}</div>
        </div>
      </div>
      <div className="flex flex-1 items-center gap-3.5 border-t px-4 py-4" style={{ borderColor: c + '1f', background: c + '08' }}>
        <CompanyLogo companyId={company.id} width={72} height={48} rounded={10} padding={4} />
        <div className="min-w-0 flex-1">
          <div translate="no" className="notranslate line-clamp-2 text-sm font-semibold leading-snug" style={{ color: c }}>{company.fullName}</div>
          <div className="mt-1 flex items-center gap-1.5 text-[13px] text-muted">
            {upcoming ? 'ERP coming soon' : ERP_CONFIG.showUserCounts ? <><Users size={13} />{company.totalUsers.toLocaleString()}+ users</> : `${company.apps.length} applications`}
          </div>
        </div>
        <span className="co-go flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white" style={{ background: c, boxShadow: `0 6px 14px ${c}55` }}>
          <ArrowRight size={17} strokeWidth={2.4} />
        </span>
      </div>
    </div>
  )
}
