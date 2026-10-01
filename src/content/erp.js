/**
 * ERP PORTFOLIO CONTENT
 * ------------------------------------------------------------------
 * The in-house ERP work the team built for Voltech Group (2015 → today).
 * Company + application data lives in src/data/companies.js.
 *
 * ERP_CONFIG controls what is shown publicly:
 *   showLoginLinks — "Open login page" buttons on application cards
 *   showUserCounts — user numbers on cards and stats
 * Set either to false if management does not want them on the public site.
 */
import { Layers, Palette, Calculator, Truck, Users, Handshake, UserCog, Database, ShieldCheck, Boxes, Smartphone } from 'lucide-react'
import webVg from '../assets/img/site-vg.webp'
import webVmcl from '../assets/img/site-vmcl.webp'
import webVipra from '../assets/img/site-vipra.webp'
import webBliss from '../assets/img/site-bliss.webp'

export const ERP_CONFIG = {
  showLoginLinks: true,
  showUserCounts: true,
  auditUrl: 'https://vmsc.voltechgroup.com/',
}

/** Technology used to build the group HRMS. */
export const HRMS_TECH = ['React', 'Node.js', 'Express.js', 'MySQL']

export const ERP_PRODUCTS = [
  { code: 'Voltech ERP', color: '#007438', full: 'Voltech ERP — Full Suite', icon: Layers, anim: 'pop' },
  { code: 'VDMS', color: '#2563eb', full: 'Design Management System', icon: Palette, anim: 'wiggle' },
  { code: 'VPMT', color: '#7c3aed', full: 'Project Cost Management', icon: Calculator, anim: 'bounce' },
  { code: 'Prime SCM', color: '#0891b2', full: 'Prime Supply Chain Management', icon: Truck, anim: 'nudge' },
  { code: 'HRMS', color: '#16a34a', full: 'HR Management System', icon: Users, anim: 'bounce' },
  { code: 'CRM', color: '#dc2626', full: 'Customer Relationship Management', icon: Handshake, anim: 'pulse' },
  { code: 'EMS', color: '#0ea5e9', full: 'Employee Management System', icon: UserCog, anim: 'spin' },
  { code: 'IMS', color: '#a855f7', full: 'Information Management System', icon: Database, anim: 'bounce' },
  { code: 'AUDIT', color: '#059669', full: 'Audit Management System', icon: ShieldCheck, anim: 'pop' },
  { code: 'VAMS', color: '#d97706', full: 'Asset Management System', icon: Boxes, anim: 'swing' },
  { code: 'VBMS', color: '#283593', full: 'Job & Field Workforce Management', icon: Smartphone, anim: 'wiggle' },
]

export const ERP_HIGHLIGHTS = [
  'Dedicated ERP development for Voltech Group since 2015',
  '20+ ERP applications developed and deployed',
  'Every application actively running in production',
  'Continuous maintenance and enhancements',
  'Secure, optimised database management',
  'Reliable, scalable, business-focused solutions',
  'A team committed to long-term support',
]

export const ERP_FEATURES = [
  { icon: '⚡', title: 'Live and proven', body: 'Every application is production-deployed with real users — not a demo or prototype.', color: '#007438' },
  { icon: '🔧', title: 'Industry specific', body: 'Built for electrical engineering, manufacturing, HR services, instrumentation and facility management.', color: '#0891b2' },
  { icon: '🖥️', title: 'Dedicated servers, 24×7', body: 'Applications run on dedicated servers with round-the-clock uptime and no third-party dependency.', color: '#7c3aed' },
  { icon: '🔐', title: 'Security and privacy', body: 'Role-based access control, encrypted connections and approval trails where they matter.', color: '#dc2626' },
  { icon: '💾', title: 'Backups you can trust', body: 'Scheduled cron-job backups and structured data models with complete audit trails.', color: '#d97706' },
  { icon: '🔗', title: 'One connected suite', body: 'CRM to supply chain, HR to finance and audit — connected across every group company.', color: '#059669' },
]

export const SECTORS = [
  { icon: '⚡', title: 'Engineering', body: 'Transformers, switchgear & electrical products', color: '#007438' },
  { icon: '🏭', title: 'Manufacturing', body: 'Power equipment manufacturing & supply chain', color: '#0891b2' },
  { icon: '🔬', title: 'Instrumentation', body: 'Precision instrumentation & automation', color: '#7c3aed' },
  { icon: '👥', title: 'HR services', body: 'Staffing, payroll & workforce management', color: '#dc2626' },
  { icon: '🛡️', title: 'Management', body: 'Facility management & security services', color: '#d97706' },
  { icon: '🔧', title: 'Operation & maintenance', body: 'Industrial O&M and facility operations', color: '#0f766e' },
]

export const HRMS_MODULES = [
  { icon: '📢', label: 'Post recruitment', desc: 'Job posting, multi-channel distribution and applicant tracking with pipeline view' },
  { icon: '📊', label: 'MIS reports', desc: 'Headcount, attrition and HR cost reports' },
  { icon: '💼', label: 'Recruitment', desc: 'Shortlisting, interview scheduling and offer letters' },
  { icon: '💰', label: 'Payroll & payslip', desc: 'Automated payroll, tax calculation and payslip email dispatch' },
  { icon: '🏖️', label: 'Leave management', desc: 'Leave requests, approvals, balances and holiday calendar' },
  { icon: '⭐', label: 'Performance & bonus', desc: 'KPI-based appraisal with bonus computation and approvals' },
  { icon: '📋', label: 'Statutory compliance', desc: 'PF, ESI, professional tax and TDS with deadline reminders' },
  { icon: '🏥', label: 'Insurance', desc: 'Group health and life insurance, claims and renewal alerts' },
  { icon: '🖨️', label: 'Stationery', desc: 'Requisition, stock tracking, approval and vendor management' },
  { icon: '⏱️', label: 'Attendance', desc: 'Biometric and web attendance, shifts, overtime and regularisation' },
]

export const AUDIT_MODULES = [
  { icon: '📋', label: 'Audit scheduling', desc: 'Plan internal and external audits with automated reminders' },
  { icon: '📁', label: 'Document management', desc: 'Version-controlled documents with approval workflow' },
  { icon: '🏆', label: 'ISO certification', desc: 'Track and maintain ISO certificates across group companies' },
  { icon: '✅', label: 'Compliance', desc: 'Real-time dashboards with traffic-light status per company' },
  { icon: '🦺', label: 'Safety management', desc: 'Incidents, near-miss reports and corrective actions' },
  { icon: '📌', label: 'Non-conformance', desc: 'Log, assign, track and close NCRs with a full audit trail' },
]

export const VOMS_MODULES = ['Work order management', 'Preventive maintenance scheduling', 'Asset health tracking', 'Field engineer dispatch', 'SLA & compliance reporting', 'Equipment downtime analytics']

export const GROUP_SITES = [
  {
    id: 'vg', name: 'Voltech Group', url: 'https://voltechgroup.com/', thumb: webVg,
    tagline: 'Excellence in engineering products & services',
    desc: 'The main corporate website of Voltech Group — electrical engineering products, global presence, careers and community initiatives. The flagship digital identity of the group.',
    color: '#007438', tags: ['Corporate', 'Engineering', 'Global'],
    seoTitle: 'Voltech Group | Engineering Products & Services',
    seoKw: 'Voltech, electrical engineering, transformer, switchgear, Chennai',
  },
  {
    id: 'vmcl', name: 'Voltech Manufacturing Company', url: 'https://products.voltechgroup.com/', thumb: webVmcl,
    tagline: 'Precision manufacturing & transformer solutions',
    desc: 'Product website for power transformers, switchgear, distribution transformers and control panels — with a product catalogue, quote requests and technical specifications.',
    color: '#0891b2', tags: ['Manufacturing', 'Transformers', 'Products'],
    seoTitle: 'VMCL | Transformers & Switchgear | Voltech Group',
    seoKw: 'transformer, switchgear, distribution transformer, Chennai manufacturer',
  },
  {
    id: 'vipra', name: 'Voltech Vipra Engineers', url: 'https://voltechvipra.com/', thumb: webVipra,
    tagline: 'Intelligent instrumentation solutions',
    desc: 'Precision instrumentation, fire solutions, automation panel design and end-to-end project execution for industrial facilities across India.',
    color: '#7c3aed', tags: ['Instrumentation', 'Automation', 'Fire solutions'],
    seoTitle: 'Voltech Vipra | Instrumentation & Automation | Chennai',
    seoKw: 'instrumentation, fire solutions, automation panel, Vipra, Voltech',
  },
  {
    id: 'bliss', name: 'Voltech Bliss Management Services', url: 'https://voltechvipra.com/bliss/', thumb: webBliss,
    tagline: 'Facility management & security solutions',
    desc: 'Facility management, security guard services, housekeeping, technical services and screening solutions for corporate and industrial clients.',
    color: '#d97706', tags: ['Facility management', 'Security', 'HR services'],
    seoTitle: 'Voltech Bliss | Facility Management & Security | Chennai',
    seoKw: 'facility management, security services, housekeeping, Bliss, Voltech',
  },
]

export const WEB_ANALYTICS = [
  { icon: '👥', label: 'Monthly users', value: '12,400+', color: '#007438' },
  { icon: '📄', label: 'Pages indexed', value: '280+', color: '#0891b2' },
  { icon: '🌍', label: 'Countries reached', value: '18+', color: '#7c3aed' },
  { icon: '📈', label: 'Organic sessions', value: '8,200+', color: '#d97706' },
]

export const GA_FEATURES = [
  { icon: '👥', l: 'Real-time active users', d: 'How many people are on each website right now' },
  { icon: '🌍', l: 'Geographic distribution', d: 'Visitors by country, city and language' },
  { icon: '📱', l: 'Device & browser reports', d: 'Desktop, mobile and tablet breakdown' },
  { icon: '🔄', l: 'Traffic sources', d: 'Organic, direct, referral and social traffic' },
  { icon: '📉', l: 'Engagement', d: 'Bounce rate, scroll depth and page-level engagement' },
  { icon: '🎯', l: 'Conversions', d: 'Enquiry form submissions and contact visits as goals' },
]

export const SEO_FEATURES = [
  { icon: '🔍', t: 'On-page SEO', d: 'Meta titles, descriptions, canonical tags, heading hierarchy and keyword optimisation.' },
  { icon: '📱', t: 'Mobile responsive', d: 'Optimised touch targets and viewport settings on every page.' },
  { icon: '⚡', t: 'Page speed', d: 'Lazy loading, compressed images, caching and minified assets for fast Core Web Vitals.' },
  { icon: '🗺️', t: 'XML sitemap', d: 'Sitemaps submitted to Google Search Console for complete indexing.' },
  { icon: '🤖', t: 'Robots.txt', d: 'Guides crawlers and keeps backend URLs out of search results.' },
  { icon: '🔗', t: 'Internal linking', d: 'Cross-linking between group websites to build domain authority.' },
  { icon: '📊', t: 'Google Analytics 4', d: 'Sessions, users and conversions tracked on every site.' },
  { icon: '👁️', t: 'Live user tracking', d: 'Active visitors, location, device and page behaviour in real time.' },
  { icon: '🔐', t: 'SSL & HTTPS', d: 'Every site runs on HTTPS — a ranking factor and security essential.' },
]
