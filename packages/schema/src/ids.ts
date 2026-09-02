export const familyIds = ["classic", "herald", "lumen"] as const
export type FamilyId = (typeof familyIds)[number]

export const lookIds = ["studio", "folio", "counter"] as const
export type LookId = (typeof lookIds)[number]

export const templateIds = ["solo", "practice", "local"] as const
export type TemplateId = (typeof templateIds)[number]

export const sectionIds = [
  "hero",
  "about",
  "credentials",
  "services",
  "stats",
  "how",
  "calculators",
  "testimonials",
  "faq",
  "contact",
  "whatsapp_strip",
] as const
export type SectionId = (typeof sectionIds)[number]

export const lockedSectionIds = ["hero", "contact"] as const

export const serviceIds = [
  "mutual_funds",
  "sip",
  "goals",
  "stp_swp",
  "retirement",
  "life_insurance",
  "health_insurance",
  "bonds",
] as const
export type ServiceId = (typeof serviceIds)[number]

export const defaultServiceIds: ServiceId[] = ["mutual_funds", "sip", "goals", "retirement", "stp_swp", "bonds"]

export const baseToolIds = ["sip", "lumpsum", "goal_sip", "retirement"] as const
export const addonToolIds = [
  "swp",
  "nps",
  "inflation",
  "compounding",
  "goal_planner",
  "sip_stepup",
  "lumpsum_target",
] as const
export const toolIds = [...baseToolIds, ...addonToolIds] as const
export type ToolId = (typeof toolIds)[number]

export const addonIds = ["tools", "bilingual"] as const
export type AddonId = (typeof addonIds)[number]
