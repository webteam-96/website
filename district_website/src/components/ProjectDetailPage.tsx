import { useState, type ComponentType } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  HandCoins,
  Hash,
  Landmark,
  Mail,
  Sparkles,
  User,
  Users,
  UsersRound,
} from 'lucide-react'
import { getCategory, getProjectById } from '../data/projects'
import PageBanner from './PageBanner'

type Icon = ComponentType<{ className?: string; strokeWidth?: string | number }>

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

  const stats: { icon: Icon; label: string; value: string; bg: string; fg: string }[] = [
    { icon: HandCoins, label: 'Project Cost', value: `₹ ${project.cost.toLocaleString('en-IN')}`, bg: 'bg-emerald-500/10', fg: 'text-emerald-600' },
    { icon: Users, label: 'Beneficiaries', value: project.beneficiaries.toLocaleString('en-IN'), bg: 'bg-brand-blue/10', fg: 'text-brand-blue' },
    { icon: Clock, label: 'Man Hours', value: project.manHours.toLocaleString('en-IN'), bg: 'bg-amber-500/15', fg: 'text-amber-600' },
    { icon: UsersRound, label: 'Rotarians Involved', value: String(project.rotarians), bg: 'bg-violet-500/10', fg: 'text-violet-600' },
    { icon: Sparkles, label: 'Rotaractors Involved', value: String(project.rotaractors), bg: 'bg-rose-500/10', fg: 'text-rose-500' },
  ]

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
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-brand-gold px-3 py-1 text-[12px] font-semibold text-[#0a1f4d]">
              {cat?.label}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[13px] text-white/80">
              <CalendarDays className="h-4 w-4 text-brand-gold" strokeWidth={2} /> {project.date}
            </span>
          </div>
        }
      />

      <div className="mx-auto max-w-[1100px] space-y-6 px-5 py-8 sm:px-8">
        <Link to={backTo} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-bluedark">
          <ArrowLeft className="h-4 w-4" strokeWidth={2.25} /> Back to {cat?.label}
        </Link>

        {/* Gallery */}
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <button
            type="button"
            onClick={() => setLightbox(project.images[active])}
            className="overflow-hidden rounded-2xl shadow-card"
          >
            <img src={project.images[active]} alt={project.title} className="h-[260px] w-full object-cover sm:h-[380px]" />
          </button>
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
        </div>

        {/* Impact stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3 rounded-[18px] bg-white p-4 shadow-card">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.bg} ${s.fg}`}>
                <s.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="text-[18px] font-extrabold leading-none text-brand-bluedark">{s.value}</p>
                <p className="mt-1 text-[12px] font-medium text-muted">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* About + club info */}
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-[20px] bg-white p-6 shadow-card sm:p-7">
            <h2 className="text-[18px] font-bold text-brand-bluedark">About the Project</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">{project.details}</p>
          </section>

          <section className="rounded-[20px] bg-white p-6 shadow-card sm:p-7">
            <h2 className="text-[18px] font-bold text-brand-bluedark">Organised By</h2>
            <p className="mt-1 text-[15px] font-semibold text-brand-blue">{project.clubName}</p>
            <dl className="mt-4 space-y-3">
              <InfoRow icon={Hash} label="Club ID" value={project.clubId} />
              <InfoRow icon={Landmark} label="District No." value={project.districtNo} />
              <InfoRow icon={CalendarDays} label="Project Date" value={project.date} />
              <InfoRow icon={User} label="President" value={project.president} />
              <InfoRow icon={Mail} label="President Email" value={project.presidentEmail} href={`mailto:${project.presidentEmail}`} />
            </dl>
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

function InfoRow({ icon: Icon, label, value, href }: { icon: Icon; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
        <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</dt>
        {href ? (
          <a href={href} className="break-words text-[13.5px] font-medium text-brand-blue hover:underline">{value}</a>
        ) : (
          <dd className="text-[13.5px] font-medium text-ink">{value}</dd>
        )}
      </div>
    </div>
  )
}
