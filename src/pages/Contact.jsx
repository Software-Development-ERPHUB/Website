import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'

const ADMIN_EMAIL = 'erp.notification@voltechgroup.com'

const ERP_PRODUCTS = [
  {code:'Voltech ERP',name:'Voltech ERP — Full Suite',         c:'#007438'},
  {code:'VDMS',       name:'Voltech Design Management System', c:'#3b82f6'},
  {code:'VPMT',       name:'Voltech Project Cost Management',  c:'#8b5cf6'},
  {code:'Prime',      name:'Voltech Prime Supply Chain',       c:'#06b6d4'},
  {code:'HRMS',       name:'Voltech HR Management System',     c:'#22c55e'},
  {code:'CRM',        name:'Voltech Customer Relationship',    c:'#ef4444'},
  {code:'EMS',        name:'Voltech Employee Management',      c:'#0ea5e9'},
  {code:'IMS',        name:'Voltech Information Management',   c:'#a855f7'},
  {code:'AUDIT',      name:'Voltech Audit Management',         c:'#4ade80'},
  {code:'VAMS',       name:'Voltech Asset Management',         c:'#f97316'},
  {code:'EHS',        name:'Voltech Employee Health & Safety', c:'#f43f5e'},
]

export default function Contact() {
  const { t } = useTranslation()
  const [form,setForm] = useState({name:'',email:'',phone:'',company:'',interest:'',message:''})
  const [status,setStatus] = useState('idle')
  const [errors,setErrors] = useState({})

  const validate = () => {
    const e={}
    if(!form.name.trim()) e.name=t('form_name')+' is required'
    if(!form.email.trim()||!/\S+@\S+\.\S+/.test(form.email)) e.email=t('form_email')+' required'
    if(!form.message.trim()) e.message=t('form_message')+' is required'
    setErrors(e); return Object.keys(e).length===0
  }

  const handleSubmit = e => {
    e.preventDefault()
    if(!validate()) return
    setStatus('sending')
    const subj = encodeURIComponent(`ERP Enquiry — ${form.name}${form.company?` (${form.company})`:''} — ${form.interest||'General'}`)
    const body = encodeURIComponent(
`New ERP Enquiry — Voltech Group ERP Portfolio\n\nName     : ${form.name}\nEmail    : ${form.email}\nPhone    : ${form.phone||'N/A'}\nCompany  : ${form.company||'N/A'}\nInterest : ${form.interest||'General'}\n\nMessage:\n${form.message}\n\n---\nSent from Voltech ERP Portfolio Website\nTime: ${new Date().toLocaleString()}`)
    setTimeout(()=>{ window.location.href=`mailto:${ADMIN_EMAIL}?subject=${subj}&body=${body}`; setStatus('success') },900)
  }

  const inp = hasErr => ({
    width:'100%',padding:'11px 14px',borderRadius:10,
    border:`1.5px solid ${hasErr?'#dc2626':'var(--border)'}`,
    fontSize:13.5,color:'var(--text1)',outline:'none',
    background:'#fff',fontFamily:'inherit',
    transition:'border-color .2s,box-shadow .2s',
  })
  const onFocus = e=>{e.target.style.borderColor='var(--g2)';e.target.style.boxShadow='0 0 0 3px rgba(0,146,63,.1)'}
  const onBlur  = e=>{e.target.style.borderColor='var(--border)';e.target.style.boxShadow='none'}

  const BANNER_STATS = [
    {v:'6',  l:t('stat_companies'), icon:'🏢', c:'#007438'},
    {v:'18+',          l:t('stat_apps'),      icon:'⚙️', c:'#0891b2'},
    {v:'2100+',        l:t('stat_users'),     icon:'👥', c:'#7c3aed'},
    {v:'24h',          l:t('stat_service'),   icon:'⚡', c:'#d97706'},
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
          {/* Breadcrumb */}
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:20}}>
            <Link to="/" style={{color:'var(--text3)',fontSize:12,textDecoration:'none',fontWeight:500}}
              onMouseEnter={e=>e.target.style.color='var(--g1)'}
              onMouseLeave={e=>e.target.style.color='var(--text3)'}>{t('nav_home')}</Link>
            <span style={{color:'var(--border)',fontSize:14}}>›</span>
            <span style={{color:'var(--g1)',fontSize:12,fontWeight:700}}>{t('nav_contact')}</span>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,alignItems:'center',flexWrap:'wrap'}}>
            <div>
              <div className="badge" style={{marginBottom:16}}>
                <span>✉</span><span>ERP Sales Enquiry</span>
              </div>
              <h1 style={{fontSize:'clamp(1.8rem,3vw,2.6rem)',fontWeight:900,
                color:'var(--text1)',lineHeight:1.15,margin:'0 0 12px'}}>
                {t('contact_h')}<br/>
                <span className="text-gradient-green">Voltech ERP</span>
              </h1>
              <p style={{color:'var(--text2)',fontSize:14,lineHeight:1.75,marginBottom:22,maxWidth:420}}>
                {t('contact_sub')}
              </p>
              {/* Contact info pills */}
              {[
                {icon:'📍',lbl:t('form_addr'),  val:'Voltech Group, Chennai, Tamil Nadu, India', color:'var(--g1)'},
                {icon:'📧',lbl:t('form_email_lbl'), val:ADMIN_EMAIL, href:`mailto:${ADMIN_EMAIL}`, color:'#0891b2'},
                {icon:'🌐',lbl:t('form_web'),   val:'voltechgroup.com', href:'https://voltechgroup.com', color:'#7c3aed'},
              ].map((item,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:12,
                  background:'rgba(0,107,51,0.04)',border:'1px solid rgba(0,107,51,0.1)',
                  borderRadius:11,padding:'10px 14px',marginBottom:8,transition:'all .18s'}}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(0,107,51,0.08)'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='rgba(0,107,51,0.04)'}}>
                  <div style={{width:34,height:34,borderRadius:9,flexShrink:0,background:'var(--g4)',
                    display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>{item.icon}</div>
                  <div>
                    <div style={{color:'var(--text3)',fontSize:9,fontWeight:700,
                      textTransform:'uppercase',letterSpacing:1.5,marginBottom:1}}>{item.lbl}</div>
                    {item.href
                      ? <a href={item.href} style={{color:item.color,fontSize:12.5,fontWeight:600,textDecoration:'none'}}>{item.val}</a>
                      : <span style={{color:'var(--text1)',fontSize:12.5,fontWeight:500}}>{item.val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
            {/* Stat cards */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              {[
                {v:'5',     l:t('stat_companies'), icon:'🏢', c:'#007438'},
                {v:'18+',   l:t('stat_apps'),      icon:'⚙️', c:'#0891b2'},
                {v:'2100+', l:t('stat_users'),     icon:'👥', c:'#7c3aed'},
                {v:'24h',   l:t('stat_service'),   icon:'⚡', c:'#d97706'},
              ].map(s=>(
                <div key={s.l} style={{background:'#fff',border:`1px solid ${s.c}18`,
                  borderRadius:16,padding:'18px',textAlign:'center',
                  boxShadow:'0 2px 10px rgba(0,0,0,0.05)',transition:'all .22s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=`${s.c}40`;e.currentTarget.style.transform='translateY(-3px)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=`${s.c}18`;e.currentTarget.style.transform='translateY(0)'}}>
                  <div style={{fontSize:22,marginBottom:7}}>{s.icon}</div>
                  <div style={{fontSize:24,fontWeight:900,color:s.c,lineHeight:1}}>{s.v}</div>
                  <div style={{color:'var(--text3)',fontSize:10,fontWeight:600,
                    textTransform:'uppercase',letterSpacing:.9,marginTop:5}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FORM + SIDEBAR */}
      <div style={{maxWidth:1280,margin:'0 auto',padding:'36px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:22}}>

          {/* FORM */}
          <div style={{background:'#fff',borderRadius:22,border:'1px solid var(--border)',
            boxShadow:'0 4px 24px rgba(0,0,0,0.05)',overflow:'hidden'}}>
            <div style={{background:'linear-gradient(135deg,var(--g1),var(--g2))',padding:'18px 26px'}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:38,height:38,borderRadius:10,background:'rgba(255,255,255,0.18)',
                  display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>✉</div>
                <div>
                  <div style={{color:'#fff',fontWeight:800,fontSize:15}}>{t('form_submit')}</div>
                  <div style={{color:'rgba(255,255,255,0.7)',fontSize:11,marginTop:1}}>→ {ADMIN_EMAIL}</div>
                </div>
              </div>
            </div>

            <div style={{padding:'24px'}}>
              {status==='success' ? (
                <div style={{textAlign:'center',padding:'44px 20px'}}>
                  <div style={{width:76,height:76,borderRadius:'50%',margin:'0 auto 18px',
                    background:'linear-gradient(135deg,var(--g1),var(--g3))',
                    display:'flex',alignItems:'center',justifyContent:'center',fontSize:34,
                    boxShadow:'0 8px 28px rgba(0,107,51,0.35)'}}>✓</div>
                  <h3 style={{fontSize:20,fontWeight:800,color:'var(--text1)',marginBottom:8}}>{t('form_success_h')}</h3>
                  <p style={{color:'var(--text3)',fontSize:13,marginBottom:20}}>{t('form_success_p')}</p>
                  <button className="btn-primary" onClick={()=>{setStatus('idle');setForm({name:'',email:'',phone:'',company:'',interest:'',message:''})}}>
                    {t('form_submit')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                    {[
                      {n:'name',  l:t('form_name')+' *',  tp:'text',  ph:t('form_name')},
                      {n:'email', l:t('form_email')+' *', tp:'email', ph:'your@email.com'},
                      {n:'phone', l:t('form_phone'),       tp:'tel',   ph:'+91 98765 43210'},
                      {n:'company',l:t('form_company'),    tp:'text',  ph:t('form_company')},
                    ].map(f=>(
                      <div key={f.n}>
                        <label style={{display:'block',fontSize:11.5,fontWeight:700,
                          color:errors[f.n]?'#dc2626':'var(--text2)',marginBottom:5}}>{f.l}</label>
                        <input name={f.n} type={f.tp} value={form[f.n]}
                          onChange={e=>setForm(p=>({...p,[e.target.name]:e.target.value}))}
                          placeholder={f.ph} style={inp(errors[f.n])}
                          onFocus={onFocus} onBlur={onBlur}/>
                        {errors[f.n]&&<div style={{fontSize:10,color:'#dc2626',marginTop:3}}>{errors[f.n]}</div>}
                      </div>
                    ))}
                  </div>

                  <div style={{marginBottom:14}}>
                    <label style={{display:'block',fontSize:11.5,fontWeight:700,color:'var(--text2)',marginBottom:5}}>
                      {t('form_interest')}
                    </label>
                    <select name="interest" value={form.interest}
                      onChange={e=>setForm(p=>({...p,interest:e.target.value}))}
                      style={{...inp(false),cursor:'pointer',color:form.interest?'var(--text1)':'var(--text3)'}}
                      onFocus={onFocus} onBlur={onBlur}>
                      <option value="">{t('form_select')}</option>
                      {ERP_PRODUCTS.map(p=><option key={p.code} value={p.name}>{p.code} — {p.name}</option>)}
                    </select>
                  </div>

                  <div style={{marginBottom:20}}>
                    <label style={{display:'block',fontSize:11.5,fontWeight:700,
                      color:errors.message?'#dc2626':'var(--text2)',marginBottom:5}}>
                      {t('form_message')} *
                    </label>
                    <textarea name="message" value={form.message} rows={5}
                      onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                      placeholder={t('form_message')+'...'}
                      style={{...inp(errors.message),resize:'vertical',minHeight:110,lineHeight:1.65}}
                      onFocus={onFocus} onBlur={onBlur}/>
                    {errors.message&&<div style={{fontSize:10,color:'#dc2626',marginTop:3}}>{errors.message}</div>}
                  </div>

                  <button type="submit" disabled={status==='sending'} style={{
                    width:'100%',padding:'13px',borderRadius:12,border:'none',
                    background:status==='sending'?'#94a3b8':'linear-gradient(135deg,var(--g1),var(--g2))',
                    color:'#fff',fontWeight:800,fontSize:14,
                    cursor:status==='sending'?'not-allowed':'pointer',
                    boxShadow:status==='sending'?'none':'0 6px 20px rgba(0,107,51,0.35)',
                    transition:'all .22s',display:'flex',alignItems:'center',justifyContent:'center',gap:8,
                  }}>
                    {status==='sending'
                      ? <><span style={{width:15,height:15,border:'2px solid rgba(255,255,255,.35)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block',animation:'spin .7s linear infinite'}}/>{t('form_sending')}</>
                      : `✉ ${t('form_submit')}`}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            {/* ERP Products list */}
            <div style={{background:'linear-gradient(145deg,#0f172a,#1e293b)',borderRadius:18,padding:'20px'}}>
              <div style={{color:'var(--g3)',fontSize:10,fontWeight:700,
                textTransform:'uppercase',letterSpacing:2,marginBottom:14,
                display:'flex',alignItems:'center',gap:6}}>
                <span style={{width:6,height:6,borderRadius:'50%',background:'var(--g3)',
                  display:'inline-block',boxShadow:'0 0 6px var(--g3)'}}/>
                Voltech ERP Products
              </div>
              {ERP_PRODUCTS.map(p=>(
                <div key={p.code} style={{display:'flex',alignItems:'center',gap:8,marginBottom:7,
                  padding:'5px 8px',borderRadius:8,transition:'background .15s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <span style={{fontSize:10,fontWeight:800,padding:'2px 8px',borderRadius:20,
                    background:`${p.c}22`,color:p.c,whiteSpace:'nowrap',flexShrink:0}}>{p.code}</span>
                  <span style={{fontSize:11,color:'rgba(255,255,255,0.55)',lineHeight:1.3}}>{p.name}</span>
                </div>
              ))}
            </div>
            {/* Response card */}
            <div style={{background:'linear-gradient(135deg,var(--g1),var(--g2))',
              borderRadius:16,padding:'18px',textAlign:'center',
              boxShadow:'0 6px 22px rgba(0,107,51,0.28)'}}>
              <div style={{fontSize:30,marginBottom:8}}>⚡</div>
              <div style={{color:'#fff',fontWeight:800,fontSize:14,marginBottom:6}}>{t('form_response')}</div>
              <div style={{color:'rgba(255,255,255,0.75)',fontSize:12,lineHeight:1.65}}>{t('form_response_desc')}</div>
            </div>
          </div>
        </div>
      </div>

      <footer style={{background:'var(--navy)',padding:'18px',textAlign:'center',
        color:'rgba(255,255,255,0.25)',fontSize:11}}>
        © {new Date().getFullYear()} {t('footer_copy')}
      </footer>
    </div>
  )
}

// dummy to avoid ReferenceError — replaced by i18n stat

