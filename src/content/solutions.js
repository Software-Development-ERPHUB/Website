/**
 * SOLUTIONS — framed around business problems.
 * `projects` lists slugs from projects.js that demonstrate the solution.
 */
export const SOLUTIONS = [
  {
    id: 'erp',
    icon: 'boxes',
    title: 'ERP Solutions',
    problem: 'Sales, purchase, stores and accounts each keep their own records, so nobody sees the full picture.',
    value: 'One connected flow from enquiry to sales order, work order, purchase, goods receipt and invoice — with every department working from the same data.',
    projects: ['supply-chain-management', 'production-erp'],
  },
  {
    id: 'hr',
    icon: 'users',
    title: 'HR & Workforce Management',
    problem: 'Recruitment, attendance, payroll and statutory compliance run on spreadsheets and manual follow-up.',
    value: 'Recruitment-to-payroll workflows with leave, bonus, statutory compliance, insurance and payslip mailing handled in one place.',
    projects: ['hr-management-system', 'employee-management-system'],
  },
  {
    id: 'procurement',
    icon: 'truck',
    title: 'Procurement & Vendor Management',
    problem: 'Vendor onboarding and purchase approvals depend on emails and paper, and are hard to audit.',
    value: 'Structured vendor onboarding, purchase requisitions, purchase orders and approvals with a traceable history.',
    projects: ['vendor-process', 'supply-chain-management'],
  },
  {
    id: 'project-cost',
    icon: 'chart',
    title: 'Project Cost Management',
    problem: 'Project overruns are discovered only after the project closes.',
    value: 'Site versus head-office cost tracking and budget variance reports while the project is still running.',
    projects: ['project-cost-management', 'finance-management'],
  },
  {
    id: 'crm',
    icon: 'handshake',
    title: 'CRM & Sales Workflow',
    problem: 'Leads, enquiries and follow-ups are lost between inboxes and individual notebooks.',
    value: 'Enquiry capture, pipeline tracking, follow-up reminders and conversion reporting that the whole sales team can see.',
    projects: ['crm-ats', 'design-management-system'],
  },
  {
    id: 'documents',
    icon: 'file',
    title: 'Document Management',
    problem: 'Certificates, drawings and controlled documents are scattered across shared drives.',
    value: 'Central storage with versions, expiry tracking and role-based access so the right document is always the current one.',
    projects: ['audit-compliance', 'design-management-system'],
  },
  {
    id: 'assets',
    icon: 'tag',
    title: 'Asset Management',
    problem: 'IT and non-IT assets are hard to trace, and service requests get lost.',
    value: 'Asset registers, ticket raising and purchase flow so you know what you own, where it is and what needs attention.',
    projects: ['asset-management'],
  },
  {
    id: 'compliance',
    icon: 'shield',
    title: 'Compliance Management',
    problem: 'Audits, ISO certificates and safety records are prepared in a rush before each inspection.',
    value: 'Audit scheduling, non-conformance tracking, safety records and certificate renewals managed continuously, not at the last minute.',
    projects: ['audit-compliance', 'health-safety'],
  },
  {
    id: 'automation',
    icon: 'workflow',
    title: 'Workflow Automation',
    problem: 'Routine approvals, reminders and reports take up hours of staff time every week.',
    value: 'Automated approvals, scheduled emails and reminders, and system-generated reports that replace manual chasing.',
    projects: ['design-management-system', 'hr-management-system'],
  },
  {
    id: 'reporting',
    icon: 'dashboard',
    title: 'Reporting & Dashboards',
    problem: 'Management reports are compiled by hand from several systems and are out of date by the time they are read.',
    value: 'Role-based dashboards and MIS reports drawn directly from live operational data.',
    projects: ['employee-management-system', 'project-cost-management'],
  },
]

/**
 * INDUSTRIES — `experience: true` means the team has delivered live
 * systems for this sector (via the group companies in the supplied data).
 * Set `show: true` on others only once there is real delivery experience.
 */
export const INDUSTRIES = [
  {
    id: 'engineering',
    icon: 'zap',
    title: 'Electrical Engineering & Design',
    body: 'Design workflows from enquiry to client delivery, timesheets, collections, vendor processes and project cost control for engineering services teams.',
    examples: ['Design management', 'Project cost tracking', 'Vendor processes'],
    show: true,
  },
  {
    id: 'manufacturing',
    icon: 'factory',
    title: 'Manufacturing',
    body: 'Enquiry-to-dispatch supply chain, BOM, work orders, goods receipt, quality checks and production ERP for transformer and switchgear manufacturing.',
    examples: ['Supply chain', 'Production ERP', 'Quality checks'],
    show: true,
  },
  {
    id: 'instrumentation',
    icon: 'gauge',
    title: 'Instrumentation & Automation',
    body: 'Marketing visits, offers, orders, project timesheets and invoice billing for instrumentation and automation project businesses.',
    examples: ['Offer management', 'Order tracking', 'Invoice billing'],
    show: true,
  },
  {
    id: 'hr-services',
    icon: 'users',
    title: 'HR & Staffing Services',
    body: 'High-volume employee records, attendance, payroll, background verification and applicant tracking for staffing operations.',
    examples: ['Payroll & attendance', 'ATS', 'Background verification'],
    show: true,
  },
  {
    id: 'facility',
    icon: 'building',
    title: 'Facility & Management Services',
    body: 'Asset registers, service tickets, purchase flow and HR for facility management and security services providers.',
    examples: ['Asset management', 'Service tickets', 'Staff HR'],
    show: true,
  },
  {
    id: 'om',
    icon: 'wrench',
    title: 'Operation & Maintenance',
    body: 'Work orders, preventive maintenance and field engineer dispatch for O&M service teams — currently in development.',
    examples: ['Work orders', 'Preventive maintenance', 'Field dispatch'],
    show: true,
  },
  {
    id: 'enterprise',
    icon: 'briefcase',
    title: 'Corporate & Multi-Company Groups',
    body: 'Shared HR, audit and compliance systems that serve several companies under one group, with separate data per company.',
    examples: ['Group-wide HR', 'Audit & ISO', 'Multi-company setup'],
    show: true,
  },
  // Not yet shown — enable only with real delivery experience.
  { id: 'education', icon: 'graduation', title: 'Education', body: '', examples: [], show: false },
  { id: 'healthcare', icon: 'heart', title: 'Healthcare', body: '', examples: [], show: false },
  { id: 'logistics', icon: 'truck', title: 'Logistics', body: '', examples: [], show: false },
]
