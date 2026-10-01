import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import { IconTile } from '../components/ui/Icon'
import CtaBand from '../components/sections/CtaBand'
import LayerExplorer from '../components/sections/LayerExplorer'
import StackLayers from '../components/art/StackLayers'
import { TECH_GROUPS, PRINCIPLES, TECH_LAYERS } from '../content/company'
import Reveal from '../components/ui/Reveal'

export default function Technology() {
  return (
    <>
      <Seo />
      <PageHero
        title="The technology we build with"
        lead="A deliberately focused stack. These are tools our team uses in production, so we can support what we build for years — not just launch it."
        crumbs={[{ label: 'Technology' }]}
        visual={<StackLayers />}
      >
        <ul className="flex flex-wrap gap-2" aria-label="Layers">
          {TECH_LAYERS.map((l, i) => (
            <li key={l.id} className="slide-in inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/85 ring-1 ring-white/15" style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
              <span className="h-2 w-2 rounded-full" style={{ background: l.color }} aria-hidden="true" />{l.short}
            </li>
          ))}
        </ul>
      </PageHero>

      <LayerExplorer />

      <section className="section" aria-labelledby="stack-h">
        <div className="container-page">
          <div className="mb-10 max-w-2xl">
            <h2 id="stack-h" className="h-section">The full toolkit</h2>
            <p className="lead mt-4">Everything we use, grouped by discipline. Solid dots are in daily production use; dashed items are offered where a project calls for them.</p>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {TECH_GROUPS.map((g, gi) => (
              <Reveal as="section" key={g.id} delay={gi * 60} aria-labelledby={`t-${g.id}`} className="group grid gap-5 py-8 md:grid-cols-[260px_1fr] md:gap-10 lg:grid-cols-[320px_1fr]">
                <div>
                  <h3 id={`t-${g.id}`} className="flex items-center gap-3 font-display text-2xl font-semibold">
                    <span className="h-8 w-1 rounded-full bg-line transition-colors duration-300 group-hover:bg-brand" aria-hidden="true" />{g.title}
                  </h3>
                  <p className="mt-1.5 pl-4 text-sm text-muted">{g.note}</p>
                </div>
                <ul translate="no" className="notranslate flex flex-wrap content-start gap-2.5">
                  {g.items.map((t) => (
                    <li key={t.name} className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-4 text-[0.95rem] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift ${t.tier === 'core' ? 'border-ink/15 bg-white hover:border-brand' : 'border-dashed border-line bg-paper text-muted'}`}>
                      {t.tier === 'core' && <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />}
                      {t.name}
                      {t.tier !== 'core' && <span className="text-xs">(where applicable)</span>}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted"><span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />In daily production use</p>
        </div>
      </section>

      <section className="section bg-paper" aria-labelledby="prin-h">
        <div className="container-page">
          <h2 id="prin-h" className="h-section max-w-2xl">How we build</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p, i) => (
              <Reveal as="article" key={p.title} delay={i * 90} className="group">
                <IconTile name={p.icon} />
                <h3 className="h-card mt-4">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
