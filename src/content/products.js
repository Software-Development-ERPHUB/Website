/**
 * PRODUCTS — ready-made applications shown to clients on /products.
 *
 * Each product's clickable demo lives in public/demo/<slug>/index.html and is
 * opened through /products/<slug>/demo, so the client never sees a file name.
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
    color: '#007438',
    gradient: 'linear-gradient(135deg,#007438 0%,#38C66C 100%)',
    summary: 'Run your people operations end to end: attendance, payroll, performance and results tracking.',
  },
  {
    id: 'finance',
    title: 'Finance',
    full: 'Finance & Accounts',
    icon: 'Wallet',
    color: '#2B5B84',
    gradient: 'linear-gradient(135deg,#1E4466 0%,#4F8CC0 100%)',
    summary: 'Accounting, billing, expenses and budgets in one place, with approvals and audit trails built in.',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    full: 'Manufacturing & Sales',
    icon: 'Factory',
    color: '#B45309',
    gradient: 'linear-gradient(135deg,#9A3412 0%,#F59E0B 100%)',
    summary: 'From the first customer enquiry to the purchase order on the shop floor.',
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
    slug: 'kpi',
    category: 'hrms',
    name: 'KPI Management',
    code: 'KPI',
    icon: 'Target',
    status: 'soon',
    tagline: 'Set goals, track performance, review with evidence.',
    description: 'Define key performance indicators per role, collect monthly scores, and run appraisal reviews with manager and HR sign-off.',
    features: ['Goal library', 'Role-wise scorecards', 'Monthly reviews', 'Appraisal cycles', 'Dashboards'],
  },
  {
    slug: 'kri',
    category: 'hrms',
    name: 'KRI Management',
    code: 'KRI',
    icon: 'TrendingUp',
    status: 'soon',
    tagline: 'Measure the results that matter for every team.',
    description: 'Track key result indicators against targets for departments and individuals, with alerts when results drift off course.',
    features: ['Result targets', 'Department rollups', 'Threshold alerts', 'Trend reports', 'Action tracking'],
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
    features: ['Indents & requisitions', 'RFQ / enquiry', 'Quotation comparison', 'Purchase orders', 'Vendor & item master', 'Approvals', 'Reports'],
  },
]

export const productsIn = (categoryId) => PRODUCTS.filter((p) => p.category === categoryId)
export const findProduct = (slug) => PRODUCTS.find((p) => p.slug === slug)

/** Where a product's card button goes. Live products open their own site. */
export const productHref = (p) => (p.status === 'live' ? p.liveUrl : `/products/${p.slug}/demo`)
