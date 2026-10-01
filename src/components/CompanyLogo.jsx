import logoVepl  from '../assets/companies/logo_vepl.png'
import logoVmcl  from '../assets/companies/logo_vmcl.png'
import logoVipra from '../assets/companies/logo_vipra.png'
import logoVhrs  from '../assets/companies/logo_vhrs.png'
import logoBliss from '../assets/companies/logo_bliss.png'
import logoVoms  from '../assets/companies/logo_voms.svg'
import logoAsiapower from '../assets/companies/logo_ape.png'

const LOGOS = {
  vepl:  { src: logoVepl,  bg: '#ffffff' },
  vmcl:  { src: logoVmcl,  bg: '#ffffff' },
  vipra: { src: logoVipra, bg: '#ffffff' },
  vhrs:  { src: logoVhrs,  bg: '#ffffff' },
  bliss: { src: logoBliss, bg: '#ffffff' },
  voms:  { src: logoVoms,  bg: '#ffffff' },
  asiapower: { src: logoAsiapower, bg: '#ffffff' },
}

/**
 * Company logo tile. `size` = square; pass `width` / `height` for a wider tile
 * (most logos are wordmarks, so wide tiles show them much larger).
 */
export default function CompanyLogo({ companyId, size = 60, width, height, rounded = 14, padding = 6, shadow = true }) {
  const logo = LOGOS[companyId]
  if (!logo) return null
  return (
    <div style={{
      width: width || size,
      height: height || size,
      borderRadius: rounded,
      background: logo.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: padding,
      boxShadow: shadow ? '0 4px 16px rgba(0,0,0,0.12)' : 'none',
      flexShrink: 0,
      border: '1.5px solid rgba(0,107,51,0.10)',
    }}>
      <img
        src={logo.src}
        alt={companyId + ' logo'}
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>
  )
}