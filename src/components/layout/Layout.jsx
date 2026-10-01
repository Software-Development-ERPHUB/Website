import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BackToTop from '../ui/BackToTop'
import Header from './Header'
import Footer from './Footer'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // wait for lazy route content to render
      const id = decodeURIComponent(hash.slice(1))
      let tries = 0
      const t = setInterval(() => {
        const el = document.getElementById(id)
        if (el || ++tries > 20) { clearInterval(t); el?.scrollIntoView({ block: 'start' }) }
      }, 50)
      return () => clearInterval(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand" aria-hidden="true" />
      <span className="sr-only">Loading page</span>
    </div>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <a href="#main" className="skip-link btn-primary">Skip to main content</a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageLoader />}>
          {/* re-keyed per route so each page slides in */}
          <div key={pathname} className="page-enter">
            <Outlet />
          </div>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
