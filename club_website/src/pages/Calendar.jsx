import { useMemo, useState } from 'react'
import {
  Cake, Heart, CalendarDays, ChevronLeft, ChevronRight, ArrowRight, Sparkles,
} from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Avatar from '../components/Avatar'
import Reveal from '../components/Reveal'
import { birthdays, anniversaries } from '../data/specialDates'
import { projectsByAvenue } from '../data/projects'
import { members } from '../data/directory'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const MON_ABBR = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const MON = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 }

// member name → photo lookup, so the lists show real faces
const norm = (s) => s.toLowerCase().replace(/^(dr|ca|mr|mrs|ms|smt|shri)\.?\s+/i, '').replace(/\s+/g, ' ').trim()
const PHOTOS = members.reduce((m, x) => {
  if (x.img) m[norm(x.name)] = x.img
  return m
}, {})

// events = the club's real dated meetings / events (CE avenue), linked to detail pages
const eventItems = projectsByAvenue('CE')
  .map((p) => ({ name: p.title, day: +p.day, month: MON[p.mon], id: p.id }))
  .filter((e) => e.month && e.day)

const CATS = {
  birthday: {
    label: 'Birthdays', single: 'Birthday', icon: Cake,
    iconWrap: 'bg-emerald-100 text-emerald-600', dot: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-600', todayBg: 'bg-emerald-50 ring-1 ring-emerald-200',
    foot: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
  },
  anniversary: {
    label: 'Anniversaries', single: 'Anniversary', icon: Heart,
    iconWrap: 'bg-orange-100 text-orange-500', dot: 'bg-orange-500',
    badge: 'bg-orange-50 text-orange-500', todayBg: 'bg-orange-50 ring-1 ring-orange-200',
    foot: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
  },
  event: {
    label: 'Events', single: 'Event', icon: CalendarDays,
    iconWrap: 'bg-blue-100 text-blue-600', dot: 'bg-blue-500',
    badge: 'bg-blue-50 text-blue-600', todayBg: 'bg-blue-50 ring-1 ring-blue-200',
    foot: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
  },
}
const ORDER = ['birthday', 'anniversary', 'event']
const DATA = { birthday: birthdays, anniversary: anniversaries, event: eventItems }

const TODAY = { day: 23, month: 6 } // site context: 23 June 2026

function StatCard({ icon: Icon, label, value, wrap }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${wrap}`}>
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
        <p className="font-heading text-2xl font-extrabold leading-none text-navy">{value}</p>
        <p className="mt-0.5 text-[11px] text-muted">This Month</p>
      </div>
    </div>
  )
}

function ListCard({ catKey, items, month, onClear, selected }) {
  const c = CATS[catKey]
  return (
    <div className="flex h-[360px] flex-col rounded-2xl border border-gray-100 bg-white shadow-card">
      <div className="flex shrink-0 items-center gap-2 px-4 pb-2 pt-4">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.iconWrap}`}>
          <c.icon className="h-4 w-4" />
        </span>
        <h3 className="font-heading text-[15px] font-extrabold text-navy">{c.label}</h3>
        <span className="ml-auto rounded-full bg-canvas px-2.5 py-0.5 text-xs font-bold text-muted">{items.length}</span>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-3">
        {items.length === 0 ? (
          <p className="px-2 py-10 text-center text-xs text-muted">None {selected ? 'on this day' : 'this month'}</p>
        ) : (
          items.map((it, i) => {
            const isToday = month === TODAY.month - 1 && it.day === TODAY.day
            const photo = catKey !== 'event' ? PHOTOS[norm(it.name)] : null
            const Row = catKey === 'event' ? 'a' : 'div'
            const props = catKey === 'event' ? { href: `#/project/${it.id}` } : {}
            return (
              <Row
                key={(it.id || it.name) + i}
                {...props}
                className={`flex items-center gap-3 rounded-xl p-2 transition ${
                  isToday ? c.todayBg : 'hover:bg-canvas'
                } ${catKey === 'event' ? 'group cursor-pointer' : ''}`}
              >
                {catKey === 'event' ? (
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${c.iconWrap}`}>
                    <CalendarDays className="h-4 w-4" />
                  </span>
                ) : photo ? (
                  <img src={photo} alt={it.name} loading="lazy" className="h-9 w-9 shrink-0 rounded-full object-cover object-top ring-2 ring-gray-100" />
                ) : (
                  <Avatar name={it.name} className="h-9 w-9 text-[11px]" />
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold leading-tight text-navy">{it.name}</p>
                  <p className="flex items-center gap-1 text-[11px] text-muted">
                    {it.day} {MONTH_NAMES[month]}
                    {isToday && <span className={`rounded px-1.5 text-[10px] font-bold ${c.badge}`}>Today</span>}
                  </p>
                </div>

                {/* day · month badge */}
                <span className={`flex h-10 w-11 shrink-0 flex-col items-center justify-center rounded-lg ${c.badge}`}>
                  <span className="font-heading text-sm font-extrabold leading-none">{String(it.day).padStart(2, '0')}</span>
                  <span className="text-[9px] font-bold leading-tight">{MON_ABBR[month]}</span>
                </span>

                {catKey === 'event' && (
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-navy" />
                )}
              </Row>
            )
          })
        )}
      </div>

      {selected && (
        <button onClick={onClear} className={`m-3 mt-0 shrink-0 rounded-xl py-2.5 text-center text-xs font-bold transition ${c.foot}`}>
          Show whole month
        </button>
      )}
    </div>
  )
}

export default function Calendar() {
  const [month, setMonth] = useState(5) // June
  const [selected, setSelected] = useState(null)

  const monthItems = useMemo(() => {
    const r = {}
    ORDER.forEach((k) => {
      r[k] = DATA[k].filter((it) => it.month === month + 1).sort((a, b) => a.day - b.day)
    })
    return r
  }, [month])

  const byDay = useMemo(() => {
    const map = {}
    ORDER.forEach((k) => monthItems[k].forEach((it) => {
      ;(map[it.day] ||= { birthday: 0, anniversary: 0, event: 0 })[k]++
    }))
    return map
  }, [monthItems])

  const cells = useMemo(() => {
    const year = month >= 6 ? 2025 : 2026
    const lead = (new Date(year, month, 1).getDay() + 6) % 7
    const days = new Date(year, month + 1, 0).getDate()
    return [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]
  }, [month])

  const go = (d) => {
    setMonth((m) => (m + d + 12) % 12)
    setSelected(null)
  }

  const listFor = (k) => (selected ? monthItems[k].filter((it) => it.day === selected) : monthItems[k])
  const total = ORDER.reduce((n, k) => n + monthItems[k].length, 0)
  const isCurrentMonth = month === TODAY.month - 1
  const yearLabel = month >= 6 ? 2025 : 2026

  return (
    <>
      <Breadcrumb
        eyebrow="Special Dates"
        title="Calendar"
        trail={[{ label: 'Home', href: '#/' }, { label: 'Calendar' }]}
      />

      <div className="bg-canvas">
        <div className="container-x py-10">
          {/* ── stat cards ── */}
          <Reveal variant="up">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={Cake} label="Birthdays" value={monthItems.birthday.length} wrap={CATS.birthday.iconWrap} />
              <StatCard icon={Heart} label="Anniversaries" value={monthItems.anniversary.length} wrap={CATS.anniversary.iconWrap} />
              <StatCard icon={CalendarDays} label="Events" value={String(monthItems.event.length).padStart(2, '0')} wrap={CATS.event.iconWrap} />
              <StatCard icon={Sparkles} label="Total Activities" value={total} wrap="bg-purple-100 text-purple-600" />
            </div>
          </Reveal>

          {/* ── month label ── */}
          <div className="mb-4 mt-8 flex items-center justify-between">
            <h2 className="font-heading text-xl font-extrabold text-navy">
              {MONTH_NAMES[month]} {yearLabel}
              {selected && <span className="ml-2 text-base font-bold text-gold-cta">· {selected} {MONTH_NAMES[month]}</span>}
            </h2>
          </div>

          {/* ── 3 lists + calendar ── */}
          <Reveal variant="up">
            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
              {ORDER.map((k) => (
                <ListCard
                  key={k}
                  catKey={k}
                  items={listFor(k)}
                  month={month}
                  selected={selected}
                  onClear={() => setSelected(null)}
                />
              ))}

              {/* calendar widget — white body, navy header only.
                  On mobile it sits on top; from lg up it returns to source order (last). */}
              <div className="order-first flex h-[360px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card lg:order-none">
                {/* navy header bar */}
                <div className="flex shrink-0 items-center justify-between bg-navy-deep px-4 py-3.5">
                  <button onClick={() => go(-1)} aria-label="Previous month" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="font-heading text-sm font-extrabold text-white">{MONTH_NAMES[month]} {yearLabel}</span>
                  <button onClick={() => go(1)} aria-label="Next month" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* white date grid */}
                <div className="grid flex-1 grid-cols-7 content-center gap-0.5 px-3 py-3 text-center">
                  {WEEK.map((d, i) => (
                    <div key={i} className="pb-1 text-[10px] font-bold text-muted">{d}</div>
                  ))}
                  {cells.map((day, i) => {
                    if (day === null) return <div key={`b${i}`} />
                    const marks = byDay[day]
                    const isToday = isCurrentMonth && day === TODAY.day
                    const isSel = selected === day
                    return (
                      <button
                        key={day}
                        onClick={() => setSelected(isSel ? null : day)}
                        disabled={!marks}
                        className={`relative mx-auto flex h-9 w-9 flex-col items-center justify-center rounded-full text-[12px] font-semibold transition ${
                          isSel
                            ? 'bg-gold font-extrabold text-navy shadow-md ring-2 ring-gold/40'
                            : isToday
                            ? 'bg-navy-deep font-extrabold text-white'
                            : marks
                            ? 'text-ink hover:bg-canvas'
                            : 'text-ink'
                        }`}
                      >
                        <span>{day}</span>
                        {marks && (
                          <span className="absolute bottom-[3px] flex gap-[2px]">
                            {ORDER.map((k) =>
                              marks[k] ? <span key={k} className={`h-1.5 w-1.5 rounded-full ${isSel ? 'bg-navy' : isToday ? 'bg-white' : CATS[k].dot}`} /> : null,
                            )}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* legend */}
                <div className="flex shrink-0 items-center justify-center gap-4 border-t border-gray-100 py-3">
                  {ORDER.map((k) => (
                    <span key={k} className="flex items-center gap-1.5 text-[11px] font-semibold text-muted">
                      <span className={`h-2 w-2 rounded-full ${CATS[k].dot}`} /> {CATS[k].single}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
