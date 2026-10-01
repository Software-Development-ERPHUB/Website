import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper, CalendarDays } from 'lucide-react'
import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import { useCmsList, formatDate, assetUrl } from '../lib/cms'

function Card({ a, big = false }) {
  return (
    <article className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-pop ${big ? 'lg:flex-row' : ''}`}>
      <div className={`relative overflow-hidden bg-paper ${big ? 'aspect-[16/9] lg:aspect-auto lg:w-[55%]' : 'aspect-[16/9]'}`}>
        {a.coverImage?.url
          ? <img src={assetUrl(a.coverImage.url)} alt={a.coverImage.alt || ''} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          : <div className="grid-bg absolute inset-0 flex items-center justify-center bg-brand-soft"><Newspaper size={40} className="text-brand/50" aria-hidden="true" /></div>}
        {a.category && <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand shadow">{a.category}</span>}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${big ? 'sm:p-8 lg:justify-center' : ''}`}>
        <p className="flex items-center gap-1.5 text-sm text-muted"><CalendarDays size={14} aria-hidden="true" /><time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time></p>
        <h2 className={`mt-2 font-display font-semibold ${big ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
          <Link to={`/news/${a.slug}`} className="after:absolute after:inset-0 group-hover:text-brand">{a.title}</Link>
        </h2>
        <p className="mt-2 line-clamp-3 flex-1 text-muted">{a.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">Read article<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
      </div>
    </article>
  )
}

export default function News() {
  const { items, loading } = useCmsList('news')
  const [cat, setCat] = useState('All')
  const cats = useMemo(() => ['All', ...new Set((items || []).map((a) => a.category).filter(Boolean))], [items])
  const list = (items || []).filter((a) => cat === 'All' || a.category === cat)
  const [first, ...rest] = list

  return (
    <>
      <Seo />
      <PageHero title="News & insights" lead="Company news, project updates and what we are learning while building software for real businesses." crumbs={[{ label: 'News' }]} art="faq" />
      <section className="section !pt-10 sm:!pt-14">
        <div className="container-page">
          {cats.length > 2 && (
            <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
              {cats.map((c) => (
                <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                  className={`min-h-[40px] rounded-full px-4 text-sm font-medium transition-colors ${cat === c ? 'bg-brand text-white' : 'bg-white text-ink ring-1 ring-line hover:ring-brand'}`}>{c}</button>
              ))}
            </div>
          )}
          {loading ? (
            <div className="grid gap-6 md:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="h-80 animate-pulse rounded-xl bg-paper" />)}</div>
          ) : !list.length ? (
            <div className="card flex flex-col items-center p-10 text-center">
              <Newspaper size={36} className="text-brand" aria-hidden="true" />
              <p className="mt-3 font-display text-xl font-semibold">No articles yet</p>
              <p className="mt-1 text-muted">News and updates will appear here soon.</p>
            </div>
          ) : (
            <>
              <Reveal className="mb-8"><Card a={first} big /></Reveal>
              {rest.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((a, i) => <Reveal key={a.id} delay={(i % 3) * 90}><Card a={a} /></Reveal>)}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
