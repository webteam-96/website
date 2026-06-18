import type { ReactNode } from 'react'
import { ChevronRight, Facebook, Link as LinkIcon, Share2, Zap } from 'lucide-react'

const ROTARY_LINKS = ['Rotary.org', 'Rotary Zones 4, 5, 6 & 7', 'Rotary Fellowship', 'Rotary Blog']
const QUICK_LINKS = ['Home', 'District Committee', 'Clubs Finder', 'Club Projects']

const FADE_MASK = 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 38%, black 60%)'

export default function SiteFooter() {
  return (
    <footer className="relative mt-12 overflow-hidden text-white">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e2f73] to-[#0a2154]" aria-hidden />

      {/* Decorative banner (waves + people + gear) anchored right, faded on the left */}
      <img
        src="/footer_banner.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-full w-auto max-w-[70%] object-cover object-right opacity-90"
        style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
      />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-x-8 gap-y-10 px-6 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-5">
        {/* Brand — official district logo on a white panel so it reads on the dark footer */}
        <div className="flex items-center">
          <span className="inline-flex items-center rounded-xl bg-white px-4 py-3 shadow-card">
            <img src="/3170.png" alt="Rotary District 3170" className="h-9 w-auto" />
          </span>
        </div>

        {/* Rotary Links */}
        <FooterColumn title="Rotary Links" icon={<LinkIcon className="h-4 w-4 text-brand-gold" strokeWidth={2.2} />}>
          {ROTARY_LINKS.map((label) => (
            <FooterLink key={label} label={label} />
          ))}
        </FooterColumn>

        {/* Quick Links */}
        <FooterColumn title="Quick Links" icon={<Zap className="h-4 w-4 text-brand-gold" strokeWidth={2.2} />}>
          {QUICK_LINKS.map((label) => (
            <FooterLink key={label} label={label} />
          ))}
        </FooterColumn>

        {/* Social */}
        <FooterColumn title="Social Media Links" icon={<Share2 className="h-4 w-4 text-brand-gold" strokeWidth={2.2} />}>
          <a
            href="#"
            className="flex items-center gap-2.5 text-sm text-white/85 transition-colors hover:text-white"
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </a>
        </FooterColumn>

        {/* Tagline */}
        <div className="flex flex-col items-start justify-center sm:col-span-2 lg:col-span-1 lg:items-end">
          <p className="text-sm font-medium text-white/85 lg:text-right">Together, we</p>
          <p className="-mt-1 font-script text-[42px] font-bold leading-none text-brand-gold">
            Create Change
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  icon,
  children,
}: {
  title: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 text-[15px] font-semibold">
        {icon}
        {title}
      </h3>
      <ul className="space-y-3">{children}</ul>
    </div>
  )
}

function FooterLink({ label }: { label: string }) {
  return (
    <li>
      <a
        href="#"
        className="group flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
      >
        <ChevronRight className="h-4 w-4 text-brand-gold transition-transform group-hover:translate-x-0.5" />
        {label}
      </a>
    </li>
  )
}
