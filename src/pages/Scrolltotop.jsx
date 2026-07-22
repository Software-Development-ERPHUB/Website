import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Mount this once, inside <BrowserRouter> but outside/above <Routes>,
// in App.jsx. It scrolls to the top of the page every time the route
// (pathname) changes — covers clicking links, navigate(), back/forward,
// AND a hard refresh (since the browser also mounts fresh on refresh).
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}