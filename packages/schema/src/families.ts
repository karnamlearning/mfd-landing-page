import type { FontId, ThemeId } from "@mfd/tokens"
import type { FamilyId } from "./ids"

export const familyMeta: Record<
  FamilyId,
  { name: string; blurb: string; theme: ThemeId; font: FontId }
> = {
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
