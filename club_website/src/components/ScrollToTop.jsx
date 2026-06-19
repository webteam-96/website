import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-navy shadow-lg transition-all hover:scale-110 hover:bg-gold-light"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
