import {
  Code2, LayoutTemplate, Globe, Boxes, PenTool, Smartphone, Plug, Cloud, Wrench, RefreshCw,
  Users, Truck, BarChart3, Handshake, FileText, Tag, ShieldCheck, Workflow, LayoutDashboard,
  Zap, Factory, Gauge, Building2, Briefcase, GraduationCap, HeartPulse, Layers, Lock, Database,
} from 'lucide-react'

/** Content files reference icons by these keys. Add new ones here. */
const MAP = {
  code: Code2, layout: LayoutTemplate, globe: Globe, boxes: Boxes, pen: PenTool,
  smartphone: Smartphone, plug: Plug, cloud: Cloud, wrench: Wrench, refresh: RefreshCw,
  users: Users, truck: Truck, chart: BarChart3, handshake: Handshake, file: FileText, tag: Tag,
  shield: ShieldCheck, workflow: Workflow, dashboard: LayoutDashboard, zap: Zap, factory: Factory,
  gauge: Gauge, building: Building2, briefcase: Briefcase, graduation: GraduationCap,
  heart: HeartPulse, layers: Layers, lock: Lock, database: Database,
}

export default function Icon({ name, size = 22, className = '', strokeWidth = 1.75 }) {
  const C = MAP[name] || Boxes
  return <C size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" focusable="false" />
}

/** Square icon tile used on cards. */
export function IconTile({ name, tone = 'brand', size = 'md' }) {
  const tones = {
    brand: 'bg-brand-soft text-brand',
    steel: 'bg-steel-soft text-steel',
    dark: 'bg-white/10 text-accent',
  }
  const s = size === 'sm' ? 'h-10 w-10' : 'h-12 w-12'
  return (
    <span className={`inline-flex ${s} shrink-0 items-center justify-center rounded-lg transition-colors duration-300 group-hover:bg-brand group-hover:text-white ${tones[tone]}`}>
      <Icon name={name} size={size === 'sm' ? 20 : 22} className="icon-anim" />
    </span>
  )
}
