import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { banners, advertisements } from '../data/site'
import Squares from './Squares'

// Hero: banner slider (images only) on the left, advertisement slider on the right.
export default function Hero() {
  const [idx, setIdx] = useState(0)
  const count = banners.length
  const go = (d) => setIdx((i) => (i + d + count) % count)

  // advertisement slider
  const [adIdx, setAdIdx] = useState(0)
  const adCount = advertisements.length
  const goAd = (d) => setAdIdx((i) => (i + d + adCount) % adCount)
  const currentAd = advertisements[adIdx] || {}

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % count), 5000)
    return () => clearInterval(t)
  }, [count])

  useEffect(() => {
    if (adCount < 2) return
    const t = setInterval(() => setAdIdx((i) => (i + 1) % adCount), 4500)
    return () => clearInterval(t)
  }, [adCount])

  return (
    <section className="relative isolate -mt-20 overflow-hidden pt-24 pb-2">
      {/* light animated grid background (React Bits "Squares" style) */}
      <div className="absolute inset-0 -z-10 bg-canvas" />
      <Squares className="absolute inset-0 -z-10 h-full w-full" />
      {/* soft warm glow up top */}
      <div className="pointer-events-none absolute left-1/2 top-6 -z-10 h-64 w-[55%] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-x relative grid items-start gap-5 lg:grid-cols-[1.91fr_1fr]">
        {/* Left: banner slider — images only (card matches the 996×596 artwork
            so the full banner shows with no crop and no background bars) */}
        <div className="relative aspect-[996/596] overflow-hidden rounded-xl bg-navy-deep shadow-card">
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

        {/* Right: advertisement slider — card matches the 454×518 artwork so the
            full ad shows with no crop and no background bars */}
        <div className="relative aspect-[454/518] overflow-hidden rounded-xl bg-navy-deep shadow-card">
          {advertisements.map((ad, i) => (
            <img
              key={i}
              src={ad.img}
              alt={`Advertisement ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              referrerPolicy="no-referrer"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === adIdx ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {/* whole card links to the current ad (stretched link under the controls) */}
          <a
            href={currentAd.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open advertisement ${adIdx + 1}`}
            className="absolute inset-0 z-10"
          />

          {adCount > 1 && (
            <>
              {/* arrows at edges */}
              <button
                onClick={() => goAd(-1)}
                aria-label="Previous advertisement"
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/25 p-2 text-white backdrop-blur transition hover:bg-gold hover:text-navy"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => goAd(1)}
                aria-label="Next advertisement"
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/25 p-2 text-white backdrop-blur transition hover:bg-gold hover:text-navy"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* dots centered */}
              <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                {advertisements.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setAdIdx(i)}
                    aria-label={`Go to advertisement ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === adIdx ? 'w-6 bg-gold' : 'w-2 bg-white/60 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
