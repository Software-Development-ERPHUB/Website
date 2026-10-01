/**
 * Per-page SEO. Titles get " | {SITE.name} {SITE.descriptor}" appended by <Seo>.
 * Also read by scripts/generate-sitemap.mjs, so keep this file import-free
 * except for other plain-data files.
 */
export const PAGE_SEO = {
  '/erp': {
    title: 'ERP Portfolio — In-house ERP for Voltech Group',
    description: 'The ERP applications our team designed, built and runs for Voltech Group since 2015 — HRMS, supply chain, design management, audit and more.',
    priority: '0.9',
  },
  '/erp/websites': {
    title: 'Group Websites — Design, SEO & Analytics',
    description: 'Corporate and product websites we designed, built and optimised for Voltech Group companies, with GA4 analytics on every site.',
    priority: '0.7',
  },
  '/': {
    title: 'Software Development & IT Services Company in Chennai',
    description: 'Custom software, web applications, websites and ERP business applications from a Chennai engineering team delivering live enterprise systems since 2015.',
    priority: '1.0',
  },
  '/about': {
    title: 'About Us',
    description: 'From an in-house enterprise software team to an IT services company — our experience, delivery approach and why businesses work with us.',
    priority: '0.8',
  },
  '/services': {
    title: 'Software, Web & ERP Development Services',
    description: 'Custom software development, web applications, website design, ERP, UI/UX, API integration, deployment and application support in Chennai.',
    priority: '0.9',
  },
  '/solutions': {
    title: 'Business Solutions — ERP, HR, CRM, Compliance',
    description: 'Business application solutions for ERP, HR and payroll, procurement, project costing, CRM, document, asset and compliance management.',
    priority: '0.8',
  },
  '/industries': {
    title: 'Industries We Serve',
    description: 'Software for electrical engineering, manufacturing, instrumentation, HR and staffing, facility management and multi-company groups.',
    priority: '0.7',
  },
  '/projects': {
    title: 'Projects & Case Studies',
    description: 'Business applications and websites we have designed, built and maintained — ERP modules, HR systems, project cost tools and corporate websites.',
    priority: '0.9',
  },
  '/technology': {
    title: 'Technology Stack',
    description: 'React, Laravel, PHP, Node.js, Express and MySQL — the technologies we use to build and run business applications.',
    priority: '0.6',
  },
  '/leadership': {
    title: 'Leadership',
    description: 'Meet the leadership team guiding our software and IT services business.',
    priority: '0.6',
  },
  '/team': {
    title: 'Our Development Team',
    description: 'Meet the developers, team lead and management behind our software, web and mobile projects.',
    priority: '0.6',
  },
  '/careers': {
    title: 'Careers',
    description: 'Build your career in web and business application development with our Chennai engineering team.',
    priority: '0.6',
  },
  '/news': {
    title: 'News & Insights',
    description: 'Company news, project updates and insights from our software team in Chennai.',
    priority: '0.6',
  },
  '/faq': {
    title: 'Frequently Asked Questions',
    description: 'Answers about website cost in Chennai, timelines, hosting, custom software, ERP, maintenance and support.',
    priority: '0.6',
  },
  '/contact': {
    title: 'Contact Us — Start a Project',
    description: 'Tell us about your software, website or ERP project. Our Chennai team will get back to you with next steps.',
    priority: '0.9',
  },
  '/privacy-policy': { title: 'Privacy Policy', description: 'How we handle information submitted through this website.', priority: '0.2' },
  '/terms': { title: 'Terms & Conditions', description: 'Terms governing the use of this website.', priority: '0.2' },
}
