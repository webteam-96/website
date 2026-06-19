import ContactStrip from '../ContactStrip'
import { useYearRange } from '../../context/YearRangeContext'
import HeroCarousel from './HeroCarousel'
import { heroAds, heroSlides } from '../../data/home'

/**
 * Home banner: a full-width 70/30 band — an auto-rotating image carousel beside
 * an auto-rotating advertisement carousel — with the shared contact strip above.
 */
export default function HeroSection() {
  const { yearRange, setYearRange } = useYearRange()

  return (
    <section className="bg-[#f5f8fc]">
      <ContactStrip yearRange={yearRange} onYearChange={setYearRange} />

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <div className="grid gap-5 lg:grid-cols-[7fr_3fr]">
          {/* 70% — image carousel */}
          <HeroCarousel
            slides={heroSlides}
            autoplayMs={5000}
            label="District highlights"
            className="h-[260px] sm:h-[360px] lg:h-[440px]"
          />

          {/* 30% — advertisement carousel */}
          <HeroCarousel
            slides={heroAds}
            autoplayMs={6500}
            badge="Advertisement"
            label="Advertisements"
            className="h-[220px] lg:h-[440px]"
          />
        </div>
      </div>
    </section>
  )
}

export { HeroSection }
