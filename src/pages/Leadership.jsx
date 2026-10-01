import { Link } from 'react-router-dom'
import Seo from '../components/ui/Seo'
import LeadershipSlider from '../components/sections/LeadershipSlider'
import LeaderCard from '../components/ui/LeaderCard'
import CtaBand from '../components/sections/CtaBand'
import { LEADERS, TECH_LEADERS } from '../content/leadership'

export default function Leadership() {
  return (
    <>
      <Seo />
      <LeadershipSlider leaders={LEADERS} />

      <section className="section" aria-labelledby="board-h">
        <div className="container-page">
          <h2 id="board-h" className="h-section max-w-2xl">Leadership team</h2>
          <p className="lead mt-4 max-w-2xl">The people responsible for our direction, our clients and the quality of our work.</p>
          <div className="mt-10 space-y-6">
            {LEADERS.map((l) => <LeaderCard key={l.id} leader={l} />)}
          </div>
        </div>
      </section>

      <section className="section bg-paper" aria-labelledby="tech-lead-h">
        <div className="container-page">
          <h2 id="tech-lead-h" className="h-section max-w-2xl">Technical leadership</h2>
          {TECH_LEADERS.length ? (
            <div className="mt-10 space-y-6">{TECH_LEADERS.map((l) => <LeaderCard key={l.id} leader={l} />)}</div>
          ) : (
            <p className="mt-4 max-w-2xl text-muted">Meet the people who design, build and support our software. <Link to="/team" className="link">View our development team</Link>.</p>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  )
}
