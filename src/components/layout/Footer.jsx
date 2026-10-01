import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import Logo from '../ui/Logo'
import SocialLinks from '../ui/SocialLinks'
import { SITE, CONTACT, MAP } from '../../content/site'

const COLS = [
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/leadership', label: 'Leadership' },
      { to: '/team', label: 'Our Team' },
      { to: '/news', label: 'News' },
      { to: '/careers', label: 'Careers' },
      { to: '/faq', label: 'FAQ' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { to: '/services#custom-software', label: 'Software Development' },
      { to: '/services#web-apps', label: 'Web Development' },
      { to: '/services#erp', label: 'ERP Solutions' },
      { to: '/services#ui-ux', label: 'UI/UX Design' },
      { to: '/services#support', label: 'Maintenance & Support' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { to: '/solutions#erp', label: 'Business Applications' },
      { to: '/solutions#automation', label: 'Workflow Automation' },
      { to: '/solutions#documents', label: 'Document Management' },
      { to: '/solutions#project-cost', label: 'Project Management' },
      { to: '/projects', label: 'Case Studies' },
    ],
  },
  {
    title: 'ERP Portfolio',
    links: [
      { to: '/erp', label: 'ERP overview' },
      { to: '/erp#companies', label: 'Group companies' },
      { to: '/erp#shared-systems', label: 'HRMS & Audit' },
      { to: '/erp/websites', label: 'Group websites' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-white/75" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container-page grid gap-12 py-14 sm:py-16 lg:grid-cols-[1fr_2.4fr]">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-5 text-[0.95rem] leading-relaxed">
            Custom software, web applications, websites and ERP business applications — built and supported from Chennai. A Voltech Group company.
          </p>
          <Link to="/contact" className="btn-on-dark mt-6">Start a project</Link>
          <p className="mt-8 text-sm font-semibold text-white">Follow us</p>
          <SocialLinks tone="light" size={40} className="mt-3" />
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-[1fr_1fr_1fr_1fr_1.5fr]">
          {COLS.map((c) => (
            <div key={c.title}>
              <h3 className="font-sans text-sm font-semibold !text-white">{c.title}</h3>
              <ul className="mt-4 space-y-1">
                {c.links.map((l) => (
                  <li key={l.label}><Link to={l.to} className="inline-flex min-h-[36px] items-center text-[0.93rem] transition-[color,transform] duration-200 hover:translate-x-1 hover:text-white">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-sans text-sm font-semibold !text-white">Connect</h3>
            <ul className="mt-4 space-y-1 text-[0.93rem]">
              {CONTACT.email && (
                <li><a href={`mailto:${CONTACT.email}`} translate="no" className="notranslate inline-flex min-h-[36px] items-center gap-2 break-all hover:text-white"><Mail size={16} aria-hidden="true" className="shrink-0" />{CONTACT.email}</a></li>
              )}
              {CONTACT.phone && (
                <li><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="inline-flex min-h-[36px] items-center gap-2 hover:text-white"><Phone size={16} aria-hidden="true" />{CONTACT.phone}</a></li>
              )}
              <li><a href={MAP.placeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[36px] items-center gap-2 hover:text-white"><MapPin size={16} aria-hidden="true" />Google Maps<span className="sr-only"> (opens in a new tab)</span></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {SITE.legalName} {year}</p>
          <ul className="flex gap-5">
            <li><Link to="/privacy-policy" className="hover:text-white hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white hover:underline">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
