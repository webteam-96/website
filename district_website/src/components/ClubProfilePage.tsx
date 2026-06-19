import { useMemo, useState, type ComponentType } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Award,
  Baby,
  Briefcase,
  Building2,
  CalendarDays,
  ChevronRight,
  Clock,
  Coins,
  Download,
  Droplets,
  GraduationCap,
  HandHeart,
  Handshake,
  HeartHandshake,
  HeartPulse,
  Info,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Share2,
  Sparkles,
  Target,
  UserPlus,
  Users,
  UsersRound,
} from 'lucide-react'
import { getClubById } from '../data/clubs'

type Icon = ComponentType<{ className?: string; strokeWidth?: string | number }>

const initials = (s: string) =>
  s.replace(/\b(Rotary|Club|of)\b/gi, '').trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()

const portrait = (n: number) =>
  `https://images.pexels.com/photos/${n}/pexels-photo-${n}.jpeg?auto=compress&cs=tinysrgb&w=200`
const PORTRAITS = [7581040, 37145167, 7580766, 7581022]
const PHONES = ['98230 11234', '98450 33421', '97310 88921', '98800 77661']
const LEAD_ROLES = ['President', 'Secretary', 'Treasurer', 'President Elect']

const FOCUS_AREAS: { icon: Icon; label: string; fg: string }[] = [
  { icon: GraduationCap, label: 'Education', fg: 'text-brand-blue' },
  { icon: HeartHandshake, label: 'Community Service', fg: 'text-emerald-600' },
  { icon: HeartPulse, label: 'Health', fg: 'text-rose-500' },
  { icon: Droplets, label: 'Water & Sanitation', fg: 'text-sky-500' },
  { icon: Coins, label: 'Economic Development', fg: 'text-amber-600' },
  { icon: Baby, label: 'Maternal & Child Health', fg: 'text-violet-600' },
  { icon: Leaf, label: 'Environment', fg: 'text-green-600' },
]

const PROJECTS = [
  { name: 'Village Sanitation Drive', description: 'Improving sanitation and hygiene in rural areas.', year: '2024-25', status: 'Completed' },
  { name: 'Scholarship for Students', description: 'Supporting education for underprivileged students.', year: '2024-25', status: 'Ongoing' },
  { name: 'Tree Plantation Initiative', description: 'Promoting green environment and sustainability.', year: '2023-24', status: 'Completed' },
  { name: 'Rural Health Check-up Camp', description: 'Free health check-up and awareness camps.', year: '2023-24', status: 'Completed' },
]
const STATUS_STYLE: Record<string, string> = {
  Completed: 'bg-emerald-500/10 text-emerald-600',
  Ongoing: 'bg-brand-blue/10 text-brand-blue',
  Upcoming: 'bg-amber-500/15 text-amber-600',
}

const SERVICES: { icon: Icon; label: string; bg: string; fg: string }[] = [
  { icon: Users, label: 'Weekly Fellowship Meetings', bg: 'bg-brand-blue/10', fg: 'text-brand-blue' },
  { icon: GraduationCap, label: 'Youth Service Programs', bg: 'bg-emerald-500/10', fg: 'text-emerald-600' },
  { icon: Briefcase, label: 'Vocational Service & Networking', bg: 'bg-violet-500/10', fg: 'text-violet-600' },
  { icon: UserPlus, label: 'New Member Orientation', bg: 'bg-rose-500/10', fg: 'text-rose-500' },
  { icon: Handshake, label: 'Interact & Rotaract Engagement', bg: 'bg-sky-500/10', fg: 'text-sky-600' },
  { icon: Award, label: 'Annual Awards & Recognition', bg: 'bg-amber-500/15', fg: 'text-amber-600' },
]

export default function ClubProfilePage() {
  const { id } = useParams<{ id: string }>()
  const club = id ? getClubById(id) : undefined
  const [lightbox, setLightbox] = useState<string | null>(null)

  const derived = useMemo(() => {
    if (!club) return null
    const women = Math.round(club.memberCount * 0.25)
    const active = Math.round(club.memberCount * 0.66)
    return {
      women,
      womenPct: Math.round((women / club.memberCount) * 100),
      active,
      activePct: Math.round((active / club.memberCount) * 1000) / 10,
      beneficiaries: club.memberCount * 32,
      majorProjects: 12,
      events: 24,
      charterDate: `12 Aug ${club.charterYear}`,
      email: `${club.city.toLowerCase()}3170@gmail.com`,
      website: `www.${club.city.toLowerCase()}rotary.org`,
      clubType: club.clubType === 'Rotary Club' ? 'Regular' : club.clubType,
      leadership: LEAD_ROLES.map((role, i) => ({
        role,
        name: `Rtn. ${club.members[i]?.name ?? 'Member'}`,
        phone: PHONES[i],
        photo: portrait(PORTRAITS[i]),
      })),
      gallery: Array.from({ length: 6 }, (_, i) => `https://picsum.photos/seed/${club.id}g${i}/500/350`),
    }
  }, [club])

  if (!club || !derived) {
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
        <div className="relative mx-auto max-w-[1280px] px-5 py-8 sm:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px] text-white/70">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4 text-brand-gold" strokeWidth={2.5} />
            <Link to="/club-finder" className="hover:text-white">Club Finder</Link>
            <ChevronRight className="h-4 w-4 text-brand-gold" strokeWidth={2.5} />
            <span className="font-medium text-white">{club.name}</span>
          </nav>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <span className="flex h-[92px] w-[92px] shrink-0 items-center justify-center rounded-full border-4 border-brand-gold bg-white/95 text-2xl font-extrabold text-brand-blue shadow-lg sm:h-[120px] sm:w-[120px] sm:text-3xl">
                {initials(club.name)}
              </span>
              <div>
                <h1 className="text-[28px] font-bold leading-tight sm:text-[40px]">{club.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-white/85">Rotary Club ID: {club.clubId}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-[12px] font-semibold text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" /> Active Club
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-blue shadow transition-transform hover:scale-[1.03]">
                <Download className="h-4 w-4" strokeWidth={2.25} /> Download Club Profile
              </button>
              <button type="button" className="flex items-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/40 transition-transform hover:scale-[1.03]">
                <Share2 className="h-4 w-4" strokeWidth={2.25} /> Share Club Profile
              </button>
            </div>
          </div>

          {/* Hero stat strip */}
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5 text-sm">
            <HeroStat icon={CalendarDays} label="Chartered On" value={derived.charterDate} />
            <HeroStat icon={Users} label="Members" value={String(club.memberCount)} />
            <HeroStat icon={UsersRound} label="Women Members" value={`${derived.women} / ${derived.womenPct}%`} />
            <HeroStat icon={Building2} label="Club Type" value={derived.clubType} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] space-y-6 px-5 py-8 sm:px-8">
        {/* Back to Club Finder (top) */}
        <Link
          to="/club-finder"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-bluedark"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.25} /> Back to Club Finder
        </Link>

        {/* Overview: About + Leadership */}
        <div id="overview" className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* About */}
          <div className="rounded-[20px] bg-white p-6 shadow-card sm:p-7">
            <h2 className="flex items-center gap-2.5 text-[18px] font-bold text-brand-bluedark">
              <Info className="h-5 w-5 text-brand-blue" strokeWidth={2} /> About Club
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              {club.name} is committed to service above self. We work together to create lasting change in
              our community and around the world through various impactful projects, fellowship, and
              youth development initiatives.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Detail icon={CalendarDays} label="Meeting Day" value={club.meetingDay} />
              <Detail icon={Clock} label="Meeting Time" value={club.meetingTime} />
              <Detail icon={Building2} label="Meeting Venue" value={club.venue} />
              <Detail icon={MapPin} label="Address" value={club.address} />
              <Detail icon={Mail} label="Email" value={derived.email} href={`mailto:${derived.email}`} />
              <Detail icon={ArrowRight} label="Website" value={derived.website} href={`https://${derived.website}`} />
            </div>
          </div>

          {/* Leadership */}
          <div id="leadership" className="rounded-[20px] bg-white p-6 shadow-card sm:p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-brand-bluedark">Club Leadership</h2>
              <span className="flex items-center gap-1 text-[13px] font-semibold text-brand-blue">
                View All Members <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </div>
            <ul className="mt-3 divide-y divide-divider/70">
              {derived.leadership.map((m) => (
                <li key={m.role} className="flex items-center gap-3 py-3">
                  <img src={m.photo} alt={m.name} className="h-11 w-11 shrink-0 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-ink">{m.name}</p>
                    <p className="text-[12.5px] text-muted">{m.role}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-muted">
                    <Phone className="h-3.5 w-3.5 text-brand-blue" strokeWidth={2} /> {m.phone}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Statistics dashboard */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          <MetricCard icon={UsersRound} fg="text-brand-blue" bg="bg-brand-blue/10" value={String(club.memberCount)} label="Total Members" sub={`${derived.women} Women Members`} />
          <MetricCard icon={Activity} fg="text-emerald-600" bg="bg-emerald-500/10" value={String(derived.active)} label="Active Members" sub={`${derived.activePct}% of total`} />
          <MetricCard icon={Target} fg="text-amber-600" bg="bg-amber-500/15" value={String(derived.majorProjects)} label="Major Projects" sub="This Rotary Year" />
          <MetricCard icon={HandHeart} fg="text-rose-500" bg="bg-rose-500/10" value={derived.beneficiaries.toLocaleString()} label="Beneficiaries" sub="This Rotary Year" />
          <MetricCard icon={CalendarDays} fg="text-violet-600" bg="bg-violet-500/10" value={String(derived.events)} label="Events Conducted" sub="This Rotary Year" />
        </div>

        {/* Focus / Projects / Gallery */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Focus areas */}
          <section id="focus" className="rounded-[20px] bg-white p-6 shadow-card">
            <SectionHead title="Our Focus Areas" action="View All" />
            <ul className="mt-4 space-y-2.5">
              {FOCUS_AREAS.map((f) => (
                <li key={f.label} className="flex items-center gap-3 rounded-xl border border-divider/60 px-3.5 py-2.5 transition-transform hover:-translate-y-0.5">
                  <f.icon className={`h-5 w-5 shrink-0 ${f.fg}`} strokeWidth={2} />
                  <span className="text-[14px] font-medium text-ink">{f.label}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Projects */}
          <section id="projects" className="rounded-[20px] bg-white p-6 shadow-card">
            <SectionHead title="Major Projects" action="View All Projects" />
            <ul className="mt-4 space-y-3">
              {PROJECTS.map((p, i) => (
                <li key={p.name} className="flex gap-3">
                  <img src={`https://picsum.photos/seed/${club.id}p${i}/160/120`} alt="" className="h-[60px] w-[88px] shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-[14px] font-bold text-brand-bluedark">{p.name}</h3>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[12.5px] text-muted">{p.description}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[11.5px] font-medium text-muted">{p.year}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_STYLE[p.status]}`}>{p.status}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Gallery */}
          <section id="gallery" className="rounded-[20px] bg-white p-6 shadow-card">
            <SectionHead title="Photo Gallery" action="View All Photos" />
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {derived.gallery.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightbox(src)}
                  className="group overflow-hidden rounded-xl"
                >
                  <img src={src} alt={`${club.name} photo ${i + 1}`} className="h-24 w-full object-cover transition-transform group-hover:scale-105" />
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Club services */}
        <section className="rounded-[20px] bg-white p-6 shadow-card sm:p-7">
          <h2 className="flex items-center gap-2.5 text-[18px] font-bold text-brand-bluedark">
            <Sparkles className="h-5 w-5 text-brand-blue" strokeWidth={2} /> Club Services &amp; Activities
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
            {SERVICES.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2.5 rounded-xl border border-divider/60 p-4 text-center transition-transform hover:-translate-y-1">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.bg} ${s.fg}`}>
                  <s.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="text-[12.5px] font-semibold leading-snug text-ink">{s.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <img src={lightbox.replace(/\/500\/350$/, '/1000/700')} alt="" className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain" />
        </div>
      )}
    </main>
  )
}

function HeroStat({ icon: Icon, label, value }: { icon: Icon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-5 w-5 text-brand-gold" strokeWidth={2} />
      <div>
        <p className="text-[11px] uppercase tracking-wide text-white/60">{label}</p>
        <p className="text-[14px] font-semibold">{value}</p>
      </div>
    </div>
  )
}

function Detail({ icon: Icon, label, value, href }: { icon: Icon; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
        <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</p>
        {href ? (
          <a href={href} className="break-words text-[13.5px] font-medium text-brand-blue hover:underline">{value}</a>
        ) : (
          <p className="text-[13.5px] font-medium leading-snug text-ink">{value}</p>
        )}
      </div>
    </div>
  )
}

function MetricCard({ icon: Icon, fg, bg, value, label, sub }: { icon: Icon; fg: string; bg: string; value: string; label: string; sub: string }) {
  return (
    <div className="flex items-center gap-3.5 rounded-[18px] bg-white p-4 shadow-card transition-transform hover:-translate-y-1">
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bg} ${fg}`}>
        <Icon className="h-6 w-6" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p className="text-[22px] font-extrabold leading-none text-brand-bluedark">{value}</p>
        <p className="mt-1 text-[13px] font-semibold text-ink">{label}</p>
        <p className="text-[11.5px] text-muted">{sub}</p>
      </div>
    </div>
  )
}

function SectionHead({ title, action }: { title: string; action: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[16px] font-bold text-brand-bluedark">{title}</h2>
      <span className="flex items-center gap-1 text-[12.5px] font-semibold text-brand-blue">
        {action} <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
      </span>
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
