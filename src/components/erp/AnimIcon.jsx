import {
  Zap, Wrench, Monitor, Lock, HardDrive, Link2, Globe, Settings, Microscope, Building2,
  Users, Factory, ShieldCheck, Megaphone, BarChart3, Briefcase, Wallet, Palmtree, Star,
  ClipboardList, HeartPulse, Printer, Timer, FolderOpen, Award, CheckCircle2, HardHat, Pin,
  Palette, Plane, Truck, Handshake, Database, Tag, Search, Smartphone, Map, Bot, Eye,
  TrendingUp, TrendingDown, FileText, Earth, RefreshCw, Target, MapPin, Mail, Rocket, User,
  Trophy, Cog, Sparkles,
} from 'lucide-react'

/*
  Emoji -> lucide icon + default animation.
  Data files (companies.js etc.) still use emoji, this map converts them
  so no data needs to change.
  anim: pop | spin | bounce | wiggle | pulse | float | swing | nudge
*/
const MAP = {
  '⚡': [Zap, 'pulse'],        '🔧': [Wrench, 'wiggle'],   '🖥': [Monitor, 'pop'],
  '🔐': [Lock, 'swing'],       '💾': [HardDrive, 'pop'],   '🔗': [Link2, 'wiggle'],
  '🌐': [Globe, 'spin'],       '⚙': [Settings, 'spin'],    '🔬': [Microscope, 'pop'],
  '🏢': [Building2, 'bounce'], '👥': [Users, 'bounce'],    '🏭': [Factory, 'pop'],
  '🛡': [ShieldCheck, 'pop'],  '📢': [Megaphone, 'wiggle'],'📊': [BarChart3, 'bounce'],
  '💼': [Briefcase, 'swing'],  '💰': [Wallet, 'pop'],      '🏖': [Palmtree, 'swing'],
  '⭐': [Star, 'spin'],        '📋': [ClipboardList, 'pop'],'🏥': [HeartPulse, 'pulse'],
  '🖨': [Printer, 'bounce'],   '⏱': [Timer, 'wiggle'],     '📁': [FolderOpen, 'pop'],
  '🏆': [Trophy, 'swing'],     '✅': [CheckCircle2, 'pop'], '🦺': [HardHat, 'bounce'],
  '📌': [Pin, 'swing'],        '🎨': [Palette, 'wiggle'],  '✈': [Plane, 'nudge'],
  '🚚': [Truck, 'nudge'],      '🤝': [Handshake, 'pulse'], '🗄': [Database, 'bounce'],
  '🏷': [Tag, 'swing'],        '🔍': [Search, 'wiggle'],   '📱': [Smartphone, 'wiggle'],
  '🗺': [Map, 'pop'],          '🤖': [Bot, 'bounce'],      '👁': [Eye, 'pulse'],
  '📈': [TrendingUp, 'nudge'], '📉': [TrendingDown, 'nudge'],'📄': [FileText, 'pop'],
  '🌍': [Earth, 'spin'],       '🔄': [RefreshCw, 'spin'],  '🎯': [Target, 'pulse'],
  '📍': [MapPin, 'bounce'],    '📧': [Mail, 'wiggle'],     '✉': [Mail, 'wiggle'],
  '🚀': [Rocket, 'float'],     '👤': [User, 'bounce'],     '🔒': [Lock, 'swing'],
  '✨': [Sparkles, 'pulse'],   '🎖': [Award, 'swing'],
}

const clean = s => (typeof s === 'string' ? s.replace(/\uFE0F/g, '').trim() : s)

export function resolveIcon(icon) {
  if (!icon) return [Cog, 'spin']
  if (typeof icon !== 'string') return [icon, 'pop']
  return MAP[clean(icon)] || [Sparkles, 'pulse']
}

/**
 * <AnimIcon icon="⚙️" />            -> lucide Settings, spins on hover of any .ia ancestor
 * <AnimIcon icon={Rocket} always /> -> animates continuously
 */
export function AnimIcon({ icon, size = 20, color = 'currentColor', anim, always = false, strokeWidth = 2, style, className = '' }) {
  const [Cmp, def] = resolveIcon(icon)
  const a = anim || def
  return (
    <span className={`ai ai-${a}${always ? ' ai-always' : ''} ${className}`} style={{ display: 'inline-flex', lineHeight: 0, ...style }} aria-hidden="true">
      <Cmp size={size} color={color} strokeWidth={strokeWidth} />
    </span>
  )
}

/** Rounded tile with icon inside — the standard icon container across the site */
export function IconTile({ icon, size = 44, iconSize, color = 'var(--g1)', bg, anim, always, radius = 12, style }) {
  return (
    <div className="icon-tile" style={{
      width: size, height: size, borderRadius: radius, flexShrink: 0,
      background: bg || `color-mix(in srgb, ${color} 11%, #fff)`,
      border: `1px solid color-mix(in srgb, ${color} 22%, transparent)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', ...style,
    }}>
      <AnimIcon icon={icon} size={iconSize || Math.round(size * 0.46)} color={color} anim={anim} always={always} />
    </div>
  )
}

export default AnimIcon
