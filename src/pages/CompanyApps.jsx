import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import AppCard from '../components/AppCard'
import AuditShowcase from '../components/AuditShowcase'
import HrmsShowcase from '../components/HrmsShowcase'
import CompanyLogo from '../components/CompanyLogo'
import { COMPANIES } from '../data/companies'

export default function CompanyApps() {
  const { companyId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const company = COMPANIES.find(c => c.id === companyId)

  if (!company) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#fff'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:56,marginBottom:16}}>🏢</div>
        <h2 style={{fontSize:20,fontWeight:700,marginBottom:8,color:'var(--text1)'}}>{t('apps_not_found')}</h2>
        <p style={{color:'var(--text3)',marginBottom:20}}>This company page could not be found.</p>
        <button onClick={()=>navigate('/companies')} className="btn-primary">{t('apps_back')}</button>
      </div>
    </div>
  )

  const isVoms = company.id === 'voms'
  const totalUsers = company.apps.reduce((s,a)=>s+(a.users||0),0)
  const others = COMPANIES.filter(c=>c.id!==company.id)

  return (
    <div style={{minHeight:'100vh',background:'var(--page)'}}>
      <Navbar/>

      {/* ── BANNER ── */}
      <div style={{
        paddingTop:68,
        background:`linear-gradient(145deg,${company.color}08 0%,${company.color}04 50%,#ffffff 100%)`,
        borderBottom:`1px solid ${company.color}15`,
        position:'relative',overflow:'hidden',
      }}>
        {/* Decorative circles in company color */}
        {[280,190,110].map((s,i)=>(
          <div key={i} style={{
            position:'absolute',top:-s*.3,right:-s*.25,
            width:s,height:s,borderRadius:'50%',
            border:`1px solid ${company.color}${i===0?'12':i===1?'18':'22'}`,
            pointerEvents:'none',
          }}/>
        ))}
        {/* Dot grid */}
        <div style={{position:'absolute',inset:0,opacity:.025,
          backgroundImage:'radial-gradient(rgba(0,0,0,.8) 1px,transparent 1px)',
          backgroundSize:'24px 24px',pointerEvents:'none'}}/>

        <div style={{maxWidth:1280,margin:'0 auto',padding:'36px 24px 44px',position:'relative'}}>
          {/* Breadcrumb */}
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:22}}>
            {[['/',t('nav_home')],[ '/companies',t('nav_companies')]].map(([to,label])=>(
              <span key={to} style={{display:'flex',alignItems:'center',gap:8}}>
                <Link to={to} style={{color:'var(--text3)',fontSize:12,textDecoration:'none',
                  fontWeight:500,transition:'color .18s'}}
                  onMouseEnter={e=>e.target.style.color=company.color}
                  onMouseLeave={e=>e.target.style.color='var(--text3)'}>{label}</Link>
                <span style={{color:'var(--border)',fontSize:14}}>›</span>
              </span>
            ))}
            <span style={{color:company.color,fontSize:12,fontWeight:700}}>{company.name}</span>
          </div>

          <div style={{display:'flex',alignItems:'flex-end',gap:24,flexWrap:'wrap'}}>
            <div style={{flex:1,minWidth:260}}>
              <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:14}}>
                {/* Large logo in frosted box */}
                <div style={{
                  background:'#fff',border:`1.5px solid ${company.color}20`,
                  borderRadius:18,padding:10,flexShrink:0,
                  boxShadow:`0 4px 16px ${company.color}15`,
                }}>
                  <CompanyLogo companyId={company.id} size={64} rounded={13} padding={5}/>
                </div>
                <div>
                  <div style={{
                    display:'inline-flex',alignItems:'center',gap:6,
                    background:`${company.color}12`,border:`1px solid ${company.color}25`,
                    borderRadius:20,padding:'3px 12px',marginBottom:8,
                  }}>
                    <span style={{width:5,height:5,borderRadius:'50%',background:company.color,display:'inline-block'}}/>
                    <span style={{color:company.color,fontSize:10,fontWeight:700,
                      letterSpacing:1.5,textTransform:'uppercase'}}>{company.sector}</span>
                  </div>
                  <h1 style={{color:'var(--text1)',fontWeight:900,
                    fontSize:'clamp(1.7rem,3vw,2.4rem)',margin:'0 0 4px',lineHeight:1.1}}>{company.name}</h1>
                  <p style={{color:'var(--text2)',fontSize:13,margin:0}}>{company.fullName}</p>
                </div>
              </div>
              <p style={{color:'var(--text3)',fontSize:12,fontStyle:'italic',margin:0}}>{company.tagline}</p>
            </div>

            {/* Stats pills */}
            <div style={{display:'flex',gap:10}}>
              {[
                {v:isVoms?'Soon':company.apps.length, l:t('stat_apps'), icon:'⚙️'},
                {v:isVoms?'0':totalUsers.toLocaleString()+'+', l:t('stat_users'), icon:'👥'},
              ].map(s=>(
                <div key={s.l} style={{
                  background:'#fff',border:`1px solid ${company.color}20`,
                  borderRadius:16,padding:'14px 20px',textAlign:'center',
                  boxShadow:`0 3px 12px ${company.color}10`,
                }}>
                  <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
                  <div style={{color:company.color,fontWeight:900,fontSize:22,lineHeight:1}}>{s.v}</div>
                  <div style={{color:'var(--text3)',fontSize:9.5,fontWeight:600,
                    textTransform:'uppercase',letterSpacing:1,marginTop:4}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── APPS / COMING SOON ── */}
      <div style={{maxWidth:1280,margin:'0 auto',padding:'36px 24px'}}>
        {isVoms ? (
          /* VOMS coming soon section */
          <div>
            <div style={{
              background:'linear-gradient(135deg,#0f766e08,#14b8a608)',
              border:'1.5px dashed #0f766e30',
              borderRadius:20,padding:'40px 32px',textAlign:'center',marginBottom:32,
            }}>
              <div style={{fontSize:56,marginBottom:16}}>🚀</div>
              <div style={{
                display:'inline-flex',alignItems:'center',gap:8,
                background:'rgba(15,118,110,0.1)',border:'1px solid rgba(15,118,110,0.25)',
                borderRadius:30,padding:'5px 16px',marginBottom:16,
              }}>
                <span style={{width:7,height:7,borderRadius:'50%',background:'#14b8a6',
                  display:'inline-block',boxShadow:'0 0 6px #14b8a6'}}/>
                <span style={{color:'#0f766e',fontSize:10,fontWeight:700,
                  letterSpacing:2,textTransform:'uppercase'}}>In Development</span>
              </div>
              <h2 style={{fontSize:24,fontWeight:800,color:'var(--text1)',margin:'0 0 12px'}}>
                {t('voms_coming_h')}
              </h2>
              <p style={{color:'var(--text2)',fontSize:14,lineHeight:1.8,maxWidth:540,margin:'0 auto 28px'}}>
                {t('voms_coming_sub')}
              </p>
              {/* Planned modules */}
              <div style={{textAlign:'left',maxWidth:560,margin:'0 auto'}}>
                <div style={{fontSize:11,fontWeight:700,color:'#0f766e',
                  textTransform:'uppercase',letterSpacing:1.5,marginBottom:14}}>
                  {t('voms_modules_h')}
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:10}}>
                  {['Work Order Management','Preventive Maintenance Scheduling','Asset Health Tracking',
                    'Field Engineer Dispatch','SLA & Compliance Reporting','Equipment Downtime Analytics'].map(m=>(
                    <div key={m} style={{
                      display:'flex',alignItems:'center',gap:8,
                      background:'#fff',border:'1px solid rgba(15,118,110,0.15)',
                      borderRadius:10,padding:'9px 13px',
                    }}>
                      <span style={{width:7,height:7,borderRadius:'50%',
                        background:'#0f766e',flexShrink:0,display:'inline-block'}}/>
                      <span style={{fontSize:12,color:'var(--text2)',fontWeight:500}}>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={()=>navigate('/contact')} style={{
                marginTop:28,background:'linear-gradient(135deg,#0f766e,#14b8a6)',
                color:'#fff',fontWeight:700,padding:'12px 28px',borderRadius:12,
                border:'none',cursor:'pointer',fontSize:13,
                boxShadow:'0 5px 18px rgba(15,118,110,0.35)',
              }}>
                ✉ Enquire About VOMS ERP →
              </button>
            </div>
          </div>
        ) : (
          /* Normal apps grid */
          <>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
              <div>
                <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',
                  letterSpacing:2,color:company.color,marginBottom:4}}>
                  {company.name} {t('apps_erp_suite')}
                </div>
                <h2 style={{fontSize:20,fontWeight:800,color:'var(--text1)',margin:0}}>{t('apps_all')}</h2>
              </div>
              <button onClick={()=>navigate('/companies')} style={{
                fontSize:12,color:'var(--text3)',fontWeight:600,
                background:'#fff',border:'1px solid var(--border)',
                borderRadius:10,padding:'8px 16px',cursor:'pointer',
                display:'flex',alignItems:'center',gap:5,transition:'all .18s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=company.color+'60';e.currentTarget.style.color=company.color}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text3)'}}>
                {t('apps_back_short')} ←
              </button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:14,marginBottom:40}}>
              {company.apps.map(app=><AppCard key={app.id} app={app}/>)}
            </div>
          </>
        )}

        {/* HRMS + Audit for all */}
        <div style={{marginBottom:28}}>
          <h3 style={{fontSize:16,fontWeight:800,color:'var(--text1)',margin:'0 0 14px',display:'flex',alignItems:'center',gap:7}}>
            <span>👥</span> {t('sec_hrms_h')}
          </h3>
          <HrmsShowcase/>
        </div>
        <div style={{marginBottom:32}}>
          <h3 style={{fontSize:16,fontWeight:800,color:'var(--text1)',margin:'0 0 14px',display:'flex',alignItems:'center',gap:7}}>
            <span>✅</span> {t('sec_audit_h')}
          </h3>
          <AuditShowcase/>
        </div>

        {/* Other companies */}
        <div>
          <div style={{fontSize:11,fontWeight:700,color:'var(--text3)',
            textTransform:'uppercase',letterSpacing:1.5,marginBottom:12}}>{t('apps_other')}</div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            {others.map(co=>(
              <div key={co.id} onClick={()=>navigate(`/companies/${co.id}`)}
                style={{
                  display:'flex',alignItems:'center',gap:10,
                  background:'#fff',border:`1.5px solid ${co.color}22`,
                  borderRadius:14,padding:'10px 14px',cursor:'pointer',
                  transition:'all .22s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=co.color+'55';e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=`0 6px 18px ${co.color}18`}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=co.color+'22';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
                <CompanyLogo companyId={co.id} size={36} rounded={8} padding={3}/>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:co.color}}>{co.name}</div>
                  <div style={{fontSize:10,color:'var(--text3)'}}>{co.apps.length} apps</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer style={{background:'var(--navy)',padding:'16px',textAlign:'center',color:'rgba(255,255,255,0.25)',fontSize:11}}>
        © {new Date().getFullYear()} {t('footer_copy')}
      </footer>
    </div>
  )
}
