import HeroSection from './home/HeroSection'
import DignitariesSection from './home/DignitariesSection'
import ProjectsGallerySection from './home/ProjectsGallerySection'
import PhotoGallerySection from './home/PhotoGallerySection'
import QuickLinksSection from './home/QuickLinksSection'
import Reveal from './Reveal'

/**
 * District home / landing page. Shows only real District 3170 content:
 * the hero banner/ad carousel (with the contact strip), the RI President +
 * District Governor, the real project photo galleries, and quick links.
 * The visitor count lives in the shared site footer.
 */
export default function HomePage() {
  return (
    <main className="flex-1 bg-[#f5f8fc]">
      <HeroSection />

      <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8">
        <Reveal>
          <DignitariesSection />
        </Reveal>
      </div>

      <ProjectsGallerySection />

      <PhotoGallerySection />

      <Reveal>
        <QuickLinksSection />
      </Reveal>
    </main>
  )
}
