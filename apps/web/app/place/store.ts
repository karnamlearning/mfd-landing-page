"use client"

import { create } from "zustand"
import {
  applyTemplate,
  emptyPracticeConfig,
  lockedSectionIds,
  type SectionId,
  type ServiceId,
  type TemplateId,
  type TenantConfig,
  type TenantDetails,
} from "@mfd/schema"
import type { FontId, ThemeId } from "@mfd/tokens"

export const STEPS = [
  { id: "details", n: 1, label: "Details" },
  { id: "template", n: 2, label: "Template" },
  { id: "theme", n: 3, label: "Theme" },
  { id: "font", n: 4, label: "Font" },
  { id: "sections", n: 5, label: "Sections" },
  { id: "review", n: 6, label: "Review" },
] as const

export type StepId = (typeof STEPS)[number]["id"]
export type Viewport = "mobile" | "desktop"

const LOCKED = new Set<string>(lockedSectionIds)

type DraftState = {
  config: TenantConfig
  step: StepId
  viewport: Viewport
  previewOpen: boolean
  setStep: (step: StepId) => void
  setViewport: (viewport: Viewport) => void
  setPreviewOpen: (open: boolean) => void
  patchDetails: (patch: Partial<TenantDetails>) => void
  setTemplate: (id: TemplateId) => void
  setTheme: (theme: ThemeId) => void
  setFont: (font: FontId) => void
  setSections: (sections: TenantConfig["sections"]) => void
  toggleSection: (id: SectionId) => void
  setServices: (services: ServiceId[]) => void
  setTestimonials: (testimonials: TenantConfig["testimonials"]) => void
  setFaq: (faq: TenantConfig["faq"]) => void
  ensureSectionOn: (id: SectionId) => void
  setToolsPack: (on: boolean) => void
}

export function blank(v: string | undefined) {
  return v == null || v.trim() === ""
}

export const useDraft = create<DraftState>((set) => ({
  config: emptyPracticeConfig,
  step: "details",
  viewport: "mobile",
  previewOpen: false,
  setStep: (step) => set({ step }),
  setViewport: (viewport) => set({ viewport }),
  setPreviewOpen: (previewOpen) => set({ previewOpen }),
  patchDetails: (patch) =>
    set((s) => ({
      config: { ...s.config, details: { ...s.config.details, ...patch } },
    })),
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
  ensureSectionOn: (id) =>
    set((s) => ({
      config: {
        ...s.config,
        sections: s.config.sections.map((row) => (row.id === id ? { ...row, on: true } : row)),
      },
    })),
  setToolsPack: (on) =>
    set((s) => ({
      config: { ...s.config, addons: on ? ["tools"] : [] },
    })),
}))
