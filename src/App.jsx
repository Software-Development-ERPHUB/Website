import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

// Route-level code splitting: only the home page ships in the main bundle.
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Solutions = lazy(() => import('./pages/Solutions'))
const Industries = lazy(() => import('./pages/Industries'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Technology = lazy(() => import('./pages/Technology'))
const Leadership = lazy(() => import('./pages/Leadership'))
const Careers = lazy(() => import('./pages/Careers'))
const Team = lazy(() => import('./pages/Team'))
const Contact = lazy(() => import('./pages/Contact'))
const Faq = lazy(() => import('./pages/Faq'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))
const News = lazy(() => import('./pages/News'))
const NewsDetail = lazy(() => import('./pages/NewsDetail'))
// CMS dashboard (separate layout, loaded only at /admin)
const AdminApp = lazy(() => import('./admin/AdminApp'))
// ERP portfolio — the in-house ERP work for Voltech Group
const ErpHome = lazy(() => import('./pages/erp/ErpHome'))
const ErpCompany = lazy(() => import('./pages/erp/ErpCompany'))
const ErpWebsites = lazy(() => import('./pages/erp/ErpWebsites'))

function LegacyCompanyRedirect() {
  const { id } = useParams()
  return <Navigate to={`/erp/companies/${id}`} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<Suspense fallback={null}><AdminApp /></Suspense>} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="industries" element={<Industries />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="technology" element={<Technology />} />
          <Route path="leadership" element={<Leadership />} />
          <Route path="team" element={<Team />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<Faq />} />
          <Route path="news" element={<News />} />
          <Route path="news/:slug" element={<NewsDetail />} />
          <Route path="privacy-policy" element={<Legal kind="privacy" />} />
          <Route path="terms" element={<Legal kind="terms" />} />

          <Route path="erp" element={<ErpHome />} />
          <Route path="erp/companies/:companyId" element={<ErpCompany />} />
          <Route path="erp/websites" element={<ErpWebsites />} />

          {/* Old routes from the previous ERP-portfolio site — keep links working */}
          <Route path="companies" element={<Navigate to="/erp#companies" replace />} />
          <Route path="companies/:id" element={<LegacyCompanyRedirect />} />
          <Route path="websites" element={<Navigate to="/erp/websites" replace />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
