/**
 * SUITES — how each product family is presented on /client-demo:
 * the suite is the trunk of a tree, every branch is a module that also
 * runs on its own (standalone). Branches are listed in the order work
 * flows through the business, start to end.
 *
 *   screens — keys from content/screens.js (first one is the main picture)
 *   demo    — product slug from content/products.js that opens this module
 */
export const SUITES = [
  {
    id: 'hrms',
    name: 'HRMS',
    full: 'Human Resource Management',
    color: '#0070AD',
    text: '#005A8B',
    soft: '#E8F4FC',
    icon: 'Users',
    hero: 'hr-dashboard',
    line: 'Hire to retire, in one system.',
    branches: [
      { id: 'employees', name: 'Employees & Salary', icon: 'UserSquare', screens: ['hr-employees'], demo: 'attendance-payroll',
        points: ['One record per employee', 'Salary structure and documents', 'Department and designation masters'] },
      { id: 'attendance', name: 'Attendance', icon: 'Fingerprint', screens: ['hr-attendance'], demo: 'attendance-payroll',
        points: ['Biometric and mobile punches', 'Late, early and overtime flags', 'Device sync status'] },
      { id: 'shifts', name: 'Shifts & Roster', icon: 'CalendarClock', screens: ['hr-shifts'], demo: 'attendance-payroll',
        points: ['Shift masters with breaks', 'Weekly roster by department', 'Rotational shifts'] },
      { id: 'leave', name: 'Leave', icon: 'CalendarCheck', screens: ['hr-leave'], demo: 'attendance-payroll',
        points: ['Apply, approve and reject', 'Leave policy and balances', 'Loss of pay handled'] },
      { id: 'payroll', name: 'Payroll', icon: 'Wallet', screens: ['hr-payroll'], demo: 'attendance-payroll',
        points: ['Attendance flows into pay', 'Pre-check before the run', 'Payslips and bank advice'] },
      { id: 'statutory', name: 'Statutory Reports', icon: 'FileCheck2', screens: ['hr-statutory'], demo: 'attendance-payroll',
        points: ['PF ECR, ESI, PT, TDS', 'Payroll register', 'Bank transfer advice'] },
      { id: 'ess', name: 'Employee App', icon: 'Smartphone', screens: ['hr-ess'], demo: 'attendance-payroll',
        points: ['Punch in from the phone', 'Leave and payslips', 'Geo-tagged attendance'] },
      { id: 'performance', name: 'KRA & KPI', icon: 'Target', screens: ['kra-dashboard', 'kra-library', 'kra-analytics'], demo: 'kra-kpi',
        points: ['Goal sheets by role', 'KRA / KPI library', 'Calibration and analytics'] },
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    full: 'Finance & Accounts',
    color: '#0E7490',
    text: '#155E75',
    soft: '#ECFEFF',
    icon: 'Landmark',
    hero: 'fin-accounts',
    shotAspect: '1200 / 375', // finance demos are still being prepared: their screens are a header strip
    line: 'Every rupee, from voucher to balance sheet.',
    branches: [
      { id: 'accounts', name: 'Accounts & Ledger', icon: 'BookOpen', screens: ['fin-accounts'], demo: 'accounts',
        points: ['Chart of accounts', 'Vouchers and journals', 'Trial balance, P&L, balance sheet'] },
      { id: 'billing', name: 'Billing & Invoicing', icon: 'Receipt', screens: ['fin-billing'], demo: 'billing',
        points: ['Quotations and GST invoices', 'Receivables', 'Payment reminders'] },
      { id: 'expenses', name: 'Expenses & Claims', icon: 'CreditCard', screens: ['fin-expenses'], demo: 'expenses',
        points: ['Claims with receipts', 'Approval flow', 'Reimbursement'] },
      { id: 'budget', name: 'Budget & Cost Control', icon: 'PieChart', screens: ['fin-budget'], demo: 'budget',
        points: ['Budgets by cost centre', 'Budget vs actual', 'Overspend alerts'] },
    ],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    full: 'Manufacturing & Operations',
    color: '#3730A3',
    text: '#312E81',
    soft: '#EEF2FF',
    icon: 'Factory',
    hero: 'pr-dashboard',
    line: 'Enquiry to purchase order, safely on every site.',
    branches: [
      { id: 'crm', name: 'CRM', icon: 'Handshake', screens: [], demo: 'crm',
        points: ['Leads and enquiries', 'Follow-ups and quotations', 'Sales pipeline'] },
      { id: 'procurement', name: 'Procurement', icon: 'ShoppingCart', screens: ['pr-dashboard', 'pr-compare', 'pr-orders'], demo: 'procurement',
        points: ['Indent to purchase order', 'AI quotation comparison', 'Vendor and item masters'] },
      { id: 'ehs', name: 'EHS', icon: 'HardHat', screens: ['ehs-dashboard', 'ehs-incidents', 'ehs-permits', 'ehs-hira'], demo: 'ehs',
        points: ['Incidents to closure', 'Work permits', 'HIRA risk heat maps'] },
    ],
  },
]

export const findSuite = (id) => SUITES.find((s) => s.id === id)
