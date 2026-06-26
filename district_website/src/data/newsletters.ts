import { RAW_NEWSLETTERS } from './newslettersRaw'

export interface NewsletterItem {
  id: string
  /** Newsletter / bulletin title. */
  title: string
  /** Publishing club name. */
  club: string
  /** Real published date, e.g. "1 Jun 2026". Empty when the source had none. */
  date: string
  /** Public URL of the PDF. */
  pdf: string
}

// The original Governor's Monthly Letter page (allGML.aspx) currently has no records.
export const governorLetters: NewsletterItem[] = []

// Real club bulletins scraped from Newsletter.aspx (title, club, published date, PDF link).
export const clubNewsletters: NewsletterItem[] = RAW_NEWSLETTERS.map((n, i) => ({
  id: `club-${i}`,
  title: n.title,
  club: n.desc,
  date: n.date,
  pdf: n.pdf,
}))
