import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Directors from './pages/Directors'

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash.replace(/^#/, '') || '/')
  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash.replace(/^#/, '') || '/')
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

export default function App() {
  const route = useHashRoute()

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main>
        {route === '/about' ? <About /> : route === '/directors' ? <Directors /> : <Home />}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
