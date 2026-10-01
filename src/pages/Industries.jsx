import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import { IconTile } from '../components/ui/Icon'
import CtaBand from '../components/sections/CtaBand'
import { INDUSTRIES } from '../content/solutions'
import Reveal from '../components/ui/Reveal'

export default function Industries() {
  const list = INDUSTRIES.filter((x) => x.show)
  return (
    <>
      <Seo />
      <PageHero
        title="Industries we serve"
        lead="We list only the sectors where our software is already in daily use. If yours is not here, the underlying problems — approvals, records, reports — are often the same."
        crumbs={[{ label: 'Industries' }]}
        art="industries"
      />
      <section className="section">
        <div className="container-page grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {list.map((x, i) => (
            <Reveal as="article" key={x.id} id={x.id} delay={(i % 3) * 90} className="group scroll-mt-28 rounded-xl p-2 transition-colors">
              <IconTile name={x.icon} tone="steel" />
              <h2 className="mt-5 font-display text-xl font-semibold">{x.title}</h2>
              <p className="mt-2 text-muted">{x.body}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Typical systems for ${x.title}`}>
                {x.examples.map((e) => <li key={e} className="chip">{e}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title="Working in a different industry?" body="Tell us how your team works today. We will tell you honestly whether we are a good fit." />
    </>
  )
}
