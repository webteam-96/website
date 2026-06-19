import { RAW_PROJECTS } from './projectsRaw'

export interface Project {
  id: string
  title: string
  category: string
  categoryLabel: string
  description: string
  details: string
  date: string
  cost: number
  beneficiaries: number
  manHours: number
  rotarians: number
  rotaractors: number
  clubId: string
  clubName: string
  districtNo: string
  president: string
  presidentEmail: string
  images: string[]
}

export const PROJECT_CATEGORIES = [
  { slug: 'community-service', label: 'Community Service' },
  { slug: 'club-service', label: 'Club Service' },
  { slug: 'vocational-service', label: 'Vocational Service' },
  { slug: 'new-generation-service', label: 'New Generation Service' },
  { slug: 'international-service', label: 'International Service' },
  { slug: 'public-image', label: 'Public Image' },
]

const DATES = [
  '12 Apr 2026', '03 Mar 2026', '21 Feb 2026', '15 Jan 2026',
  '08 Dec 2025', '19 Nov 2025', '05 Oct 2025', '27 Sep 2025',
]

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const pic = (seed: string) => `https://picsum.photos/seed/${seed}/700/460`

let counter = 0
function toProject(raw: { title: string; club: string; desc: string; photo: string; cat: string; catLabel: string }): Project {
  const i = counter++
  const club = raw.club || 'Rotary District 3170'
  return {
    id: `${slug(raw.title).slice(0, 40)}-${i}`,
    title: raw.title,
    category: raw.cat,
    categoryLabel: raw.catLabel,
    description: raw.desc || raw.title,
    details: `${raw.desc || raw.title} This ${raw.catLabel.toLowerCase()} project was carried out by ${club} as part of Rotary District 3170's commitment to "Service Above Self", bringing together Rotarians and Rotaractors to create lasting impact.`,
    date: DATES[i % DATES.length],
    cost: 25000 + (i % 8) * 15000,
    beneficiaries: 150 + (i % 10) * 85,
    manHours: 80 + (i % 6) * 45,
    rotarians: 12 + (i % 5) * 6,
    rotaractors: 5 + (i % 4) * 4,
    clubId: `RID3170-${i}`,
    clubName: club,
    districtNo: '3170',
    president: '',
    presidentEmail: `${slug(club)}@rid3170.org`,
    // Real project photo from the District site (works in <img>; the WebGL
    // CircularGallery uses its own CORS-safe images since these aren't CORS-enabled).
    images: raw.photo ? [raw.photo] : [pic(slug(raw.title))],
  }
}

export const projects: Project[] = RAW_PROJECTS.map(toProject)

export const getProjectById = (id: string): Project | undefined => projects.find((p) => p.id === id)
export const projectsByCategory = (s: string): Project[] => projects.filter((p) => p.category === s)
export const getCategory = (s: string) => PROJECT_CATEGORIES.find((c) => c.slug === s)
