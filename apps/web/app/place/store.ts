"use client"

import { create } from "zustand"
import {
  applyTemplate,
  emptyPracticeConfig,
  familyMeta,
  lockedSectionIds,
  type AddonId,
  type FamilyId,
  type SectionId,
  type ServiceId,
  type TemplateId,
  type TenantConfig,
  type TenantDetails,
  type Wording,
} from "@mfd/schema"
import type { FontId, ThemeId } from "@mfd/tokens"

export const STEPS = [
  { id: "details", n: 1, label: "Details" },
  { id: "template", n: 2, label: "Variant" },
  { id: "theme", n: 3, label: "Theme" },
  { id: "font", n: 4, label: "Font" },
  { id: "sections", n: 5, label: "Sections" },
  { id: "review", n: 6, label: "Review" },
  { id: "leads", n: 7, label: "Leads" },
  { id: "publish", n: 8, label: "Publish" },
] as const

export type StepId = (typeof STEPS)[number]["id"]
export type Viewport = "mobile" | "desktop"
export type TenantStatus = "draft" | "trial" | "active" | "suspended"
export type TenantPlan = "monthly" | "yearly" | null

export type PreviewSpot =
  | "header"
  | "top"
  | "photo"
  | "about"
  | "credentials"
  | "services"
  | "stats"
  | "how"
  | "calculators"
  | "testimonials"
  | "faq"
  | "contact"
  | "whatsapp"

export type PreviewFocus = { id: PreviewSpot; tick: number }

let lastPreviewFocusAt = 0

export type ServerDraft = {
  config: TenantConfig
  slugLocked: boolean
  status: TenantStatus
  plan: TenantPlan
  trialEndsAt: string | null
  publicUrl: string
  impersonating?: boolean
}

const LOCKED = new Set<string>(lockedSectionIds)

type DraftState = {
  config: TenantConfig
  step: StepId
  viewport: Viewport
  previewOpen: boolean
  hydrated: boolean
  saving: boolean
  dirty: boolean
  saveError: string | null
  slugLocked: boolean
  status: TenantStatus
  plan: TenantPlan
  trialEndsAt: string | null
  publicUrl: string
  impersonating: boolean
  previewFocus: PreviewFocus | null
  setStep: (step: StepId) => void
  setViewport: (viewport: Viewport) => void
  setPreviewOpen: (open: boolean) => void
  focusPreview: (id: PreviewSpot) => void
  patchDetails: (patch: Partial<TenantDetails>) => void
  setFamily: (id: FamilyId, opts?: { look?: boolean }) => void
  setTemplate: (id: TemplateId) => void
  setTheme: (theme: ThemeId) => void
  setFont: (font: FontId) => void
  setSections: (sections: TenantConfig["sections"]) => void
  toggleSection: (id: SectionId) => void
  setServices: (services: ServiceId[]) => void
  setTestimonials: (testimonials: TenantConfig["testimonials"]) => void
  setFaq: (faq: TenantConfig["faq"]) => void
  patchWording: (patch: Partial<Wording>) => void
  ensureSectionOn: (id: SectionId) => void
  setAddon: (id: AddonId, on: boolean) => void
  setSlug: (slug: string) => void
  hydrate: (payload: ServerDraft) => void
  applyServer: (payload: ServerDraft) => void
}

export function blank(v: string | undefined) {
  return v == null || v.trim() === ""
}

export const useDraft = create<DraftState>((set) => ({
  config: emptyPracticeConfig,
  step: "details",
  viewport: "mobile",
  previewOpen: false,
  hydrated: false,
  saving: false,
  dirty: false,
  saveError: null,
  slugLocked: false,
  status: "draft",
  plan: null,
  trialEndsAt: null,
  publicUrl: "",
  impersonating: false,
  previewFocus: null,
  setStep: (step) => set({ step }),
  setViewport: (viewport) => set({ viewport }),
  setPreviewOpen: (previewOpen) => set({ previewOpen }),
  focusPreview: (id) =>
    set((s) => {
      const prev = s.previewFocus
      if (prev?.id === id && Date.now() - lastPreviewFocusAt < 400) return s
      lastPreviewFocusAt = Date.now()
      return {
        previewOpen: true,
        previewFocus: { id, tick: (prev?.tick ?? 0) + 1 },
      }
    }),
  patchDetails: (patch) =>
    set((s) => ({
      config: { ...s.config, details: { ...s.config.details, ...patch } },
    })),
  setFamily: (id, opts) =>
    set((s) => {
      const look = familyMeta[id]
      return {
        config: {
          ...s.config,
          family: id,
          pickedFamily: true,
          ...(opts?.look ? { theme: look.theme, font: look.font } : {}),
        },
      }
    }),
  setTemplate: (id) => set((s) => ({ config: applyTemplate(s.config, id) })),
  setTheme: (theme) => set((s) => ({ config: { ...s.config, theme } })),
  setFont: (font) => set((s) => ({ config: { ...s.config, font } })),
  setSections: (sections) => set((s) => ({ config: { ...s.config, sections } })),
  toggleSection: (id) =>
    set((s) => ({
      config: {
        ...s.config,
        sections: s.config.sections.map((row) =>
          row.id === id && !LOCKED.has(row.id) ? { ...row, on: !row.on } : row,
        ),
      },
    })),
  setServices: (services) => set((s) => ({ config: { ...s.config, services } })),
  setTestimonials: (testimonials) => set((s) => ({ config: { ...s.config, testimonials } })),
  setFaq: (faq) => set((s) => ({ config: { ...s.config, faq } })),
  patchWording: (patch) =>
    set((s) => ({
      config: { ...s.config, wording: { ...s.config.wording, ...patch } },
    })),
  ensureSectionOn: (id) =>
    set((s) => ({
      config: {
        ...s.config,
        sections: s.config.sections.map((row) => (row.id === id ? { ...row, on: true } : row)),
      },
    })),
  setAddon: (id, on) =>
    set((s) => {
      const has = s.config.addons.includes(id)
      if (on === has) return s
      return {
        config: {
          ...s.config,
          addons: on ? [...s.config.addons, id] : s.config.addons.filter((x) => x !== id),
        },
      }
    }),
  setSlug: (slug) =>
    set((s) => (s.slugLocked ? s : { config: { ...s.config, slug } })),
  hydrate: (payload) =>
    set({
      config: payload.config,
      slugLocked: payload.slugLocked,
      status: payload.status,
      plan: payload.plan ?? null,
      trialEndsAt: payload.trialEndsAt ?? null,
      publicUrl: payload.publicUrl,
      impersonating: Boolean(payload.impersonating),
      hydrated: true,
      dirty: false,
      saveError: null,
    }),
  applyServer: (payload) =>
    set((s) => ({
      config: { ...s.config, slug: payload.config.slug },
      slugLocked: payload.slugLocked,
      status: payload.status,
      plan: payload.plan ?? null,
      trialEndsAt: payload.trialEndsAt ?? null,
      publicUrl: payload.publicUrl,
      saveError: null,
    })),
}))
