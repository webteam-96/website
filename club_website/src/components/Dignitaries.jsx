import { ArrowRight } from 'lucide-react'
import { GearMark } from './Logo'
import Reveal from './Reveal'
import SplitText from './SplitText'
import SpotlightCard from './SpotlightCard'
import { dignitaries as leaders } from '../data/dignitaries'

export default function Dignitaries() {
  return (
    <section className="bg-dotgrid bg-canvas py-14">
      <div className="container-x">
        <div className="mb-12 text-center">
          <p className="label-eyebrow mb-2">Our Leadership</p>
          <SplitText
            as="h2"
            text="Dignitaries & Leaders"
            charDelay={30}
            className="font-heading text-3xl font-extrabold text-navy"
          />
          <Reveal variant="zoom" delay={300} className="mx-auto mt-3 h-1 w-24 rounded-full bg-gold" />
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-24 pt-24 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((l, i) => (
            <Reveal key={l.name} variant="up" delay={i * 120}>
              <SpotlightCard className="group relative rounded-2xl border border-white/15 bg-navy px-6 pb-7 pt-16 text-center shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-12px_rgba(247,166,0,0.28)]">
                {/* lighter inner border frame */}
                <span className="pointer-events-none absolute inset-[5px] rounded-[14px] border border-white/15" />
                {/* top gold seam */}
                <span className="pointer-events-none absolute inset-x-8 top-[5px] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                {/* diagonal sheen on hover — self-clipping; no overflow-hidden so the photo isn't clipped */}
                <span className="glare" />

                {/* floating avatar with a rotating conic-gold ring (rotary-wheel motif) */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[65%]">
                  <div className="avatar-ring relative isolate h-[124px] w-[124px] rounded-full p-[3px]">
                    <img
                      src={l.img}
                      alt={l.name}
                      className="h-full w-full rounded-full border-2 border-white object-cover shadow-lg transition-transform duration-500 ease-[var(--ease-emphasized)] group-hover:-translate-y-1 group-hover:scale-105"
                    />
                    <span className="absolute bottom-1 left-0 flex h-9 w-9 items-center justify-center rounded-full bg-navy shadow-md ring-2 ring-white transition-transform duration-700 ease-out group-hover:rotate-[360deg]">
                      <GearMark className="h-6 w-6" />
                    </span>
                  </div>
                </div>

                {/* name — warms to gold on hover, one specular glint on entrance */}
                <h3 className="relative font-heading text-lg font-bold text-white transition-colors duration-300 group-hover:text-gold-light">
                  <span className="shiny-text" style={{ '--shine-speed': '2s' }}>{l.name}</span>
                </h3>

                {/* role — plain gold text */}
                <p className="relative mt-2 text-sm font-semibold tracking-wide text-gold">
                  {l.role}
                </p>

                {/* hairline divider */}
                <span className="mx-auto mt-4 block h-px w-10 bg-gold/30" />

                {/* CTA — gold outline floods to solid gold on hover (kit .btn shine + spring) */}
                <a
                  href={`#/dignitary/${l.id}`}
                  className="btn group/btn relative mt-4 rounded-full border border-gold/60 bg-transparent px-5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-light shadow-none transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-navy hover:shadow-lg hover:shadow-gold/25"
                >
                  View Profile
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-emphasized)] group-hover/btn:translate-x-1" />
                </a>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
