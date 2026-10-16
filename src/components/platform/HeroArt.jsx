/**
 * Cinematic background for dark hero sections: an industrial skyline
 * (plant, transmission towers, office tower) over a perspective grid,
 * with glowing data nodes. Pure SVG, so it is sharp at any size and
 * needs no download. `accent` tints the glow for module pages.
 */
export default function HeroArt({ accent = '#FF6B2C', secondary = '#3B82F6', className = '' }) {
  const id = accent.replace('#', '')
  return (
    <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B1830" />
          <stop offset=".55" stopColor="#10233F" />
          <stop offset="1" stopColor="#172333" />
        </linearGradient>
        <radialGradient id={`sun-${id}`} cx=".72" cy=".62" r=".5">
          <stop offset="0" stopColor={accent} stopOpacity=".55" />
          <stop offset=".45" stopColor={accent} stopOpacity=".12" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`cool-${id}`} cx=".15" cy=".2" r=".55">
          <stop offset="0" stopColor={secondary} stopOpacity=".35" />
          <stop offset="1" stopColor={secondary} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`fade-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".22" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill={`url(#sky-${id})`} />
      <rect width="1600" height="900" fill={`url(#cool-${id})`} />
      <rect width="1600" height="900" fill={`url(#sun-${id})`} />

      {/* perspective floor grid */}
      <g stroke="#fff" strokeOpacity=".07" strokeWidth="1">
        {Array.from({ length: 21 }, (_, i) => <line key={`v${i}`} x1={800} y1={610} x2={-800 + i * 160} y2={900} />)}
        {[630, 660, 700, 750, 815, 900].map((y) => <line key={y} x1="0" y1={y} x2="1600" y2={y} />)}
      </g>

      {/* far skyline: office towers */}
      <g fill="#1B2E4D">
        <rect x="80" y="380" width="70" height="240" /><rect x="160" y="320" width="54" height="300" /><rect x="222" y="410" width="80" height="210" />
        <rect x="1280" y="350" width="64" height="270" /><rect x="1352" y="300" width="48" height="320" /><rect x="1410" y="400" width="90" height="220" />
      </g>
      <g fill="#FFD7A8" fillOpacity=".35">
        {Array.from({ length: 36 }, (_, i) => <rect key={i} x={86 + (i % 6) * 10 + Math.floor(i / 18) * 80} y={400 + Math.floor((i % 18) / 6) * 26} width="4" height="8" />)}
        {Array.from({ length: 30 }, (_, i) => <rect key={`r${i}`} x={1290 + (i % 5) * 10} y={370 + Math.floor(i / 5) * 30} width="4" height="8" />)}
      </g>

      {/* plant: stacks, tanks, conveyor */}
      <g fill="#14253F">
        <rect x="560" y="300" width="26" height="320" /><rect x="610" y="260" width="22" height="360" /><rect x="652" y="330" width="26" height="290" />
        <path d="M520 620 V470 h320 V620 Z" /><path d="M840 620 V510 l60-40 60 40 60-40 60 40 V620 Z" />
        <circle cx="1120" cy="560" r="62" /><rect x="1058" y="560" width="124" height="60" />
        <rect x="1196" y="520" width="70" height="100" />
      </g>
      <g fill="#fff" fillOpacity=".09">
        <rect x="560" y="300" width="26" height="8" /><rect x="610" y="260" width="22" height="8" /><rect x="652" y="330" width="26" height="8" />
      </g>
      {/* smoke */}
      <g fill="#fff" fillOpacity=".05">
        <circle cx="573" cy="270" r="26" /><circle cx="600" cy="240" r="34" /><circle cx="622" cy="215" r="30" /><circle cx="660" cy="190" r="40" />
      </g>
      {/* lit windows in the plant */}
      <g fill={accent} fillOpacity=".55">
        {Array.from({ length: 14 }, (_, i) => <rect key={i} x={540 + i * 21} y="500" width="10" height="16" rx="1" />)}
        {Array.from({ length: 7 }, (_, i) => <rect key={`b${i}`} x={856 + i * 26} y="545" width="12" height="20" rx="1" />)}
      </g>

      {/* transmission towers + lines */}
      <g stroke="#5C7090" strokeOpacity=".55" strokeWidth="2" fill="none">
        <path d="M330 620 L370 360 L410 620 M342 540 H398 M352 470 H388 M330 400 H410 M370 360 V340" />
        <path d="M1460 620 L1500 330 L1540 620 M1472 540 H1528 M1482 460 H1518 M1458 380 H1542" />
        <path d="M330 400 Q 900 520 1458 380" strokeOpacity=".35" />
        <path d="M410 400 Q 960 540 1542 380" strokeOpacity=".35" />
      </g>

      {/* ground haze */}
      <rect y="600" width="1600" height="300" fill={`url(#fade-${id})`} opacity=".25" />

      {/* data nodes */}
      <g className="hidden sm:inline">
        {[[620, 250, accent], [1120, 490, secondary], [370, 352, accent], [1500, 322, secondary], [190, 310, '#F472B6']].map(([x, y, c], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="14" fill={c} opacity=".25" className="pulse-ring" style={{ animationDelay: `${i * 0.6}s` }} />
            <circle cx={x} cy={y} r="4" fill={c} />
          </g>
        ))}
      </g>
    </svg>
  )
}
