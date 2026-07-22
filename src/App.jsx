import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Companies from './pages/Companies'
import CompanyApps from './pages/CompanyApps'
import Contact from './pages/Contact'
import Websites from './pages/Websites'
import ScrollToTop from './pages/Scrolltotop'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"                     element={<Home />} />
        <Route path="/companies"            element={<Companies />} />
        <Route path="/companies/:companyId" element={<CompanyApps />} />
        <Route path="/contact"              element={<Contact />} />
        <Route path="/websites"             element={<Websites />} />
      </Routes>
    </BrowserRouter>
  )
}