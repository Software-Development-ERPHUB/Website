/**
 * ERP PRODUCT CATALOGUE — starting data for the Development tracker.
 * ------------------------------------------------------------------
 * Loaded once from the dashboard (Development tracker → "Load catalogue").
 * After that the entries live in the CMS and are edited there; changing
 * this file does not touch entries that already exist.
 *
 * Structure:  Voltech Enterprise (everything) → Suites A–E → numbered modules.
 * 1–27 follow the catalogue (pages 4–7). 28 Logistics extends section A;
 * 29–33 are the additions after point 27 (section E).
 */
import { SUITES } from './collections.js'

const [A, B, C, D, E] = SUITES

export const ENTERPRISE = {
  code: 'ALL', name: 'Voltech Enterprise', kind: 'Enterprise application',
  summary: 'The complete enterprise application: every suite and module below, on one login, one database and shared masters.',
}

export const SUITE_ENTRIES = [
  { code: 'A', name: 'Finance, Procurement & Supply Chain', suite: A },
  { code: 'B', name: 'HRMS, Workforce & Employee Productivity', suite: B },
  { code: 'C', name: 'Assets, Field Operations & Service Management', suite: C },
  { code: 'D', name: 'Governance, Automation & Business Intelligence', suite: D },
  { code: 'E', name: 'Customer, Projects & Digital', suite: E },
].map((s) => ({ ...s, kind: 'Suite', summary: `All ${s.name} modules together as one application.` }))

const m = (code, suite, name, priority, summary, note = '', demoUrl = '') => ({ code: String(code), suite, name, priority, summary, note, demoUrl, kind: 'Module' })

export const MODULES = [
  m(1, A, 'Procurement Management System (PMS)', 'P1', 'Purchase requisitions, configurable approvals, RFQs, supplier quotations, purchase orders, delivery tracking, spend analysis and supplier performance.', 'Extract from existing SCM', '/client-demo/procurement'),
  m(2, A, 'Inventory & Stores Management', 'P1', 'Multi-warehouse stock, goods receipt/issue, transfers, barcode/QR, batch/serial tracking, reorder alerts, cycle counting and stock valuation.', 'Split Stores from SCM'),
  m(3, A, 'Accounts Payable & Invoice Automation', 'P1', 'Invoice capture, OCR, PO/receipt matching, duplicate detection, due-date reminders, approval workflows and accounting exports.', 'New focused product'),
  m(4, A, 'Expense & Reimbursement Management', 'P1', 'Employee claims, receipt uploads, mileage, per diem, policy checks, approvals, reimbursement tracking and accounting exports.', 'Productize existing Expenses app'),
  m(5, A, 'Finance & Accounting ERP', 'P2', 'General ledger, receivables, payables, bank reconciliation, budgets, cash flow, fixed assets, tax handling and financial statements.', 'Large scope; validate localization'),
  m(6, A, 'Vendor & Supplier Management', 'P2', 'Supplier onboarding, documents, contracts, expiry alerts, risk ratings, performance scorecards and supplier self-service.', 'Companion to Procurement'),
  m(7, A, 'Warehouse Management System (WMS)', 'P2', 'Bin/location management, put-away, picking, packing, dispatch, scanning and warehouse productivity.', 'For complex warehouse users'),
  m(8, A, 'Production & Manufacturing Management', 'P3', 'Bill of materials, production orders, material requirements planning, work centres, scheduling, work-in-progress and finished goods.', 'Validate a specific industry niche'),
  m(28, A, 'Logistics Management', '', 'Shipments, transport planning, carrier and freight management, dispatch, delivery tracking and proof of delivery.', 'Added after point 8'),

  m(9, B, 'Employee 360 & Core HR', 'P1', 'Employee profiles, employment history, organization structure, skills, documents, assigned assets, lifecycle events and employee/manager self-service.', 'Build on existing HRMS'),
  m(10, B, 'Attendance, Geo-Attendance & Workforce Tracking', 'P1', 'GPS check-in/out, geofencing, shifts, timesheets, attendance regularization, site/visit logs and supervisor monitoring.', 'Separate reusable capability from HRMS', '/client-demo/attendance-payroll'),
  m(11, B, 'Payroll Management', 'P2', 'Salary structures, earnings/deductions, attendance inputs, payslips, approvals, statutory calculations, bank files and year-end reports.', 'Start with one country', '/client-demo/attendance-payroll'),
  m(12, B, 'Leave & Shift Scheduling', 'P2', 'Leave policies, balances, holiday calendars, rosters, overtime, approvals, substitutions and staffing visibility.', 'Can bundle with Attendance'),
  m(13, B, 'Recruitment & Applicant Tracking (ATS)', 'P2', 'Job requisitions, career pages, candidate pipeline, resume parsing, interview scheduling, feedback, offer letters and onboarding handover.', 'AI should assist, not replace review'),
  m(14, B, 'Performance Management System (KRA & KPI)', 'P2', 'Goals, KPIs, KRIs, OKRs, appraisals, competency reviews, feedback and performance improvement plans.', 'Fits HRMS ecosystem', '/client-demo/kra-kpi'),
  m(15, B, 'Learning & Development (LMS)', 'P3', 'Training plans, course assignments, assessments, certificates, renewals, skills matrices and mandatory training compliance.', 'Validate customer demand'),

  m(16, C, 'Fixed Asset & Equipment Management', 'P1', 'Asset register, QR/barcode tags, assignment, transfers, custody acknowledgement, maintenance, warranty and disposal.', 'Cross-industry potential'),
  m(17, C, 'Field Service Management (FSM)', 'P1', 'Work orders, technician assignment, customer-site check-in, checklists, photos, signatures, spare parts, SLA tracking and service reports.', 'Target service and engineering firms'),
  m(18, C, 'Facility & Housekeeping Operations', 'P1', 'Site deployment, cleaning schedules, attendance, inspections, consumables, client sign-off, complaints, SLA and contract-billing inputs.', 'Strong vertical product candidate'),
  m(19, C, 'Maintenance Management (CMMS)', 'P2', 'Preventive schedules, breakdown tickets, work orders, spare parts, downtime, service history and maintenance cost analysis.', 'For equipment-heavy businesses'),
  m(20, C, 'Project & Timesheet Management', 'P2', 'Projects, tasks, resource allocation, timesheets, budgets, billable hours, expenses, milestones and profitability.', 'For services and consulting'),
  m(21, C, 'Fleet & Vehicle Management', 'P3', 'Vehicle records, fuel, maintenance, driver assignments, trip logs, inspections and registration/insurance expiry alerts.', 'Validate fleet-operator demand'),

  m(22, D, 'Document & Contract Management', 'P2', 'Repository, versioning, access controls, approvals, expiry alerts, e-signature integrations and retention policies.', 'Shared or standalone offering'),
  m(23, D, 'Workflow & Approval Automation', 'P2', 'Configurable approval levels, delegation, escalations, SLA timers, conditional rules and reusable workflow templates.', 'Build as shared platform capability'),
  m(24, D, 'Business Intelligence & MIS', 'P2', 'Executive dashboards, KPIs/KRIs, scheduled reports, data exports, cross-product analytics and alerts.', 'Start with practical reporting'),
  m(25, D, 'AI Document Processing & ERP Assistant', 'P3', 'Invoice/receipt extraction, document classification, natural-language report queries and anomaly alerts.', 'Permission-aware; human approval for transactions'),
  m(26, D, 'Integration Hub', 'P2', 'REST APIs, webhooks, scheduled imports/exports, retries, logs, reconciliation and reusable connectors.', 'Important shared foundation'),
  m(27, D, 'Audit, Risk & Compliance Management', 'P3', 'Audit plans, findings, corrective actions, risk registers, evidence, compliance calendars and policy acknowledgements.', 'Start with a specific framework/industry'),

  m(29, E, 'CRM', '', 'Leads, accounts, contacts, opportunities, quotations, follow-ups and sales pipeline.', 'Added after point 27', 'https://demo1.voltechgroup.com'),
  m(30, E, 'HSE (Health, Safety & Environment)', '', 'Incidents, inspections, permits to work, risk assessments, corrective actions and safety reporting.', 'Added after point 27', '/client-demo/ehs'),
  m(31, E, 'VPMT – Project Cost Management', '', 'Project budgets, cost codes, commitments, actual costs, variations and cost-to-complete reporting.', 'Added after point 27'),
  m(32, E, 'Website', '', 'Corporate websites with a content management system, enquiry forms and SEO.', 'Added after point 27'),
  m(33, E, 'E-commerce', '', 'Online catalogue, cart, checkout, payments, orders and delivery tracking.', 'Added after point 27'),
]

/** Placeholder developers — rename them in Team members. */
export const TEAM = [1, 2, 3, 4, 5].map((n) => ({ name: `Developer ${n}`, role: 'Developer', active: true }))
