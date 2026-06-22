import HeroSection from './home/HeroSection'
import DignitariesSection from './home/DignitariesSection'
import DistrictSnapshotSection from './home/DistrictSnapshotSection'
import ProjectsGallerySection from './home/ProjectsGallerySection'
import UpcomingEventsSection from './home/UpcomingEventsSection'
import PhotoGallerySection from './home/PhotoGallerySection'
import Reveal from './Reveal'

/**
 * District home / landing dashboard. Full-width sections render their own
 * containers; the paired sections sit in two-column grids inside one container.
 */
export default function HomePage() {
  return (
    <main className="flex-1 bg-[#f5f8fc]">
      <HeroSection />

      <Reveal>
        <DistrictSnapshotSection />
      </Reveal>

      <ProjectsGallerySection />

      <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8">
        <Reveal>
          <div className="grid items-stretch gap-5 lg:grid-cols-2">
            <DignitariesSection />
            <UpcomingEventsSection />
          </div>
        </Reveal>
      </div>

      <PhotoGallerySection />
    </main>
  )
}
