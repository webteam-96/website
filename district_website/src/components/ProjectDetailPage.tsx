import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Building2 } from 'lucide-react'
import { getCategory, getProjectById } from '../data/projects'
import PageBanner from './PageBanner'

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = id ? getProjectById(id) : undefined
  const cat = project ? getCategory(project.category) : undefined
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState<string | null>(null)

  if (!project) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-5 py-24 text-center">
        <p className="text-lg font-semibold text-ink">Project not found.</p>
        <Link to="/" className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </main>
    )
  }

  const backTo = `/club-projects/${project.category}`

  return (
    <main className="flex-1 bg-[#f5f8fc]">
      <PageBanner
        title={project.title}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: cat?.label ?? 'Club Projects', to: backTo },
          { label: project.title },
        ]}
        width="max-w-[1100px]"
        rightSlot={
          <span className="rounded-full bg-brand-gold px-3 py-1 text-[12px] font-semibold text-[#0a1f4d]">
            {cat?.label}
          </span>
        }
      />

      <div className="mx-auto max-w-[1100px] space-y-6 px-5 py-8 sm:px-8">
        <Link to={backTo} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-bluedark">
          <ArrowLeft className="h-4 w-4" strokeWidth={2.25} /> Back to {cat?.label}
        </Link>

        {/* Gallery */}
        <div className={`grid gap-4 ${project.images.length > 1 ? 'lg:grid-cols-[1.6fr_1fr]' : ''}`}>
          <button
            type="button"
            onClick={() => setLightbox(project.images[active])}
            className="overflow-hidden rounded-2xl shadow-card"
          >
            <img src={project.images[active]} alt={project.title} className="h-[260px] w-full object-cover sm:h-[420px]" />
          </button>
          {project.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 lg:grid-cols-2">
              {project.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`overflow-hidden rounded-xl ring-2 transition ${i === active ? 'ring-brand-blue' : 'ring-transparent hover:ring-brand-blue/40'}`}
                >
                  <img src={src} alt={`${project.title} ${i + 1}`} className="h-16 w-full object-cover lg:h-[88px]" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* About + organising club */}
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-[20px] bg-white p-6 shadow-card sm:p-7">
            <h2 className="text-[18px] font-bold text-brand-bluedark">About the Project</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">{project.description}</p>
          </section>

          <section className="rounded-[20px] bg-white p-6 shadow-card sm:p-7">
            <h2 className="text-[18px] font-bold text-brand-bluedark">Organised By</h2>
            <div className="mt-4 flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                <Building2 className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Rotary Club</p>
                <p className="text-[15px] font-semibold text-brand-blue">{project.clubName}</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 p-6" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <img src={lightbox} alt={project.title} className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain" />
        </div>
      )}
    </main>
  )
}
