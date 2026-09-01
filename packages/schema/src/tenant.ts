import { z } from "zod"
import { fontIds, themeIds } from "@mfd/tokens"
import { sectionIds, serviceIds, templateIds, toolIds } from "./ids"

export const credentialSchema = z.object({
  label: z.string().min(1),
  name: z.string().min(1),
  number: z.string().min(1),
})

export const statSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
})

export const detailsSchema = z.object({
  name: z.string().min(1),
  logoUrl: z.string().optional(),
  photoUrl: z.string().optional(),
  heroImageUrl: z.string().optional(),
  heroHeadline: z.string().optional(),
  pitch: z.string().optional(),
  whatsapp: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  city: z.string().min(1),
  languages: z.array(z.string()),
  bio: z.string().optional(),
  bioHi: z.string().optional(),
  credentials: z.array(credentialSchema),
  stats: z.array(statSchema).max(3),
  hours: z.string().optional(),
  arn: z.string().optional(),
})

export const sectionSchema = z.object({
  id: z.enum(sectionIds),
  on: z.boolean(),
})

export const tenantConfigSchema = z
  .object({
    slug: z.string().min(1),
    template: z.enum(templateIds),
    theme: z.enum(themeIds),
    font: z.enum(fontIds),
    addons: z.array(z.literal("tools")),
    details: detailsSchema,
    services: z.array(z.enum(serviceIds)),
    sections: z.array(sectionSchema),
    calculatorHidden: z.array(z.enum(toolIds)),
  })
  .superRefine((config, ctx) => {
    for (const locked of ["hero", "contact"] as const) {
      const row = config.sections.find((s) => s.id === locked)
      if (row && !row.on) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${locked} cannot be turned off`,
          path: ["sections"],
        })
      }
    }
  })

export type TenantConfig = z.infer<typeof tenantConfigSchema>
export type TenantDetails = z.infer<typeof detailsSchema>
