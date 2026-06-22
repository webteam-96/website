import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import DomeGallery from './DomeGallery'
import { projects } from '../../data/projects'
import { startScroll, stopScroll } from '../../lib/smoothScroll'

// District photos for the 3D gallery globe (one image per project).
const galleryImages = projects.map((p) => ({ src: p.images[0], alt: p.title }))

interface ActiveImage {
  src: string
  alt: string
}

export default function PhotoGallerySection() {
  const [active, setActive] = useState<ActiveImage | null>(null)

  // While the lightbox is open: pause smooth scroll and close on Escape.
  useEffect(() => {
    if (!active) return
    stopScroll()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      startScroll()
    }
  }, [active])

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
        <DomeGallery
          images={galleryImages}
          grayscale={false}
          overlayBlurColor="#f5f8fc"
          onImageClick={setActive}
        />
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt || 'Photo'}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/25"
          >
            <X className="h-5 w-5" />
          </button>

          <figure
            className="flex max-h-full max-w-full flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
            />
            {active.alt && (
              <figcaption className="mt-3 max-w-[92vw] text-center text-sm text-white/90">
                {active.alt}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </section>
  )
}

export { PhotoGallerySection }
