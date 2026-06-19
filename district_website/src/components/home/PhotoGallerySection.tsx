import DomeGallery from './DomeGallery'
import { projects } from '../../data/projects'

// District photos for the 3D gallery globe (one image per project).
const galleryImages = projects.map((p) => ({ src: p.images[0], alt: p.title }))

export default function PhotoGallerySection() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-[1200px] px-5 text-center sm:px-8">
        <h2 className="text-[24px] font-bold text-brand-bluedark sm:text-[28px]">Photo Gallery</h2>
        <span className="mx-auto mt-2 block h-1 w-12 rounded-full bg-brand-gold" />
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
          Moments from across District 3170 — drag to spin the globe, click a photo to enlarge.
        </p>
      </div>

      <div className="relative mt-6 h-[520px] sm:h-[600px]">
        <DomeGallery images={galleryImages} grayscale={false} overlayBlurColor="#f5f8fc" />
      </div>
    </section>
  )
}

export { PhotoGallerySection }
