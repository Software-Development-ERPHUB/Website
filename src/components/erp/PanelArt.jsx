/**
 * Background illustrations for the HRMS and Audit banners.
 * Pure SVG (no image files) so they stay sharp and light. Motion uses the
 * site's existing float / dash-flow / spin-slow / bar-grow classes, which are
 * switched off automatically for users who prefer reduced motion.
 *
 * Want a real photo instead? Pass `image` to <ModulePanel> — see ModulePanel.jsx.
 */
const W = 'rgb(255 255 255 / .85)'
const W2 = 'rgb(255 255 255 / .45)'
const W3 = 'rgb(255 255 255 / .14)'
const A = 'rgb(56 198 108)'

function Person({ x, y, r = 16, fill = W3 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} stroke={W2} strokeWidth="1.5" />
      <circle cx={x} cy={y - r * 0.22} r={r * 0.3} fill={W} />
      <path d={`M${x - r * 0.52} ${y + r * 0.55} a${r * 0.52} ${r * 0.45} 0 0 1 ${r * 1.04} 0`} fill={W} />
    </g>
  )
}

function Hrms() {
  return (
    <svg viewBox="0 0 640 300" className="h-full w-full" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
      {/* org chart */}
      <g className="float-a">
        <path d="M250 70 V100 H170 V128 M250 100 H330 V128 M250 100 V128" fill="none" stroke={A} strokeWidth="2" className="dash-flow" />
        <Person x={250} y={52} r={20} fill="rgb(56 198 108 / .35)" />
        <Person x={170} y={146} />
        <Person x={250} y={146} />
        <Person x={330} y={146} />
        <path d="M170 164 V184 H140 V196 M170 184 H200 V196" fill="none" stroke={W2} strokeWidth="1.5" className="dash-flow" />
        <Person x={140} y={210} r={12} />
        <Person x={200} y={210} r={12} />
      </g>

      {/* payslip card */}
      <g className="float-b">
        <rect x="400" y="30" width="150" height="120" rx="12" fill={W3} stroke={W2} strokeWidth="1.5" />
        <rect x="414" y="44" width="60" height="8" rx="4" fill={W} />
        <rect x="414" y="60" width="96" height="5" rx="2.5" fill={W2} />
        <text x="414" y="98" fill={A} fontFamily="Schibsted Grotesk, sans-serif" fontSize="26" fontWeight="700">₹</text>
        <rect x="436" y="80" width="70" height="10" rx="5" fill={W} />
        <rect x="414" y="112" width="122" height="5" rx="2.5" fill={W2} />
        <rect x="414" y="124" width="84" height="5" rx="2.5" fill={W2} />
        <circle cx="530" cy="52" r="10" fill={A} />
        <path d="M525 52 l3.5 3.5 6.5 -7" fill="none" stroke="#0F2A22" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* leave calendar */}
      <g className="float-c">
        <rect x="400" y="170" width="130" height="104" rx="12" fill={W3} stroke={W2} strokeWidth="1.5" />
        <rect x="400" y="170" width="130" height="22" rx="12" fill="rgb(255 255 255 / .22)" />
        {Array.from({ length: 15 }).map((_, i) => {
          const cx = 414 + (i % 5) * 24, cy = 204 + Math.floor(i / 5) * 22
          const on = [3, 7, 8, 12].includes(i)
          return <rect key={i} x={cx} y={cy} width="16" height="14" rx="3" fill={on ? A : 'rgb(255 255 255 / .22)'} />
        })}
      </g>

      {/* attendance / headcount bars */}
      <g transform="translate(570 150)">
        {[46, 70, 58, 92, 80].map((h, i) => (
          <rect key={i} x={i * 12} y={120 - h} width="8" height={h} rx="3" fill={i === 3 ? A : W2} className="bar-grow" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </g>
    </svg>
  )
}

function Audit() {
  return (
    <svg viewBox="0 0 640 300" className="h-full w-full" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
      {/* ISO badge with rotating ring */}
      <g transform="translate(190 150)">
        <circle r="78" fill="none" stroke={W2} strokeWidth="1.5" strokeDasharray="4 8" className="spin-slow" />
        <circle r="58" fill={W3} stroke={W2} strokeWidth="1.5" />
        <circle r="58" fill="none" stroke={A} strokeWidth="3" className="pulse-ring" />
        <text y="-4" textAnchor="middle" fill={W} fontFamily="Schibsted Grotesk, sans-serif" fontSize="26" fontWeight="700">ISO</text>
        <text y="18" textAnchor="middle" fill={W2} fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fontWeight="600">CERTIFIED</text>
      </g>

      {/* shield */}
      <g className="float-a">
        <path d="M330 40 L380 58 V104 C380 140 358 162 330 176 C302 162 280 140 280 104 V58 Z" fill="rgb(56 198 108 / .28)" stroke={W} strokeWidth="2" />
        <path d="M310 106 l14 14 28 -30" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* checklist document */}
      <g className="float-b">
        <rect x="420" y="36" width="150" height="176" rx="12" fill={W3} stroke={W2} strokeWidth="1.5" />
        <rect x="436" y="52" width="70" height="8" rx="4" fill={W} />
        {[0, 1, 2, 3, 4].map((i) => {
          const y = 80 + i * 24, done = i < 3
          return (
            <g key={i}>
              <rect x="436" y={y - 8} width="14" height="14" rx="3" fill={done ? A : 'none'} stroke={done ? A : W2} strokeWidth="1.5" />
              {done && <path d={`M439 ${y - 1} l3 3 5 -6`} fill="none" stroke="#0F2A22" strokeWidth="2" strokeLinecap="round" />}
              <rect x="458" y={y - 4} width={[86, 70, 92, 64, 78][i]} height="6" rx="3" fill={done ? W : W2} />
            </g>
          )
        })}
        <rect x="436" y="196" width="118" height="6" rx="3" fill="rgb(255 255 255 / .2)" />
        <rect x="436" y="196" width="72" height="6" rx="3" fill={A} />
      </g>

      {/* compliance status pills */}
      <g className="float-c">
        {[['#22c55e', 92], ['#f59e0b', 70], ['#ef4444', 54]].map(([c, w], i) => (
          <g key={i} transform={`translate(300 ${214 + i * 26})`}>
            <rect width="104" height="18" rx="9" fill={W3} stroke={W2} strokeWidth="1" />
            <circle cx="11" cy="9" r="5" fill={c} />
            <rect x="22" y="6" width={w - 30} height="6" rx="3" fill={W2} />
          </g>
        ))}
      </g>

      {/* magnifier */}
      <g className="float-x" transform="translate(590 250)">
        <circle r="18" fill="none" stroke={W} strokeWidth="3" />
        <path d="M13 13 L28 28" stroke={W} strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export default function PanelArt({ variant }) {
  const Art = variant === 'audit' ? Audit : Hrms
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] md:block lg:w-[55%] [mask-image:linear-gradient(90deg,transparent,black_30%)]" aria-hidden="true">
      <Art />
    </div>
  )
}
