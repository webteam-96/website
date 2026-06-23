import { Award, Mail, Phone, ArrowLeft } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Reveal from '../components/Reveal'
import { getDignitary } from '../data/dignitaries'

export default function DignitaryProfile({ id }) {
  const d = getDignitary(id)

  if (!d) {
    return (
      <div className="container-x py-24 text-center">
        <p className="text-muted">Profile not found.</p>
        <a href="#/" className="mt-4 inline-flex items-center gap-1 font-semibold text-gold-cta">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </a>
      </div>
    )
  }

  return (
    <>
      <Breadcrumb
        eyebrow="Dignitaries of Rotary"
        title={d.name}
        titleClassName="uppercase tracking-wide"
        trail={[{ label: 'Home', href: '#/' }, { label: 'Dignitaries' }, { label: d.role }]}
      />

      <div className="bg-canvas">
        <div className="container-x py-12">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            {/* Left: photo card */}
            <Reveal variant="up" className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-card">
                <img
                  src={d.img}
                  alt={d.name}
                  className="mx-auto h-44 w-44 rounded-full object-cover object-top shadow-md ring-4 ring-gold/40"
                />
                <h2 className="mt-5 font-heading text-xl font-bold text-navy">{d.name}</h2>
                <p className="mt-1.5 flex items-center justify-center gap-1.5 text-sm font-semibold text-gold-cta">
                  <Award className="h-4 w-4" /> {d.designation}
                </p>
                <span className="mt-3 inline-block rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-navy">
                  {d.year}
                </span>

                {(d.email || d.phone) && (
                  <div className="mt-5 space-y-2 border-t border-gray-100 pt-5 text-sm">
                    {d.email && (
                      <a href={`mailto:${d.email}`} className="flex items-center justify-center gap-2 text-muted hover:text-navy">
                        <Mail className="h-4 w-4 text-gold" /> {d.email}
                      </a>
                    )}
                    {d.phone && (
                      <a href={`tel:${d.phone.replace(/\s/g, '')}`} className="flex items-center justify-center gap-2 text-muted hover:text-navy">
                        <Phone className="h-4 w-4 text-gold" /> {d.phone}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Reveal>

            {/* Right: bio */}
            <Reveal variant="up" delay={120}>
              <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-card md:p-9">
                <h3 className="font-heading text-2xl font-extrabold text-navy">About {d.name}</h3>
                <div className="mt-3 h-1 w-16 rounded-full bg-gold" />

                {d.bio.length > 0 ? (
                  <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink">
                    {d.bio.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                ) : (
                  <p className="mt-6 text-[15px] leading-relaxed text-muted">
                    {d.name} serves as {d.designation} of the Rotary Club of Thane Hills for {d.year}.
                    A detailed profile will be available soon.
                  </p>
                )}

                <a
                  href="#/"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-deep"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Home
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  )
}
