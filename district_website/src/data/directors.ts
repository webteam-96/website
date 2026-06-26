import { RAW_DIRECTORS } from './directorsRaw'

export interface Director {
  /** URL slug, e.g. "samir-limaye-3". */
  id: string
  name: string
  /** Designation, e.g. "Club President". */
  role: string
  club: string
  /** Headshot URL (from the District 3170 directory). */
  photo: string
  /** Real email — present only for the District Board officers. */
  email?: string
}

export interface Committee {
  id: string
  name: string
  members: Director[]
}

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// The only real emails on the original site — the 4 District Board officers.
const REAL_EMAILS: Record<string, string> = {
  'Arun Daniel Bhandare': 'erarun_12@yahoo.co.in',
  'Prashant Suresh Mehta': 'prashant1234@yahoo.com',
  'Venkatesh Hanamantrao Deshpande': 'vhd1954@gmail.com',
  'Ganesh G. Bhat': 'rtnganeshbhat@gmail.com',
}

let seq = 0
function toDirector(raw: { name: string; role: string; club: string; photo: string }): Director {
  const i = seq++
  const id = `${slug(raw.name)}-${i}`
  return {
    id,
    name: raw.name,
    role: raw.role || 'Member',
    club: raw.club || '—',
    photo: raw.photo,
    email: REAL_EMAILS[raw.name],
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
