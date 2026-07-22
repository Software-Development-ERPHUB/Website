const MODULES = [
  {icon:'📋',label:'Audit Scheduling',     desc:'Plan internal & external audits with calendar and automated reminders'},
  {icon:'📁',label:'Document Management',  desc:'Centralised document control with version control and approval workflow'},
  {icon:'🏆',label:'ISO Certification',    desc:'Track and maintain ISO certificates across all 5 group companies'},
  {icon:'✅',label:'Compliance Management',desc:'Real-time compliance dashboards with traffic-light status per company'},
  {icon:'🦺',label:'Safety Management',    desc:'Workplace safety incident tracking, near-miss reports and corrective actions'},
  {icon:'📌',label:'Non-Conformance',      desc:'Log, assign, track and close NCRs with full audit trail'},
]

export default function AuditShowcase() {
  return (
    <div style={{borderRadius:20,overflow:'hidden',border:'1px solid rgba(0,107,51,0.15)',boxShadow:'0 6px 28px rgba(0,107,51,0.08)',marginBottom:8}}>
      {/* Scoped styles for the modules grid below — kept in this file so
          the component is self-contained and never depends on an
          external stylesheet being imported correctly. */}
      <style>{`
        .audit-modules {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          background: #fff;
        }
        .audit-module-cell {
          padding: 15px 18px;
          border-top: 1px solid var(--border);
          transition: background .18s;
        }
        .audit-module-cell:hover {
          background: var(--g5);
        }
        /* Desktop (3 columns): right border on every cell except the last in each row */
        .audit-modules > .audit-module-cell:not(:nth-child(3n)) {
          border-right: 1px solid var(--border);
        }
        /* Tablet (2 columns) */
        @media (max-width: 768px) {
          .audit-modules {
            grid-template-columns: repeat(2, 1fr);
          }
          .audit-modules > .audit-module-cell:not(:nth-child(3n)) {
            border-right: none;
          }
          .audit-modules > .audit-module-cell:not(:nth-child(2n)) {
            border-right: 1px solid var(--border);
          }
        }
        /* Mobile (1 column) */
        @media (max-width: 480px) {
          .audit-modules {
            grid-template-columns: 1fr;
          }
          .audit-modules > .audit-module-cell {
            border-right: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#004d22,#006B33,#00923F)',padding:'clamp(18px,3vw,26px) clamp(16px,3vw,28px) clamp(14px,2.5vw,22px)',position:'relative',overflow:'hidden'}}>
        {[240,160,90].map((s,i)=>(
          <div key={i} style={{position:'absolute',top:-s*.3,right:-s*.25,width:s,height:s,borderRadius:'50%',border:`1px solid rgba(255,255,255,${0.06+i*.03})`,pointerEvents:'none'}}/>
        ))}
        <div style={{position:'relative',display:'flex',alignItems:'flex-start',gap:16,flexWrap:'wrap'}}>
          <div style={{flex:1,minWidth:220}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:7,background:'rgba(255,255,255,0.15)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.25)',borderRadius:20,padding:'4px 12px',marginBottom:12}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:'#4ade80',display:'inline-block',boxShadow:'0 0 8px #4ade80'}}/>
              <span style={{color:'rgba(255,255,255,0.9)',fontSize:10,fontWeight:700,letterSpacing:2,textTransform:'uppercase'}}>Common to All Companies</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:10}}>
              <div style={{width:48,height:48,borderRadius:13,background:'rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0}}>✅</div>
              <div>
                <div style={{color:'rgba(255,255,255,0.65)',fontSize:10,fontWeight:600,textTransform:'uppercase',letterSpacing:1.2}}>AUDIT</div>
                <h3 style={{color:'#fff',fontWeight:900,fontSize:'clamp(15px,2.5vw,20px)',margin:0,lineHeight:1.2}}>Voltech Audit Management System</h3>
              </div>
            </div>
            <p style={{color:'rgba(255,255,255,0.7)',fontSize:'clamp(11px,1.3vw,13px)',lineHeight:1.75,maxWidth:460,marginBottom:14}}>
              One unified audit platform for all 5 Voltech Group companies — ISO certification, document control, compliance monitoring and safety management in a single real-time dashboard.
            </p>
            <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:16}}>
              {[{v:'17',l:'Users'},{v:'5',l:'Companies'},{v:String(MODULES.length),l:'Modules'},{v:'24×7',l:'Monitoring'}].map(s=>(
                <div key={s.l} style={{background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.18)',borderRadius:10,padding:'7px 12px',textAlign:'center'}}>
                  <div style={{color:'#4ade80',fontWeight:900,fontSize:16,lineHeight:1}}>{s.v}</div>
                  <div style={{color:'rgba(255,255,255,0.55)',fontSize:9,fontWeight:600,textTransform:'uppercase',letterSpacing:.8,marginTop:3}}>{s.l}</div>
                </div>
              ))}
            </div>
            <a href="https://vmsc.voltechgroup.com/" target="_blank" rel="noopener noreferrer"
              style={{display:'inline-flex',alignItems:'center',gap:8,background:'#4ade80',color:'#004d22',fontWeight:800,fontSize:13,padding:'9px 20px',borderRadius:10,textDecoration:'none',boxShadow:'0 4px 16px rgba(74,222,128,0.4)',transition:'all .22s'}}
              onMouseEnter={e=>{e.currentTarget.style.background='#22c55e';e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='#4ade80';e.currentTarget.style.transform='translateY(0)'}}>
              ↗ Open Audit System
            </a>
          </div>
        </div>
      </div>

      {/* Modules — grid layout, column count & dividers fully owned by the
          CSS above so they never drift out of sync at different breakpoints. */}
      <div className="audit-modules">
        {MODULES.map((m,i)=>(
          <div key={i} className="audit-module-cell">
            <div style={{fontSize:22,marginBottom:7}}>{m.icon}</div>
            <div style={{fontWeight:700,fontSize:12.5,color:'var(--g1)',marginBottom:4}}>{m.label}</div>
            <div style={{fontSize:11.5,color:'var(--text3)',lineHeight:1.55}}>{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
