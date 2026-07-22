const MODS = [
  {icon:'📢',label:'Post Recruitment',     desc:'Job posting, multi-channel distribution and applicant tracking (ATS) with pipeline view'},
  {icon:'📊',label:'MIS Reports',          desc:'HR analytics, headcount, attrition and cost management information reports'},
  {icon:'💼',label:'Recruitment',          desc:'End-to-end recruitment — shortlisting, interview scheduling and offer letters'},
  {icon:'💰',label:'Payroll & Payslip',    desc:'Automated payroll with tax calculation, payslip generation and email dispatch'},
  {icon:'🏖️',label:'Leave Management',     desc:'Leave application, approval workflow, balance tracking and holiday calendar'},
  {icon:'⭐',label:'Performance & Bonus',  desc:'KPI-based appraisal with bonus computation and multi-level approval workflow'},
  {icon:'📋',label:'Statutory Compliance', desc:'PF, ESI, professional tax, TDS filings with automated deadline reminders'},
  {icon:'🏥',label:'Insurance Management', desc:'Group health and life insurance tracking, claim management and renewal alerts'},
  {icon:'🖨️',label:'Stationery Management',desc:'Office stationery requisition, stock tracking, approval and vendor management'},
  {icon:'⏱️',label:'Attendance',           desc:'Biometric and web attendance with shift management, overtime and regularisation'},
]

export default function HrmsShowcase() {
  return (
    <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:20,overflow:'hidden',boxShadow:'0 4px 20px rgba(0,107,51,0.07)',marginBottom:8}}>
      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#1e293b,#0f172a)',padding:'clamp(16px,3vw,24px) clamp(16px,3vw,26px)',position:'relative',overflow:'hidden'}}>
        {[200,130,80].map((s,i)=>(
          <div key={i} style={{position:'absolute',bottom:-s*.3,right:-s*.25,width:s,height:s,borderRadius:'50%',border:`1px solid rgba(56,198,108,${0.08+i*.04})`,pointerEvents:'none'}}/>
        ))}
        <div style={{position:'relative',display:'flex',alignItems:'flex-start',gap:14,flexWrap:'wrap'}}>
          <div style={{width:50,height:50,borderRadius:14,flexShrink:0,background:'linear-gradient(135deg,var(--g1),var(--g3))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,boxShadow:'0 5px 16px rgba(0,107,51,0.35)'}}>👥</div>
          <div style={{flex:1,minWidth:200}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(56,198,108,0.15)',border:'1px solid rgba(56,198,108,0.3)',borderRadius:20,padding:'3px 12px',marginBottom:8}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#4ade80',display:'inline-block'}}/>
              <span style={{color:'#4ade80',fontSize:10,fontWeight:700,letterSpacing:1.8,textTransform:'uppercase'}}>Available to All Companies</span>
            </div>
            <h3 style={{color:'#fff',fontWeight:900,fontSize:'clamp(14px,2.2vw,19px)',margin:'0 0 6px',lineHeight:1.2}}>Voltech HR Management System</h3>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:'clamp(11px,1.3vw,13px)',margin:0,lineHeight:1.65,maxWidth:500}}>
              A comprehensive HRMS covering the complete employee lifecycle — from recruitment and onboarding to payroll, statutory compliance, and exit management. Used across all Voltech Group companies.
            </p>
          </div>
        </div>
      </div>
      {/* Modules grid */}
      <div className="hrms-modules">
        {MODS.map((m,i)=>(
          <div key={i} style={{padding:'14px 16px',borderRight:(i+1)%5!==0?'1px solid var(--border)':'none',borderBottom:i<MODS.length-5?'1px solid var(--border)':'none',transition:'background .18s'}}
            onMouseEnter={e=>e.currentTarget.style.background='var(--g5)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <div style={{width:36,height:36,borderRadius:9,background:'var(--g4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,marginBottom:7,border:'1px solid rgba(0,107,51,0.12)'}}>{m.icon}</div>
            <div style={{fontWeight:700,fontSize:12,color:'var(--g1)',marginBottom:3}}>{m.label}</div>
            <div style={{fontSize:11,color:'var(--text3)',lineHeight:1.5}}>{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
