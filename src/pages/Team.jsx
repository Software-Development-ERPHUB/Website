import { Link } from 'react-router-dom'
import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import TeamCard from '../components/ui/TeamCard'
import Reveal from '../components/ui/Reveal'
import CtaBand from '../components/sections/CtaBand'
import { TEAM } from '../content/team'

export default function Team() {
  const leads = TEAM.filter((m) => m.group === 'lead')
  const devs = TEAM.filter((m) => m.group !== 'lead')

  return (
    <>
      <Seo />
      <PageHero
        title="Meet our development team"
        lead="The people who plan, build, test and support our web applications, business systems and mobile apps — the same team that has run Voltech’s enterprise software since 2015."
        crumbs={[{ label: 'Company', to: '/about' }, { label: 'Our Team' }]}
        art="team"
      >
        <div className="flex flex-wrap gap-3">
          <a href="#developers" className="btn-on-dark">Meet the developers</a>
          <Link to="/careers" className="btn-ghost-dark">Join the team</Link>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="team-lead-h">
        <div className="container-page">
          <h2 id="team-lead-h" className="h-section">Team management</h2>
          <p className="lead mt-4 max-w-2xl">Responsible for planning, delivery and quality across every project.</p>
          {/* one card → keep it a comfortable width instead of half the row */}
          <div className={`mt-10 grid gap-6 ${leads.length > 1 ? 'lg:grid-cols-2' : 'max-w-3xl'}`}>
            {leads.map((m, i) => (
              <Reveal key={m.id} delay={i * 110}>
                <TeamCard member={m} size="lg" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="developers" className="section scroll-mt-20 bg-paper" aria-labelledby="devs-h">
        <div className="container-page">
          <h2 id="devs-h" className="h-section">Developers</h2>
          <p className="lead mt-4 max-w-2xl">Full-stack and mobile developers working across React, Laravel, Node.js, MySQL and mobile platforms.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {devs.map((m, i) => (
              <Reveal key={m.id} delay={(i % 4) * 110}>
                <TeamCard member={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Want this team on your project?" body="Tell us what you need to build. We will put the right people on it and keep you updated at every step." />
    </>
  )
}
