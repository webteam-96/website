import { ArrowRight, HeartHandshake } from 'lucide-react'
import Reveal from './Reveal'
import SplitText from './SplitText'
import SpotlightCard from './SpotlightCard'
import { projects, avenueOf } from '../data/projects'

// Four real, high-impact 2025-26 projects (most beneficiaries), each linking to
// its full detail page.
const featured = [...projects]
  .filter((p) => p.beneficiaries && p.beneficiaries !== '0')
  .sort((a, b) => Number(b.beneficiaries.replace(/,/g, '')) - Number(a.beneficiaries.replace(/,/g, '')))
  .slice(0, 4)

export default function FeaturedProjects() {
  return (
    <div className="flex flex-col">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <SplitText
          as="h3"
          text="Featured Projects"
          charDelay={30}
          className="font-heading text-xl font-bold text-navy sm:text-2xl"
        />
        <Reveal
          as="a"
          variant="right"
          href="#/projects"
          className="link-underline text-[11px] font-bold uppercase tracking-wide text-gold-cta"
        >
          View All Projects <ArrowRight className="h-3.5 w-3.5" />
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p, i) => {
          const av = avenueOf(p.avenue)
          return (
            <Reveal as="article" key={p.id} variant="up" delay={i * 110} className="h-full">
              <a href={`#/project/${p.id}`} className="block h-full">
                <SpotlightCard className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card transition-all hover:-translate-y-1.5 hover:shadow-cardHover">
                  <div className="img-zoom relative h-40">
                    <img src={p.img} alt={p.title} className="h-full w-full object-cover" />
                    <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow ${av?.color}`}>
                      {av?.label}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h4 className="font-heading text-[15px] font-bold leading-snug text-navy line-clamp-2">{p.title}</h4>
                    {p.desc && <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">{p.desc}</p>}
                    <div className="mt-auto pt-3">
                      <p className="flex items-center gap-1.5 text-sm font-extrabold text-gold-cta">
                        <HeartHandshake className="h-4 w-4" /> {p.beneficiaries} Beneficiaries
                      </p>
                      <span className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-navy px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-all group-hover:bg-gold group-hover:text-navy">
                        Read More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              </a>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
