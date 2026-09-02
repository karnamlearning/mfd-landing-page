import { z } from "zod"
import { fontIds, themeIds } from "@mfd/tokens"
import { addonIds, familyIds, lookIds, sectionIds, serviceIds, templateIds, toolIds } from "./ids"

export const credentialSchema = z.object({
  label: z.string(),
  name: z.string(),
  number: z.string(),
})

export const statSchema = z.object({
  value: z.string(),
  label: z.string(),
})

export const detailsSchema = z.object({
  name: z.string(),
  logoUrl: z.string().optional(),
  photoUrl: z.string().optional(),
  heroImageUrl: z.string().optional(),
  heroHeadline: z.string().optional(),
  pitch: z.string().optional(),
  whatsapp: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  city: z.string(),
  languages: z.array(z.string()),
  bio: z.string().optional(),
  bioHi: z.string().optional(),
  credentials: z.array(credentialSchema),
  stats: z.array(statSchema).max(3),
  hours: z.string().optional(),
  arn: z.string().optional(),
  gstin: z.string().optional(),
})

export const testimonialSchema = z.object({
  quote: z.string(),
  name: z.string(),
  city: z.string(),
})

export const faqItemSchema = z.object({
  q: z.string(),
  a: z.string(),
  qHi: z.string().optional(),
  aHi: z.string().optional(),
})

export const wordingLineSchema = z.object({
  title: z.string(),
  body: z.string(),
  titleHi: z.string().optional(),
  bodyHi: z.string().optional(),
})

export const serviceWordingSchema = z.object({
  title: z.string().optional(),
  body: z.string().optional(),
  titleHi: z.string().optional(),
  bodyHi: z.string().optional(),
})

/** Practice-facing words. Empty means use the canned default. AMFI / disclosures stay locked. */
export const wordingSchema = z
  .object({
    aboutTitle: z.string().optional(),
    aboutTitleHi: z.string().optional(),
    whyTitle: z.string().optional(),
    whyTitleHi: z.string().optional(),
    why: z.array(wordingLineSchema).max(4).optional(),
    servicesTitle: z.string().optional(),
    servicesTitleHi: z.string().optional(),
    servicesLead: z.string().optional(),
    servicesLeadHi: z.string().optional(),
    howTitle: z.string().optional(),
    howTitleHi: z.string().optional(),
    howLead: z.string().optional(),
    howLeadHi: z.string().optional(),
    how: z.array(wordingLineSchema).max(6).optional(),
    calcTitle: z.string().optional(),
    calcTitleHi: z.string().optional(),
    calcLead: z.string().optional(),
    calcLeadHi: z.string().optional(),
    contactTitle: z.string().optional(),
    contactTitleHi: z.string().optional(),
    quotesTitle: z.string().optional(),
    quotesTitleHi: z.string().optional(),
    faqTitle: z.string().optional(),
    faqTitleHi: z.string().optional(),
    recordTitle: z.string().optional(),
    recordTitleHi: z.string().optional(),
    cta: z.string().optional(),
    ctaHi: z.string().optional(),
    services: z.record(serviceWordingSchema).optional(),
  })
  .default({})

export const sectionSchema = z.object({
  id: z.enum(sectionIds),
  on: z.boolean(),
})

const LEGACY_LOOK = new Set(["studio", "folio", "counter"])

/** Older drafts stored Studio / Folio / Counter as `family`. Those now map to Practice. */
function liftLegacyFamily(input: unknown) {
  if (!input || typeof input !== "object") return input
  const next = { ...(input as Record<string, unknown>) }
  if (typeof next.family === "string" && LEGACY_LOOK.has(next.family)) {
    if (next.look == null) next.look = next.family
    next.family = "classic"
  }
  return next
}

export const tenantConfigSchema = z.preprocess(
  liftLegacyFamily,
  z.object({
    slug: z.string().min(1),
    family: z.enum(familyIds).default("classic"),
    look: z.enum(lookIds).default("studio"),
    pickedFamily: z.boolean().optional(),
    template: z.enum(templateIds).default("practice"),
    theme: z.enum(themeIds),
    font: z.enum(fontIds),
    addons: z.array(z.enum(addonIds)),
    details: detailsSchema,
    services: z.array(z.enum(serviceIds)),
    sections: z.array(sectionSchema),
    testimonials: z.array(testimonialSchema).default([]),
    faq: z.array(faqItemSchema).default([]),
    wording: wordingSchema,
    calculatorHidden: z.array(z.enum(toolIds)),
  }).superRefine((config, ctx) => {
    for (const locked of ["hero", "contact"] as const) {
      const row = config.sections.find((s) => s.id === locked)
      if (!row) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${locked} must be in sections`,
          path: ["sections"],
        })
      } else if (!row.on) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${locked} cannot be turned off`,
          path: ["sections"],
        })
      }
    }
  }),
)

export type TenantConfig = z.infer<typeof tenantConfigSchema>
export type TenantDetails = z.infer<typeof detailsSchema>
export type Wording = z.infer<typeof wordingSchema>
export type WordingLine = z.infer<typeof wordingLineSchema>
export type ServiceWording = z.infer<typeof serviceWordingSchema>
