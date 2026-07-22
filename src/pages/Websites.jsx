import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import webVG    from '../assets/web_vg.png'
import webVMCL  from '../assets/web_vmcl.png'
import webVIPRA from '../assets/web_vipra.png'
import webBLISS from '../assets/web_bliss.png'

export default function Websites() {
  const { t } = useTranslation()

  const SITES = [
    {
      id:'vg', name:'Voltech Group', url:'https://voltechgroup.com/', thumb:webVG,
      tagline:'Excellence in Engineering Products & Services',
      desc:'The main corporate website of Voltech Group — showcasing electrical engineering products, global presence, careers and community initiatives. The flagship digital identity of the group.',
      color:'#007438', gradient:'linear-gradient(135deg,#005a28,#007438)',
      tags:['Corporate','Engineering','Global'],
      seoTitle:'Voltech Group | Engineering Products & Services',
      seoKw:'Voltech, electrical engineering, transformer, switchgear, Chennai',
    },
    {
      id:'vmcl', name:'Voltech Manufacturing Company Pvt Ltd', url:'https://products.voltechgroup.com/', thumb:webVMCL,
      tagline:'Precision Manufacturing & Transformer Solutions',
      desc:'VMCL\'s product website showcasing power transformers, switchgear, distribution transformers and control panels. Includes product catalogue, quote request system and technical specifications.',
      color:'#0891b2', gradient:'linear-gradient(135deg,#0369a1,#0891b2)',
      tags:['Manufacturing','Transformers','Products'],
      seoTitle:'VMCL | Transformers & Switchgear | Voltech Group',
      seoKw:'transformer, switchgear, distribution transformer, Chennai manufacturer',
    },
    {
      id:'vipra', name:'Voltech Vipra Engineers Pvt Ltd', url:'https://voltechvipra.com/', thumb:webVIPRA,
      tagline:'Intelligent Instrumentation Solutions',
      desc:'Vipra\'s engineering website covering precision instrumentation, fire solutions, automation panel design and end-to-end project execution for industrial facilities across India.',
      color:'#7c3aed', gradient:'linear-gradient(135deg,#6d28d9,#7c3aed)',
      tags:['Instrumentation','Automation','Fire Solutions'],
      seoTitle:'Voltech Vipra | Instrumentation & Automation | Chennai',
      seoKw:'instrumentation, fire solutions, automation panel, Vipra, Voltech',
    },
    {
      id:'bliss', name:'Voltech Bliss Management Services', url:'https://voltechvipra.com/bliss/', thumb:webBLISS,
      tagline:'Excellence in Facility Management & Security Solutions',
      desc:'Bliss Management Services website featuring facility management, security guard services, housekeeping, technical services and screening solutions for corporate and industrial clients.',
      color:'#d97706', gradient:'linear-gradient(135deg,#b45309,#d97706)',
      tags:['Facility Management','Security','HR Services'],
      seoTitle:'Voltech Bliss | Facility Management & Security | Chennai',
      seoKw:'facility management, security services, housekeeping, Bliss, Voltech',
    },
  ]

  const ANALYTICS = [
    {icon:'👥', label:'Total Monthly Users',  value:'12,400+', color:'#007438'},
    {icon:'📄', label:'Pages Indexed',        value:'280+',    color:'#0891b2'},
    {icon:'🌍', label:'Countries Reached',    value:'18+',     color:'#7c3aed'},
    {icon:'📈', label:'Organic Sessions',     value:'8,200+',  color:'#d97706'},
  ]

  const SEO_FEATURES = [
    {icon:'🔍', t:'On-Page SEO',         d:'Meta titles, descriptions, canonical tags, header hierarchy and keyword optimisation for all pages.'},
    {icon:'📱', t:'Mobile Responsive',   d:'All websites pass Google Mobile-Friendly Test with optimised touch targets and viewport settings.'},
    {icon:'⚡', t:'Page Speed',          d:'Lazy loading, image compression, browser caching and minified assets for fast Core Web Vitals.'},
    {icon:'🗺️', t:'XML Sitemap',         d:'Auto-generated XML sitemaps submitted to Google Search Console for complete page indexing.'},
    {icon:'🤖', t:'Robots.txt',          d:'Configured robots.txt guiding crawlers and preventing indexing of sensitive backend URLs.'},
    {icon:'🔗', t:'Internal Linking',    d:'Cross-linking between all Voltech Group websites to build domain authority and reduce bounce rates.'},
    {icon:'📊', t:'Google Analytics',    d:'Google Analytics 4 (GA4) integrated on all websites — tracking sessions, users, and conversions.'},
    {icon:'👁️', t:'Live User Tracking',  d:'Real-time user monitoring via GA4 shows active visitors, their location, device and page behaviour.'},
    {icon:'🔐', t:'SSL & HTTPS',         d:'All websites run on HTTPS with SSL certificates — a Google ranking factor and security essential.'},
  ]

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

        <div style={{maxWidth:1280,margin:'0 auto',padding:'36px 24px 44px',position:'relative'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:20}}>
            <Link to="/" style={{color:'var(--text3)',fontSize:12,textDecoration:'none',fontWeight:500}}
              onMouseEnter={e=>e.target.style.color='var(--g1)'}
              onMouseLeave={e=>e.target.style.color='var(--text3)'}>{t('nav_home')}</Link>
            <span style={{color:'var(--border)',fontSize:14}}>›</span>
            <span style={{color:'var(--g1)',fontSize:12,fontWeight:700}}>{t('nav_websites')}</span>
          </div>
          <div className="badge" style={{marginBottom:16}}>
            <span className="live-dot"/><span>{t('sec_websites_tag')}</span>
          </div>
          <h1 style={{fontSize:'clamp(1.8rem,3.2vw,2.6rem)',fontWeight:900,
            color:'var(--text1)',margin:'0 0 10px',lineHeight:1.15}}>
            {t('sec_websites_h')}
          </h1>
          <p style={{color:'var(--text2)',fontSize:14,lineHeight:1.75,maxWidth:560}}>{t('web_banner_sub')}</p>
        </div>
      </div>

      {/* SITES */}
      <div style={{maxWidth:1280,margin:'0 auto',padding:'44px 24px'}}>
        <div style={{display:'flex',flexDirection:'column',gap:28}}>
          {SITES.map((site,i)=>(
            <div key={site.id} style={{
              background:'#fff',border:'1px solid var(--border)',
              borderRadius:22,overflow:'hidden',
              boxShadow:'0 3px 16px rgba(0,0,0,0.06)',
              transition:'all .26s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=site.color+'40';e.currentTarget.style.boxShadow=`0 10px 36px ${site.color}12`}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.boxShadow='0 3px 16px rgba(0,0,0,0.06)'}}>
              <div style={{
                display:'grid',
                gridTemplateColumns: i%2===0 ? '1fr 1.35fr' : '1.35fr 1fr',
                minHeight:280,
              }}>
                {/* Info */}
                <div style={{order: i%2===0?1:2, padding:'28px 30px',
                  display:'flex',flexDirection:'column',justifyContent:'center'}}>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:12}}>
                    {site.tags.map(tag=>(
                      <span key={tag} style={{fontSize:10,fontWeight:700,padding:'3px 9px',
                        borderRadius:20,background:`${site.color}12`,color:site.color,
                        border:`1px solid ${site.color}22`}}>{tag}</span>
                    ))}
                  </div>
                  <h2 style={{fontSize:18,fontWeight:800,color:'var(--text1)',margin:'0 0 5px',lineHeight:1.25}}>
                    {site.name}
                  </h2>
                  <div style={{fontSize:11.5,color:site.color,fontWeight:600,marginBottom:11}}>{site.tagline}</div>
                  <p style={{color:'var(--text2)',fontSize:13,lineHeight:1.75,marginBottom:16}}>{site.desc}</p>
                  {/* SEO box */}
                  <div style={{background:'var(--g5)',border:'1px solid rgba(0,107,51,0.1)',
                    borderRadius:10,padding:'10px 13px',marginBottom:16}}>
                    <div style={{fontSize:9.5,fontWeight:700,color:'var(--g1)',
                      textTransform:'uppercase',letterSpacing:1.5,marginBottom:6}}>{t('web_seo_tag')}</div>
                    <div style={{fontSize:11.5,color:'var(--text2)',marginBottom:3}}>
                      <strong>{t('web_seo_title')}</strong> {site.seoTitle}
                    </div>
                    <div style={{fontSize:11,color:'var(--text3)',marginBottom:3}}>
                      <strong>{t('web_seo_kw')}</strong> {site.seoKw}
                    </div>
                    <div style={{fontSize:11,color:'var(--text3)',display:'flex',alignItems:'center',gap:5}}>
                      <span>📊</span><span>{t('web_ga_active')}</span>
                    </div>
                  </div>
                  <a href={site.url} target="_blank" rel="noopener noreferrer"
                    style={{display:'inline-flex',alignItems:'center',gap:8,background:site.gradient,
                      color:'#fff',fontWeight:700,fontSize:13,padding:'10px 20px',
                      borderRadius:10,textDecoration:'none',width:'fit-content',
                      boxShadow:`0 4px 14px ${site.color}30`,transition:'all .22s'}}
                    onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=`0 8px 22px ${site.color}45`}}
                    onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow=`0 4px 14px ${site.color}30`}}>
                    ↗ {t('web_visit')}
                  </a>
                </div>

                {/* Thumbnail — click opens site */}
                <div style={{order:i%2===0?2:1,position:'relative',overflow:'hidden',cursor:'pointer',minHeight:260}}
                  onClick={()=>window.open(site.url,'_blank')}>
                  <img src={site.thumb} alt={site.name+' website'}
                    style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top',
                      display:'block',transition:'transform .5s ease'}}
                    onMouseEnter={e=>e.target.style.transform='scale(1.04)'}
                    onMouseLeave={e=>e.target.style.transform='scale(1)'}/>
                  {/* Hover overlay */}
                  <div style={{position:'absolute',inset:0,background:`${site.color}bb`,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    flexDirection:'column',gap:8,opacity:0,transition:'opacity .3s'}}
                    onMouseEnter={e=>{e.currentTarget.style.opacity='1'}}
                    onMouseLeave={e=>{e.currentTarget.style.opacity='0'}}>
                    <div style={{fontSize:40,color:'#fff'}}>↗</div>
                    <div style={{color:'#fff',fontWeight:800,fontSize:16}}>{t('web_visit')}</div>
                    <div style={{color:'rgba(255,255,255,0.8)',fontSize:12}}>{t('web_click_open')}</div>
                  </div>
                  {/* Live badge */}
                  <div style={{position:'absolute',top:12,right:12,
                    background:'rgba(0,0,0,0.65)',backdropFilter:'blur(6px)',
                    borderRadius:20,padding:'4px 10px',
                    display:'flex',alignItems:'center',gap:5}}>
                    <span style={{width:6,height:6,borderRadius:'50%',background:'#4ade80',
                      display:'inline-block',boxShadow:'0 0 6px #4ade80'}}/>
                    <span style={{color:'#fff',fontSize:10,fontWeight:700}}>{t('web_live')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ANALYTICS */}
      <section style={{background:'#fff',padding:'48px 24px'}}>
        <div style={{maxWidth:1280,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:28}}>
            <div className="badge" style={{justifyContent:'center',marginBottom:12}}>
              <span>📊</span><span>{t('web_analytics_tag')}</span>
            </div>
            <h2 style={{fontSize:22,fontWeight:800,color:'var(--text1)',margin:'0 0 8px'}}>{t('web_analytics_h')}</h2>
            <p style={{color:'var(--text3)',fontSize:13,maxWidth:520,margin:'0 auto'}}>{t('web_analytics_sub')}</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:14,marginBottom:36}}>
            {ANALYTICS.map(m=>(
              <div key={m.label} className="card" style={{padding:'20px',textAlign:'center'}}>
                <div style={{fontSize:26,marginBottom:9}}>{m.icon}</div>
                <div style={{fontSize:26,fontWeight:900,color:m.color,lineHeight:1,marginBottom:5}}>{m.value}</div>
                <div style={{fontSize:13,fontWeight:600,color:'var(--text1)',marginBottom:3}}>{m.label}</div>
              </div>
            ))}
          </div>
          {/* Dark analytics panel */}
          <div style={{background:'linear-gradient(145deg,#0f172a,#1e293b)',borderRadius:20,padding:'26px'}}>
            <div style={{color:'var(--g3)',fontSize:10,fontWeight:700,textTransform:'uppercase',
              letterSpacing:2,marginBottom:18,display:'flex',alignItems:'center',gap:7}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:'#4ade80',
                display:'inline-block',boxShadow:'0 0 6px #4ade80'}}/>
              {t('web_ga_features')}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12}}>
              {[
                {icon:'👥',l:'Real-Time Active Users',   d:'See exactly how many people are on each website right now'},
                {icon:'🌍',l:'Geographic Distribution', d:'Track visitors by country, city and language in real time'},
                {icon:'📱',l:'Device & Browser Reports',d:'Desktop vs mobile vs tablet breakdown with browser data'},
                {icon:'🔄',l:'Traffic Source Analysis', d:'Organic, direct, referral and social traffic broken down'},
                {icon:'📉',l:'Bounce Rate Monitoring',  d:'Page-level engagement metrics and scroll depth tracking'},
                {icon:'🎯',l:'Conversion Tracking',     d:'Track enquiry form submissions and contact page visits as goals'},
              ].map(f=>(
                <div key={f.l} style={{display:'flex',gap:10,alignItems:'flex-start',
                  padding:'11px',borderRadius:10,background:'rgba(255,255,255,0.04)',
                  border:'1px solid rgba(255,255,255,0.07)',transition:'background .18s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.04)'}>
                  <div style={{fontSize:19,flexShrink:0,lineHeight:1}}>{f.icon}</div>
                  <div>
                    <div style={{color:'#fff',fontSize:12.5,fontWeight:700,marginBottom:3}}>{f.l}</div>
                    <div style={{color:'rgba(255,255,255,0.46)',fontSize:11,lineHeight:1.55}}>{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO */}
      <section style={{background:'var(--page)',padding:'48px 24px'}}>
        <div style={{maxWidth:1280,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:28}}>
            <div className="badge" style={{justifyContent:'center',marginBottom:12}}>
              <span>🔍</span><span>{t('web_seo_full_tag')}</span>
            </div>
            <h2 style={{fontSize:22,fontWeight:800,color:'var(--text1)',margin:'0 0 8px'}}>{t('web_seo_full_h')}</h2>
            <p style={{color:'var(--text3)',fontSize:13,maxWidth:480,margin:'0 auto'}}>{t('web_seo_full_sub')}</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',gap:13}}>
            {SEO_FEATURES.map(f=>(
              <div key={f.t} className="card" style={{padding:'18px'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(0,107,51,0.25)';e.currentTarget.style.background='var(--g5)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.background='#fff'}}>
                <div style={{width:40,height:40,borderRadius:10,background:'var(--g4)',
                  border:'1px solid rgba(0,107,51,0.15)',
                  display:'flex',alignItems:'center',justifyContent:'center',fontSize:19,marginBottom:11}}>{f.icon}</div>
                <h3 style={{fontWeight:700,fontSize:13,color:'var(--text1)',marginBottom:5}}>{f.t}</h3>
                <p style={{color:'var(--text3)',fontSize:12,lineHeight:1.65,margin:0}}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{background:'var(--navy)',padding:'18px',textAlign:'center',
        color:'rgba(255,255,255,0.25)',fontSize:11}}>
        © {new Date().getFullYear()} {t('footer_copy')}
      </footer>
    </div>
  )
}
