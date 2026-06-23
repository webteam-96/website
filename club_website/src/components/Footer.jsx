import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { GearMark } from './Logo'

const quickLinks = [
  { label: 'Home', href: '#/' },
  { label: 'About Us', href: '#/about' },
  { label: 'Directors', href: '#/directors' },
  { label: 'Directory', href: '#/directory' },
  { label: 'Calendar', href: '#/calendar' },
  { label: 'Projects', href: '#/projects' },
  { label: 'Newsletters', href: '#/newsletter' },
  { label: 'Past Presidents', href: '#/past-presidents' },
]
const socials = [
  { Icon: Facebook, href: 'https://www.facebook.com/rcthanehills/' },
  { Icon: Twitter, href: 'https://twitter.com/RCThaneHills' },
  { Icon: Instagram, href: 'https://www.instagram.com/rotaryclubofthanehills/?hl=en' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/company/rotary-club-of-thane-hills/' },
]

function Column({ title, items }) {
  return (
    <div>
      <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-gold">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i.label}>
            <a href={i.href} className="text-sm text-white/70 transition-colors hover:text-gold">{i.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-navy-deep text-white">
      {/* background image — hands holding a heart (community / service) */}
      <img
        src="/images/stock/footer-heart.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60"
      />
      {/* navy overlay so the content stays readable */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-deep/95 via-navy/90 to-navy-deep/96" />
      {/* large rotary-wheel watermark */}
      <GearMark className="wheel-spin pointer-events-none absolute -right-16 -top-20 -z-10 h-72 w-72 opacity-[0.08]" />
      <GearMark className="wheel-spin pointer-events-none absolute -bottom-24 -left-20 -z-10 h-80 w-80 opacity-[0.06]" />

      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div className="lg:col-span-1">
          <a href="#/" className="inline-flex rounded-xl bg-white p-3 shadow-md" aria-label="Rotary Club of Thane Hills — Home">
            <img
              src="/images/logo/rcth-wordmark.png"
              alt="Rotary Club of Thane Hills"
              className="h-11 w-auto"
            />
          </a>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Service Above Self. We are committed to making a positive difference in the lives of
            people across Thane through fellowship and service.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-navy"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <Column title="Quick Links" items={quickLinks} />

        {/* Contact */}
        <div>
          <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-gold">Contact Us</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span className="min-w-0 break-words">Smt. Savitridevi Thirani High School, Road No. 1, Vartak Nagar, Thane West, Maharashtra 400606</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              <a href="tel:9820063775" className="hover:text-gold">9820063775</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              <a href="mailto:samir_limaye@rediffmail.com" className="min-w-0 break-words hover:text-gold">samir_limaye@rediffmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/60 sm:flex-row">
          <p>© 2026 Rotary Club of Thane Hills. All Rights Reserved.</p>
          <p>Service Above Self · Chartered 20 May 1991</p>
        </div>
      </div>
    </footer>
  )
}
