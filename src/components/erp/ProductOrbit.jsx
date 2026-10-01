import { Layers } from 'lucide-react'
import { AnimIcon } from './AnimIcon'
import { ERP_PRODUCTS } from '../../content/erp'

/** Rotating ring of ERP products — the hero visual. */
export default function ProductOrbit() {
  const R = 150, C = 180
  return (
    <div className="orbit-wrap relative mx-auto aspect-square w-full max-w-[360px]" aria-label="Voltech ERP product suite" role="img">
      <div className="absolute inset-0 rounded-full border border-dashed border-white/20" />
      <div className="absolute inset-[34px] rounded-full border border-dashed border-white/10" />
      <div className="absolute inset-[90px] rounded-full bg-brand/30 blur-2xl" />
      <div className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent shadow-[0_0_0_10px_rgb(56_198_108/.12),0_16px_40px_rgb(0_0_0/.35)]">
        <AnimIcon icon={Layers} size={24} color="#fff" anim="pulse" always />
        <span className="mt-1 font-display text-xs font-semibold text-white">ERP Suite</span>
      </div>
      <div className="orbit-ring">
        {ERP_PRODUCTS.map((p, i) => {
          const a = (i / ERP_PRODUCTS.length) * 2 * Math.PI - Math.PI / 2
          const I = p.icon
          return (
            <div key={p.code} className="absolute h-[60px] w-[60px]"
              style={{ left: `calc(${((C + R * Math.cos(a)) / (C * 2)) * 100}% - 30px)`, top: `calc(${((C + R * Math.sin(a)) / (C * 2)) * 100}% - 30px)` }}>
              <div className="orbit-upright h-full w-full">
                <div title={p.full} className="ia flex h-full w-full flex-col items-center justify-center rounded-full border-2 bg-white transition-transform duration-300 hover:scale-110"
                  style={{ borderColor: p.color, color: p.color, boxShadow: `0 6px 18px ${p.color}55` }}>
                  <span className={`ai ai-${p.anim}`}><I size={17} aria-hidden="true" /></span>
                  <span translate="no" className="notranslate mt-0.5 text-center text-[8px] font-bold leading-none">{p.code}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

