import { RAW_PROJECTS } from './projectsRaw'

export interface Project {
  id: string
  title: string
  category: string
  categoryLabel: string
  clubName: string
  description: string
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

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const pic = (seed: string) => `https://picsum.photos/seed/${seed}/700/460`

let counter = 0
function toProject(raw: { title: string; club: string; desc: string; photo: string; cat: string; catLabel: string }): Project {
  const i = counter++
  return {
    id: `${slug(raw.title).slice(0, 40)}-${i}`,
    title: raw.title,
    category: raw.cat,
    categoryLabel: raw.catLabel,
    clubName: raw.club || 'Rotary District 3170',
    description: raw.desc || raw.title,
    // Real project photo from the District site (works in <img>; the WebGL
    // CircularGallery uses its own CORS-safe images since these aren't CORS-enabled).
    images: raw.photo ? [raw.photo] : [pic(slug(raw.title))],
  }
}

export const projects: Project[] = RAW_PROJECTS.map(toProject)

export const getProjectById = (id: string): Project | undefined => projects.find((p) => p.id === id)
export const projectsByCategory = (s: string): Project[] => projects.filter((p) => p.category === s)
export const getCategory = (s: string) => PROJECT_CATEGORIES.find((c) => c.slug === s)
