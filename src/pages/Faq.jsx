import { Link } from 'react-router-dom'
import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import Accordion from '../components/ui/Accordion'
import { FAQS as STATIC_FAQS } from '../content/company'
import { useCmsList } from '../lib/cms'

export default function Faq() {
  // FAQs come from the CMS when any are published; otherwise the built-in list is used
  const { items } = useCmsList('faqs')
  const FAQS = items?.length ? items.map((f) => ({ q: f.q, a: f.a })) : STATIC_FAQS
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return (
    <>
      <Seo jsonLd={ld} />
      <PageHero title="Frequently asked questions" lead="If your question is not answered here, ask us directly — we are happy to explain." crumbs={[{ label: 'FAQ' }]} art="faq" />
      <section className="section !pt-10">
        <div className="container-page grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Accordion items={FAQS} headingLevel={2} />
          <aside className="card h-fit bg-paper p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-xl font-semibold">Still have a question?</h2>
            <p className="mt-2 text-muted">Send us a short note about your project and we will answer it directly.</p>
            <Link to="/contact" className="btn-primary mt-5 w-full">Ask a question</Link>
          </aside>
        </div>
      </section>
    </>
  )
}
