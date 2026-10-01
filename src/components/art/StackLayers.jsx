import { TECH_LAYERS } from '../../content/company'

/**
 * Isometric stack of technology layers for the Technology page banner.
 * Slabs slide in one after another; a data packet travels down through them.
 */
export default function StackLayers({ active = -1 }) {
  const cx = 140, w = 120, h = 32, t = 12, gap = 70, top = 16
  return (
    <svg viewBox="0 0 480 380" className="h-auto w-full" role="img" aria-label="Technology stack: experience, API, business logic, data and infrastructure layers">
      <defs>
        <filter id="slab-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>

      {/* vertical data path */}
      <line x1={cx} y1={top + h} x2={cx} y2={top + gap * 4 + h} stroke="rgb(255 255 255 / .25)" strokeWidth="2" className="dash-flow" />

      {TECH_LAYERS.map((L, i) => {
        const y = top + i * gap
        const on = active === i
        const topFace = `M${cx} ${y} L${cx + w} ${y + h} L${cx} ${y + 2 * h} L${cx - w} ${y + h} Z`
        const left = `M${cx - w} ${y + h} L${cx} ${y + 2 * h} L${cx} ${y + 2 * h + t} L${cx - w} ${y + h + t} Z`
        const right = `M${cx + w} ${y + h} L${cx} ${y + 2 * h} L${cx} ${y + 2 * h + t} L${cx + w} ${y + h + t} Z`
        return (
          <g key={L.id} className="slide-in" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
            <g style={{ transform: on ? 'translateX(-10px)' : 'none', transition: 'transform .45s cubic-bezier(.22,1,.36,1)' }}>
              {on && <path d={topFace} fill={L.color} opacity=".55" filter="url(#slab-glow)" />}
              <path d={left} fill={L.color} opacity=".55" />
              <path d={right} fill={L.color} opacity=".8" />
              <path d={topFace} fill={L.color} stroke="rgb(255 255 255 / .55)" strokeWidth={on ? 2 : 1} opacity={on ? 1 : 0.92} />
              {/* grid lines on the top face */}
              {[0.33, 0.66].map((f) => (
                <path key={f} d={`M${cx - w * (1 - f)} ${y + h - h * (1 - f)} L${cx + w * f} ${y + h + h * f}`} stroke="rgb(255 255 255 / .22)" strokeWidth="1" />
              ))}
            </g>
            {/* label */}
            <line x1={cx + w * 0.55} y1={y + h + h * 0.45} x2={284} y2={y + h + 4} stroke="rgb(255 255 255 / .35)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx={284} cy={y + h + 4} r="3" fill={on ? '#fff' : L.color} />
            <text x={294} y={y + h} fill="#fff" fontFamily="Schibsted Grotesk, sans-serif" fontSize="14" fontWeight="600">{L.short}</text>
            <text translate="no" className="notranslate" x={294} y={y + h + 17} fill="rgb(255 255 255 / .55)" fontFamily="IBM Plex Sans, sans-serif" fontSize="11">{L.tools.filter((x) => x.tier === 'core').slice(0, 3).map((x) => x.name).join(' · ')}</text>
          </g>
        )
      })}

      {/* travelling packet */}
      <g className="stack-packet">
        <circle cx={cx} cy={top + h} r="9" fill="#38C66C" opacity=".35" />
        <circle cx={cx} cy={top + h} r="5" fill="#fff" />
      </g>
    </svg>
  )
}
