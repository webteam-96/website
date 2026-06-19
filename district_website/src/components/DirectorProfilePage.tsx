import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Building2, Mail, MapPin, Phone, User } from 'lucide-react'
import { useState } from 'react'
import { getCommitteeForDirector, getDirectorById } from '../data/directors'
import PageBanner from './PageBanner'

export default function DirectorProfilePage() {
  const { id } = useParams<{ id: string }>()
  const director = id ? getDirectorById(id) : undefined
  const committee = id ? getCommitteeForDirector(id) : undefined
  const [imgFailed, setImgFailed] = useState(false)

  if (!director) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-5 py-24 text-center">
        <p className="text-lg font-semibold text-ink">Director not found.</p>
        <Link
          to="/district-committee"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Directors
        </Link>
      </main>
    )
  }

  return (
    <main className="flex-1">
      <PageBanner
        title={director.name}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'District Committee', to: '/district-committee' },
          { label: director.name },
        ]}
        width="max-w-[1100px]"
      />

      <div className="mx-auto max-w-[1100px] px-5 py-8 sm:px-8">
        <Link
          to="/district-committee"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-bluedark"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.25} /> Back to Directors
        </Link>

        <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-divider/50">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">
            {/* Photo panel */}
            <div className="relative min-h-[280px] overflow-hidden bg-[#0a1c44]">
              <div className="absolute inset-0 bg-gradient-to-b from-[#0c265f] to-[#0a1c44]" />
              {director.photo && !imgFailed ? (
                <img
                  src={director.photo}
                  alt={director.name}
                  onError={() => setImgFailed(true)}
                  className="relative h-full w-full object-cover object-top"
                />
              ) : (
                <div className="relative flex h-full items-center justify-center">
                  <User className="h-28 w-28 text-white/25" strokeWidth={1.25} />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-brand-gold">
                {director.role}
              </p>
              <h2 className="mt-1 text-[24px] font-bold leading-tight text-brand-bluedark">
                {director.name}
              </h2>
              <span className="mt-2 block h-[3px] w-12 rounded-full bg-brand-gold" />

              <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoRow icon={Building2} label="Club" value={director.club} />
                <InfoRow icon={MapPin} label="City" value={director.city} />
                {committee && <InfoRow icon={User} label="Committee" value={committee.name} />}
                <InfoRow
                  icon={Mail}
                  label="Email"
                  value={director.email}
                  href={`mailto:${director.email}`}
                />
                <InfoRow
                  icon={Phone}
                  label="Phone"
                  value={director.phone}
                  href={`tel:${director.phone.replace(/\s/g, '')}`}
                />
              </dl>

              <div className="mt-6 border-t border-divider pt-5">
                <h3 className="text-sm font-bold text-brand-bluedark">Classification</h3>
                <p className="mt-2 text-[14px] font-medium text-ink">{director.classification}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail
  label: string
  value: string
  href?: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
        <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</dt>
        {href ? (
          <a
            href={href}
            className="block truncate text-[14px] font-medium text-ink transition-colors hover:text-brand-blue"
          >
            {value}
          </a>
        ) : (
          <dd className="text-[14px] font-medium text-ink">{value}</dd>
        )}
      </div>
    </div>
  )
}
