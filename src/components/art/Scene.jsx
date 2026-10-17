import {
  Users, UserSquare, Fingerprint, Clock3, CalendarClock, CalendarCheck, Wallet, IndianRupee, FileCheck2, ShieldCheck,
  Smartphone, MapPin, Target, TrendingUp, Award, BookOpen, Calculator, Receipt, CreditCard, Camera, PieChart, Coins,
  Handshake, Phone, ShoppingCart, Truck, PackageCheck, HardHat, TriangleAlert, ClipboardCheck, Factory, Settings,
  PenTool, Search, QrCode, Monitor, BarChart3, Briefcase,
} from 'lucide-react'

/*
 * SCENE — drawn illustrations used as the picture for a suite, module or
 * application when no photo has been added yet (see src/assets/photos).
 * Flat people, factory, finance and safety artwork with floating icon tiles,
 * so pages show what the work looks like instead of another dashboard.
 */

const SKIN = '#B9773F'
const HAIR = '#2B1B12'
const INK = '#10233F'
const LINE = '#E2E8F0'
const GOLD = '#F5B301'
const ACCENT = '#12ABDB'

/* Each drawing sits in a 200×200 box, standing on y≈190. */
const OBJ = {
  person: (c) => (
    <>
      <ellipse cx="100" cy="193" rx="62" ry="7" fill="#000" opacity=".08" />
      <path d="M38 194 Q38 122 100 113 Q162 122 162 194 Z" fill={c} />
      <path d="M86 115 L100 142 L114 115 Z" fill="#fff" />
      <path d="M97 121 H103 L105 152 L100 158 L95 152 Z" fill={INK} />
      <rect x="92" y="96" width="16" height="22" rx="5" fill={SKIN} />
      <circle cx="100" cy="78" r="26" fill={SKIN} />
      <path d="M73 78 Q72 47 100 47 Q129 47 127 78 Q120 61 100 61 Q83 61 73 78 Z" fill={HAIR} />
      <rect x="110" y="130" width="58" height="42" rx="6" fill={INK} transform="rotate(-8 139 151)" />
      <rect x="115" y="134" width="48" height="33" rx="3" fill="#fff" transform="rotate(-8 139 151)" />
      <g transform="rotate(-8 139 151)">
        <rect x="120" y="155" width="7" height="8" rx="1.5" fill={c} opacity=".5" />
        <rect x="130" y="150" width="7" height="13" rx="1.5" fill={c} opacity=".75" />
        <rect x="140" y="144" width="7" height="19" rx="1.5" fill={c} />
        <rect x="150" y="148" width="7" height="15" rx="1.5" fill={ACCENT} />
      </g>
      <circle cx="117" cy="163" r="8" fill={SKIN} />
    </>
  ),
  board: (c) => (
    <>
      <ellipse cx="100" cy="194" rx="70" ry="6" fill="#000" opacity=".07" />
      <path d="M62 150 L44 194 M138 150 L156 194 M100 150 V190" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <rect x="18" y="26" width="164" height="126" rx="10" fill="#fff" stroke={LINE} strokeWidth="3" />
      {[30, 52, 40, 72, 60].map((h, i) => <rect key={i} x={38 + i * 26} y={134 - h} width="16" height={h} rx="3" fill={c} opacity={0.45 + i * 0.12} />)}
      <polyline points="46,96 72,78 98,88 124,58 150,66 170,40" fill="none" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="170" cy="40" r="6" fill={ACCENT} />
    </>
  ),
  docs: (c) => (
    <>
      <ellipse cx="100" cy="194" rx="62" ry="6" fill="#000" opacity=".07" />
      <rect x="56" y="24" width="108" height="146" rx="10" fill={LINE} transform="rotate(8 110 97)" />
      <rect x="38" y="34" width="110" height="150" rx="10" fill="#fff" stroke={LINE} strokeWidth="3" />
      <rect x="54" y="52" width="58" height="9" rx="4" fill={c} />
      {[74, 88, 102, 116, 130].map((y, i) => <rect key={y} x="54" y={y} width={i % 2 ? 62 : 78} height="6" rx="3" fill="#CBD5E1" />)}
      <circle cx="146" cy="160" r="25" fill={c} />
      <path d="M134 160 l8 8 l16 -17" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  phone: (c) => (
    <>
      <ellipse cx="100" cy="195" rx="52" ry="6" fill="#000" opacity=".08" />
      <rect x="58" y="16" width="92" height="174" rx="18" fill={INK} />
      <rect x="65" y="30" width="78" height="146" rx="10" fill="#fff" />
      <circle cx="104" cy="96" r="32" fill={c} opacity=".15" />
      <circle cx="104" cy="96" r="22" fill={c} />
      <g fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
        <path d="M95 104 Q94 88 104 87 Q114 88 113 102" /><path d="M99 106 Q99 93 104 93 Q109 94 108 104" /><path d="M104 99 V107" />
      </g>
      <rect x="76" y="140" width="56" height="8" rx="4" fill="#CBD5E1" />
      <rect x="84" y="154" width="40" height="8" rx="4" fill={c} opacity=".5" />
      <path d="M168 18 a16 16 0 0 1 16 16 c0 12 -16 28 -16 28 s-16 -16 -16 -28 a16 16 0 0 1 16 -16 z" fill={ACCENT} />
      <circle cx="168" cy="34" r="6" fill="#fff" />
    </>
  ),
  clock: (c) => (
    <>
      <ellipse cx="100" cy="194" rx="56" ry="6" fill="#000" opacity=".07" />
      <circle cx="100" cy="104" r="74" fill="#fff" stroke={c} strokeWidth="9" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI) / 6
        return <circle key={i} cx={100 + Math.sin(a) * 58} cy={104 - Math.cos(a) * 58} r={i % 3 ? 2.5 : 4.5} fill={i % 3 ? '#CBD5E1' : INK} />
      })}
      <path d="M100 104 V62 M100 104 L130 120" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      <circle cx="100" cy="104" r="7" fill={ACCENT} />
    </>
  ),
  calendar: (c) => (
    <>
      <ellipse cx="100" cy="194" rx="70" ry="6" fill="#000" opacity=".07" />
      <rect x="24" y="40" width="152" height="140" rx="14" fill="#fff" stroke={LINE} strokeWidth="3" />
      <path d="M24 54 a14 14 0 0 1 14 -14 h124 a14 14 0 0 1 14 14 v20 h-152 z" fill={c} />
      <rect x="58" y="26" width="10" height="28" rx="5" fill={INK} /><rect x="132" y="26" width="10" height="28" rx="5" fill={INK} />
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={50 + (i % 4) * 34} cy={100 + Math.floor(i / 4) * 27} r="9" fill={i === 6 ? c : '#E2E8F0'} />
      ))}
      <path d="M115 128 l4 4 l8 -9" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  coins: () => (
    <>
      <ellipse cx="100" cy="194" rx="72" ry="7" fill="#000" opacity=".08" />
      {[[62, 6], [128, 9]].map(([x, n]) => Array.from({ length: n }).map((_, i) => (
        <ellipse key={`${x}-${i}`} cx={x} cy={184 - i * 12} rx="36" ry="11" fill={GOLD} stroke="#C98A00" strokeWidth="2" />
      )))}
      <text x="128" y="89" textAnchor="middle" fontSize="16" fontWeight="700" fill="#8A5A00">₹</text>
      <text x="62" y="125" textAnchor="middle" fontSize="16" fontWeight="700" fill="#8A5A00">₹</text>
    </>
  ),
  calculator: (c) => (
    <>
      <ellipse cx="100" cy="194" rx="56" ry="6" fill="#000" opacity=".08" />
      <rect x="48" y="22" width="104" height="168" rx="16" fill={INK} />
      <rect x="60" y="36" width="80" height="34" rx="6" fill={c} opacity=".85" />
      <text x="132" y="60" textAnchor="end" fontSize="16" fontWeight="700" fill="#fff">₹ 4,250</text>
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={70 + (i % 3) * 30} cy={92 + Math.floor(i / 3) * 26} r="10" fill={i === 11 ? ACCENT : '#fff'} opacity={i === 11 ? 1 : 0.85} />
      ))}
    </>
  ),
  factory: (c) => (
    <>
      <ellipse cx="100" cy="194" rx="92" ry="6" fill="#000" opacity=".08" />
      <circle cx="166" cy="40" r="10" fill="#CBD5E1" /><circle cx="180" cy="24" r="13" fill="#E2E8F0" /><circle cx="194" cy="10" r="8" fill="#E2E8F0" />
      <rect x="150" y="50" width="24" height="142" rx="3" fill={INK} />
      <path d="M10 192 V108 L52 82 V108 L94 82 V108 L136 82 V192 Z" fill={c} />
      {[[24, 126], [60, 126], [96, 126], [24, 156], [60, 156], [96, 156]].map(([x, y]) => <rect key={x + '-' + y} x={x} y={y} width="22" height="16" rx="3" fill="#fff" opacity=".8" />)}
      <circle cx="176" cy="150" r="18" fill={ACCENT} /><circle cx="176" cy="150" r="7" fill="#fff" />
    </>
  ),
  warehouse: (c) => (
    <>
      <ellipse cx="100" cy="194" rx="88" ry="6" fill="#000" opacity=".08" />
      <rect x="10" y="186" width="180" height="8" rx="3" fill="#A0703F" />
      {[[16, 126, 60], [80, 126, 60], [48, 68, 58], [144, 140, 46]].map(([x, y, s], i) => (
        <g key={i}>
          <rect x={x} y={y} width={s} height={s} rx="5" fill={i === 3 ? c : '#D9A066'} />
          <rect x={x + s / 2 - 6} y={y} width="12" height={s} fill={i === 3 ? '#fff' : '#C68A4E'} opacity={i === 3 ? 0.35 : 1} />
        </g>
      ))}
      <circle cx="160" cy="62" r="22" fill={c} />
      <path d="M150 62 l7 7 l13 -14" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  safety: (c) => (
    <>
      <ellipse cx="100" cy="194" rx="80" ry="7" fill="#000" opacity=".08" />
      <path d="M30 146 Q30 64 100 64 Q170 64 170 146 Z" fill={GOLD} />
      <rect x="92" y="62" width="16" height="84" rx="6" fill="#FFD34D" />
      <rect x="16" y="140" width="168" height="18" rx="9" fill="#DC9A00" />
      <path d="M150 192 L166 160 L182 192 Z" fill={ACCENT} /><rect x="156" y="174" width="20" height="6" fill="#fff" />
      <circle cx="44" cy="180" r="13" fill={c} />
      <path d="M38 180 l4 4 l8 -9" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  laptop: (c) => (
    <>
      <ellipse cx="100" cy="194" rx="86" ry="6" fill="#000" opacity=".08" />
      <rect x="30" y="50" width="140" height="100" rx="8" fill={INK} />
      <rect x="38" y="58" width="124" height="84" rx="4" fill="#fff" />
      <path d="M50 124 L74 104 L96 114 L120 86 L148 96" fill="none" stroke={c} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="148" cy="96" r="5" fill={ACCENT} />
      <path d="M14 152 H186 L176 170 H24 Z" fill="#94A3B8" />
    </>
  ),
  blueprint: (c) => (
    <>
      <ellipse cx="100" cy="194" rx="80" ry="6" fill="#000" opacity=".07" />
      <rect x="18" y="36" width="164" height="140" rx="8" fill="#1E3A66" />
      <g stroke="#93C5FD" strokeWidth="2" fill="none" opacity=".9">
        <rect x="36" y="56" width="70" height="50" /><path d="M106 81 H150 V140 H60 V106" /><circle cx="128" cy="62" r="14" /><path d="M36 150 H164" strokeDasharray="6 5" />
      </g>
      <path d="M150 170 L186 112" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" />
      <circle cx="44" cy="40" r="10" fill={c} />
    </>
  ),
}

/* scene recipes: up to two drawings + three floating icons */
const S = (a, b, icons) => ({ a, b, icons })
export const SCENES = {
  hrms: S('person', 'board', [Users, CalendarCheck, Wallet]),
  'hrms-employees': S('person', 'docs', [UserSquare, Users, Briefcase]),
  'hrms-attendance': S('phone', 'clock', [Fingerprint, Clock3, MapPin]),
  'hrms-shifts': S('calendar', 'clock', [CalendarClock, Clock3, Users]),
  'hrms-leave': S('calendar', 'person', [CalendarCheck, Smartphone, Users]),
  'hrms-payroll': S('coins', 'docs', [Wallet, IndianRupee, FileCheck2]),
  'hrms-statutory': S('docs', 'safety', [FileCheck2, ShieldCheck, ClipboardCheck]),
  'hrms-ess': S('phone', 'person', [Smartphone, Fingerprint, MapPin]),
  'hrms-performance': S('board', 'person', [Target, TrendingUp, Award]),
  finance: S('calculator', 'coins', [Calculator, PieChart, IndianRupee]),
  'finance-accounts': S('docs', 'calculator', [BookOpen, Calculator, BarChart3]),
  'finance-billing': S('docs', 'coins', [Receipt, IndianRupee, FileCheck2]),
  'finance-expenses': S('phone', 'docs', [Camera, Receipt, CreditCard]),
  'finance-budget': S('board', 'coins', [PieChart, Coins, TrendingUp]),
  manufacturing: S('factory', 'warehouse', [Factory, Settings, Truck]),
  'manufacturing-crm': S('person', 'laptop', [Handshake, Phone, TrendingUp]),
  'manufacturing-procurement': S('warehouse', 'docs', [ShoppingCart, Truck, PackageCheck]),
  'manufacturing-ehs': S('safety', 'factory', [HardHat, TriangleAlert, ClipboardCheck]),
  design: S('blueprint', 'laptop', [PenTool, Monitor, FileCheck2]),
  audit: S('docs', 'laptop', [Search, ClipboardCheck, ShieldCheck]),
  asset: S('factory', 'phone', [QrCode, Settings, ClipboardCheck]),
  project: S('board', 'laptop', [Target, IndianRupee, CalendarClock]),
  operations: S('laptop', 'factory', [Monitor, Settings, ClipboardCheck]),
  services: S('laptop', 'person', [Monitor, Settings, Users]),
}

/** Pick a scene for an application from its code and name. */
const APP_RULES = [
  [/hrms|hr management|employee management/i, 'hrms'],
  [/expense/i, 'finance-expenses'],
  [/finance/i, 'finance-accounts'],
  [/health|safety|\behs\b/i, 'manufacturing-ehs'],
  [/vendor|supply chain|prime|purchase/i, 'manufacturing-procurement'],
  [/production|\berp\b/i, 'manufacturing'],
  [/project cost/i, 'project'],
  [/design/i, 'design'],
  [/audit/i, 'audit'],
  [/asset/i, 'asset'],
  [/crm|customer/i, 'manufacturing-crm'],
  [/field|job|operations|oms/i, 'operations'],
]
export const sceneForApp = (app) => (APP_RULES.find(([re]) => re.test(`${app.code} ${app.name}`)) || [, 'services'])[1]

const TILE_POS = ['left-[6%] top-[10%]', 'right-[5%] top-[8%]', 'left-[9%] bottom-[12%]']

/**
 * <Scene kind="hrms-payroll" color="#DB2777" soft="#FDF2F8" />
 *   dark  — for dark banners (navy backdrop instead of the soft tint)
 *   tiles — show the floating icon tiles (off for small thumbnails)
 */
export default function Scene({ kind, color = '#DB2777', soft = '#FDF2F8', dark = false, tiles = true, className = '' }) {
  const sc = SCENES[kind] || SCENES.services
  const bg = dark ? '#132A4A' : soft
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} style={{ background: bg }} aria-hidden="true">
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <circle cx="430" cy="190" r="175" fill={color} opacity={dark ? 0.28 : 0.13} />
        <circle cx="110" cy="340" r="110" fill={color} opacity={dark ? 0.16 : 0.08} />
        <circle cx="590" cy="40" r="60" fill={ACCENT} opacity={dark ? 0.18 : 0.08} />
        {Array.from({ length: 18 }).map((_, i) => (
          <circle key={i} cx={40 + (i % 6) * 18} cy={40 + Math.floor(i / 6) * 18} r="2.2" fill={dark ? '#fff' : color} opacity={dark ? 0.25 : 0.3} />
        ))}
        <g transform="translate(150 150) scale(1.15)">{OBJ[sc.b](color)}</g>
        <g transform="translate(330 70) scale(1.6)">{OBJ[sc.a](color)}</g>
      </svg>
      {tiles && sc.icons.map((I, i) => (
        <span key={i} className={`absolute ${TILE_POS[i]} flex h-[13%] min-h-[34px] w-auto max-h-[56px] items-center justify-center rounded-xl bg-white shadow-pop ${['bob', 'bob-2', 'bob-3'][i]}`} style={{ aspectRatio: '1' }}>
          <I className="h-1/2 w-1/2" style={{ color }} />
        </span>
      ))}
    </div>
  )
}
