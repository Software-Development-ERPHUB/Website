/**
 * Animated SVG illustrations for inner-page banners (drawn for a dark
 * background). One variant per page — pick with <BannerArt variant="…" />.
 * To use a photo instead, pass `image` to <PageHero>.
 */
const W = 'rgba(255,255,255,.92)'
const W2 = 'rgba(255,255,255,.55)'
const W3 = 'rgba(255,255,255,.14)'
const G = '#38C66C'
const B = '#7DB3E0'

const Card = ({ x, y, w, h, r = 10, fill = W3, stroke = 'rgba(255,255,255,.22)', ...p }) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} {...p} />
)
const Line = ({ x, y, w, c = W2, h = 6 }) => <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={c} />

function Services() {
  return (
    <g>
      <g className="float-a">
        <Card x={40} y={60} w={300} h={210} />
        <rect x={40} y={60} width={300} height={28} rx={10} fill="rgba(255,255,255,.08)" />
        {[0, 1, 2].map((i) => <circle key={i} cx={58 + i * 14} cy={74} r={4} fill={['#F87171', '#FBBF24', '#34D399'][i]} />)}
        {[
          [60, 108, 90, G], [160, 108, 70, W2], [80, 128, 140, B], [80, 148, 110, W2], [100, 168, 150, G],
          [100, 188, 80, W2], [80, 208, 120, B], [60, 228, 60, W2],
        ].map(([x, y, w, c], i) => <Line key={i} x={x} y={y} w={w} c={c} />)}
        <rect x={146} y={226} width={3} height={12} fill={G} className="caret" />
      </g>
      <g className="float-b">
        <Card x={360} y={120} w={110} h={200} r={18} fill="rgba(255,255,255,.1)" />
        <rect x={396} y={130} width={38} height={5} rx={2.5} fill={W2} />
        <Card x={374} y={150} w={82} h={50} r={8} fill={G} stroke="none" opacity=".85" />
        {[0, 1, 2].map((i) => <Line key={i} x={374} y={214 + i * 18} w={82 - i * 18} />)}
        <circle cx={415} cy={300} r={8} fill="none" stroke={W2} strokeWidth={2} />
      </g>
      <g transform="translate(330 40)">
        <g className="spin-slow">
          <circle cx={40} cy={40} r={22} fill="none" stroke={G} strokeWidth={8} strokeDasharray="10 7" />
          <circle cx={40} cy={40} r={10} fill={G} />
        </g>
      </g>
    </g>
  )
}

function Solutions() {
  const nodes = [[70, 90, 'Enquiry'], [230, 60, 'Approval'], [390, 110, 'Order'], [120, 250, 'Report'], [300, 260, 'Invoice']]
  const edges = [[0, 1], [1, 2], [2, 4], [0, 3], [3, 4]]
  return (
    <g>
      {edges.map(([a, b], i) => (
        <path key={i} d={`M${nodes[a][0] + 50},${nodes[a][1] + 22} L${nodes[b][0] + 50},${nodes[b][1] + 22}`} stroke={G} strokeWidth={2.5} className="dash-flow" fill="none" />
      ))}
      {nodes.map(([x, y, l], i) => (
        <g key={l} className={['float-a', 'float-b', 'float-c'][i % 3]}>
          <Card x={x} y={y} w={100} h={44} fill="rgba(15,42,34,.9)" stroke={i === 2 ? G : 'rgba(255,255,255,.25)'} />
          <circle cx={x + 18} cy={y + 22} r={7} fill={i === 2 ? G : B} />
          <text x={x + 32} y={y + 26} fontSize={12} fill={W} fontWeight={600}>{l}</text>
        </g>
      ))}
      <g transform="translate(410 250)"><circle r={10} fill={G} /><circle r={10} fill="none" stroke={G} strokeWidth={2} className="pulse-ring" /></g>
    </g>
  )
}

function Industries() {
  return (
    <g>
      {/* factory */}
      <g className="float-a">
        <path d="M40 300 V200 L100 230 V200 L160 230 V200 L220 230 V300 Z" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.3)" />
        <rect x={180} y={140} width={22} height={90} fill="rgba(255,255,255,.18)" />
        {[0, 1, 2].map((i) => <rect key={i} x={60 + i * 55} y={255} width={26} height={20} rx={3} fill={i === 1 ? G : W2} opacity=".8" />)}
        <circle cx={191} cy={122} r={10} fill="rgba(255,255,255,.2)" className="float-c" />
      </g>
      {/* tower */}
      <g className="float-b">
        <rect x={260} y={90} width={90} height={210} rx={4} fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.28)" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={272 + (i % 3) * 24} y={106 + Math.floor(i / 3) * 44} width={16} height={26} rx={2} fill={i % 4 === 1 ? B : 'rgba(255,255,255,.25)'} />
        ))}
      </g>
      {/* bolt + gear */}
      <g className="float-c">
        <circle cx={420} cy={120} r={40} fill="rgba(56,198,108,.15)" stroke={G} strokeWidth={2} />
        <path d="M425 92 L405 124 H421 L413 150 L437 114 H421 Z" fill={G} />
      </g>
      <g transform="translate(390 220)">
        <g className="spin-slow">
          <circle cx={30} cy={30} r={26} fill="none" stroke={W2} strokeWidth={9} strokeDasharray="9 8" />
          <circle cx={30} cy={30} r={10} fill="none" stroke={W2} strokeWidth={4} />
        </g>
      </g>
      <line x1={20} x2={480} y1={302} y2={302} stroke="rgba(255,255,255,.3)" strokeWidth={2} />
    </g>
  )
}

function Projects() {
  return (
    <g>
      <g className="float-c" opacity=".55"><Card x={150} y={40} w={290} h={180} /></g>
      <g className="float-b" opacity=".8">
        <Card x={100} y={80} w={290} h={180} fill="rgba(255,255,255,.12)" />
        {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={124 + i * 40} y={230 - [60, 90, 50, 110, 80, 120][i]} width={22} height={[60, 90, 50, 110, 80, 120][i]} rx={3} fill={i === 5 ? G : 'rgba(255,255,255,.3)'} className="bar-grow" style={{ animationDelay: `${i * 90}ms` }} />)}
      </g>
      <g className="float-a">
        <Card x={50} y={130} w={290} h={180} fill="#12352B" stroke="rgba(255,255,255,.3)" />
        <rect x={50} y={130} width={70} height={180} rx={10} fill="rgba(0,0,0,.25)" />
        {[0, 1, 2, 3, 4].map((i) => <Line key={i} x={62} y={152 + i * 22} w={44} c={i === 0 ? G : W3} />)}
        {[0, 1, 2].map((i) => <Card key={i} x={134 + i * 66} y={146} w={56} h={40} r={6} fill="rgba(255,255,255,.1)" />)}
        <path d="M136 280 L170 250 L200 262 L236 222 L268 236 L324 200" fill="none" stroke={G} strokeWidth={3} strokeLinejoin="round" />
      </g>
      <g transform="translate(420 260)"><g className="float-b"><circle r={26} fill={G} /><path d="M-10 0 L-2 8 L12 -8" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" /></g></g>
    </g>
  )
}

function Technology() {
  const layers = [['Frontend', 'React · Tailwind', B], ['Backend', 'Laravel · Node.js', G], ['Database', 'MySQL', '#FBBF24'], ['Server', 'Linux · Nginx', W2]]
  return (
    <g>
      {layers.map(([t, s, c], i) => (
        <g key={t} transform={`translate(${60 + i * 18} ${40 + i * 66})`}><g className={['float-a', 'float-b', 'float-c', 'float-a'][i]}>
          <path d="M0 26 L180 0 L360 26 L180 52 Z" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.3)" />
          <path d="M0 26 V40 L180 66 V52 Z" fill="rgba(255,255,255,.06)" />
          <path d="M360 26 V40 L180 66 V52 Z" fill="rgba(0,0,0,.2)" />
          <circle cx={120} cy={26} r={6} fill={c} />
          <text x={134} y={24} fontSize={13} fontWeight={700} fill={W}>{t}</text>
          <text x={134} y={38} fontSize={10} fill={W2}>{s}</text>
        </g></g>
      ))}
      <path d="M470 60 V320" stroke={G} strokeWidth={2} className="dash-flow" />
    </g>
  )
}

function About() {
  return (
    <g>
      <line x1={30} x2={480} y1={300} y2={300} stroke="rgba(255,255,255,.3)" strokeWidth={2} />
      <path d="M40 280 C140 270, 200 230, 280 180 S420 80, 470 60" fill="none" stroke={G} strokeWidth={3} className="dash-flow" />
      {[[60, 278, '1995'], [270, 186, '2015'], [460, 64, 'Today']].map(([x, y, l], i) => (
        <g key={l}>
          <circle cx={x} cy={y} r={8} fill={i === 2 ? G : '#fff'} />
          {i === 2 && <circle cx={x} cy={y} r={8} fill="none" stroke={G} strokeWidth={2} className="pulse-ring" />}
          <text x={x} y={y + 30} fontSize={13} fontWeight={700} fill={W} textAnchor="middle">{l}</text>
        </g>
      ))}
      <g className="float-b">
        <rect x={120} y={80} width={80} height={140} rx={4} fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.28)" />
        {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={132 + (i % 2) * 32} y={96 + Math.floor(i / 2) * 30} width={24} height={20} rx={2} fill={i === 5 ? G : 'rgba(255,255,255,.22)'} />)}
      </g>
      <g transform="translate(320 220)"><g className="float-c">
        {[0, 1, 2, 3].map((i) => <circle key={i} cx={i * 26} cy={0} r={14} fill={['#7DB3E0', '#38C66C', '#FBBF24', '#fff'][i]} stroke="#0F2A22" strokeWidth={3} opacity=".9" />)}
      </g></g>
    </g>
  )
}

function Careers() {
  return (
    <g>
      <g className="float-a">
        <Card x={130} y={170} w={240} h={140} fill="rgba(255,255,255,.1)" />
        <path d="M100 310 H400 L380 326 H120 Z" fill="rgba(255,255,255,.2)" />
        {[0, 1, 2].map((i) => <Line key={i} x={150} y={196 + i * 20} w={[120, 170, 90][i]} c={i === 0 ? G : W2} />)}
      </g>
      {[[90, 90, B], [250, 50, G], [410, 90, '#FBBF24']].map(([x, y, c], i) => (
        <g key={i} className={['float-b', 'float-c', 'float-b'][i]}>
          <circle cx={x} cy={y} r={22} fill={c} />
          <circle cx={x} cy={y - 6} r={8} fill="rgba(15,42,34,.8)" />
          <path d={`M${x - 13} ${y + 15} a13 11 0 0 1 26 0`} fill="rgba(15,42,34,.8)" />
          <path d={`M${x} ${y + 24} L250 170`} stroke="rgba(255,255,255,.25)" strokeWidth={1.5} className="dash-flow" />
        </g>
      ))}
    </g>
  )
}

function Contact() {
  return (
    <g>
      <g opacity=".6">
        {Array.from({ length: 7 }).map((_, i) => <line key={`h${i}`} x1={20} x2={480} y1={60 + i * 42} y2={60 + i * 42} stroke="rgba(255,255,255,.12)" />)}
        {Array.from({ length: 11 }).map((_, i) => <line key={`v${i}`} y1={40} y2={320} x1={30 + i * 45} x2={30 + i * 45} stroke="rgba(255,255,255,.12)" />)}
        <path d="M20 250 C120 230, 180 150, 300 170 S430 110, 480 120" stroke="rgba(125,179,224,.6)" strokeWidth={10} fill="none" />
      </g>
      <g transform="translate(250 190)">
        <ellipse cx={0} cy={44} rx={26} ry={7} fill="rgba(0,0,0,.35)" />
        <circle cx={0} cy={44} r={14} fill="none" stroke={G} strokeWidth={2} className="pulse-ring" />
        <g className="float-a">
          <path d="M0 40 C-30 5,-36 -10,-36 -24 A36 36 0 0 1 36 -24 C36 -10,30 5,0 40 Z" fill={G} />
          <circle cx={0} cy={-24} r={13} fill="#0F2A22" />
        </g>
      </g>
      <g className="float-b"><Card x={330} y={60} w={130} h={80} fill="rgba(255,255,255,.12)" /><path d="M330 64 L395 110 L460 64" stroke={W2} strokeWidth={2.5} fill="none" /></g>
      <g className="float-c"><Card x={50} y={80} w={120} h={60} r={16} fill="rgba(56,198,108,.2)" stroke={G} />{[0, 1].map((i) => <Line key={i} x={66} y={98 + i * 16} w={[86, 60][i]} c={W2} />)}</g>
    </g>
  )
}

function Faq() {
  return (
    <g>
      <g className="float-a">
        <Card x={60} y={60} w={230} h={90} r={18} fill="rgba(255,255,255,.12)" />
        <text x={84} y={118} fontSize={40} fontWeight={800} fill={G}>?</text>
        {[0, 1].map((i) => <Line key={i} x={120} y={92 + i * 20} w={[140, 100][i]} />)}
      </g>
      <g className="float-b">
        <Card x={200} y={180} w={260} h={110} r={18} fill={G} stroke="none" opacity=".9" />
        {[0, 1, 2].map((i) => <Line key={i} x={224} y={206 + i * 22} w={[200, 170, 120][i]} c="rgba(255,255,255,.8)" />)}
      </g>
      <g className="float-c">
        <Card x={70} y={210} w={90} h={50} r={14} fill="rgba(255,255,255,.1)" />
        {[0, 1, 2].map((i) => <circle key={i} cx={96 + i * 19} cy={235} r={5} fill={W2} />)}
      </g>
    </g>
  )
}

function Legal() {
  return (
    <g>
      <g className="float-a">
        <Card x={130} y={50} w={200} h={260} fill="rgba(255,255,255,.1)" />
        {Array.from({ length: 8 }).map((_, i) => <Line key={i} x={154} y={84 + i * 24} w={[150, 120, 140, 100, 150, 90, 130, 70][i]} />)}
      </g>
      <g transform="translate(330 180)"><g className="float-b">
        <path d="M0 -60 L55 -40 V5 C55 40,30 60,0 75 C-30 60,-55 40,-55 5 V-40 Z" fill={G} />
        <path d="M-20 5 L-5 20 L22 -12" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g></g>
    </g>
  )
}

const VARIANTS = { services: Services, solutions: Solutions, industries: Industries, projects: Projects, technology: Technology, about: About, careers: Careers, team: Careers, contact: Contact, faq: Faq, legal: Legal }

export default function BannerArt({ variant = 'projects', className = '' }) {
  const V = VARIANTS[variant] || Projects
  return (
    <svg viewBox="0 0 500 360" className={`h-auto w-full ${className}`} aria-hidden="true" focusable="false">
      <V />
    </svg>
  )
}
