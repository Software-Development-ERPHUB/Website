export default function AppCard({ app }) {
  const isLive = !!(app.url)
  return (
    <div className="card" style={{overflow:'hidden',display:'flex',flexDirection:'column'}}>
      {/* Gradient thumbnail */}
      <div style={{height:96,background:app.gradient,position:'relative',overflow:'hidden'}}>
        {[90,60,40].map((s,i)=>(
          <div key={i} style={{
            position:'absolute',top:-s*.3,right:-s*.3,
            width:s,height:s,borderRadius:'50%',
            border:`1px solid rgba(255,255,255,${.08+i*.04})`,
          }}/>
        ))}
        <div style={{position:'absolute',top:10,left:10,
          background:'rgba(0,0,0,0.28)',backdropFilter:'blur(6px)',
          color:'#fff',fontSize:10,fontWeight:700,
          padding:'2px 9px',borderRadius:20,letterSpacing:1.2}}>
          {app.code}
        </div>
        {isLive&&(
          <div style={{position:'absolute',top:10,right:10,
            display:'flex',alignItems:'center',gap:4,
            background:'rgba(0,0,0,0.28)',backdropFilter:'blur(6px)',
            color:'#4ade80',fontSize:10,fontWeight:700,
            padding:'2px 8px',borderRadius:20}}>
            <span style={{width:5,height:5,borderRadius:'50%',background:'#4ade80',
              display:'inline-block',boxShadow:'0 0 5px #4ade80'}}/>LIVE
          </div>
        )}
        <div style={{position:'absolute',bottom:8,left:12,fontSize:28,lineHeight:1}}>{app.icon}</div>
       {app.users != null && (
  <div style={{position:'absolute',bottom:10,right:10,
    color:'rgba(255,255,255,0.88)',fontSize:11,fontWeight:600}}>
    👤 {app.users.toLocaleString()}
  </div>
)}
      </div>

      {/* Body */}
      <div style={{padding:'14px 16px',flex:1,display:'flex',flexDirection:'column'}}>
        <div style={{fontSize:10,fontWeight:700,color:app.color,
          textTransform:'uppercase',letterSpacing:1.2,marginBottom:3}}>{app.code}</div>
        <h3 style={{fontWeight:700,color:'var(--text1)',fontSize:13,lineHeight:1.35,
          marginBottom:6}}>{app.name}</h3>
        <p style={{color:'var(--text3)',fontSize:11.5,lineHeight:1.6,
          marginBottom:10,flex:1}}>{app.description}</p>

        {/* Modules */}
        <div style={{marginBottom:12}}>
          <div style={{fontSize:9,fontWeight:700,color:'var(--text3)',
            textTransform:'uppercase',letterSpacing:1.5,marginBottom:6}}>Modules</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
            {app.modules.map(m=>(
              <span key={m} style={{
                fontSize:10,padding:'2px 8px',borderRadius:20,
                background:`${app.color}12`,color:app.color,
                border:`1px solid ${app.color}22`,fontWeight:500,
              }}>{m}</span>
            ))}
          </div>
        </div>

        {/* Button */}
        {isLive?(
          <a href={app.url} target="_blank" rel="noopener noreferrer"
            style={{
              display:'flex',alignItems:'center',justifyContent:'center',gap:7,
              padding:'9px',borderRadius:10,fontSize:12,fontWeight:700,
              color:'#fff',textDecoration:'none',background:app.gradient,
              transition:'opacity .2s',
            }}
            onMouseEnter={e=>e.currentTarget.style.opacity='.85'}
            onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
            ↗ Open Login Page
          </a>
        ):(
          <div style={{
            display:'flex',alignItems:'center',justifyContent:'center',
            padding:'9px',borderRadius:10,fontSize:12,fontWeight:600,
            color:'var(--text3)',border:'1px solid var(--border)',
          }}>🔒 Contact ERP Team</div>
        )}
      </div>
    </div>
  )
}
