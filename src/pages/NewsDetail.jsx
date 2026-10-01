import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Clock, Eye } from 'lucide-react'
import Seo from '../components/ui/Seo'
import { fetchPublic, formatDate, readingTime, assetUrl } from '../lib/cms'
import { SITE } from '../content/site'

export default function NewsDetail() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const preview = params.get('preview') === '1'
  const [a, setA] = useState(undefined)

  useEffect(() => {
    setA(undefined)
    fetchPublic(`news/${slug}`, { preview }).then((d) => setA(d.item)).catch(() => setA(null))
  }, [slug, preview])

  if (a === undefined) return <div className="container-page section"><div className="mx-auto h-96 max-w-3xl animate-pulse rounded-xl bg-paper" /></div>
  if (a === null) {
    return (
      <section className="section">
        <Seo title="Article not found" noindex />
        <div className="container-page max-w-2xl text-center">
          <h1 className="h-section">Article not found</h1>
          <p className="lead mt-3">It may have been moved or unpublished.{preview && ' Preview needs you to be signed in to the CMS in this browser.'}</p>
          <Link to="/news" className="btn-primary mt-6">All news</Link>
        </div>
      </section>
    )
  }

  const ld = {
    '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.excerpt,
    datePublished: a.publishedAt, publisher: { '@type': 'Organization', name: SITE.legalName },
    ...(a.coverImage?.url && { image: assetUrl(a.coverImage.url) }),
  }

  return (
    <>
      <Seo title={a.seoTitle || a.title} description={a.seoDescription || a.excerpt} jsonLd={ld} noindex={preview} />
      {preview && (
        <div className="sticky top-[var(--header-h)] z-40 bg-amber-400 px-4 py-2 text-center text-sm font-semibold text-ink" role="status">
          <Eye size={15} className="mr-1.5 inline" aria-hidden="true" />Preview of the draft — not visible to the public until published
        </div>
      )}
      <article>
        <header className="relative isolate overflow-hidden bg-ink text-white">
          <div className="grid-bg-dark absolute inset-0 -z-10" aria-hidden="true" />
          <div className="container-page max-w-4xl py-12 sm:py-16">
            <nav aria-label="Breadcrumb" className="text-sm text-white/60">
              <Link to="/" className="hover:text-white hover:underline">Home</Link><span className="mx-1.5">/</span>
              <Link to="/news" className="hover:text-white hover:underline">News</Link>
            </nav>
            {a.category && <p className="mt-6 inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-accent ring-1 ring-white/15">{a.category}</p>}
            <h1 className="slide-in mt-4 font-display text-[clamp(2rem,1.4rem+2.8vw,3.3rem)] font-semibold leading-[1.08] !text-white">{a.title}</h1>
            {a.excerpt && <p className="slide-in mt-4 max-w-2xl text-lg text-white/75" style={{ animationDelay: '.08s' }}>{a.excerpt}</p>}
            <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/65">
              <span className="flex items-center gap-1.5"><CalendarDays size={15} aria-hidden="true" /><time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time></span>
              <span className="flex items-center gap-1.5"><Clock size={15} aria-hidden="true" />{readingTime(a.body)} min read</span>
            </p>
          </div>
        </header>
        <div className="container-page max-w-4xl py-10 sm:py-14">
          {a.coverImage?.url && (
            <figure className="-mt-20 mb-10 overflow-hidden rounded-2xl border border-line bg-white shadow-pop sm:-mt-24">
              <img src={assetUrl(a.coverImage.url)} alt={a.coverImage.alt || ''} className="w-full object-cover" />
            </figure>
          )}
          {/* body HTML is sanitised on the server when it is saved */}
          <div className="cms-prose mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: a.body }} />
          {a.tags?.length > 0 && (
            <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap gap-2 border-t border-line pt-6" aria-label="Tags">
              {a.tags.map((t) => <li key={t} className="chip">#{t}</li>)}
            </ul>
          )}
          <div className="mx-auto mt-10 max-w-3xl"><Link to="/news" className="btn-secondary"><ArrowLeft size={17} aria-hidden="true" />All news</Link></div>
        </div>
      </article>
    </>
  )
}
