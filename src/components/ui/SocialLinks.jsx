import { Linkedin, Facebook, Instagram, Youtube } from 'lucide-react'
import { SOCIAL } from '../../content/site'

/* X and WhatsApp are not in lucide — small inline marks */
const XIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.57L16.67 19.2Z" /></svg>
)
const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.07.9.92-3-.2-.31a8.2 8.2 0 1 1 6.83 3.73Zm4.5-6.13c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.77 4.77 0 0 0 1 2.53 10.9 10.9 0 0 0 4.18 3.7c1.56.67 2.17.73 2.95.61.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.46-.28Z" /></svg>
)

export const NETWORKS = [
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, brand: '#0A66C2' },
  { key: 'facebook', label: 'Facebook', icon: Facebook, brand: '#1877F2' },
  { key: 'instagram', label: 'Instagram', icon: Instagram, brand: '#E4405F' },
  { key: 'x', label: 'X (Twitter)', icon: XIcon, brand: '#000000' },
  { key: 'youtube', label: 'YouTube', icon: Youtube, brand: '#FF0000' },
  { key: 'whatsapp', label: 'WhatsApp', icon: WhatsAppIcon, brand: '#25D366' },
]

/**
 * Social media icon row. Networks come from SOCIAL in content/site.js.
 *   tone  — 'dark' (on light backgrounds) | 'light' (on dark backgrounds)
 *   size  — icon button size in px
 * Empty URLs render as a non-clickable "coming soon" icon.
 */
export default function SocialLinks({ tone = 'dark', size = 40, className = '', label = 'Follow us on social media' }) {
  const list = NETWORKS.filter((n) => n.key in SOCIAL)
  const base = tone === 'light'
    ? 'bg-white/[.07] text-white/80 ring-1 ring-white/15'
    : 'bg-white text-ink ring-1 ring-line'
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label={label}>
      {list.map(({ key, label: name, icon: I, brand }) => {
        const url = SOCIAL[key]
        const cls = `group relative inline-flex items-center justify-center rounded-full transition-all duration-300 ${base} hover:-translate-y-1 hover:text-white hover:ring-transparent hover:[background:var(--brand)] hover:shadow-[0_10px_20px_-8px_var(--brand)]`
        const style = { width: size, height: size, '--brand': brand }
        return (
          <li key={key}>
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" title={name} style={style}
                className={cls}>
                <span className="transition-transform duration-300 group-hover:scale-110"><I size={Math.round(size * 0.45)} /></span>
                <span className="sr-only">{name} (opens in a new tab)</span>
              </a>
            ) : (
              <span title={`${name} — coming soon`} style={style} className={`${cls} cursor-default`} aria-label={`${name} — coming soon`} role="img">
                <span className="transition-transform duration-300 group-hover:scale-110"><I size={Math.round(size * 0.45)} /></span>
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
