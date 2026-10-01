/**
 * Hero visual: a business system drawn as an electrical single-line
 * diagram — a nod to the engineering businesses this team grew up
 * building software for. Modules are real ones from our projects.
 */
const DROPS = [
  { label: 'CRM', sub: 'Enquiries' },
  { label: 'Orders', sub: 'Sales & work' },
  { label: 'Purchase', sub: 'PO & GRN' },
  { label: 'HR', sub: 'Payroll' },
  { label: 'Finance', sub: 'Invoices' },
  { label: 'Reports', sub: 'Dashboards' },
]

export default function HeroDiagram() {
  const W = 560, busY = 118, x0 = 50, step = 92
  return (
    <figure className="relative">
      <svg viewBox={`0 0 ${W} 360`} className="h-auto w-full" role="img" aria-labelledby="sld-title sld-desc">
        <title id="sld-title">Connected business application diagram</title>
        <desc id="sld-desc">A central data bus feeding CRM, orders, purchase, HR, finance and reporting modules.</desc>

        {/* source */}
        <g className="sld-fade" style={{ animationDelay: '0s' }}>
          <rect x={W / 2 - 92} y="14" width="184" height="52" rx="10" className="fill-ink" />
          <text x={W / 2} y="37" textAnchor="middle" className="fill-white font-display" fontSize="15" fontWeight="600">One shared database</text>
          <text x={W / 2} y="55" textAnchor="middle" className="fill-accent" fontSize="11.5">single source of truth</text>
        </g>
        <path d={`M${W / 2} 66 V${busY}`} pathLength="1" className="sld-draw stroke-ink" strokeWidth="2.5" fill="none" />

        {/* bus bar */}
        <path d={`M${x0 - 10} ${busY} H${x0 + step * 5 + 10}`} pathLength="1" className="sld-draw stroke-brand" strokeWidth="6" strokeLinecap="round" fill="none" style={{ animationDelay: '.25s' }} />

        {DROPS.map((d, i) => {
          const x = x0 + i * step
          const delay = 0.7 + i * 0.12
          return (
            <g key={d.label}>
              <path d={`M${x} ${busY} V${busY + 34}`} pathLength="1" className="sld-draw stroke-ink/70" strokeWidth="2" fill="none" style={{ animationDelay: `${delay}s` }} />
              {/* breaker symbol */}
              <g className="sld-fade" style={{ animationDelay: `${delay + 0.15}s` }}>
                <rect x={x - 9} y={busY + 34} width="18" height="18" className="fill-white stroke-ink/70" strokeWidth="2" />
                <path d={`M${x - 5} ${busY + 38} l10 10 M${x + 5} ${busY + 38} l-10 10`} className="stroke-ink/70" strokeWidth="1.6" />
              </g>
              <path d={`M${x} ${busY + 52} V${busY + 92}`} pathLength="1" className="sld-draw stroke-ink/70" strokeWidth="2" fill="none" style={{ animationDelay: `${delay + 0.2}s` }} />
              <g className="sld-fade" style={{ animationDelay: `${delay + 0.35}s` }}>
                <rect x={x - 40} y={busY + 92} width="80" height="62" rx="8" className="fill-white stroke-line" strokeWidth="1.5" />
                <rect x={x - 40} y={busY + 92} width="80" height="4" rx="2" className="fill-brand" />
                <text x={x} y={busY + 122} textAnchor="middle" className="fill-ink font-display" fontSize="14" fontWeight="600">{d.label}</text>
                <text x={x} y={busY + 140} textAnchor="middle" className="fill-muted" fontSize="10.5">{d.sub}</text>
              </g>
            </g>
          )
        })}

        {/* ground line / users */}
        <g className="sld-fade" style={{ animationDelay: '1.9s' }}>
          <path d={`M${x0 - 10} ${busY + 196} H${x0 + step * 5 + 10}`} className="stroke-line" strokeWidth="1.5" strokeDasharray="4 6" />
          <text x={W / 2} y={busY + 222} textAnchor="middle" className="fill-muted" fontSize="12">Office, site and field teams — on desktop or phone</text>
        </g>
      </svg>
    </figure>
  )
}
