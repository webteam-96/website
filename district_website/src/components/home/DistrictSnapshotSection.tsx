import {
  Building2,
  Clock,
  HandHeart,
  IndianRupee,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { snapshot } from '../../data/home'

const iconMap: Record<string, LucideIcon> = {
  Target,
  Building2,
  HandHeart,
  IndianRupee,
  Clock,
  Users,
}

// Glossy "liquid glass" bubble tint per stat — a soft pastel gradient fill
// with a saturated icon colour, plus the accent bar colour under the label.
// Keyed by the lucide icon name.
const bubble: Record<string, { bg: string; fg: string; accent: string }> = {
  Target: { bg: 'from-amber-100 to-amber-300/80', fg: 'text-amber-600', accent: 'bg-amber-500' },
  Building2: { bg: 'from-sky-100 to-blue-300/80', fg: 'text-blue-600', accent: 'bg-blue-500' },
  HandHeart: { bg: 'from-rose-100 to-rose-300/80', fg: 'text-rose-500', accent: 'bg-rose-500' },
  IndianRupee: { bg: 'from-fuchsia-100 to-violet-300/80', fg: 'text-violet-600', accent: 'bg-violet-500' },
  Clock: { bg: 'from-cyan-100 to-sky-300/80', fg: 'text-sky-600', accent: 'bg-sky-500' },
  Users: { bg: 'from-emerald-100 to-emerald-300/80', fg: 'text-emerald-600', accent: 'bg-emerald-500' },
}

export default function DistrictSnapshotSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#e1ebfb] via-[#e9f0fc] to-[#dbe6f8]">
      {/* Flowing liquid colour blobs behind the glass */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-6 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute -right-16 -top-10 h-72 w-72 rounded-full bg-indigo-300/25 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/3 h-72 w-[28rem] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-72 rounded-full bg-violet-200/30 blur-3xl" />
      </div>

      {/* Faint Rotary wheel watermark behind the heading */}
      <img
        src={`${import.meta.env.BASE_URL}favicon/android-icon-192x192.png`}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-3 w-36 -translate-x-1/2 select-none opacity-[0.07]"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-14">
        <div className="text-center">
          <h2 className="text-[26px] font-extrabold tracking-tight text-brand-bluedark sm:text-[32px]">
            DISTRICT SNAPSHOT
          </h2>
          <span className="mx-auto mt-3 flex items-center justify-center gap-1.5">
            <span className="h-1 w-6 rounded-full bg-brand-blue/30" />
            <span className="h-1 w-10 rounded-full bg-brand-gold" />
          </span>
        </div>

        {/* Outer frosted glass panel */}
        <div className="mt-8 rounded-[28px] border border-white/60 bg-white/30 p-3 shadow-[0_24px_60px_rgba(13,38,92,0.14)] ring-1 ring-white/40 backdrop-blur-xl sm:p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {snapshot.map((stat) => {
              const Icon = iconMap[stat.icon]
              const b = bubble[stat.icon]
              return (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/40 px-3 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-[0_14px_30px_rgba(13,38,92,0.12)]"
                >
                  {/* glossy top edge highlight */}
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

                  {/* liquid glass icon bubble */}
                  <span
                    className={`relative mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${b.bg} shadow-[0_6px_14px_rgba(13,38,92,0.14)] ring-1 ring-white/70`}
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/70 to-transparent opacity-70" />
                    {Icon ? (
                      <Icon
                        className={`relative h-[22px] w-[22px] ${b.fg}`}
                        strokeWidth={2.25}
                      />
                    ) : null}
                  </span>

                  <p className="mt-3 text-[22px] font-extrabold tracking-tight text-brand-bluedark sm:text-[24px]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[12.5px] font-medium text-slate-500">
                    {stat.label}
                  </p>
                  <span className={`mx-auto mt-2.5 block h-1 w-8 rounded-full ${b.accent}`} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
