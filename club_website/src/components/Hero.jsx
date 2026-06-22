import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { banners, advertisement } from '../data/site'

// Hero: banner slider (images only) on the left, advertisement card on the right.
export default function Hero() {
  const [idx, setIdx] = useState(0)
  const count = banners.length
  const go = (d) => setIdx((i) => (i + d + count) % count)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % count), 5000)
    return () => clearInterval(t)
  }, [count])

  return (
    <section className="relative isolate -mt-20 overflow-hidden pt-24 pb-2">
      {/* full-section background image */}
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/30 via-white/70 to-canvas/90" />

      <div className="container-x relative grid gap-5 lg:grid-cols-[1.85fr_1fr]">
        {/* Left: banner slider — images only */}
        <div className="relative h-[460px] overflow-hidden rounded-xl bg-navy-deep shadow-card md:h-[560px]">
          {banners.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Rotary Club of Thane Hills banner ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              referrerPolicy="no-referrer"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === idx ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {/* arrows at edges */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/25 p-2 text-white backdrop-blur transition hover:bg-gold hover:text-navy"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/25 p-2 text-white backdrop-blur transition hover:bg-gold hover:text-navy"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* dots centered */}
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === idx ? 'w-6 bg-gold' : 'w-2 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: advertisement card (real ad → thanelitfest.in) */}
        <a
          href={advertisement.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-[460px] overflow-hidden rounded-xl shadow-card md:h-[560px]"
        >
          <img
            src={advertisement.img}
            alt="Advertisement"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </a>
      </div>
    </section>
  )
}
