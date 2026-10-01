import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import ContactForm from '../components/sections/ContactForm'
import MapEmbed from '../components/ui/MapEmbed'
import SocialLinks from '../components/ui/SocialLinks'
import { CONTACT, SITE } from '../content/site'

function Row({ icon: I, label, children }) {
  return (
    <div className="flex gap-4 py-4">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand"><I size={20} aria-hidden="true" /></span>
      <div className="min-w-0">
        <dt className="text-sm font-semibold">{label}</dt>
        <dd className="mt-0.5 break-words text-muted">{children}</dd>
      </div>
    </div>
  )
}

const todo = (v) => !v || v.startsWith('TODO')

export default function Contact() {
  return (
    <>
      <Seo />
      <PageHero
        title="Let’s discuss your project"
        lead="Tell us what you want to build or improve. We read every enquiry and reply with questions, a suggested approach and next steps."
        crumbs={[{ label: 'Contact Us' }]}
        art="contact"
      />
      <section className="section !pt-10 sm:!pt-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <ContactForm />
          <aside aria-labelledby="contact-info-h" className="min-w-0 space-y-8">
            <div>
              <h2 id="contact-info-h" className="font-display text-2xl font-semibold">Contact information</h2>
              <dl className="mt-2 divide-y divide-line">
                <Row icon={MapPin} label="Office address">
                  <address translate="no" className="notranslate not-italic">
                    <span className="block font-medium text-ink">{SITE.legalName}</span>
                    {CONTACT.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
                  </address>
                </Row>
                {CONTACT.phone && (
                  <Row icon={Phone} label="Phone">
                    <a translate="no" className="notranslate hover:text-brand" href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
                  </Row>
                )}
                <Row icon={Mail} label="Email">
                  {CONTACT.email ? <a translate="no" className="notranslate break-all hover:text-brand" href={`mailto:${CONTACT.email}`} style={{ overflowWrap: 'anywhere' }}>{CONTACT.email}</a> : <span className="italic">Email to be added</span>}
                </Row>
                {!todo(CONTACT.hours) && <Row icon={Clock} label="Business hours">{CONTACT.hours}</Row>}
              </dl>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">Follow us</h2>
              <p className="mt-1 text-sm text-muted">News, projects and openings.</p>
              <SocialLinks size={44} className="mt-4" />
            </div>
            <MapEmbed />
          </aside>
        </div>
      </section>
    </>
  )
}
