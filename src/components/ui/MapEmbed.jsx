import { useEffect, useRef, useState } from 'react'
import { MapPin, ExternalLink } from 'lucide-react'
import { MAP, mapEmbedSrc } from '../../content/site'

/** Google Map driven entirely by MAP in content/site.js. Loads when scrolled near. */
export default function MapEmbed({ config = MAP, className = '' }) {
  const src = mapEmbedSrc(config)
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!src || !ref.current) return
    if (!('IntersectionObserver' in window)) { setShow(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect() } }, { rootMargin: '300px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [src])

  return (
    <div className={`card overflow-hidden ${className}`}>
      <div ref={ref} className="relative aspect-[4/3] bg-paper sm:aspect-[16/9]">
        {src && show ? (
          <iframe title={`Map showing ${config.label}`} src={src} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        ) : (
          <div className="grid-bg absolute inset-0 flex items-center justify-center text-muted">
            <MapPin size={28} aria-hidden="true" />
            <span className="sr-only">{src ? 'Loading map' : 'Map location not configured'}</span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-4">
        <p className="flex items-center gap-2 text-sm text-muted"><MapPin size={16} aria-hidden="true" />{config.label}</p>
        {config.placeUrl && (
          <a href={config.placeUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5 text-sm">
            Open in Google Maps <ExternalLink size={14} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </div>
  )
}
