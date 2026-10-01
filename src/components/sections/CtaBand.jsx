import { Link } from 'react-router-dom'

export default function CtaBand({
  title = 'Have a project in mind?',
  body = 'Tell us what you need to build or improve. We will review it and come back with questions, an approach and next steps.',
}) {
  return (
    <section className="bg-ink text-white">
      <div className="grid-bg-dark">
        <div className="container-page section-tight flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="h-section !text-white">{title}</h2>
            <p className="mt-4 text-lg text-white/75">{body}</p>
          </div>
          <div className="flex flex-col gap-3 xs:flex-row">
            <Link to="/contact" className="btn-on-dark">Start a project</Link>
            <Link to="/projects" className="btn-ghost-dark">See our work</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
