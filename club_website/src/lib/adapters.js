// Maps the API DTOs (camelCase, server-relative media paths) onto the shapes our
// existing components already consume — so pages can switch to live data with a
// one-line hook and keep their markup. Media paths are absolutised via mediaUrl.
import { mediaUrl } from './media'

const img = (p) => (p ? mediaUrl(p) : null)

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
function monthYear(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d)) return ''
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}
function dmy(iso) {
  if (!iso) return { date: '', day: '', mon: '' }
  const d = new Date(iso)
  if (isNaN(d)) return { date: String(iso), day: '', mon: '' }
  const day = String(d.getDate()).padStart(2, '0')
  const mon = MONTHS[d.getMonth()].slice(0, 3)
  return { date: `${day} ${mon} ${d.getFullYear()}`, day, mon }
}

// ── Directory (DirectoryMemberDto[]) → [{ name, work, img }] ─────────────────
export const adaptDirectory = (dtos) =>
  (dtos || []).map((m) => ({
    name: m.memberName,
    work: m.profession || m.designation || '',
    img: img(m.profilePhotoPath),
  }))

// ── Past Presidents (PastPresidentDto[]) → [{ name, year, img }] ─────────────
export const adaptPastPresidents = (dtos) =>
  (dtos || []).map((p) => ({
    name: p.memberName,
    year: p.yearLabel,
    img: img(p.profilePhotoPath),
  }))

// ── Board of Directors (BoardDirectorDto[]) → [{ name, role, img }] ──────────
export const adaptDirectors = (dtos) =>
  (dtos || []).map((d) => ({
    name: d.memberName,
    role: d.designation,
    img: img(d.profilePhotoPath),
  }))

// ── Newsletters (PublicNewsletterDto[]) → [{ title, date, url }] ─────────────
export const adaptNewsletters = (dtos) =>
  (dtos || []).map((n) => ({
    title: n.title,
    date: monthYear(n.publishDateTime),
    url: n.linkUrl || img(n.filePath),
  }))

// ── Banners (BannerDto[]) → [imageUrl] ──────────────────────────────────────
export const adaptBanners = (dtos) =>
  (dtos || [])
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((b) => img(b.bannerImagePath))
    .filter(Boolean)

// ── Advertisements (AdvertisementDto[]) → [{ img, url }] ─────────────────────
export const adaptAdvertisements = (dtos) =>
  (dtos || [])
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((a) => ({ img: img(a.advertisementImagePath), url: a.documentPath ? img(a.documentPath) : '#' }))
    .filter((a) => a.img)

// ── Projects (PublicProjectDto[]) → our project card shape ──────────────────
// moduleKey from the API maps onto our avenue codes.
const MODULE_TO_AVENUE = {
  CommunityService: 'CP', ClubService: 'CS', VocationalService: 'VS',
  NewGenerationService: 'NGS', InternationalService: 'IS', PublicImage: 'PII',
  ClubEvents: 'CE',
}
export const adaptProjects = (dtos) =>
  (dtos || []).map((p) => {
    const d = dmy(p.projectDate)
    return {
      id: String(p.id),
      avenue: MODULE_TO_AVENUE[p.moduleKey] || p.moduleKey || '',
      title: p.title,
      date: d.date,
      day: d.day,
      mon: d.mon,
      desc: p.description || '',
      cause: p.areaOfFocus || '',
      subCat: p.category || '',
      subSub: '',
      img: img(p.primaryPhotoPath),
      gallery: [img(p.primaryPhotoPath)].filter(Boolean),
      beneficiaries: '',
      cost: '',
      rotarians: '',
      manHours: '',
    }
  })
