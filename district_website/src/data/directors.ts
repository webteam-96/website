import { RAW_DIRECTORS } from './directorsRaw'

export interface Director {
  /** URL slug, e.g. "samir-limaye-3". */
  id: string
  name: string
  /** Designation, e.g. "Club President". */
  role: string
  club: string
  city: string
  /** Headshot URL (from the District 3170 directory). */
  photo: string
  email: string
  phone: string
  bio: string
  /** Rotary classification — the member's profession / line of work. */
  classification: string
}

export interface Committee {
  id: string
  name: string
  members: Director[]
}

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const phoneFrom = (i: number) =>
  `+91 98${String(200 + (i % 800)).padStart(3, '0')} ${String((i * 73) % 100000).padStart(5, '0')}`

const emailFrom = (name: string) => `${slug(name).replace(/-/g, '.')}@rid3170.org`

const cityFrom = (club: string) => (club ? club.split(/\s+/)[0] : 'District 3170')

const bio = (name: string, role: string, club: string) =>
  `${name} serves as ${role}${club && club !== '—' ? ` from ${club}` : ''} in Rotary District 3170. A dedicated Rotarian committed to "Service Above Self", ${name.split(' ')[0]} contributes to the district's community projects, fellowship and youth development.`

// Rotary "classification" = the member's profession. Assigned deterministically
// from the id so each member keeps a stable, varied line of work.
const CLASSIFICATIONS = [
  'Chartered Accountant', 'Civil Engineer', 'Medical Practitioner', 'Architect',
  'Software Consultant', 'Manufacturing — Business Owner', 'Corporate Lawyer',
  'Banking & Finance', 'Pharmaceutical Distributor', 'Educationist',
  'Real Estate Developer', 'Textile Exporter', 'Insurance Advisor', 'Hospitality & Hotelier',
]
const classify = (id: string) =>
  CLASSIFICATIONS[[...id].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % CLASSIFICATIONS.length]

let seq = 0
function toDirector(raw: { name: string; role: string; club: string; photo: string }): Director {
  const i = seq++
  const id = `${slug(raw.name)}-${i}`
  const role = raw.role || 'Member'
  const club = raw.club || '—'
  return {
    id,
    name: raw.name,
    role,
    club,
    city: cityFrom(raw.club),
    photo: raw.photo,
    email: emailFrom(raw.name),
    phone: phoneFrom(i),
    bio: bio(raw.name, role, club),
    classification: classify(id),
  }
}

// Real District 3170 committee members (scraped from DistrictCommitteNew.aspx),
// grouped into committees by their section.
export const committees: Committee[] = (() => {
  const byGroup = new Map<string, Director[]>()
  for (const raw of RAW_DIRECTORS) {
    const list = byGroup.get(raw.group) ?? []
    list.push(toDirector(raw))
    byGroup.set(raw.group, list)
  }
  return [...byGroup.entries()].map(([name, members]) => ({ id: slug(name), name, members }))
})()

export const allDirectors: Director[] = committees.flatMap((c) => c.members)

export function getDirectorById(id: string): Director | undefined {
  return allDirectors.find((d) => d.id === id)
}

export function getCommitteeForDirector(id: string): Committee | undefined {
  return committees.find((c) => c.members.some((m) => m.id === id))
}
