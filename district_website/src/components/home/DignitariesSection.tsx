import { useState } from 'react'
import { User } from 'lucide-react'
import { dignitaries } from '../../data/home'

// px width of the photo stub — the perforation/notches are pinned to this x.
const STUB = 132

/** A dignitary rendered as an event-style ticket: photo stub + perforation + details. */
function DignitaryTicket({
  name,
  role,
  term,
  photo,
  club,
}: {
  name: string
  role: string
  term: string
  photo: string
  club?: string
}) {
  const [failed, setFailed] = useState(false)

  return (
    <article className="relative flex min-h-[156px] rounded-2xl bg-slate-50 shadow-card ring-1 ring-divider/60">
      {/* Stub — full-bleed photo */}
      <div
        className="relative shrink-0 overflow-hidden rounded-l-2xl bg-gradient-to-b from-brand-blue to-brand-bluedark"
        style={{ width: STUB }}
      >
        {failed ? (
          <span className="flex h-full w-full items-center justify-center text-white/90">
            <User className="h-14 w-14" aria-hidden="true" />
          </span>
        ) : (
          <img
            src={photo}
            alt={name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        )}
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-6 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
          RID 3170
        </span>
      </div>

      {/* Perforation: dashed line + punched notches at the seam */}
      <span
        className="pointer-events-none absolute inset-y-3 z-10 border-l-2 border-dashed border-slate-300"
        style={{ left: STUB }}
      />
      <span
        className="absolute z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ left: STUB, top: 0 }}
      />
      <span
        className="absolute z-10 h-3.5 w-3.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white"
        style={{ left: STUB, bottom: 0 }}
      />

      {/* Body — details */}
      <div className="flex flex-1 flex-col justify-center rounded-r-2xl px-5 py-4 antialiased">
        <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-brand-blue/60">
          Dignitary
        </p>
        <h3 className="font-script text-[30px] font-bold leading-[1.05] text-brand-bluedark">
          {name}
        </h3>
        <p className="mt-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-brand-gold">
          {role}
        </p>
        <p className="mt-1 text-[12px] font-medium text-slate-500">{term}</p>
        {club && (
          <p className="mt-0.5 text-[12px] font-medium text-slate-500">
            Rotary Club of {club}
          </p>
        )}
      </div>
    </article>
  )
}

/**
 * DignitariesSection — COLUMN block (white card, h-full) so a parent grid can
 * place it beside Upcoming Events. Shows the President + District Governor as
 * event-style ticket cards.
 */
export default function DignitariesSection() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-card ring-1 ring-divider/50">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-brand-bluedark">Dignitaries of Rotary</h2>
      </div>

      <div className="mt-4 grid flex-1 grid-cols-1 content-center gap-4">
        {dignitaries.map((d) => (
          <DignitaryTicket key={d.name} name={d.name} role={d.role} term={d.term} photo={d.photo} club={d.club} />
        ))}
      </div>
    </div>
  )
}
