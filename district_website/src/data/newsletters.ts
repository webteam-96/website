import { RAW_NEWSLETTERS } from './newslettersRaw'

export interface NewsletterItem {
  id: string
  title: string
  /** Display date / period, e.g. "June 2026" or "Q1 2025-26". */
  date: string
  description: string
  /** Public URL of the PDF. */
  pdf: string
}

const GOV_PDFS = ['/newsletters/governor-jun-2026.pdf', '/newsletters/governor-may-2026.pdf']

const MONTHS = [
  'June 2026', 'May 2026', 'April 2026', 'March 2026', 'February 2026', 'January 2026',
  'December 2025', 'November 2025', 'October 2025', 'September 2025', 'August 2025', 'July 2025',
]

export const governorLetters: NewsletterItem[] = MONTHS.map((m, i) => ({
  id: `gov-${m.toLowerCase().replace(/\s+/g, '-')}`,
  title: "Governor's Monthly Letter",
  date: m,
  description: `District Governor's message, club highlights and upcoming events for ${m}.`,
  pdf: GOV_PDFS[i % GOV_PDFS.length],
}))

// Real club bulletins scraped from Newsletter.aspx (titles, dates, PDF links).
export const clubNewsletters: NewsletterItem[] = RAW_NEWSLETTERS.map((n, i) => ({
  id: `club-${i}`,
  title: n.desc ? `${n.desc} — ${n.title}` : n.title,
  date: n.date || 'Recent',
  description: `Club bulletin from ${n.desc || 'District 3170'} — projects, fellowship and member updates.`,
  pdf: n.pdf,
}))
