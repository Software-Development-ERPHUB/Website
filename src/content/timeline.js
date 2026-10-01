/**
 * OUR JOURNEY — shown on the About page (2015 → today).
 * ------------------------------------------------------------------
 * `year` is shown on the timeline. Only 2015 and "today" are confirmed —
 * fill in the other years (e.g. '2017' or '2018–2019') when management
 * confirms them. While `year` is empty the card shows "Chapter N" instead.
 * `icon` is a lucide-react icon name used by components/sections/Timeline.jsx.
 */
export const JOURNEY = [
  {
    year: '2015',
    icon: 'rocket',
    title: 'The internal software team is formed',
    body: 'We start as Voltech Group’s in-house software team, with one goal: replace paper, spreadsheets and email chains with systems people can rely on every day.',
    tags: ['Laravel', 'PHP', 'MySQL'],
  },
  {
    year: '', // TODO(management)
    icon: 'layers',
    title: 'First business applications go live',
    body: 'Design management, project cost tracking and finance tools give engineering, project and accounts teams one shared record for every project.',
    tags: ['VDMS', 'VPMT', 'Finance'],
  },
  {
    year: '', // TODO(management)
    icon: 'users',
    title: 'One HR platform across the group',
    body: 'Recruitment, payroll, leave, attendance, statutory compliance and insurance move onto a shared HRMS, configured separately for each company.',
    tags: ['HRMS', 'Payroll', 'Compliance'],
  },
  {
    year: '', // TODO(management)
    icon: 'factory',
    title: 'Supply chain and production ERP',
    body: 'Enquiry-to-invoice supply chain, BOM, purchase, GRN, QC and production modules for the group’s manufacturing operations.',
    tags: ['Prime SCM', 'Production ERP'],
  },
  {
    year: '', // TODO(management)
    icon: 'shield',
    title: 'Audit, safety and compliance',
    body: 'ISO certification, document control, safety incidents and non-conformance tracking come together on one live dashboard for every company.',
    tags: ['Audit', 'EHS', 'ISO'],
  },
  {
    year: '', // TODO(management)
    icon: 'globe',
    title: 'Group websites and digital presence',
    body: 'Corporate and product websites for group companies — responsive, SEO-optimised and tracked with Google Analytics 4.',
    tags: ['Websites', 'SEO', 'GA4'],
  },
  {
    year: '', // TODO(management)
    icon: 'code',
    title: 'Modernising the stack',
    body: 'New builds and migrations move to React on the front end with Node.js and Express APIs, keeping the systems fast and maintainable for years to come.',
    tags: ['React', 'Node.js', 'Express.js'],
  },
  {
    year: 'today',
    icon: 'briefcase',
    title: 'Voltech IT Services',
    body: 'With 20+ applications in production, we open our experience to businesses outside the group — while continuing to run everything we built.',
    tags: ['Client projects', '20+ live apps'],
  },
]
