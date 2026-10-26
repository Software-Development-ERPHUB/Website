/**
 * PRODUCTS — ready-made applications shown to clients on /client-demo.
 *
 * Each product's clickable demo lives in public/demo/<slug>/index.html and is
 * opened through /client-demo/<slug>, so the client never sees a file name.
 * To add or replace a demo: drop the HTML in public/demo/<slug>/index.html.
 *
 *   status: 'live'   — demo hosted elsewhere (`liveUrl`), opens in a new tab
 *           'demo'   — interactive HTML demo in public/demo/<slug>/
 *           'soon'   — placeholder demo page until the real one is ready
 */

export const PRODUCT_CATEGORIES = [
  {
    id: 'hrms',
    title: 'HRMS',
    full: 'Human Resource Management',
    icon: 'Users',
    color: '#1D5FD1',
    gradient: 'linear-gradient(135deg,#0B3A8C 0%,#3686FC 60%,#7FB2FF 100%)',
    summary: 'Run your people operations end to end: attendance, payroll, performance and results tracking.',
  },
  {
    id: 'finance',
    title: 'Finance',
    full: 'Finance & Accounts',
    icon: 'Wallet',
    color: '#047A66',
    gradient: 'linear-gradient(135deg,#064E3B 0%,#049D83 60%,#34D399 100%)',
    summary: 'Accounting, billing, expenses and budgets in one place, with approvals and audit trails built in.',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    full: 'Manufacturing & Sales',
    icon: 'Factory',
    color: '#B9530B',
    gradient: 'linear-gradient(135deg,#7C2D12 0%,#FE8428 60%,#FDBA74 100%)',
    summary: 'From the first customer enquiry to the purchase order, with safety and compliance on every site.',
  },
]

export const PRODUCTS = [
  // ── HRMS ──
  {
    slug: 'attendance-payroll',
    category: 'hrms',
    name: 'Attendance & Payroll',
    code: 'AttendPay',
    icon: 'Timer',
    status: 'demo',
    tagline: 'Biometric attendance to bank-ready payroll in one flow.',
    description: 'Capture attendance from biometric devices, manage shifts and leave, then run payroll with statutory reports and an employee self-service app.',
    features: ['Attendance & shifts', 'Leave management', 'Biometric devices', 'Payroll run', 'Statutory reports', 'Employee app (ESS)', 'AI assistant'],
  },
  {
    slug: 'kra-kpi',
    aliases: ['kpi', 'kri'], // old links from when these were separate apps
    category: 'hrms',
    name: 'KRA & KPI Performance',
    code: 'PMS',
    icon: 'Target',
    status: 'demo',
    tagline: 'Goals, scorecards and appraisals in one performance system.',
    description: 'Cascade company goals into KRAs and KPIs for every role, score them each cycle with self, manager and 360° reviews, then calibrate ratings with clear rules.',
    features: ['KRA & KPI goal sheets', 'Weighted scorecards', 'Self & manager review', '360° feedback', 'Competency assessment', 'Calibration', 'Balanced Scorecard'],
  },

  // ── Finance ──
  {
    slug: 'accounts',
    category: 'finance',
    name: 'Accounts & General Ledger',
    code: 'Accounts',
    icon: 'BookOpen',
    status: 'soon',
    tagline: 'Double-entry books with GST built in.',
    description: 'Chart of accounts, journals, ledgers and trial balance, with GST-ready vouchers and period closing.',
    features: ['Chart of accounts', 'Vouchers & journals', 'GST', 'Trial balance', 'P&L and balance sheet'],
  },
  {
    slug: 'billing',
    category: 'finance',
    name: 'Billing & Invoicing',
    code: 'Billing',
    icon: 'Receipt',
    status: 'soon',
    tagline: 'Raise invoices, follow up, get paid.',
    description: 'Create quotations and invoices, track receivables, send reminders and reconcile customer payments.',
    features: ['Quotations', 'GST invoices', 'Receivables', 'Payment reminders', 'Customer statements'],
  },
  {
    slug: 'expenses',
    category: 'finance',
    name: 'Expense & Claims',
    code: 'Expense',
    icon: 'CreditCard',
    status: 'soon',
    tagline: 'Employee claims with receipts and approvals.',
    description: 'Employees submit travel and expense claims with receipts; managers approve and finance reimburses on schedule.',
    features: ['Claim submission', 'Receipt upload', 'Approval flow', 'Policy limits', 'Reimbursement'],
  },
  {
    slug: 'budget',
    category: 'finance',
    name: 'Budget & Cost Control',
    code: 'Budget',
    icon: 'PieChart',
    status: 'soon',
    tagline: 'Plan budgets and watch actuals against them.',
    description: 'Set budgets by department or project and compare them with actual spend as it happens.',
    features: ['Budget planning', 'Cost centres', 'Budget vs actual', 'Overspend alerts', 'Forecasts'],
  },

  // ── Manufacturing ──
  {
    slug: 'crm',
    category: 'manufacturing',
    name: 'CRM',
    code: 'CRM',
    icon: 'Handshake',
    status: 'live',
    liveUrl: 'https://demo1.voltechgroup.com',
    tagline: 'Leads, enquiries and follow-ups for your sales team.',
    description: 'Capture leads and enquiries, track every follow-up, prepare quotations and see the full sales pipeline in one view.',
    features: ['Leads & enquiries', 'Follow-ups', 'Quotations', 'Sales pipeline', 'Reports'],
  },
  {
    slug: 'procurement',
    category: 'manufacturing',
    name: 'Procurement',
    code: 'ProcureX',
    icon: 'ShoppingCart',
    status: 'demo',
    tagline: 'Indent to purchase order with smart quotation comparison.',
    description: 'Raise indents and requisitions, send RFQs to vendors, compare quotations with AI help and issue approved purchase orders.',
    features: ['Indents & requisitions', 'RFQ / enquiry', 'Quotation comparison', 'Purchase orders', 'Vendor & item master', 'Approval workflow', 'Users & roles', 'Reports'],
  },
  {
    slug: 'ehs',
    category: 'manufacturing',
    name: 'EHS Management',
    code: 'EHS',
    icon: 'HardHat',
    status: 'demo',
    tagline: 'Safety, health and environment compliance for every site.',
    description: 'Report and investigate incidents, issue work permits, run audits and inspections, track PPE, training and legal licences, all with corrective actions to closure.',
    features: ['Incident reporting', 'Work permits', 'HIRA & JSA', 'Audits & inspections', 'PPE & safety assets', 'Training', 'Legal register', 'Reports & MIS'],
  },
  {
    slug: 'ehs-2',
    category: 'manufacturing',
    name: 'EHS 2 — HSE Platform',
    code: 'EHS 2',
    icon: 'HardHat',
    status: 'demo',
    tagline: 'The second-generation health, safety and environment platform.',
    description: 'A newer HSE platform across companies, divisions and sites: set up masters, assess risk with HIRA and JSA, run training, issue work permits and track audits and inspections.',
    features: ['Master setup', 'HIRA & risk registers', 'Training management', 'Work permits', 'Audit & inspection', 'Dashboard'],
  },
]

export const productsIn = (categoryId) => PRODUCTS.filter((p) => p.category === categoryId)
export const findProduct = (slug) => PRODUCTS.find((p) => p.slug === slug || p.aliases?.includes(slug))

/** Where a product's card button goes. Live products open their own site. */
export const productHref = (p) => (p.status === 'live' ? p.liveUrl : `/client-demo/${p.slug}`)
