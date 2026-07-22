import { useNavigate } from 'react-router-dom'
import CompanyLogo from './CompanyLogo'

export default function CompanyCard({ company }) {
  const navigate = useNavigate()
  const isUpcoming = company.apps.length === 1 && company.apps[0]?.status === 'upcoming'

  return (
    <div onClick={() => navigate(`/companies/${company.id}`)}
      style={{cursor:'pointer',background:'#fff',border:`1.5px solid ${company.color}20`,borderRadius:16,overflow:'hidden',transition:'all .24s cubic-bezier(.4,0,.2,1)',boxShadow:'0 2px 8px rgba(0,0,0,0.05)'}}
      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.borderColor=company.color+'50';e.currentTarget.style.boxShadow=`0 14px 36px ${company.color}16`}}
      onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.borderColor=company.color+'20';e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.05)'}}>

      {/* Photo */}
      <div style={{position:'relative',height:120,overflow:'hidden',background:company.color+'10'}}>
        <img src={company.image} alt={company.fullName}
          style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform .5s'}}
          onError={e=>e.target.style.display='none'}/>
        <div style={{position:'absolute',inset:0,background:`linear-gradient(180deg,transparent 25%,${company.gradientFrom}cc 100%)`}}/>
        <div style={{position:'absolute',top:8,right:8,background:'rgba(0,0,0,0.55)',backdropFilter:'blur(5px)',color:'#fff',fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:20}}>
          {isUpcoming ? '🚀 Soon' : `${company.apps.length} apps`}
        </div>
        <div style={{position:'absolute',bottom:8,left:10}}>
          <div style={{color:'#fff',fontWeight:800,fontSize:'clamp(13px,2vw,15px)',lineHeight:1.15,textShadow:'0 1px 4px rgba(0,0,0,0.4)'}}>{company.name}</div>
          <div style={{color:'rgba(255,255,255,0.65)',fontSize:9,marginTop:1}}>{company.sector}</div>
        </div>
      </div>

      {/* Logo strip */}
      <div style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',background:`${company.color}08`,borderTop:`1px solid ${company.color}12`}}>
        <CompanyLogo companyId={company.id} size={48} rounded={10} padding={4}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,fontSize:10,color:company.color,textTransform:'uppercase',letterSpacing:.7,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
            {company.fullName}
          </div>
          <div style={{fontSize:10,color:'var(--text3)',marginTop:2}}>
            {isUpcoming ? '⚡ ERP Coming Soon' : `👤 ${company.totalUsers.toLocaleString()}+ users`}
          </div>
        </div>
        <div style={{width:26,height:26,borderRadius:'50%',flexShrink:0,background:company.color,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:12,fontWeight:700}}>→</div>
      </div>
    </div>
  )
}
