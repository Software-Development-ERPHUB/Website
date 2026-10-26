import { Link } from 'react-router-dom'
import { Layers } from 'lucide-react'
import { AnimIcon } from './AnimIcon'
import { ERP_PRODUCTS } from '../../content/erp'

/**
 * Rotating ring of ERP products. Hovering (or focusing) an item pauses the
 * ring and shows the full project name; clicking opens its page.
 *   center    — node shown in the middle (default: the "ERP Suite" badge)
 *   className — width limit, e.g. max-w-[360px]
 */
export default function ProductOrbit({ center, className = 'max-w-[360px]' }) {
  const R = 150, C = 180
  return (
    <div className={`orbit-wrap relative mx-auto aspect-square w-full ${className}`} aria-label="Voltech ERP applications">
      <div className="absolute inset-0 rounded-full border border-dashed border-white/20" aria-hidden="true" />
      <div className="absolute inset-[9%] rounded-full border border-dashed border-white/10" aria-hidden="true" />
      <div className="absolute inset-[25%] rounded-full bg-brand/30 blur-2xl" aria-hidden="true" />
      {center || (
        <div className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent shadow-[0_0_0_10px_rgb(26_124_255/.15),0_16px_40px_rgb(0_0_0/.35)]">
          <AnimIcon icon={Layers} size={24} color="#fff" anim="pulse" always />
          <span className="mt-1 font-display text-xs font-semibold text-white">ERP Suite</span>
        </div>
      )}
      <ul className="orbit-ring">
        {ERP_PRODUCTS.map((p, i) => {
          const a = (i / ERP_PRODUCTS.length) * 2 * Math.PI - Math.PI / 2
          const I = p.icon
          return (
            <li key={p.code} className="absolute z-20 h-[60px] w-[60px] hover:z-30 focus-within:z-30"
              style={{ left: `calc(${((C + R * Math.cos(a)) / (C * 2)) * 100}% - 30px)`, top: `calc(${((C + R * Math.sin(a)) / (C * 2)) * 100}% - 30px)` }}>
              <div className="orbit-upright h-full w-full">
                <Link to={p.to || '/erp'} aria-label={p.full}
                  className="ia group/orb relative flex h-full w-full flex-col items-center justify-center rounded-full border-2 bg-white transition-transform duration-300 hover:scale-110 focus-visible:scale-110"
                  style={{ borderColor: p.color, color: p.color, boxShadow: `0 6px 18px ${p.color}55` }}>
                  <span className={`ai ai-${p.anim}`}><I size={17} aria-hidden="true" /></span>
                  <span translate="no" className="notranslate mt-0.5 text-center text-[8px] font-bold leading-none">{p.code}</span>
                  <span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-max max-w-[220px] -translate-x-1/2 rounded-lg bg-white px-3 py-1.5 text-center text-xs font-semibold text-ink opacity-0 shadow-pop transition-opacity duration-200 group-hover/orb:opacity-100 group-focus-visible/orb:opacity-100">
                    {p.full}
                    <span className="absolute left-1/2 top-full -translate-x-1/2 border-[6px] border-transparent border-t-white" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
