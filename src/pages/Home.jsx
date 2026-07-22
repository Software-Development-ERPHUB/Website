import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import CompanyCard from '../components/CompanyCard'
import AuditShowcase from '../components/AuditShowcase'
import HrmsShowcase from '../components/HrmsShowcase'
import CompanyLogo from '../components/CompanyLogo'
import { COMPANIES } from '../data/companies'
import cmdPhoto from '../assets/cmd_photo.jpg'

const ERP_PRODUCTS = [
  { code:'Voltech ERP', color:'#006B33', full:'Voltech ERP — Full Suite' },
  { code:'VDMS',        color:'#2563eb', full:'Voltech Design Management System' },
  { code:'VPMT',        color:'#7c3aed', full:'Voltech Project Cost Management' },
  { code:'Prime SCM',   color:'#0891b2', full:'Voltech Prime Supply Chain Management' },
  { code:'HRMS',        color:'#16a34a', full:'Voltech HR Management System' },
  { code:'CRM',         color:'#dc2626', full:'Voltech Customer Relationship Management' },
  { code:'EMS',         color:'#0ea5e9', full:'Voltech Employee Management System' },
  { code:'IMS',         color:'#a855f7', full:'Voltech Information Management System' },
  { code:'AUDIT',       color:'#059669', full:'Voltech Audit Management System' },
  { code:'VAMS',        color:'#f59e0b', full:'Voltech Asset Management System' },
]

const FEATURES = [
  {icon:'⚡',tk:'f1_t',dk:'f1_d',color:'#007438',bg:'#e8f5ee'},
  {icon:'🔧',tk:'f2_t',dk:'f2_d',color:'#0891b2',bg:'#e0f2fe'},
  {icon:'🖥️',tk:'f3_t',dk:'f3_d',color:'#7c3aed',bg:'#ede9fe'},
  {icon:'🔐',tk:'f4_t',dk:'f4_d',color:'#dc2626',bg:'#fef2f2'},
  {icon:'💾',tk:'f5_t',dk:'f5_d',color:'#d97706',bg:'#fef3c7'},
  {icon:'🔗',tk:'f6_t',dk:'f6_d',color:'#059669',bg:'#d1fae5'},
]

const WEBSITES = [
  {label:'Voltech Group',  url:'https://voltechgroup.com/',          icon:'🌐', color:'#007438'},
  {label:'ERP Products',   url:'https://products.voltechgroup.com/', icon:'⚙️', color:'#0891b2'},
  {label:'Voltech Vipra',  url:'https://voltechvipra.com/',          icon:'🔬', color:'#7c3aed'},
  {label:'Voltech Bliss',  url:'https://voltechvipra.com/bliss/',    icon:'🏢', color:'#d97706'},
]

const MD_LINKEDIN = 'https://www.linkedin.com/in/murugesan-umapathi-75331b192/'

// Highlights shown in the "ERP Excellence — Since 2015" section below.
// Edit this list to change the bullet points without touching layout code.
const ERP_HIGHLIGHTS = [
  'Dedicated ERP development for Voltech Group since 2015',
  '20+ successfully developed and deployed ERP applications',
  'All applications are actively running in production',
  'Continuous application maintenance and enhancements',
  'Secure and optimized database management',
  'Reliable, scalable, and business-focused ERP solutions',
  'Experienced team committed to long-term support and innovation',
]

export default function Home() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [globalSearch, setGlobalSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef(null)
  const totalApps  = COMPANIES.reduce((s,c)=>s+c.apps.length,0)+1
  const totalUsers = COMPANIES.reduce((s,c)=>s+c.totalUsers,0)

  // Always land at the top of the page on load/refresh
  useEffect(()=>{
    window.scrollTo(0, 0)
  },[])

  // Global search logic
  useEffect(()=>{
    if(!globalSearch.trim()){ setSearchResults([]); setSearchOpen(false); return }
    const q = globalSearch.toLowerCase()
    const results = []
    COMPANIES.forEach(co=>{
      if(co.name.toLowerCase().includes(q)||co.fullName.toLowerCase().includes(q)||co.sector.toLowerCase().includes(q)){
        results.push({type:'company',id:co.id,label:co.name,sub:co.fullName,color:co.color})
      }
      co.apps.forEach(app=>{
        if(app.name.toLowerCase().includes(q)||app.code.toLowerCase().includes(q)||app.modules?.some(m=>m.toLowerCase().includes(q))){
          results.push({type:'app',id:co.id,label:app.name,sub:`${co.name} · ${app.code}`,color:app.color,url:app.url})
        }
      })
    })
    setSearchResults(results.slice(0,8))
    setSearchOpen(results.length>0)
  },[globalSearch])

  useEffect(()=>{
    const fn = e=>{if(searchRef.current&&!searchRef.current.contains(e.target)){setSearchOpen(false)}}
    document.addEventListener('mousedown',fn)
    return()=>document.removeEventListener('mousedown',fn)
  },[])

  const handleSearchSelect = (r)=>{
    setGlobalSearch('')
    setSearchOpen(false)
    if(r.type==='app'&&r.url&&r.url!==null){window.open(r.url,'_blank')}
    else{navigate(`/companies/${r.id}`)}
  }

  return (
    <div style={{background:'#fff',minHeight:'100vh'}}>
      <Navbar/>
      <style>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse-dot{0%,100%{box-shadow:0 0 0 0 rgba(56,198,108,.5)}50%{box-shadow:0 0 0 6px rgba(56,198,108,0)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

        /* co-logo-wrap has no JS mouseenter/leave handlers, so it's safe
           for CSS :hover to fully own this — no conflict. */
        .co-logo-wrap:hover{border-color:var(--g3)!important;transform:scale(1.12)!important}

        /* erp-badge and orbit-badge ARE driven by onMouseEnter/onMouseLeave
           in the JS below (subtle tint + translateX for erp-badge, color
           swap for orbit-badge). We intentionally do NOT add competing
           :hover rules here — a CSS !important rule would always beat the
           inline styles JS sets, silently breaking the intended hover
           animation. Hover behavior for those two is 100% JS-owned. */

        @media(max-width:900px){
          .hero-2col{grid-template-columns:1fr!important}
          .hero-img-col{aspect-ratio:16/10!important;max-height:380px!important;min-height:220px!important;order:-1!important}
          .erp-pair{grid-template-columns:1fr!important}
        }
        @media(max-width:640px){
          .stats-4{grid-template-columns:repeat(2,1fr)!important}
          .cos-grid{grid-template-columns:repeat(2,1fr)!important;gap:10px!important}
          .feat-grid{grid-template-columns:1fr!important}
          .web-grid{grid-template-columns:1fr!important}
          .orbit-wrap{display:none!important}
        }
        @media(max-width:520px){
          .hero-img-col{aspect-ratio:4/3!important;max-height:300px!important;min-height:200px!important}
        }
        /* Smallest screens: min-height is lowered along with max-height so
           they never conflict. Previously min-height stayed at a fixed
           300px inline while max-height dropped to 260px here — since
           min-height always wins over max-height in a conflict, the photo
           was silently stuck at 300px+ tall on the phones that needed it
           to shrink the most. */
        @media(max-width:400px){
          .hero-img-col{aspect-ratio:1/1!important;max-height:260px!important;min-height:180px!important}
        }
      `}</style>

      {/* ══ HERO ══ */}
      <section style={{paddingTop:61,background:'linear-gradient(160deg,#fff 0%,#f0faf4 60%,#e8f5ee 100%)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,opacity:.03,backgroundImage:'radial-gradient(rgba(0,107,51,.9) 1px,transparent 1px)',backgroundSize:'26px 26px',pointerEvents:'none'}}/>

        <div style={{maxWidth:'100%',padding:'0'}}>
          {/* ── MD Photo — full width strip at top ── */}
          <div style={{
            display:'grid',
            gridTemplateColumns:'1fr 1fr',
            alignItems:'stretch',
            gap:0,
          }} className="hero-2col">

            {/* LEFT text */}
            <div style={{padding:'clamp(28px,4vw,52px) clamp(16px,4vw,48px)',display:'flex',flexDirection:'column',justifyContent:'center',animation:'fadeUp .55s ease-out both'}}>
              {/* Global Search Bar */}
              <div ref={searchRef} style={{position:'relative',marginBottom:24,maxWidth:460,width:'100%'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,background:'#fff',border:'2px solid rgba(0,107,51,0.25)',borderRadius:14,padding:'10px 16px',boxShadow:'0 2px 12px rgba(0,107,51,0.08)',transition:'border-color .2s,box-shadow .2s'}}>
                  <span style={{fontSize:16,opacity:.5,flexShrink:0}}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search companies, ERP apps, modules..."
                    value={globalSearch}
                    onChange={e=>setGlobalSearch(e.target.value)}
                    style={{flex:1,border:'none',outline:'none',fontSize:13.5,color:'var(--text1)',background:'transparent',fontFamily:'inherit'}}/>
                  {globalSearch&&<button onClick={()=>{setGlobalSearch('');setSearchOpen(false)}} style={{border:'none',background:'none',cursor:'pointer',color:'var(--text3)',fontSize:16,lineHeight:1,padding:0,flexShrink:0}}>✕</button>}
                </div>
                {/* Search dropdown */}
                {searchOpen&&searchResults.length>0&&(
                  <div style={{position:'absolute',top:'calc(100% + 6px)',left:0,right:0,background:'#fff',borderRadius:14,boxShadow:'0 8px 40px rgba(0,0,0,0.14)',border:'1px solid var(--border)',zIndex:300,overflow:'hidden'}}>
                    {searchResults.map((r,i)=>(
                      <div key={i} onClick={()=>handleSearchSelect(r)}
                        style={{display:'flex',alignItems:'center',gap:12,padding:'11px 16px',cursor:'pointer',borderBottom:i<searchResults.length-1?'1px solid var(--border)':'none',transition:'background .15s'}}
                        onMouseEnter={e=>e.currentTarget.style.background='var(--g5)'}
                        onMouseLeave={e=>e.currentTarget.style.background='#fff'}>
                        <div style={{width:34,height:34,borderRadius:9,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:r.color+'15',border:`1px solid ${r.color}25`,fontSize:14}}>
                          {r.type==='company'?'🏢':'⚙️'}
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontWeight:700,fontSize:13,color:'var(--text1)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.label}</div>
                          <div style={{fontSize:11,color:'var(--text3)',marginTop:1}}>{r.sub}</div>
                        </div>
                        <span style={{fontSize:11,color:r.color,fontWeight:600,flexShrink:0}}>
                          {r.type==='company'?'View Apps →':'Open ↗'}
                        </span>
                      </div>
                    ))}
                    <div style={{padding:'8px 16px',background:'var(--g5)',borderTop:'1px solid var(--border)',fontSize:11,color:'var(--text3)'}}>
                      {searchResults.length} result{searchResults.length!==1?'s':''} — press Enter or click
                    </div>
                  </div>
                )}
              </div>

              {/* Badge */}
              <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(0,107,51,0.08)',border:'1.5px solid rgba(0,107,51,0.2)',borderRadius:30,padding:'5px 16px',marginBottom:18,width:'fit-content'}}>
                <span style={{width:8,height:8,borderRadius:'50%',background:'#38C66C',display:'inline-block',animation:'pulse-dot 2s ease-in-out infinite'}}/>
                <span style={{color:'var(--g1)',fontSize:10,fontWeight:700,letterSpacing:'1.8px',textTransform:'uppercase'}}>{t('hero_badge')}</span>
              </div>

              <h1 style={{fontSize:'clamp(1.7rem,3.8vw,3rem)',fontWeight:900,color:'var(--text1)',lineHeight:1.12,margin:'0 0 14px'}}>
                {t('hero_h1a')}{' '}
                <span style={{background:'linear-gradient(135deg,var(--g1),var(--g3))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{t('hero_h1b')}</span>
                <br/>{t('hero_h1c')}
              </h1>

              <p style={{color:'var(--text2)',fontSize:'clamp(13px,1.5vw,15px)',lineHeight:1.8,marginBottom:24,maxWidth:480}}>{t('hero_desc')}</p>

              <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:28}}>
                <button className="btn-primary" onClick={()=>navigate('/companies')}>{t('hero_explore')} →</button>
                <button className="btn-outline" onClick={()=>navigate('/contact')}>✉ {t('hero_contact')}</button>
              </div>

              {/* Company logos — bigger size */}
              <div>
                <div style={{fontSize:9,fontWeight:700,color:'var(--text3)',letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>{t('hero_group_label')}</div>
                <div style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
                  {COMPANIES.map(co=>(
                    <div key={co.id} onClick={()=>navigate(`/companies/${co.id}`)}
                      title={co.fullName} className="co-logo-wrap"
                      style={{cursor:'pointer',transition:'all .2s',border:'2px solid var(--border)',borderRadius:12,padding:3}}>
                      <CompanyLogo companyId={co.id} size={50} rounded={10} padding={4}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — CMD Photo, clickable to LinkedIn */}
            <div className="hero-img-col" style={{position:'relative',overflow:'hidden',width:'100%',aspectRatio:'4 / 5',minHeight:300,maxHeight:580}}>
              {/* Green arc bg — now fills the whole box behind the photo,
                  so it shows through as letterbox fill wherever
                  object-fit:contain leaves empty space around the image. */}
              <div style={{position:'absolute',inset:0,background:'linear-gradient(145deg,var(--g5),rgba(56,198,108,.12))',borderRadius:'24px 24px 0 0',zIndex:0}}/>
              <a href={MD_LINKEDIN} target="_blank" rel="noopener noreferrer" style={{display:'block',position:'absolute',inset:0,zIndex:1,cursor:'pointer'}}>
                {/* object-fit changed from 'cover' to 'contain': cover was
                    cropping the photo to fill a box whose aspect ratio
                    doesn't match the source image, cutting the person off
                    at the edges. contain always shows the full photo,
                    scaled to fit, with the green background showing
                    through any leftover space instead of slicing the image. */}
                <img src={cmdPhoto} alt="Murugesan Umapathi — CMD Voltech Group — Click to view LinkedIn"
                  style={{width:'100%',height:'100%',objectFit:'contain',objectPosition:'50% 50%',display:'block',transition:'filter .3s'}}
                  onMouseEnter={e=>e.target.style.filter='brightness(1.05)'}
                  onMouseLeave={e=>e.target.style.filter='brightness(1)'}/>
                {/* LinkedIn hover badge */}
                <div style={{position:'absolute',top:16,right:16,background:'#0077B5',borderRadius:12,padding:'8px 14px',display:'flex',alignItems:'center',gap:7,boxShadow:'0 4px 16px rgba(0,119,181,0.35)',transition:'all .22s'}}
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span style={{color:'#fff',fontSize:12,fontWeight:700}}>LinkedIn</span>
                </div>
              </a>
              {/* Name card floating */}
              <div style={{position:'absolute',bottom:16,left:12,right:12,zIndex:3,background:'#fff',borderRadius:14,boxShadow:'0 8px 28px rgba(0,0,0,0.10)',border:'1.5px solid rgba(0,107,51,0.12)',padding:'12px 16px',maxWidth:230,animation:'float 5s ease-in-out infinite'}}>
                <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:9}}>
                  <div style={{width:36,height:36,borderRadius:9,background:'linear-gradient(135deg,var(--g1),var(--g3))',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:900,fontSize:12,flexShrink:0}}>MU</div>
                  <div>
                    <div style={{fontWeight:800,fontSize:12.5,color:'var(--text1)',lineHeight:1.2}}>Murugesan Umapathi</div>
                    <div style={{fontSize:10,color:'var(--g1)',fontWeight:600,marginTop:2}}>CMD — Voltech Group</div>
                  </div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,paddingTop:8,borderTop:'1px solid var(--g4)'}}>
                  {[{v:totalApps,l:'Apps'},{v:COMPANIES.length,l:'Companies'},{v:totalUsers.toLocaleString()+'+',l:'Users'}].map(s=>(
                    <div key={s.l} style={{textAlign:'center'}}>
                      <div style={{color:'var(--g1)',fontWeight:900,fontSize:14,lineHeight:1}}>{s.v}</div>
                      <div style={{color:'var(--text3)',fontSize:8,fontWeight:600,textTransform:'uppercase',letterSpacing:.8,marginTop:2}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ERP EXCELLENCE / HIGHLIGHTS — SINCE 2015 ══ */}
      <section style={{background:'var(--page)',padding:'clamp(32px,5vw,48px) clamp(16px,3vw,24px)'}}>
        <div style={{maxWidth:1280,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:26}}>
            <div className="section-tag" style={{justifyContent:'center',marginBottom:10}}>
              <span>🏆 ERP Excellence for Voltech Group — Since 2015</span>
            </div>
            <h2 style={{fontSize:'clamp(1.2rem,2.5vw,1.7rem)',fontWeight:800,color:'var(--text1)',margin:'0 0 10px'}}>
              A Decade of Dedicated ERP Development
            </h2>
            <p style={{color:'var(--text3)',fontSize:13,maxWidth:640,margin:'0 auto',lineHeight:1.8}}>
              Since 2015, our ERP team has been dedicated to developing and maintaining enterprise applications
              exclusively for Voltech Group. Over the years, we have successfully designed, developed, deployed,
              and maintained 20+ ERP applications, all of which are actively running and supporting various
              business operations across the organization. Our team manages the complete application lifecycle —
              requirement analysis, development, testing, deployment, database management, performance optimization,
              and ongoing support — with a strong focus on quality, security, and reliability.
            </p>
          </div>

          <div className="feat-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
            {ERP_HIGHLIGHTS.map((h,i)=>(
              <div key={i} className="card" style={{padding:'14px 16px',display:'flex',alignItems:'flex-start',gap:10}}>
                <span style={{color:'var(--g1)',fontSize:15,fontWeight:900,flexShrink:0,lineHeight:1.4}}>✓</span>
                <span style={{fontSize:12.5,color:'var(--text2)',lineHeight:1.6}}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ERP CIRCLE — own section, full width ══ */}
      <section style={{background:'#fff',padding:'44px clamp(16px,3vw,24px)'}}>
        <div style={{maxWidth:1280,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:28}}>
            <div className="section-tag" style={{justifyContent:'center',marginBottom:10}}>
              <span>⚙️ Voltech ERP — Product Suite</span>
            </div>
            <h2 style={{fontSize:'clamp(1.2rem,2.5vw,1.7rem)',fontWeight:800,color:'var(--text1)',margin:'0 0 7px'}}>
              {totalApps} Enterprise Applications Built In-House
            </h2>
            <p style={{color:'var(--text3)',fontSize:13,maxWidth:420,margin:'0 auto 16px'}}>
              Live, production-deployed and actively used across Voltech Group
            </p>
            <button className="btn-primary" onClick={()=>navigate('/companies')} style={{fontSize:13}}>
              {t('view_all')||'View All'} →
            </button>
          </div>

          <div className="erp-pair" style={{display:'grid',gridTemplateColumns:'300px 1fr',gap:40,alignItems:'center',justifyItems:'center'}}>
            {/* Orbit circle */}
            <div className="orbit-wrap" style={{position:'relative',width:280,height:280,flexShrink:0}}>
              <div style={{position:'absolute',inset:0,borderRadius:'50%',border:'1.5px dashed rgba(0,107,51,0.15)',animation:'spin 50s linear infinite'}}/>
              <div style={{position:'absolute',inset:22,borderRadius:'50%',border:'1px dashed rgba(0,107,51,0.08)'}}/>
              <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:68,height:68,borderRadius:'50%',background:'linear-gradient(135deg,var(--g1),var(--g3))',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',boxShadow:'0 6px 22px rgba(0,107,51,0.38)',zIndex:3}}>
                <span style={{color:'#fff',fontWeight:900,fontSize:11,lineHeight:1.1}}>ERP</span>
                <span style={{color:'rgba(255,255,255,0.8)',fontSize:8,letterSpacing:.5}}>SUITE</span>
              </div>
              {ERP_PRODUCTS.map((p,i)=>{
                const angle=(i/ERP_PRODUCTS.length)*2*Math.PI
                const r=108,cx=140,cy=140
                const x=cx+r*Math.cos(angle)-26, y=cy+r*Math.sin(angle)-26
                return (
                  <div key={p.code} title={p.full} className="orbit-badge"
                    style={{position:'absolute',left:x,top:y,width:52,height:52,borderRadius:'50%',background:'#fff',border:`2.5px solid ${p.color}`,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 3px 10px ${p.color}25`,cursor:'default',zIndex:3,transition:'all .22s'}}
                    onMouseEnter={e=>{e.currentTarget.style.background=p.color;e.currentTarget.style.transform='scale(1.22)';e.currentTarget.querySelector('span').style.color='#fff'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.transform='scale(1)';e.currentTarget.querySelector('span').style.color=p.color}}>
                    <span style={{fontSize:8,fontWeight:800,color:p.color,textAlign:'center',lineHeight:1.1,padding:'0 3px',transition:'color .22s'}}>{p.code}</span>
                  </div>
                )
              })}
            </div>

            {/* ERP list — 2 columns */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:9,width:'100%',maxWidth:520}}>
              {ERP_PRODUCTS.map(p=>(
                <div key={p.code} className="erp-badge"
                  style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:12,background:'#fff',border:`1.5px solid ${p.color}20`,transition:'all .2s',cursor:'default'}}
                  onMouseEnter={e=>{e.currentTarget.style.background=`${p.color}09`;e.currentTarget.style.borderColor=`${p.color}45`;e.currentTarget.style.transform='translateX(4px)'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.borderColor=`${p.color}20`;e.currentTarget.style.transform='translateX(0)'}}>
                  <div style={{width:10,height:10,borderRadius:'50%',background:p.color,flexShrink:0}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:700,color:'var(--text1)'}}>{p.code}</div>
                    <div style={{fontSize:10,color:'var(--text3)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.full}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <section style={{background:'linear-gradient(135deg,var(--g1),var(--g2),var(--g3))'}}>
        <div style={{maxWidth:'100%'}}>
          <div className="stats-4" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
            {[
              {v:COMPANIES.length,               l:t('stat_companies'),icon:'🏢'},
              {v:totalApps,                      l:t('stat_apps'),     icon:'⚙️'},
              {v:totalUsers.toLocaleString()+'+', l:t('stat_users'),   icon:'👥'},
              {v:'24×7',                         l:t('stat_service'),  icon:'🖥️'},
            ].map((s,i)=>(
              <div key={i} style={{padding:'18px 12px',textAlign:'center',borderRight:i<3?'1px solid rgba(255,255,255,0.18)':'none'}}>
                <div style={{fontSize:18,marginBottom:4}}>{s.icon}</div>
                <div style={{fontSize:'clamp(18px,3vw,26px)',fontWeight:900,color:'#fff'}}>{s.v}</div>
                <div style={{fontSize:'clamp(9px,1.1vw,11px)',color:'rgba(255,255,255,0.82)',marginTop:3}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COMPANIES — full width, no right gap ══ */}
      <section style={{background:'var(--page)',padding:'clamp(32px,5vw,56px) clamp(16px,3vw,24px)'}}>
        <div style={{maxWidth:'100%',margin:'0 auto'}}>
          <div style={{maxWidth:1280,margin:'0 auto 22px',display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
            <div>
              <div className="section-tag"><span className="live-dot"/><span>{t('sec_companies_tag')}</span></div>
              <h2 style={{fontSize:'clamp(1.3rem,2.5vw,1.8rem)',fontWeight:800,color:'var(--text1)',margin:'0 0 5px',lineHeight:1.2}}>{t('sec_companies_h')}</h2>
              <p style={{color:'var(--text3)',fontSize:13,margin:0}}>{t('sec_companies_sub')}</p>
            </div>
            <button className="btn-primary" onClick={()=>navigate('/companies')} style={{fontSize:13}}>
              {t('view_all')||'View All'} →
            </button>
          </div>

          {/* FULL WIDTH company grid — no max-width container so it uses all screen */}
          <div className="cos-grid" style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill,minmax(clamp(160px,16vw,200px),1fr))',
            gap:'clamp(10px,1.5vw,16px)',
            width:'100%',
            maxWidth:1280,
            margin:'0 auto 44px',
          }}>
            {COMPANIES.map(co=><CompanyCard key={co.id} company={co}/>)}
          </div>

          <div style={{maxWidth:1280,margin:'0 auto'}}>
            <h3 style={{fontSize:16,fontWeight:800,color:'var(--text1)',margin:'0 0 14px',display:'flex',alignItems:'center',gap:7}}>
              <span>👥</span> {t('sec_hrms_h')}
            </h3>
            <HrmsShowcase/>
            <div style={{marginTop:26}}>
              <h3 style={{fontSize:16,fontWeight:800,color:'var(--text1)',margin:'0 0 14px',display:'flex',alignItems:'center',gap:7}}>
                <span>✅</span> {t('sec_audit_h')}
              </h3>
              <AuditShowcase/>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY ══ */}
      <section style={{background:'#fff',padding:'clamp(32px,5vw,56px) clamp(16px,3vw,24px)'}}>
        <div style={{maxWidth:1280,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:32}}>
            <div className="section-tag" style={{justifyContent:'center'}}><span>{t('sec_why_tag')}</span></div>
            <h2 style={{fontSize:'clamp(1.2rem,2.5vw,1.7rem)',fontWeight:800,color:'var(--text1)',margin:'0 0 7px'}}>{t('sec_why_h')}</h2>
            <p style={{color:'var(--text3)',fontSize:13}}>{t('sec_why_sub')}</p>
          </div>
          <div className="feat-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:13}}>
            {FEATURES.map(f=>(
              <div key={f.tk} className="card" style={{padding:'20px',cursor:'default'}}
                onMouseEnter={e=>{e.currentTarget.style.background=f.bg;e.currentTarget.style.borderColor=f.color+'40'}}
                onMouseLeave={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.borderColor='var(--border)'}}>
                <div style={{width:46,height:46,borderRadius:12,background:f.bg,border:`1.5px solid ${f.color}20`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,marginBottom:12}}>{f.icon}</div>
                <h3 style={{fontWeight:700,fontSize:13.5,color:'var(--text1)',marginBottom:6}}>{t(f.tk)}</h3>
                <p style={{color:'var(--text3)',fontSize:12.5,lineHeight:1.7,margin:0}}>{t(f.dk)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WEBSITES ══ */}
      <section style={{background:'var(--page)',padding:'clamp(28px,4vw,44px) clamp(16px,3vw,24px)'}}>
        <div style={{maxWidth:1280,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:22}}>
            <div className="section-tag" style={{justifyContent:'center'}}><span>{t('sec_websites_tag')}</span></div>
            <h2 style={{fontSize:'clamp(1.1rem,2vw,1.5rem)',fontWeight:800,color:'var(--text1)',margin:'0 0 5px'}}>{t('sec_websites_h')}</h2>
          </div>
          <div className="web-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
            {WEBSITES.map((w,i)=>(
              <a key={i} href={w.url} target="_blank" rel="noopener noreferrer" className="card"
                style={{display:'flex',alignItems:'center',gap:13,padding:'15px 18px',textDecoration:'none'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=w.color+'50';e.currentTarget.style.background=w.color+'06'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.background='#fff'}}>
                <div style={{width:42,height:42,borderRadius:11,flexShrink:0,background:`${w.color}12`,border:`1.5px solid ${w.color}22`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:19}}>{w.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:13,color:'var(--text1)',marginBottom:2}}>{w.label}</div>
                  <div style={{fontSize:10,color:'var(--text3)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{w.url.replace('https://','').replace(/\/$/,'')}</div>
                </div>
                <span style={{color:w.color,fontSize:18,flexShrink:0}}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{background:'linear-gradient(135deg,var(--g1),var(--g2),var(--g3))',padding:'clamp(36px,5vw,52px) clamp(16px,3vw,24px)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-60,right:-60,width:240,height:240,borderRadius:'50%',background:'rgba(255,255,255,0.05)',pointerEvents:'none'}}/>
        <div style={{maxWidth:560,margin:'0 auto',textAlign:'center',position:'relative'}}>
          <div style={{fontSize:36,marginBottom:12}}>🚀</div>
          <h2 style={{color:'#fff',fontSize:'clamp(1.2rem,2.5vw,1.6rem)',fontWeight:900,marginBottom:10}}>{t('cta_h')}</h2>
          <p style={{color:'rgba(255,255,255,0.82)',fontSize:'clamp(12px,1.5vw,14px)',marginBottom:22,lineHeight:1.75}}>{t('cta_sub')}</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <button onClick={()=>navigate('/contact')} style={{background:'#fff',color:'var(--g1)',fontWeight:800,padding:'11px 24px',borderRadius:12,border:'none',cursor:'pointer',fontSize:13.5,boxShadow:'0 5px 18px rgba(0,0,0,0.14)',transition:'all .22s'}}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
              ✉ {t('cta_enquiry')} →
            </button>
            <button onClick={()=>navigate('/companies')} style={{background:'transparent',color:'#fff',fontWeight:700,padding:'11px 20px',borderRadius:12,border:'2px solid rgba(255,255,255,0.45)',cursor:'pointer',fontSize:13.5,transition:'all .22s'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.14)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              {t('cta_explore')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background:'var(--navy)',padding:'18px clamp(16px,3vw,24px)',textAlign:'center'}}>
        <div style={{display:'flex',justifyContent:'center',gap:14,flexWrap:'wrap',marginBottom:8}}>
          {WEBSITES.map((w,i)=>(
            <a key={i} href={w.url} target="_blank" rel="noopener noreferrer"
              style={{color:'rgba(255,255,255,0.4)',fontSize:11,textDecoration:'none',fontWeight:500,transition:'color .18s'}}
              onMouseEnter={e=>e.target.style.color='var(--g3)'}
              onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.4)'}>
              {w.label} ↗
            </a>
          ))}
        </div>
        <div style={{color:'rgba(255,255,255,0.22)',fontSize:11}}>{t('footer_copy')}</div>
      </footer>
    </div>
  )
}