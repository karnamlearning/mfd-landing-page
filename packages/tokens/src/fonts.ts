export const fontIds = ["modern", "formal", "friendly", "classic", "sharp"] as const

export type FontId = (typeof fontIds)[number]

export type FontPairMeta = {
  id: FontId
  name: string
  heading: string
  body: string
  /** CSS variables set on <html> by next/font in apps/web */
  headingVar: string
  bodyVar: string
}

export const fontPairs: Record<FontId, FontPairMeta> = {
  modern: {
    id: "modern",
    name: "Modern",
    heading: "Plus Jakarta Sans",
    body: "Plus Jakarta Sans",
    headingVar: "var(--font-modern)",
    bodyVar: "var(--font-modern)",
  },
  formal: {
    id: "formal",
    name: "Formal",
    heading: "Playfair Display",
    body: "Source Sans 3",
    headingVar: "var(--font-formal-heading)",
    bodyVar: "var(--font-formal-body)",
  },
  friendly: {
    id: "friendly",
    name: "Friendly",
    heading: "Nunito",
    body: "Nunito",
    headingVar: "var(--font-friendly)",
    bodyVar: "var(--font-friendly)",
  },
  classic: {
    id: "classic",
    name: "Classic",
    heading: "Merriweather",
    body: "Lato",
    headingVar: "var(--font-classic-heading)",
    bodyVar: "var(--font-classic-body)",
  },
  sharp: {
    id: "sharp",
    name: "Sharp",
    heading: "DM Sans",
    body: "DM Sans",
    headingVar: "var(--font-sharp)",
    bodyVar: "var(--font-sharp)",
  },
}

export const defaultFontByTemplate = {
  solo: "modern",
  practice: "formal",
  local: "friendly",
} as const satisfies Record<string, FontId>
