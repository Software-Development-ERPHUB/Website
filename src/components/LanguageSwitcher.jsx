import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LANGS = [
  { code:'en', native:'English',   flag:'🇬🇧' },
  { code:'ta', native:'தமிழ்',    flag:'🇮🇳' },
  { code:'hi', native:'हिंदी',    flag:'🇮🇳' },
  { code:'ar', native:'عربي',     flag:'🇸🇦' },
  { code:'zh', native:'中文',     flag:'🇨🇳' },
  { code:'fr', native:'Français', flag:'🇫🇷' },
  { code:'de', native:'Deutsch',  flag:'🇩🇪' },
  { code:'es', native:'Español',  flag:'🇪🇸' },
  { code:'pt', native:'Português',flag:'🇧🇷' },
  { code:'ja', native:'日本語',   flag:'🇯🇵' },
  { code:'ko', native:'한국어',   flag:'🇰🇷' },
  { code:'ru', native:'Русский',  flag:'🇷🇺' },
  { code:'it', native:'Italiano', flag:'🇮🇹' },
  { code:'nl', native:'Nederlands',flag:'🇳🇱'},
  { code:'tr', native:'Türkçe',   flag:'🇹🇷' },
  { code:'id', native:'Indonesia',flag:'🇮🇩' },
  { code:'ms', native:'Melayu',   flag:'🇲🇾' },
  { code:'th', native:'ภาษาไทย', flag:'🇹🇭' },
  { code:'vi', native:'Tiếng Việt',flag:'🇻🇳'},
  { code:'sv', native:'Svenska',  flag:'🇸🇪' },
]

export default function LanguageSwitcher({ compact = false }) {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const cur = LANGS.find(l => l.code === i18n.language) || LANGS[0]

  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', zIndex: 400 }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: 'flex', alignItems: 'center', gap: compact ? 4 : 6,
        background: 'rgba(0,107,51,0.07)', border: '1.5px solid rgba(0,107,51,0.2)',
        borderRadius: 9, padding: compact ? '5px 8px' : '6px 12px',
        cursor: 'pointer', color: 'var(--g1)', fontSize: compact ? 11 : 12,
        fontWeight: 700, transition: 'background .18s', whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,107,51,0.12)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,107,51,0.07)'}>
        <span style={{ fontSize: compact ? 14 : 16 }}>{cur.flag}</span>
        {!compact && <span>{cur.native}</span>}
        <span style={{ fontSize: 8, opacity: 0.5, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', display: 'inline-block' }}>▼</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)',
          right: 0, background: '#fff', borderRadius: 14,
          boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
          border: '1px solid var(--border)',
          width: 170, maxHeight: 300, overflowY: 'auto',
          zIndex: 500,
        }}>
          {LANGS.map(lang => (
            <button key={lang.code} onClick={() => { i18n.changeLanguage(lang.code); setOpen(false) }} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 14px', background: lang.code === i18n.language ? 'var(--g4)' : 'transparent',
              border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background .15s',
            }}
            onMouseEnter={e => { if (lang.code !== i18n.language) e.currentTarget.style.background = '#f9fafb' }}
            onMouseLeave={e => { if (lang.code !== i18n.language) e.currentTarget.style.background = 'transparent' }}>
              <span style={{ fontSize: 18 }}>{lang.flag}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: lang.code === i18n.language ? 'var(--g1)' : 'var(--text1)' }}>{lang.native}</span>
              {lang.code === i18n.language && <span style={{ marginLeft: 'auto', color: 'var(--g1)', fontSize: 13 }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
