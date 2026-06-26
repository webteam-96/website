import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, ChevronRight, Clock, UserRound } from 'lucide-react'
import { getClubById } from '../data/clubs'

const initials = (s: string) =>
  s.replace(/\b(Rotary|Club|of)\b/gi, '').trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()

export default function ClubProfilePage() {
  const { id } = useParams<{ id: string }>()
  const club = id ? getClubById(id) : undefined

  if (!club) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-5 py-24 text-center">
        <p className="text-lg font-semibold text-ink">Club not found.</p>
        <Link to="/club-finder" className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Club Finder
        </Link>
      </main>
    )
  }

  return (
    <main className="flex-1 bg-[#f5f8fc]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0a2156] via-[#0c2a66] to-[#0a1f4d] text-white">
        <Skyline />
        <div className="relative mx-auto max-w-[1024px] px-5 py-8 sm:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px] text-white/70">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4 text-brand-gold" strokeWidth={2.5} />
            <Link to="/club-finder" className="hover:text-white">Club Finder</Link>
            <ChevronRight className="h-4 w-4 text-brand-gold" strokeWidth={2.5} />
            <span className="font-medium text-white">{club.name}</span>
          </nav>

          <div className="mt-6 flex items-center gap-5">
            <span className="flex h-[92px] w-[92px] shrink-0 items-center justify-center rounded-full border-4 border-brand-gold bg-white/95 text-2xl font-extrabold text-brand-blue shadow-lg sm:h-[120px] sm:w-[120px] sm:text-3xl">
              {initials(club.name)}
            </span>
            <div>
              <h1 className="text-[28px] font-bold leading-tight sm:text-[40px]">{club.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                <span className="text-white/85">Club ID: {club.clubId}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-[12px] font-semibold text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" /> Active Club
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1024px] space-y-6 px-5 py-8 sm:px-8">
        {/* Back to Club Finder */}
        <Link
          to="/club-finder"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-bluedark"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.25} /> Back to Club Finder
        </Link>

        {/* Meeting Information */}
        <section className="rounded-[20px] bg-white p-6 shadow-card sm:p-7">
          <h2 className="text-[18px] font-bold text-brand-bluedark">Meeting Information</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Detail icon={UserRound} label="President" value={club.president} />
            <Detail icon={CalendarDays} label="Meeting Day" value={club.meetingDay} />
            <Detail icon={Clock} label="Meeting Time" value={club.meetingTime} />
          </div>
        </section>
      </div>
    </main>
  )
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
        <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</p>
        <p className="text-[13.5px] font-medium leading-snug text-ink">{value}</p>
      </div>
    </div>
  )
}

function Skyline() {
  return (
    <svg className="pointer-events-none absolute bottom-0 right-0 h-full w-auto max-w-[45%] text-white/[0.06]" viewBox="0 0 600 160" preserveAspectRatio="xMaxYMax slice" fill="currentColor" aria-hidden>
      <rect x="20" y="90" width="34" height="70" /><rect x="60" y="60" width="40" height="100" /><rect x="106" y="100" width="28" height="60" /><rect x="140" y="40" width="44" height="120" /><rect x="190" y="78" width="32" height="82" /><rect x="228" y="55" width="38" height="105" /><rect x="272" y="20" width="30" height="140" /><rect x="308" y="70" width="42" height="90" /><rect x="356" y="48" width="36" height="112" /><rect x="398" y="96" width="30" height="64" /><rect x="434" y="64" width="44" height="96" /><rect x="484" y="38" width="34" height="122" /><rect x="524" y="84" width="40" height="76" />
    </svg>
  )
}
