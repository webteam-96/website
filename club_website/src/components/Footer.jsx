import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

// Exact replica of the live rcthanehills.rotaryindia.org footer.
const quickLinks = [
  { label: 'Home', href: '#/' },
  { label: 'Directory', href: '#/directory' },
  { label: 'Directors', href: '#/directors' },
  { label: 'Calendar', href: '#/calendar' },
  { label: 'Newsletter', href: '#/newsletter' },
]

const socials = [
  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/rcthanehills/' },
  { Icon: Twitter, label: 'Twitter', href: 'https://twitter.com/RCThaneHills' },
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/rotaryclubofthanehills/?hl=en' },
  { Icon: Linkedin, label: 'Linkedin', href: 'https://www.linkedin.com/company/rotary-club-of-thane-hills/' },
]

const INDIGO = '#2D3383'
const GOLD = '#FFCC00'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="text-center" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* ── footer_first (indigo) ───────────────────────────────────── */}
      <div className="px-4 pb-7 pt-10 text-white" style={{ backgroundColor: INDIGO }}>
        <div className="mx-auto max-w-4xl">
          <h3 className="font-light leading-tight" style={{ fontSize: '28px' }}>
            Quick Links
          </h3>
          {/* gold dots */}
          <div className="mt-2 flex items-center justify-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
          </div>

          {/* quick-link nav */}
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-white transition-opacity hover:opacity-75" style={{ fontSize: '16px' }}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* divider */}
          <div className="mx-auto my-6 h-px w-full max-w-[600px]" style={{ backgroundColor: '#eeeeee', opacity: 0.3 }} />

          {/* contact details */}
          <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-2" style={{ fontSize: '16px' }}>
            <a href="mailto:samir_limaye@rediffmail.com" className="inline-flex items-center gap-2 text-white transition-opacity hover:opacity-75">
              <Mail className="h-4 w-4" /> samir_limaye@rediffmail.com
            </a>
            <a href="tel:9820063775" className="inline-flex items-center gap-2 text-white transition-opacity hover:opacity-75">
              <Phone className="h-4 w-4" /> 9820063775
            </a>
          </div>
        </div>
      </div>

      {/* ── footer_second (white) ───────────────────────────────────── */}
      <div className="bg-white px-4 py-6">
        <div className="mx-auto max-w-2xl">
          {/* social links */}
          <ul className="flex flex-wrap items-center justify-center gap-x-9 gap-y-2">
            {socials.map(({ Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-opacity hover:opacity-75"
                  style={{ color: '#333333', fontSize: '16px' }}
                >
                  <Icon className="h-4 w-4" style={{ color: INDIGO }} /> {label}
                </a>
              </li>
            ))}
          </ul>

          <hr className="my-4 border-gray-200" />

          <div style={{ color: 'rgba(33, 37, 41, 0.75)', fontSize: '16px' }}>
            Powered by Roster On Wheels <span>{year}</span> | All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
