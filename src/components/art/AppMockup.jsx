/**
 * Illustrated application mockup for a project, generated from its own
 * code, name and module list. Used when no approved screenshot exists.
 * Deterministic per project (same slug → same chart shapes and colour).
 */
const ACCENTS = ['#007438', '#2B5B84', '#0E7490', '#B45309', '#6D28D9', '#BE123C', '#15803D', '#1D4ED8']

function seeded(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 1000) / 1000 }
}

const clip = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s)

export default function AppMockup({ project, animate = true, className = '' }) {
  const rnd = seeded(project.slug)
  const accent = ACCENTS[Math.floor(rnd() * ACCENTS.length)]
  const layout = Math.floor(rnd() * 3) // 0 bars, 1 line, 2 donut
  const mods = project.features.slice(0, 7)
  const kpis = project.features.slice(0, 3)
  const bars = Array.from({ length: 9 }, () => 0.3 + rnd() * 0.7)
  const line = Array.from({ length: 10 }, () => 0.2 + rnd() * 0.75)
  const rows = Array.from({ length: 4 }, () => [0.45 + rnd() * 0.4, 0.2 + rnd() * 0.25])
  const kpiVals = kpis.map(() => Math.floor(12 + rnd() * 880))
  const g = `g-${project.slug}`

  return (
    <svg viewBox="0 0 640 360" className={`block h-full w-full ${className}`} role="img" aria-label={`Illustration of the ${project.name} interface`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} stopOpacity=".35" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="#EEF2F0" />
      {/* browser chrome */}
      <rect x="0" y="0" width="640" height="26" fill="#E2E8E5" />
      {['#F87171', '#FBBF24', '#34D399'].map((c, i) => <circle key={c} cx={14 + i * 13} cy="13" r="4" fill={c} />)}
      <rect x="70" y="7" width="240" height="12" rx="6" fill="#fff" />
      <text x="80" y="16.5" fontSize="8" fill="#6B7C75">app.example.com/{project.code.toLowerCase().replace(/[^a-z]/g, '')}</text>

      {/* sidebar */}
      <rect x="0" y="26" width="138" height="334" fill="#0F2A22" />
      <rect x="14" y="40" width="20" height="20" rx="5" fill={accent} />
      <text x="42" y="54" fontSize="11" fontWeight="700" fill="#fff">{clip(project.code, 12)}</text>
      {mods.map((m, i) => (
        <g key={m}>
          {i === 0 && <rect x="8" y={76 + i * 26} width="122" height="20" rx="5" fill="#ffffff14" />}
          {i === 0 && <rect x="8" y={76 + i * 26} width="3" height="20" rx="1.5" fill={accent} />}
          <rect x="18" y={82 + i * 26} width="8" height="8" rx="2" fill={i === 0 ? accent : '#ffffff40'} />
          <text x="32" y={89.5 + i * 26} fontSize="8.5" fill={i === 0 ? '#fff' : '#ffffffA0'}>{clip(m, 19)}</text>
        </g>
      ))}

      {/* header */}
      <text x="156" y="52" fontSize="13" fontWeight="700" fill="#0F2A22">{clip(project.name, 34)}</text>
      <text x="156" y="66" fontSize="8.5" fill="#6B7C75">{clip(project.industry, 44)}</text>
      <rect x="560" y="40" width="64" height="20" rx="5" fill={accent} />
      <text x="592" y="53.5" fontSize="8.5" fill="#fff" textAnchor="middle" fontWeight="600">+ New</text>

      {/* KPI cards */}
      {kpis.map((k, i) => (
        <g key={k}>
          <rect x={156 + i * 158} y="78" width="148" height="58" rx="7" fill="#fff" />
          <text x={166 + i * 158} y="95" fontSize="8" fill="#6B7C75">{clip(k, 26)}</text>
          <text x={166 + i * 158} y="119" fontSize="17" fontWeight="700" fill="#0F2A22">{kpiVals[i]}</text>
          <rect x={250 + i * 158} y="108" width="44" height="14" rx="7" fill={i === 1 ? '#FEF3C7' : '#DCFCE7'} />
          <text x={272 + i * 158} y="118" fontSize="7.5" textAnchor="middle" fill={i === 1 ? '#92400E' : '#166534'}>{i === 1 ? 'Pending' : 'Active'}</text>
        </g>
      ))}

      {/* chart card */}
      <rect x="156" y="146" width="300" height="200" rx="7" fill="#fff" />
      <text x="168" y="164" fontSize="9" fontWeight="600" fill="#0F2A22">Monthly overview</text>
      {[0, 1, 2, 3].map((i) => <line key={i} x1="168" x2="444" y1={186 + i * 38} y2={186 + i * 38} stroke="#EEF2F0" />)}
      {layout === 0 && bars.map((b, i) => (
        <rect key={i} x={176 + i * 29} y={320 - b * 130} width="17" height={b * 130} rx="3"
          fill={i === bars.length - 2 ? accent : `${accent}55`} className={animate ? 'bar-grow' : ''} style={animate ? { animationDelay: `${i * 60}ms` } : undefined} />
      ))}
      {layout === 1 && (() => {
        const pts = line.map((v, i) => [174 + i * 30, 320 - v * 128])
        const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ')
        return (
          <g>
            <path d={`${d} L${pts[pts.length - 1][0]},320 L174,320 Z`} fill={`url(#${g})`} />
            <path d={d} fill="none" stroke={accent} strokeWidth="2.5" strokeLinejoin="round" />
            {pts.map((p, i) => i % 3 === 0 && <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="#fff" stroke={accent} strokeWidth="2" />)}
          </g>
        )
      })()}
      {layout === 2 && (
        <g>
          {[0.42, 0.28, 0.18, 0.12].reduce((acc, v, i) => {
            const start = acc.t, end = start + v
            const a0 = start * 2 * Math.PI - Math.PI / 2, a1 = end * 2 * Math.PI - Math.PI / 2
            const r = 62, cx = 250, cy = 258
            const large = v > 0.5 ? 1 : 0
            acc.el.push(<path key={i} d={`M${cx + r * Math.cos(a0)},${cy + r * Math.sin(a0)} A${r},${r} 0 ${large} 1 ${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)}`}
              fill="none" stroke={i === 0 ? accent : `${accent}${['', 'AA', '66', '33'][i]}`} strokeWidth="20" />)
            acc.t = end
            return acc
          }, { t: 0, el: [] }).el}
          {['A', 'B', 'C', 'D'].map((l, i) => (
            <g key={l}><rect x="340" y={218 + i * 20} width="10" height="10" rx="2" fill={i === 0 ? accent : `${accent}${['', 'AA', '66', '33'][i]}`} /><rect x="356" y={220 + i * 20} width={60 - i * 8} height="6" rx="3" fill="#DCE3DF" /></g>
          ))}
        </g>
      )}

      {/* table card */}
      <rect x="466" y="146" width="158" height="200" rx="7" fill="#fff" />
      <text x="478" y="164" fontSize="9" fontWeight="600" fill="#0F2A22">Recent activity</text>
      {rows.map(([a, b], i) => (
        <g key={i}>
          <circle cx="484" cy={190 + i * 38} r="7" fill={`${accent}22`} />
          <rect x="497" y={185 + i * 38} width={a * 110} height="6" rx="3" fill="#C9D3CE" />
          <rect x="497" y={195 + i * 38} width={b * 110} height="5" rx="2.5" fill="#E4EAE7" />
        </g>
      ))}
    </svg>
  )
}
