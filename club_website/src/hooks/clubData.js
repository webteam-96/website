// Domain data hooks. Each reads the active websiteId (and year where relevant)
// from context, calls the axios service, maps the DTO to our component shape,
// and falls back to the bundled static snapshot. Year-scoped hooks list
// selectedYearId in their deps, so they refetch automatically on year change.
import { useWebsiteId } from '../contexts/WebsiteContext'
import { useYear } from '../contexts/YearContext'
import { useApiData } from './useApiData'
import * as svc from '../services/clubService'
import * as map from '../lib/adapters'

import { members as staticMembers } from '../data/directory'
import { presidents as staticPresidents } from '../data/presidents'
import { projects as staticProjects, projectsByAvenue, getProject } from '../data/projects'
import { banners as staticBanners, advertisements as staticAds, newsletters as staticNewsletters } from '../data/site'

const staticMeetings = projectsByAvenue('CE')

// ── Year-independent ────────────────────────────────────────────────────────
export function useDirectory(fallback = staticMembers) {
  const id = useWebsiteId()
  return useApiData(() => svc.fetchDirectory(id).then(map.adaptDirectory), [id], fallback)
}

export function usePastPresidents(fallback = staticPresidents) {
  const id = useWebsiteId()
  return useApiData(() => svc.fetchPastPresidents(id).then(map.adaptPastPresidents), [id], fallback)
}

// ── Year-scoped (refetch when the header year changes) ──────────────────────
export function useDirectors(fallback = []) {
  const id = useWebsiteId()
  const { selectedYearId } = useYear()
  return useApiData(() => svc.fetchDirectors(id, selectedYearId).then(map.adaptDirectors), [id, selectedYearId], fallback)
}

export function useProjects(fallback = staticProjects) {
  const id = useWebsiteId()
  const { selectedYearId } = useYear()
  return useApiData(() => svc.fetchProjects(id, selectedYearId).then(map.adaptProjects), [id, selectedYearId], fallback)
}

export function useMeetings(fallback = staticMeetings) {
  const id = useWebsiteId()
  const { selectedYearId } = useYear()
  return useApiData(() => svc.fetchMeetings(id, selectedYearId).then(map.adaptProjects), [id, selectedYearId], fallback)
}

export function useProjectDetail(projectId, fallback) {
  const id = useWebsiteId()
  const { selectedYearId } = useYear()
  return useApiData(
    () => svc.fetchProjectDetail(id, projectId, selectedYearId).then(map.adaptProjectDetail),
    [id, projectId, selectedYearId],
    fallback ?? getProject(projectId),
  )
}

export function useBanners(fallback = staticBanners) {
  const id = useWebsiteId()
  const { selectedYearId } = useYear()
  return useApiData(() => svc.fetchBanners(id, selectedYearId).then(map.adaptBanners), [id, selectedYearId], fallback)
}

export function useAdvertisements(fallback = staticAds) {
  const id = useWebsiteId()
  const { selectedYearId } = useYear()
  return useApiData(() => svc.fetchAdvertisements(id, selectedYearId).then(map.adaptAdvertisements), [id, selectedYearId], fallback)
}

export function useNewsletters(limit = 12, fallback = staticNewsletters) {
  const id = useWebsiteId()
  const { selectedYearId } = useYear()
  return useApiData(() => svc.fetchNewsletters(id, selectedYearId, limit).then(map.adaptNewsletters), [id, selectedYearId, limit], fallback)
}

export function useAbout(fallback = null) {
  const id = useWebsiteId()
  const { selectedYearId } = useYear()
  return useApiData(() => svc.fetchAbout(id, selectedYearId).then(map.adaptAbout), [id, selectedYearId], fallback)
}

export function useIntlPresident(fallback = null) {
  const id = useWebsiteId()
  const { selectedYearId } = useYear()
  return useApiData(() => svc.fetchInternationalPresident(id, selectedYearId).then(map.adaptIntlPresident), [id, selectedYearId], fallback)
}

export function useDistrictGovernor(fallback = null) {
  const id = useWebsiteId()
  const { selectedYearId } = useYear()
  return useApiData(() => svc.fetchDistrictGovernor(id, selectedYearId).then(map.adaptDistrictGovernor), [id, selectedYearId], fallback)
}
