import type { FontId, ThemeId } from "@mfd/tokens"
import type { FamilyId, LookId } from "./ids"

export function familyOf(config: { family?: FamilyId | string | null }): FamilyId {
  const id = config.family
  if (id === "herald" || id === "lumen" || id === "classic") return id
  return "classic"
}

/** Looks were removed as editor choices. Classic always uses the original layout. */
export function lookOf(_config?: { look?: LookId | string | null; family?: string | null }): LookId {
  return "studio"
}

/** Solo or Practice. Older `local` drafts count as Practice. */
export function templateOf(config?: { template?: string | null }): "practice" | "solo" {
  return config?.template === "solo" ? "solo" : "practice"
}

export const templateMeta: Record<"practice" | "solo", { name: string; blurb: string }> = {
  practice: {
    name: "Practice",
    blurb: "The full site: wide hero, credentials, stats, and quotes on by default.",
  },
  solo: {
    name: "Solo",
    blurb: "A leaner page. Portrait in the hero, fewer blocks on until you add them.",
  },
}

export const familyMeta: Record<
  FamilyId,
  { name: string; blurb: string; theme: ThemeId; font: FontId }
> = {
  classic: {
    name: "Practice",
    blurb: "Photo, service cards, and a WhatsApp button. The usual advisor site.",
    theme: "forest",
    font: "formal",
  },
  herald: {
    name: "Newspaper",
    blurb: "A city-paper masthead and columns. Not a product landing page.",
    theme: "newsprint",
    font: "classic",
  },
  lumen: {
    name: "Night",
    blurb: "Dark glass and glow. A night-desk feel.",
    theme: "dusk",
    font: "sharp",
  },
}

export const lookMeta: Record<LookId, { name: string; blurb: string; theme: ThemeId; font: FontId }> = {
  studio: {
    name: "Studio",
    blurb: "Lifestyle hero, service cards, credentials — the look you already know.",
    theme: "forest",
    font: "formal",
  },
  folio: {
    name: "Folio",
    blurb: "Editorial and type-first. Photo beside the words, services as a reading list.",
    theme: "sand",
    font: "classic",
  },
  counter: {
    name: "Counter",
    blurb: "Bold bands, centred hero, stats up front. High contrast and compact.",
    theme: "ink",
    font: "sharp",
  },
}
