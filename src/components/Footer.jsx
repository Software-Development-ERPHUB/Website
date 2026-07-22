import { useTranslation } from 'react-i18next'

const WEBSITES = [
  { label:'Voltech Group',  url:'https://voltechgroup.com/' },
  { label:'Voltech Manufacturing',   url:'https://products.voltechgroup.com/' },
  { label:'Voltech Vipra',  url:'https://voltechvipra.com/' },
  { label:'Voltech Bliss',  url:'https://voltechvipra.com/bliss/' },
]

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer style={{ background: 'var(--navy)', padding: '22px clamp(16px,3vw,24px) 18px', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 10 }}>
        {WEBSITES.map((w, i) => (
          <a key={i} href={w.url} target="_blank" rel="noopener noreferrer"
            style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, textDecoration: 'none', fontWeight: 500, transition: 'color .18s' }}
            onMouseEnter={e => e.target.style.color = 'var(--g3)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>
            {w.label} ↗
          </a>
        ))}
      </div>

      <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: 11, marginBottom: 6 }}>
        © {new Date().getFullYear()} {t('footer_copy') || 'Voltech Group · ERP Products Portfolio ·Voltech Software Development Team'}
      </div>

      
    </footer>
  )
}
