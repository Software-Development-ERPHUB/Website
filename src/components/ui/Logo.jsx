import { Link } from 'react-router-dom'
import { SITE } from '../../content/site'

/**
 * Placeholder wordmark. To use a real logo, import it here and render
 * <img src={logo} alt={SITE.name} height={36} /> instead of the mark.
 */
export default function Logo({ tone = 'dark', onClick }) {
  const onDark = tone === 'light'
  return (
    <Link to="/" onClick={onClick} className="group inline-flex min-h-[44px] shrink-0 items-center gap-2.5 whitespace-nowrap" aria-label={`${SITE.name} — home`}>
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" className="shrink-0">
        <rect width="34" height="34" rx="8" className={onDark ? 'fill-white' : 'fill-brand'} />
        <path d="M9 10 L17 25 L25 10" fill="none" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className={onDark ? 'stroke-brand' : 'stroke-white'} />
        <circle cx="17" cy="25" r="2.4" className={onDark ? 'fill-brand' : 'fill-accent'} />
      </svg>
      <span className="notranslate leading-none" translate="no">
        <span className={`block font-display text-[1.15rem] font-bold tracking-tight ${onDark ? 'text-white' : 'text-ink'}`}>{SITE.shortName}</span>
        <span className={`mt-1 block text-[0.72rem] font-medium ${onDark ? 'text-white/65' : 'text-muted'}`}>IT Services Pvt. Ltd.</span>
      </span>
    </Link>
  )
}
