/**
 * ENTERPRISE PLATFORM — single source for the three Voltech modules.
 * The home page, /platform, /solutions/<id>, the header mega menu and the
 * footer all read from here, so names, colours, routes and features stay
 * consistent. Colours are mirrored as CSS variables (--m-*) in index.css.
 *
 * `demos` are product slugs from content/products.js (the Client Demo page).
 * `standaloneUrl` stays empty until a separate deployment for that module
 * actually exists — do not fill it with a placeholder.
 */

export const PLATFORM = {
  brand: 'VOLTECH',
  identity: 'Integrated Enterprise Solutions',
  headline: ['One Enterprise.', 'Every Possibility.'],
  lead: 'From workforce management to financial intelligence and manufacturing excellence, bring your enterprise operations together on one powerful platform.',
  summary: 'Connect people, processes, finance and manufacturing through a unified enterprise platform designed to help businesses work smarter, operate efficiently and grow confidently.',
}

export const MODULES = [
  {
    id: 'hrms',
    name: 'HRMS',
    full: 'Human Resource Management',
    route: '/solutions/hrms',
    icon: 'Users',
    color: '#3686FC', // blue
    text: '#1D5FD1', // accessible text shade on white
    soft: '#EEF5FF',
    rgb: 'var(--m-hrms)',
    gradient: 'linear-gradient(135deg,#0B3A8C 0%,#3686FC 55%,#7FB2FF 100%)',
    tagline: 'People, managed beautifully.',
    description: 'Manage the complete employee lifecycle through one connected people-management platform.',
    emphasis: 'Workforce management',
    heroTitle: ['Your workforce,', 'one connected system.'],
    heroLead: 'From hiring to payroll and performance, HRMS brings every people process into one place your HR team and employees actually enjoy using.',
    previewLead: 'From attendance and leave to payroll and performance, HRMS brings everyday workforce processes into one connected experience.',
    features: [
      'Employee Management', 'Recruitment and Onboarding', 'Attendance and Leave', 'Payroll and Benefits',
      'Performance and KPIs', 'Training and Development', 'Employee Self-Service', 'Insurance and Statutory Compliance',
    ],
    capabilities: [
      { icon: 'UserPlus', title: 'Hire and onboard', body: 'Requisitions, candidate tracking, offer letters and day-one onboarding checklists.' },
      { icon: 'Fingerprint', title: 'Attendance and leave', body: 'Biometric and mobile punches, shifts, rosters, overtime and leave approvals.' },
      { icon: 'Wallet', title: 'Payroll and benefits', body: 'Salary structures, payroll runs, payslips, PF, ESI, PT and TDS with bank advice.' },
      { icon: 'Target', title: 'Performance and KPIs', body: 'KRA and KPI goal sheets, self and manager reviews, 360° feedback and calibration.' },
      { icon: 'GraduationCap', title: 'Training', body: 'Training calendars, attendance, feedback and skill records for every employee.' },
      { icon: 'Smartphone', title: 'Employee self-service', body: 'Payslips, leave, attendance and requests from a phone, without calling HR.' },
    ],
    benefits: ['Payroll that closes on time', 'Fewer manual HR queries', 'Statutory reports ready when due', 'One record for every employee'],
    demos: ['attendance-payroll', 'kra-kpi'],
    standaloneUrl: '',
  },
  {
    id: 'finance',
    name: 'Finance',
    full: 'Finance & Accounts',
    route: '/solutions/finance',
    icon: 'Landmark',
    color: '#049D83', // teal
    text: '#047A66',
    soft: '#E8F8F4',
    rgb: 'var(--m-finance)',
    gradient: 'linear-gradient(135deg,#064E3B 0%,#049D83 55%,#34D399 100%)',
    tagline: 'Clarity in every number.',
    description: 'Improve financial visibility, control costs and make better business decisions with connected finance operations.',
    emphasis: 'Financial control and reporting',
    heroTitle: ['Financial control,', 'in real time.'],
    heroLead: 'Ledgers, payables, receivables, budgets and reports in one system, so your finance team spends less time reconciling and more time advising.',
    previewLead: 'See revenue, spend, budgets and cash position in one view, with every figure traceable to the transaction behind it.',
    features: [
      'General Ledger', 'Accounts Payable and Receivable', 'Budgeting and Forecasting', 'Fixed Assets',
      'Financial Reporting', 'Tax and Compliance', 'Financial Analytics',
    ],
    capabilities: [
      { icon: 'BookOpen', title: 'General ledger', body: 'Chart of accounts, journals, period closing and multi-company books.' },
      { icon: 'ArrowLeftRight', title: 'Payables and receivables', body: 'Vendor bills, customer invoices, ageing, reminders and payment matching.' },
      { icon: 'PieChart', title: 'Budgeting and forecasting', body: 'Department and project budgets with live budget-versus-actual tracking.' },
      { icon: 'Building', title: 'Fixed assets', body: 'Asset register, depreciation schedules, transfers and disposals.' },
      { icon: 'FileBarChart', title: 'Financial reporting', body: 'Trial balance, P&L, balance sheet and cash flow at any date.' },
      { icon: 'Receipt', title: 'Tax and compliance', body: 'GST-ready vouchers and returns support with a complete audit trail.' },
    ],
    benefits: ['Faster month-end close', 'Budgets you can see being spent', 'Audit-ready records', 'Decisions based on current numbers'],
    demos: ['accounts', 'billing', 'expenses', 'budget'],
    standaloneUrl: '',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    full: 'Manufacturing Operations',
    route: '/solutions/manufacturing',
    icon: 'Factory',
    color: '#FE8428', // orange
    text: '#B9530B',
    soft: '#FFF3E8',
    rgb: 'var(--m-mfg)',
    gradient: 'linear-gradient(135deg,#7C2D12 0%,#FE8428 55%,#FDBA74 100%)',
    tagline: 'Production, perfectly in sync.',
    description: 'Connect production, inventory, quality and maintenance for efficient industrial operations.',
    emphasis: 'Production, inventory and operational performance',
    heroTitle: ['Every line, every part,', 'in sync.'],
    heroLead: 'Plan production, track inventory and purchases, control quality and keep equipment running, with live numbers from the shop floor.',
    previewLead: 'Watch output, stock, purchases, quality and maintenance alerts side by side, so problems surface before they stop the line.',
    features: [
      'Production Planning', 'Inventory Management', 'Procurement', 'Quality Management',
      'Equipment Maintenance', 'Shop Floor Operations', 'Production Costing', 'Operational Analytics',
    ],
    capabilities: [
      { icon: 'CalendarRange', title: 'Production planning', body: 'Work orders, capacity, schedules and material requirements.' },
      { icon: 'Boxes', title: 'Inventory', body: 'Stores, bins, batches, reorder levels and stock movements across sites.' },
      { icon: 'ShoppingCart', title: 'Procurement', body: 'Indents, RFQs, quotation comparison and purchase orders with approvals.' },
      { icon: 'BadgeCheck', title: 'Quality', body: 'Inspection plans, test results, non-conformance and corrective actions.' },
      { icon: 'Wrench', title: 'Maintenance', body: 'Preventive schedules, breakdown tickets and equipment history.' },
      { icon: 'HardHat', title: 'Shop floor and safety', body: 'Job progress, permits, incidents and EHS compliance on every site.' },
    ],
    benefits: ['Fewer stock-outs and surprises', 'On-time purchase orders', 'Quality issues caught early', 'Less unplanned downtime'],
    demos: ['procurement', 'ehs', 'crm'],
    standaloneUrl: '',
  },
]

export const findModule = (id) => MODULES.find((m) => m.id === id)

export const DEPLOYMENT = {
  integrated: {
    title: 'Integrated Enterprise Platform',
    body: 'Connect multiple Voltech business modules through a unified enterprise experience.',
    points: ['One sign-in and one user directory', 'Shared masters for employees, vendors and items', 'Cross-module reports and dashboards'],
  },
  standalone: {
    title: 'Standalone Application',
    body: 'Deploy an individual solution for organizations that need only HRMS, Finance or Manufacturing.',
    points: ['Start with the one module you need', 'Its own branding, users and data', 'Connect more modules later'],
  },
  note: 'Which data is shared, and how, depends on the modules you deploy and how they are configured for your organisation.',
}

/** Industries carousel. `photo` keys point to real Voltech Group images in content/images.js. */
export const INDUSTRY_SHOWCASE = [
  { id: 'manufacturing', title: 'Manufacturing', body: 'Production, stores, purchase and quality for plants that build transformers, panels and equipment.', photo: 'indManufacturing', to: '/industries' },
  { id: 'engineering', title: 'Engineering Services', body: 'Design, drawing and document control for engineering teams delivering to tight specifications.', photo: 'indEngineering', to: '/industries' },
  { id: 'projects', title: 'Project-Based Businesses', body: 'Project costing, site progress and billing milestones for EPC and contracting work.', photo: 'indProjects', to: '/industries' },
  { id: 'operations', title: 'Industrial Operations', body: 'Operations and maintenance, permits and safety for plants that run around the clock.', photo: 'indOperations', to: '/industries' },
  { id: 'shared', title: 'Corporate and Shared Services', body: 'HR, finance and audit run centrally for a group of companies.', photo: 'indShared', to: '/industries' },
]

export const BENEFITS = [
  { icon: 'Workflow', title: 'Integrated Business Processes', body: 'Work moves from HR to finance to the shop floor without re-keying the same data.' },
  { icon: 'LayoutGrid', title: 'Flexible Module Selection', body: 'Start with one module and add the next when your business is ready.' },
  { icon: 'Layers', title: 'Scalable Enterprise Architecture', body: 'Add companies, sites and users as you grow, on the same platform.' },
  { icon: 'Eye', title: 'Improved Operational Visibility', body: 'Dashboards that show what is happening today, not last month.' },
  { icon: 'GitBranch', title: 'Configurable Business Workflows', body: 'Approvals and rules set to the way your organisation already works.' },
  { icon: 'Boxes', title: 'One Product Portfolio', body: 'HR, finance and manufacturing needs met by one team and one product family.' },
]
