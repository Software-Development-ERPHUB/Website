import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Maximize2, Minimize2, MessageSquare } from 'lucide-react'
import Seo from '../components/ui/Seo'
import { findProduct, PRODUCT_CATEGORIES } from '../content/products'

/**
 * Full-screen demo viewer: /products/<slug>/demo.
 * Loads public/demo/<slug>/ in a frame so the address bar never shows a file name.
 */
export default function ProductDemo() {
  const { slug } = useParams()
  const p = findProduct(slug)
  const [full, setFull] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (!p) return <Navigate to="/products" replace />
  if (p.status === 'live') { window.location.replace(p.liveUrl); return null }
  const cat = PRODUCT_CATEGORIES.find((c) => c.id === p.category)

  return (
    <div className="flex h-[100dvh] flex-col bg-ink">
      <Seo title={`${p.name} — Demo`} description={p.tagline} noindex />
      {!full && (
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/10 px-3 text-white sm:px-5">
          <Link to={`/products#${p.category}`} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">
            <ArrowLeft size={17} aria-hidden="true" /><span className="hidden xs:inline">All products</span>
          </Link>
          <span className="h-6 w-px bg-white/15" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[0.95rem] font-semibold">{p.name}</p>
            <p className="hidden truncate text-xs text-white/55 sm:block">{cat?.title} · Demo with sample data</p>
          </div>
          <Link to="/contact" className="hidden min-h-[38px] items-center gap-2 rounded-lg bg-white px-3.5 text-sm font-semibold text-ink hover:bg-brand-soft sm:inline-flex">
            <MessageSquare size={15} aria-hidden="true" />Talk to us about this
          </Link>
        </header>
      )}
      <div className="relative flex-1">
        {!loaded && <div className="absolute inset-0 flex items-center justify-center text-sm text-white/60">Loading demo…</div>}
        <iframe
          title={`${p.name} demo`}
          src={`/demo/${p.slug}/`}
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 h-full w-full border-0 bg-white"
          allow="clipboard-write; fullscreen"
        />
        <button type="button" onClick={() => setFull((f) => !f)} aria-label={full ? 'Show top bar' : 'Hide top bar'}
          className="absolute bottom-4 left-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink/80 text-white shadow-pop backdrop-blur hover:bg-ink">
          {full ? <Minimize2 size={17} aria-hidden="true" /> : <Maximize2 size={17} aria-hidden="true" />}
        </button>
      </div>
    </div>
  )
}
