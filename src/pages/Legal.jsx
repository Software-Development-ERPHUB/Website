import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import { SITE, CONTACT } from '../content/site'

/**
 * TODO(management/legal): replace with reviewed legal text before launch.
 * The outline below describes what the site actually does today.
 */
const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      ['Information we collect', 'When you submit the enquiry form we receive the details you enter: name, company, email, phone, service, budget range and message.'],
      ['How we use it', 'We use these details only to respond to your enquiry and discuss your project. We do not sell your information.'],
      ['Third-party services', 'The contact page embeds Google Maps, which is governed by Google’s own privacy policy.'],
      ['Contact', `For privacy questions, email ${CONTACT.email}.`],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    sections: [
      ['Use of this website', 'The content on this website is provided for general information about our services.'],
      ['Project engagements', 'Scope, pricing, timelines and responsibilities for any project are set out in a separate written proposal or agreement.'],
      ['Intellectual property', `Unless stated otherwise, content on this site belongs to ${SITE.legalName}. Third-party names and websites belong to their respective owners.`],
      ['Contact', `Questions about these terms can be sent to ${CONTACT.email}.`],
    ],
  },
}

export default function Legal({ kind }) {
  const c = CONTENT[kind]
  return (
    <>
      <Seo />
      <PageHero title={c.title} crumbs={[{ label: c.title }]} lead="Draft — to be reviewed before publication." art="legal" />
      <section className="section !pt-10">
        <div className="container-page max-w-3xl space-y-8">
          {c.sections.map(([h, p]) => (
            <section key={h}>
              <h2 className="font-display text-xl font-semibold">{h}</h2>
              <p className="mt-2 text-muted">{p}</p>
            </section>
          ))}
        </div>
      </section>
    </>
  )
}
