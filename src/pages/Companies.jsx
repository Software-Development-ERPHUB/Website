import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import CompanyCard from '../components/CompanyCard'
import AuditShowcase from '../components/AuditShowcase'
import HrmsShowcase from '../components/HrmsShowcase'
import { COMPANIES } from '../data/companies'

export default function Companies() {
  const [search, setSearch] = useState('')
  const { t } = useTranslation()
  const navigate = useNavigate()

  const totalApps  = COMPANIES.reduce((s,c)=>s+c.apps.length,0)+1
  const totalUsers = COMPANIES.reduce((s,c)=>s+c.totalUsers,0)

  const SECTORS = [
    { icon:'⚡', lk:'comp_sector_eng',  dk:'comp_sector_eng_d',  color:'#007438', bg:'linear-gradient(135deg,#e8f5ee,#d1fae5)' },
    { icon:'🏭', lk:'comp_sector_mfg',  dk:'comp_sector_mfg_d',  color:'#0891b2', bg:'linear-gradient(135deg,#e0f2fe,#bae6fd)' },
    { icon:'🔬', lk:'comp_sector_ins',  dk:'comp_sector_ins_d',  color:'#7c3aed', bg:'linear-gradient(135deg,#ede9fe,#ddd6fe)' },
    { icon:'👥', lk:'comp_sector_hr',   dk:'comp_sector_hr_d',   color:'#dc2626', bg:'linear-gradient(135deg,#fef2f2,#fee2e2)' },
    { icon:'🛡️', lk:'comp_sector_mgmt', dk:'comp_sector_mgmt_d', color:'#d97706', bg:'linear-gradient(135deg,#fef3c7,#fde68a)' },
    { icon:'🔧', lk:'comp_sector_om',   dk:'comp_sector_om_d',   color:'#0f766e', bg:'linear-gradient(135deg,#ccfbf1,#99f6e4)' },
  ]

  const filtered = COMPANIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.fullName.toLowerCase().includes(search.toLowerCase()) ||
    c.sector.toLowerCase().includes(search.toLowerCase()) ||
    c.apps.some(a=>a.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div style={{minHeight:'100vh',background:'var(--page)'}}>
      <Navbar/>

      {/* BANNER */}
      <div style={{
        paddingTop:68,
        background:'linear-gradient(145deg,#f0faf4 0%,#e8f5ee 55%,#ffffff 100%)',
        borderBottom:'1px solid rgba(0,107,51,0.08)',
        position:'relative',overflow:'hidden',
      }}>
        <div style={{position:'absolute',inset:0,opacity:.03,
          backgroundImage:'radial-gradient(rgba(0,116,56,1) 1px,transparent 1px)',
          backgroundSize:'26px 26px',pointerEvents:'none'}}/>
        <div style={{position:'absolute',top:-80,right:-60,width:320,height:320,borderRadius:'50%',
          background:'radial-gradient(circle,rgba(0,116,56,.09),transparent 70%)',pointerEvents:'none'}}/>

        <div style={{maxWidth:1280,margin:'0 auto',padding:'36px 24px 44px',position:'relative'}}>
          {/* Breadcrumb */}
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:20}}>
            <Link to="/" style={{color:'var(--text3)',fontSize:12,textDecoration:'none',fontWeight:500}}
              onMouseEnter={e=>e.target.style.color='var(--g1)'}
              onMouseLeave={e=>e.target.style.color='var(--text3)'}>{t('nav_home')}</Link>
            <span style={{color:'var(--border)',fontSize:14}}>›</span>
            <span style={{color:'var(--g1)',fontSize:12,fontWeight:700}}>{t('nav_companies')}</span>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:32,alignItems:'center',flexWrap:'wrap'}}>
            <div>
              <div className="badge" style={{marginBottom:14}}>
                <span className="live-dot"/>
                <span>{t('sec_companies_tag')}</span>
              </div>
              <h1 style={{fontSize:'clamp(1.8rem,3.2vw,2.6rem)',fontWeight:900,
                color:'var(--text1)',margin:'0 0 10px',lineHeight:1.15}}>
                <span className="text-gradient-green">{t('nav_companies')}</span> &amp; ERP
              </h1>
              <p style={{color:'var(--text2)',fontSize:14,lineHeight:1.75,margin:'0 0 22px',maxWidth:500}}>
                {t('comp_banner_sub')}
              </p>
              {/* Search */}
              <div style={{position:'relative',maxWidth:420}}>
                <span style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',
                  fontSize:15,opacity:.4}}>🔍</span>
                <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder={t('comp_search')}
                  style={{width:'100%',padding:'11px 14px 11px 40px',borderRadius:12,
                    border:'1.5px solid rgba(0,107,51,0.2)',background:'rgba(255,255,255,0.9)',
                    fontSize:13,color:'var(--text1)',outline:'none',fontFamily:'inherit',
                    transition:'border-color .2s,box-shadow .2s'}}
                  onFocus={e=>{e.target.style.borderColor='var(--g2)';e.target.style.boxShadow='0 0 0 3px rgba(0,146,63,.1)'}}
                  onBlur={e=>{e.target.style.borderColor='rgba(0,107,51,0.2)';e.target.style.boxShadow='none'}}/>
              </div>
            </div>
            {/* Stats */}
            <div style={{display:'flex',flexDirection:'column',gap:10,minWidth:160}}>
              {[
                {v:COMPANIES.length,               l:t('stat_companies'), icon:'🏢', c:'var(--g1)'},
                {v:totalApps,                      l:t('stat_apps'),      icon:'⚙️', c:'#0891b2'},
                {v:totalUsers.toLocaleString()+'+', l:t('stat_users'),    icon:'👥', c:'#7c3aed'},
              ].map(s=>(
                <div key={s.l} style={{display:'flex',alignItems:'center',gap:10,
                  background:'rgba(255,255,255,0.85)',border:'1px solid rgba(0,107,51,0.1)',
                  borderRadius:12,padding:'9px 14px'}}>
                  <span style={{fontSize:18}}>{s.icon}</span>
                  <div>
                    <div style={{color:s.c,fontWeight:800,fontSize:17,lineHeight:1}}>{s.v}</div>
                    <div style={{color:'var(--text3)',fontSize:10,fontWeight:500}}>{s.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTOR BANNERS */}
      <div style={{maxWidth:1280,margin:'0 auto',padding:'24px 24px 0'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:10}}>
          {SECTORS.map(s=>(
            <div key={s.lk} style={{background:s.bg,borderRadius:14,padding:'14px 16px',
              border:`1px solid ${s.color}18`,transition:'all .22s',cursor:'default'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow=`0 8px 24px ${s.color}18`}}
              onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
              <div style={{fontSize:22,marginBottom:7}}>{s.icon}</div>
              <div style={{fontWeight:700,fontSize:12.5,color:s.color,marginBottom:3}}>{t(s.lk)}</div>
              <div style={{fontSize:11,color:'var(--text2)',lineHeight:1.5}}>{t(s.dk)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPANY GRID */}
      <div style={{maxWidth:1280,margin:'0 auto',padding:'24px 24px 48px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
          <span style={{color:'var(--text3)',fontSize:12,fontWeight:500}}>
            {filtered.length} {filtered.length===1?t('comp_found_one'):t('comp_found')}
            {search?` — "${search}"`:''}
          </span>
          {search&&(
            <button onClick={()=>setSearch('')} style={{fontSize:11,color:'var(--g1)',fontWeight:600,
              background:'var(--g4)',border:'1px solid rgba(0,107,51,0.2)',
              borderRadius:8,padding:'4px 10px',cursor:'pointer'}}>✕ {t('view_all')||'Clear'}</button>
          )}
        </div>

        {filtered.length===0 ? (
          <div style={{textAlign:'center',padding:'60px 0',color:'var(--text3)'}}>
            <div style={{fontSize:48,marginBottom:12}}>🔍</div>
            <div style={{fontWeight:600,fontSize:15}}>{t('apps_not_found')} — "{search}"</div>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:14,marginBottom:48}}>
            {filtered.map(co=><CompanyCard key={co.id} company={co}/>)}
          </div>
        )}

        <h3 style={{fontSize:17,fontWeight:800,color:'var(--text1)',margin:'0 0 14px',
          display:'flex',alignItems:'center',gap:8}}>
          <span>👥</span>{t('sec_hrms_h')}
        </h3>
        <HrmsShowcase/>

        <div style={{marginTop:28}}>
          <h3 style={{fontSize:17,fontWeight:800,color:'var(--text1)',margin:'0 0 14px',
            display:'flex',alignItems:'center',gap:8}}>
            <span>✅</span>{t('sec_audit_h')}
          </h3>
          <AuditShowcase/>
        </div>
      </div>
    </div>
  )
}
