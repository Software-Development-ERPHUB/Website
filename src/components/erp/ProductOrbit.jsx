import { ERP_PRODUCTS } from '../../content/erp'

/** Rotating ring of ERP products — the portfolio hero visual. */
export default function ProductOrbit() {
  const R = 152, C = 185
  return (
    <div
      className="orbit-wrap relative mx-auto aspect-square w-full max-w-[400px]"
      aria-label="Voltech Prime product suite"
      role="img"
    >
      <div className="absolute inset-[6%] rounded-full bg-gradient-to-br from-brand/30 via-accent/10 to-transparent blur-3xl" aria-hidden="true" />
      <div className="absolute inset-0 rounded-full border border-dashed border-white/20" aria-hidden="true" />
      <div className="absolute inset-[30px] rounded-full border border-dashed border-white/[.12]" aria-hidden="true" />
      <div className="absolute inset-[74px] rounded-full border border-white/[.06]" aria-hidden="true" />
      <div className="absolute inset-[112px] rounded-full bg-accent/10 blur-2xl" aria-hidden="true" />

      <div className="orbit-ring">
        {ERP_PRODUCTS.map((p, i) => {
          const a = (i / ERP_PRODUCTS.length) * 2 * Math.PI - Math.PI / 2
          const I = p.icon
          return (
            <div
              key={p.code}
              className="absolute h-[64px] w-[64px]"
              style={{
                left: `calc(${((C + R * Math.cos(a)) / (C * 2)) * 100}% - 32px)`,
                top: `calc(${((C + R * Math.sin(a)) / (C * 2)) * 100}% - 32px)`,
              }}
            >
              <div className="orbit-upright h-full w-full">
                <div
                  title={p.full}
                  className="group flex h-full w-full flex-col items-center justify-center rounded-full border-2 bg-white transition-transform duration-300 hover:scale-110"
                  style={{
                    borderColor: p.color,
                    color: p.color,
                    boxShadow: `0 10px 26px ${p.color}40, 0 2px 6px rgb(0 0 0 / .25)`,
                  }}
                >
                  <span className={`ai ai-${p.anim}`}><I size={18} aria-hidden="true" /></span>
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
