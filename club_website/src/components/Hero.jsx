import { useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1400&q=80',
    eyebrow: 'TOGETHER, WE',
    title: 'Create Lasting Change',
    accent: 'in Our Community',
    text: 'Empowering lives through service, fellowship and meaningful projects across Thane.',
  },
  {
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1400&q=80',
    eyebrow: 'SERVICE ABOVE SELF',
    title: 'Building Brighter',
    accent: 'Futures Together',
    text: 'Join hands with 110+ members making a measurable difference every single day.',
  },
  {
    img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1400&q=80',
    eyebrow: 'JOIN THE MOVEMENT',
    title: 'Serve. Connect.',
    accent: 'Inspire Change',
    text: 'Fellowship and impact go hand in hand at the Rotary Club of Thane Hills.',
  },
]

export default function Hero() {
  const [idx, setIdx] = useState(0)
  const slide = slides[idx]
  const go = (d) => setIdx((i) => (i + d + slides.length) % slides.length)

  return (
    <section className="relative isolate -mt-20 overflow-hidden pt-24 pb-2">
      {/* full-section background image */}
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/* overlay: keep the top clear so the banner shows behind the floating pill,
          then fade to light so the carousel + ad card stay highlighted */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/30 via-white/70 to-canvas/90" />

      <div className="container-x relative grid gap-5 lg:grid-cols-[1.85fr_1fr]">
        {/* Left: hero carousel */}
        <div className="relative h-[460px] overflow-hidden rounded-xl shadow-card md:h-[560px]">
          {slides.map((s, i) => (
            <img
              key={i}
              src={s.img}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === idx ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy/70 to-transparent" />

          <div
            key={idx}
            className="hero-slide-in relative z-10 flex h-full max-w-lg flex-col justify-center px-8 md:px-12"
          >
            <span className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
              {slide.eyebrow}
            </span>
            <h1 className="font-heading text-[2rem] font-extrabold leading-[1.1] text-white md:text-[2.75rem]">
              {slide.title}
              <span className="mt-1 block font-script text-[2rem] font-bold text-gold md:text-[2.75rem]">
                {slide.accent}
              </span>
            </h1>
            <p className="mt-4 max-w-md text-sm text-white/85 md:text-[15px]">{slide.text}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#" className="btn-gold">
                DISCOVER OUR PROJECTS <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#" className="btn-outline-white">JOIN OUR MISSION</a>
            </div>
          </div>

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
            {slides.map((_, i) => (
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

        {/* Right: advertisement card */}
        <a href="#" className="block overflow-hidden rounded-xl shadow-card">
          <img
            src="https://www.bestclubsupplies.com/images/RZ26BAN2.jpg"
            alt="Advertisement"
            className="h-full w-full object-cover"
          />
        </a>
      </div>
    </section>
  )
}
