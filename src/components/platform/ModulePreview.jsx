import { Bell, Search, AlertTriangle, CheckCircle2, Clock, TrendingUp, TrendingDown } from 'lucide-react'
import { useInView, Counter } from './shared'

/**
 * Dashboard mockups for the three modules, drawn in HTML/SVG so they stay
 * crisp and animate as they scroll into view. All figures are illustrative
 * sample data — never real Voltech or customer numbers.
 */

export function BrowserFrame({ url, color, children, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_40px_80px_-30px_rgb(16_35_63/.55)] ${className}`}>
      <div className="flex items-center gap-3 border-b border-line bg-paper px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-white px-3 py-1 text-[11px] text-muted ring-1 ring-line">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} aria-hidden="true" />
          <span className="truncate">{url}</span>
        </span>
      </div>
      {children}
    </div>
  )
}

function Shell({ m, nav, active, children }) {
  return (
    <div className="flex min-h-[340px] text-[12px] text-ink">
      <aside className="hidden w-[150px] shrink-0 flex-col gap-0.5 p-3 text-white sm:flex" style={{ background: m.gradient }}>
        <p className="mb-3 font-display text-[13px] font-bold tracking-wide">{m.name}</p>
        {nav.map((n) => (
          <span key={n} className={`rounded-md px-2 py-1.5 ${n === active ? 'bg-white/20 font-semibold' : 'text-white/75'}`}>{n}</span>
        ))}
      </aside>
      <div className="min-w-0 flex-1 bg-[#F8FAFC] p-3 sm:p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex flex-1 items-center gap-1.5 rounded-md bg-white px-2 py-1.5 text-muted ring-1 ring-line"><Search size={12} aria-hidden="true" />Search</span>
          <Bell size={14} className="text-muted" aria-hidden="true" />
          <span className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: m.color }}>VA</span>
        </div>
        {children}
      </div>
    </div>
  )
}

function Stat({ label, value, run, color, prefix, suffix, decimals, trend }) {
  return (
    <div className="rounded-lg bg-white p-2.5 ring-1 ring-line">
      <p className="truncate text-[10.5px] text-muted">{label}</p>
      <p className="mt-0.5 font-display text-[17px] font-semibold" style={{ color }}><Counter to={value} run={run} prefix={prefix} suffix={suffix} decimals={decimals} /></p>
      {trend && <p className={`mt-0.5 flex items-center gap-0.5 text-[10px] ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{trend > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}{Math.abs(trend)}% vs last month</p>}
    </div>
  )
}

function Bars({ data, color, height = 90 }) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {data.map((v, i) => (
        <span key={i} className="bar-grow flex-1 rounded-t" style={{ height: `${(v / max) * 100}%`, background: color, opacity: 0.35 + (v / max) * 0.65, transitionDelay: `${i * 45}ms` }} />
      ))}
    </div>
  )
}

function Line({ data, color, data2, color2, height = 90 }) {
  const w = 300
  const max = Math.max(...data, ...(data2 || []))
  const pts = (d) => d.map((v, i) => `${(i / (d.length - 1)) * w},${height - (v / max) * (height - 8)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none" aria-hidden="true">
      <polyline points={`0,${height} ${pts(data)} ${w},${height}`} fill={color} opacity=".1" />
      <polyline points={pts(data)} fill="none" stroke={color} strokeWidth="2.5" className="line-draw" vectorEffect="non-scaling-stroke" />
      {data2 && <polyline points={pts(data2)} fill="none" stroke={color2} strokeWidth="2" strokeDasharray="4 4" className="line-draw" vectorEffect="non-scaling-stroke" />}
    </svg>
  )
}

function Meter({ label, value, color }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[10.5px]"><span className="text-muted">{label}</span><span className="font-semibold">{value}%</span></div>
      <div className="h-1.5 overflow-hidden rounded-full bg-line"><div className="meter-fill h-full rounded-full" style={{ width: `${value}%`, background: color }} /></div>
    </div>
  )
}

function Card({ title, children, className = '' }) {
  return <div className={`rounded-lg bg-white p-3 ring-1 ring-line ${className}`}><p className="mb-2 text-[11px] font-semibold">{title}</p>{children}</div>
}

export function HrmsDashboard({ m }) {
  const [ref, run] = useInView()
  return (
    <div ref={ref} className={run ? 'is-in' : ''}>
      <Shell m={m} active="Overview" nav={['Overview', 'Employees', 'Attendance', 'Leave', 'Payroll', 'Performance', 'Recruitment', 'Training', 'Compliance']}>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <Stat label="Employees" value={1248} run={run} color={m.text} trend={3} />
          <Stat label="Present today" value={94.2} decimals={1} suffix="%" run={run} color={m.text} />
          <Stat label="On leave" value={37} run={run} color={m.text} />
          <Stat label="Payroll (₹ lakh)" value={386.4} decimals={1} run={run} color={m.text} trend={2} />
        </div>
        <div className="mt-2 grid gap-2 lg:grid-cols-[1.4fr_1fr]">
          <Card title="Attendance — last 14 days"><Bars color={m.color} data={[88, 91, 90, 94, 93, 72, 60, 92, 95, 94, 96, 93, 70, 62]} /></Card>
          <Card title="KPI achievement by department">
            <div className="space-y-2">
              <Meter label="Production" value={92} color={m.color} /><Meter label="Sales" value={84} color={m.color} />
              <Meter label="Finance" value={88} color={m.color} /><Meter label="Projects" value={76} color={m.color} />
            </div>
          </Card>
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          <Card title="Open positions"><p className="font-display text-lg font-semibold">18</p><p className="text-[10.5px] text-muted">42 candidates in interview</p></Card>
          <Card title="Training this month"><p className="font-display text-lg font-semibold">9 sessions</p><p className="text-[10.5px] text-muted">312 seats booked</p></Card>
          <Card title="Compliance"><p className="flex items-center gap-1 font-semibold text-emerald-700"><CheckCircle2 size={13} />PF & ESI filed</p><p className="text-[10.5px] text-muted">TDS due in 6 days</p></Card>
        </div>
      </Shell>
    </div>
  )
}

export function FinanceDashboard({ m }) {
  const [ref, run] = useInView()
  return (
    <div ref={ref} className={run ? 'is-in' : ''}>
      <Shell m={m} active="Overview" nav={['Overview', 'General Ledger', 'Payables', 'Receivables', 'Budgets', 'Cash Flow', 'Fixed Assets', 'Reports', 'Tax']}>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <Stat label="Revenue (₹ cr)" value={48.6} decimals={1} run={run} color={m.text} trend={6} />
          <Stat label="Expenses (₹ cr)" value={39.2} decimals={1} run={run} color={m.text} trend={-2} />
          <Stat label="Cash in bank (₹ cr)" value={12.8} decimals={1} run={run} color={m.text} />
          <Stat label="Budget used" value={71} suffix="%" run={run} color={m.text} />
        </div>
        <div className="mt-2 grid gap-2 lg:grid-cols-[1.4fr_1fr]">
          <Card title="Revenue vs expenses — 12 months">
            <Line color={m.color} color2="#94A3B8" data={[30, 34, 33, 38, 41, 39, 44, 46, 45, 49, 52, 55]} data2={[28, 29, 31, 33, 32, 35, 36, 37, 39, 38, 40, 42]} />
            <p className="mt-1 flex gap-3 text-[10px] text-muted"><span className="flex items-center gap-1"><span className="h-0.5 w-3" style={{ background: m.color }} />Revenue</span><span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-slate-400" />Expenses</span></p>
          </Card>
          <Card title="Budget utilisation">
            <div className="space-y-2">
              <Meter label="Operations" value={78} color={m.color} /><Meter label="Projects" value={64} color={m.color} />
              <Meter label="Admin" value={52} color={m.color} /><Meter label="Capex" value={41} color={m.color} />
            </div>
          </Card>
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          <Card title="Receivables"><p className="font-display text-lg font-semibold">₹6.4 cr</p><p className="text-[10.5px] text-muted">₹1.1 cr over 60 days</p></Card>
          <Card title="Payables"><p className="font-display text-lg font-semibold">₹4.9 cr</p><p className="text-[10.5px] text-muted">23 bills due this week</p></Card>
          <Card title="Reports"><p className="flex items-center gap-1 font-semibold" style={{ color: m.text }}><CheckCircle2 size={13} />Q2 P&L ready</p><p className="text-[10.5px] text-muted">Balance sheet as of today</p></Card>
        </div>
      </Shell>
    </div>
  )
}

export function MfgDashboard({ m }) {
  const [ref, run] = useInView()
  return (
    <div ref={ref} className={run ? 'is-in' : ''}>
      <Shell m={m} active="Overview" nav={['Overview', 'Production', 'Work Orders', 'Inventory', 'Purchase', 'Quality', 'Maintenance', 'Costing', 'Analytics']}>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <Stat label="Output today (units)" value={1836} run={run} color={m.text} trend={4} />
          <Stat label="Line efficiency (OEE)" value={82.5} decimals={1} suffix="%" run={run} color={m.text} />
          <Stat label="First-pass yield" value={97.1} decimals={1} suffix="%" run={run} color={m.text} />
          <Stat label="Open POs" value={64} run={run} color={m.text} />
        </div>
        <div className="mt-2 grid gap-2 lg:grid-cols-[1.4fr_1fr]">
          <Card title="Production vs plan — this week">
            <div className="relative overflow-hidden">
              <Bars color={m.color} data={[82, 90, 96, 88, 101, 94, 99]} />
              <span className="scan-line pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/50 to-transparent" aria-hidden="true" />
            </div>
          </Card>
          <Card title="Inventory status">
            <div className="space-y-2">
              <Meter label="Copper winding wire" value={68} color={m.color} /><Meter label="CRGO steel" value={34} color="#F59E0B" />
              <Meter label="Transformer oil" value={81} color={m.color} /><Meter label="Bushings" value={22} color="#EF4444" />
            </div>
          </Card>
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          <Card title="Maintenance alerts"><p className="flex items-center gap-1 font-semibold text-amber-700"><AlertTriangle size={13} />2 machines due</p><p className="text-[10.5px] text-muted">CNC-04 bearing check</p></Card>
          <Card title="Material tracking"><p className="flex items-center gap-1 font-semibold" style={{ color: m.text }}><Clock size={13} />11 in transit</p><p className="text-[10.5px] text-muted">3 arriving today</p></Card>
          <Card title="Quality"><p className="flex items-center gap-1 font-semibold text-emerald-700"><CheckCircle2 size={13} />0.9% rejection</p><p className="text-[10.5px] text-muted">Down from 1.4%</p></Card>
        </div>
      </Shell>
    </div>
  )
}

export function ModuleDashboard({ m }) {
  if (m.id === 'hrms') return <HrmsDashboard m={m} />
  if (m.id === 'finance') return <FinanceDashboard m={m} />
  return <MfgDashboard m={m} />
}

/** Compact floating preview card used in hero sections. */
export function MiniPreview({ m }) {
  const rows = {
    hrms: [['Present today', '94%'], ['Payroll run', 'Ready'], ['Leave requests', '12']],
    finance: [['Revenue MTD', '₹4.2 cr'], ['Budget used', '71%'], ['Receivables', '₹6.4 cr']],
    manufacturing: [['Output today', '1,836'], ['OEE', '82.5%'], ['Open POs', '64']],
  }[m.id]
  const bars = { hrms: [6, 8, 7, 9, 8, 9], finance: [4, 5, 6, 6, 8, 9], manufacturing: [7, 8, 6, 9, 9, 8] }[m.id]
  return (
    <div className="w-[230px] rounded-2xl border border-white/15 bg-white/[.08] p-4 text-white shadow-[0_30px_60px_-20px_rgb(0_0_0/.6)] backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: m.color, boxShadow: `0 0 12px ${m.color}` }} />
        <span className="font-display text-sm font-semibold">{m.name}</span>
        <span className="ml-auto text-[10px] text-white/50">Live preview</span>
      </div>
      <dl className="mt-3 space-y-1.5 text-[12px]">
        {rows.map(([k, v]) => <div key={k} className="flex justify-between"><dt className="text-white/60">{k}</dt><dd className="font-semibold">{v}</dd></div>)}
      </dl>
      <div className="mt-3 flex h-8 items-end gap-1" aria-hidden="true">
        {bars.map((b, i) => <span key={i} className="flex-1 rounded-sm" style={{ height: `${b * 10}%`, background: m.color, opacity: 0.45 + i * 0.09 }} />)}
      </div>
    </div>
  )
}
