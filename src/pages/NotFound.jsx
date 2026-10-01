import { Link } from 'react-router-dom'
import Seo from '../components/ui/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for does not exist." noindex />
      <section className="section">
        <div className="container-page max-w-2xl">
          <p className="font-display text-sm font-semibold text-brand">404</p>
          <h1 className="h-section mt-2">This page doesn’t exist</h1>
          <p className="lead mt-4">The link may be old or mistyped. Try one of these instead.</p>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row">
            <Link to="/" className="btn-primary">Go to the home page</Link>
            <Link to="/projects" className="btn-secondary">Browse projects</Link>
          </div>
        </div>
      </section>
    </>
  )
}
