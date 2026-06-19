import CircularGallery from './CircularGallery'
import { PROJECT_GALLERY } from '../../data/projectGallery'

export default function ProjectsGallerySection() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-[1200px] px-5 text-center sm:px-8">
        <h2 className="text-[24px] font-bold text-brand-bluedark sm:text-[28px]">Our Projects</h2>
        <span className="mx-auto mt-2 block h-1 w-12 rounded-full bg-brand-gold" />
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
          Drag or scroll to explore real service projects from across District 3170.
        </p>
      </div>

      <div className="relative z-0 -mt-10 h-[420px] sm:-mt-14 sm:h-[500px]">
        <CircularGallery
          items={PROJECT_GALLERY}
          bend={0}
          textColor="#0B2B6B"
          borderRadius={0.06}
          scrollEase={0.02}
        />
      </div>
    </section>
  )
}

export { ProjectsGallerySection }
