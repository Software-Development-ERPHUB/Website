/**
 * TECHNOLOGY, PROCESS, FAQ, CAREERS and NAVIGATION content.
 * `tier: 'core'` = in daily use; `tier: 'offered'` = offered where the
 * project calls for it. Remove anything the team does not use.
 */

export const TECH_GROUPS = [
  {
    id: 'frontend',
    title: 'Frontend',
    note: 'Interfaces that work on a phone first and scale up to a desktop.',
    items: [
      { name: 'React', tier: 'core' },
      { name: 'JavaScript', tier: 'core' },
      { name: 'TypeScript', tier: 'core' },
      { name: 'HTML5', tier: 'core' },
      { name: 'CSS3 / Tailwind CSS', tier: 'core' },
      { name: 'Vite', tier: 'core' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    note: 'Business logic, APIs, scheduled jobs and email workflows.',
    items: [
      { name: 'Laravel', tier: 'core' },
      { name: 'PHP', tier: 'core' },
      { name: 'Node.js', tier: 'core' },
      { name: 'Express.js', tier: 'core' },
      { name: 'REST APIs', tier: 'core' },
      { name: 'Python', tier: 'offered' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    note: 'Cross-platform apps for field and site teams.',
    items: [
      { name: 'Responsive web apps', tier: 'core' },
      { name: 'React Native', tier: 'offered' },
    ],
  },
  {
    id: 'data',
    title: 'Database',
    note: 'Relational data modelled for reporting and audit trails.',
    items: [
      { name: 'MySQL', tier: 'core' },
      { name: 'PostgreSQL', tier: 'offered' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & tools',
    note: 'Version control, servers and deployment.',
    items: [
      { name: 'Git', tier: 'core' },
      { name: 'GitHub', tier: 'core' },
      { name: 'Linux', tier: 'core' },
      { name: 'Nginx', tier: 'core' },
      { name: 'Scheduled backups (cron)', tier: 'core' },
      { name: 'Cloud / dedicated server deployment', tier: 'core' },
    ],
  },
]

export const PRINCIPLES = [
  { icon: 'layers', title: 'Modular architecture', body: 'Systems are built as modules so new departments or features can be added without rewriting what works.' },
  { icon: 'lock', title: 'Role-based access', body: 'Users see and change only what their role allows, with approvals and audit trails where they matter.' },
  { icon: 'database', title: 'Backups and data care', body: 'Scheduled backups and structured data models so business records are protected and reportable.' },
  { icon: 'smartphone', title: 'Mobile-first screens', body: 'Layouts designed for small screens first, so site and field teams are never an afterthought.' },
]

/** Delivery process — a genuine sequence, so it is numbered in the UI. */
export const PROCESS = [
  { title: 'Discovery', body: 'We study your current process, users and pain points, and agree the scope in writing.' },
  { title: 'Design', body: 'Screen flows and data model are drafted and reviewed with you before development starts.' },
  { title: 'Development', body: 'Built module by module, with regular demos so you see progress early.' },
  { title: 'Testing', body: 'Each module is tested against real scenarios with your key users.' },
  { title: 'Deployment', body: 'We set up hosting, migrate data and train your team for go-live.' },
  { title: 'Support', body: 'Fixes, enhancements and performance tuning continue after launch.' },
]

export const STRENGTHS = [
  { icon: 'briefcase', title: 'Business-domain understanding', body: 'Our experience comes from building systems for engineering, manufacturing, HR services and facility management operations.' },
  { icon: 'layers', title: 'Full-stack development', body: 'One team handles design, front-end, back-end, database and deployment.' },
  { icon: 'smartphone', title: 'Mobile-first UI', body: 'Screens work on the phones your staff already carry.' },
  { icon: 'boxes', title: 'Modular, scalable builds', body: 'Start with the module you need most and add more as you grow.' },
  { icon: 'wrench', title: 'Long-term support', body: 'We are used to maintaining applications for years, not just launching them.' },
  { icon: 'code', title: 'Custom, not template', body: 'We build around your process instead of forcing you into a generic product.' },
]

export const FAQS = [
  { q: 'How much does a website cost in Chennai?', a: 'Pricing depends on the number of pages, design requirements, integrations and features. We provide a clear proposal based on the project scope after understanding your requirements.' },
  { q: 'Will my website be mobile-friendly and fast?', a: 'Yes. Our websites are designed with a mobile-first, responsive approach and are optimised for performance, usability and search-engine visibility.' },
  { q: 'Can I update the website content myself?', a: 'Yes. Where appropriate, we can build websites using CMS platforms such as WordPress, allowing your team to update pages, posts, images and other content without coding.' },
  { q: 'Do you handle hosting and domain registration?', a: 'Yes. We can provide domain, hosting, SSL, deployment and ongoing website maintenance as part of the service.' },
  { q: 'How long does it take to design a professional website?', a: 'The timeline depends on the scope. A standard informational website may take approximately 2–4 weeks, while more complex custom or e-commerce projects may take 6–12 weeks. A detailed timeline and milestones will be provided after the requirements are finalised.' },
  { q: 'Do you develop custom software?', a: 'Yes. Custom business software is our core work — from single-department tools to multi-module applications used across several companies.' },
  { q: 'Do you provide ERP solutions?', a: 'Yes. We build ERP modules such as CRM, sales and purchase orders, BOM, GRN, inventory, HR and payroll, finance and compliance, either as a full suite or one module at a time.' },
  { q: 'Do you work with startups and SMEs?', a: 'Yes. We can start with a focused first version that solves your most pressing problem and extend it as your business grows.' },
  { q: 'Do you provide website maintenance?', a: 'Yes. We offer ongoing maintenance covering content updates, security updates, backups, performance checks and small enhancements.' },
  { q: 'Can you redesign an existing website?', a: 'Yes. We review your current site’s content, structure and performance, then redesign it while keeping what already works — including search rankings where possible.' },
  { q: 'Do you provide UI/UX design?', a: 'Yes. We design user flows, wireframes and interfaces for new products and review existing applications to make them easier to use.' },
  { q: 'Can you integrate third-party APIs?', a: 'Yes. We integrate payment gateways, email and SMS services, and other business systems through their APIs, and can build APIs for your own applications.' },
  { q: 'Do you provide dedicated development or support?', a: 'Yes. Depending on your needs, we can agree a dedicated team or a support arrangement with defined response times.' },
  { q: 'Do you provide cloud or server deployment?', a: 'Yes. We set up and deploy applications on cloud or dedicated Linux servers, including web server configuration, SSL and scheduled backups.' },
  { q: 'Can you develop mobile applications?', a: 'Yes. We build mobile-first web applications as standard and can develop cross-platform mobile apps where your users need them.' },
  { q: 'Do you provide post-launch support?', a: 'Yes. Every project includes a support period after launch, and longer-term maintenance can be arranged.' },
]

export const CAREERS = {
  why: [
    { icon: 'briefcase', title: 'Real business problems', body: 'Work on applications that people rely on every day, not throwaway prototypes.' },
    { icon: 'layers', title: 'Full-stack exposure', body: 'Contribute across React, Laravel, Node.js, databases and deployment.' },
    { icon: 'users', title: 'Small, focused team', body: 'Your work is visible and your ideas are heard.' },
  ],
  culture: [
    'Code reviews and shared ownership of quality',
    'Clear requirements before development starts',
    'Documentation that the next developer can follow',
    'Respect for users who depend on our software',
  ],
  growth: [
    'Mentoring from experienced developers',
    'Exposure to modern stacks during our React and Node.js migrations',
    'Opportunities to lead modules as you grow',
  ],
  internship:
    'We offer internships for students and recent graduates interested in web development and design. Fill in the form and attach your CV — it goes straight to our team, and we review every application.',
  /**
   * Open positions. Leave empty when there are no vacancies — the page shows
   * an empty state. Example entry:
   * {
   *   id: 'react-dev',
   *   position: 'React Developer',
   *   experience: '2–4 years',
   *   location: 'Chennai',
   *   type: 'Full-time',
   *   skills: ['React', 'JavaScript', 'REST APIs'],
   *   description: 'Build and maintain responsive web applications…',
   * }
   */
  jobs: [],
}

export const NAV = [
  { to: '/services', label: 'Services' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/industries', label: 'Industries' },
  { to: '/projects', label: 'Projects' },
  {
    label: 'ERP Portfolio',
    children: [
      { to: '/erp', label: 'ERP overview' },
      { to: '/erp#companies', label: 'Group companies' },
      { to: '/erp/websites', label: 'Group websites' },
    ],
  },
  {
    label: 'Company',
    children: [
      { to: '/about', label: 'About Us' },
      { to: '/technology', label: 'Technology' },
      { to: '/leadership', label: 'Leadership' },
      { to: '/team', label: 'Our Team' },
      { to: '/news', label: 'News & insights' },
      { to: '/careers', label: 'Careers' },
      { to: '/faq', label: 'FAQ' },
    ],
  },
  { to: '/contact', label: 'Contact Us' },
]

export const BUDGETS = ['Not sure yet', 'Under ₹1 lakh', '₹1–3 lakh', '₹3–10 lakh', 'Above ₹10 lakh']

/**
 * TECHNOLOGY LAYERS — the "How the stack fits together" explorer on the
 * Technology page. Top = what users touch, bottom = what keeps it running.
 * `tools` names should match TECH_GROUPS; `tier` follows the same rules.
 */
export const TECH_LAYERS = [
  {
    id: 'experience',
    name: 'Experience layer',
    short: 'Frontend',
    color: '#38C66C',
    icon: 'layout',
    summary: 'The screens people actually use — on a phone at site or a desktop in the office.',
    does: ['Role-based dashboards and reports', 'Fast data-entry forms with validation', 'Mobile-first, responsive layouts', 'Dark mode and accessible components where needed'],
    tools: [
      { name: 'React', tier: 'core' }, { name: 'TypeScript', tier: 'core' }, { name: 'JavaScript', tier: 'core' },
      { name: 'Tailwind CSS', tier: 'core' }, { name: 'Vite', tier: 'core' }, { name: 'React Native', tier: 'offered' },
    ],
    example: 'The group HRMS and the project cost dashboard run on React front ends built with Vite and Tailwind.',
  },
  {
    id: 'api',
    name: 'API layer',
    short: 'Node.js & Express',
    color: '#22A45D',
    icon: 'plug',
    summary: 'A clean, secure contract between the screens and the business logic.',
    does: ['REST endpoints for every module', 'Input validation and role checks on every request', 'Integrations with email, SMS and third-party services', 'One API that web and mobile can share'],
    tools: [
      { name: 'Node.js', tier: 'core' }, { name: 'Express.js', tier: 'core' }, { name: 'REST APIs', tier: 'core' },
    ],
    example: 'The HRMS runs on a Node.js + Express API, so new screens and apps plug into the same rules.',
  },
  {
    id: 'logic',
    name: 'Business logic layer',
    short: 'Workflows & jobs',
    color: '#00924A',
    icon: 'workflow',
    summary: 'Where your process lives — approvals, calculations, reminders and reports.',
    does: ['Multi-level approval workflows', 'Payroll, costing and other calculations', 'Scheduled jobs, reminders and email reports', 'Audit trails on the records that matter'],
    tools: [
      { name: 'Laravel', tier: 'core' }, { name: 'PHP', tier: 'core' }, { name: 'Node.js services', tier: 'core' },
      { name: 'Scheduled jobs (cron)', tier: 'core' }, { name: 'Python', tier: 'offered' },
    ],
    example: 'Payslip mailing, enquiry follow-up reminders and monthly timesheet reports run as scheduled jobs.',
  },
  {
    id: 'data',
    name: 'Data layer',
    short: 'Databases',
    color: '#007438',
    icon: 'database',
    summary: 'Relational data modelled for reporting, separation between companies and a full history.',
    does: ['Normalised models built for reporting', 'Company-wise data separation', 'Indexes and query tuning as data grows', 'Scheduled backups and restore checks'],
    tools: [
      { name: 'MySQL', tier: 'core' }, { name: 'PostgreSQL', tier: 'offered' },
    ],
    example: 'One HRMS database serves several companies while keeping each company’s records separate.',
  },
  {
    id: 'infra',
    name: 'Infrastructure layer',
    short: 'DevOps & servers',
    color: '#2B5B84',
    icon: 'cloud',
    summary: 'Hosting, deployment and version control that keep systems up for years.',
    does: ['Linux servers with Nginx and SSL', 'Git-based version control and code review', 'Repeatable deployments to cloud or dedicated servers', 'Monitoring, backups and security updates'],
    tools: [
      { name: 'Linux', tier: 'core' }, { name: 'Nginx', tier: 'core' }, { name: 'Git', tier: 'core' },
      { name: 'GitHub', tier: 'core' }, { name: 'Cloud / dedicated servers', tier: 'core' },
    ],
    example: 'The group’s applications run on dedicated servers with scheduled backups, around the clock.',
  },
]

/** Internship application form options — keep AREAS and DURATIONS in sync with server/src/routes/internship.js */
export const INTERNSHIP = {
  areas: ['Frontend (React)', 'Backend (Node.js / Laravel)', 'Full-stack development', 'UI/UX design', 'Mobile apps', 'Testing / QA', 'Other'],
  durations: ['1 month', '2 months', '3 months', '6 months', 'Flexible'],
  years: ['1st year', '2nd year', '3rd year', 'Final year', 'Graduated (fresher)', 'Postgraduate'],
  maxCvMb: 5,
  perks: [
    { icon: 'code', title: 'Real projects', body: 'Work on live applications used by real teams — not throwaway exercises.' },
    { icon: 'users', title: 'Mentoring', body: 'Experienced developers review your code and help you grow.' },
    { icon: 'layers', title: 'Modern stack', body: 'React, Node.js, Express, Laravel and MySQL — the tools we use every day.' },
    { icon: 'graduation', title: 'Flexible duration', body: 'Choose from one to six months, around your college schedule.' },
  ],
}
