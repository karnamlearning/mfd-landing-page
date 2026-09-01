import type { SectionId, TemplateId } from "./ids"

export const sectionsByTemplate: Record<TemplateId, Array<{ id: SectionId; on: boolean }>> = {
  practice: [
    { id: "hero", on: true },
    { id: "about", on: true },
    { id: "credentials", on: true },
    { id: "services", on: true },
    { id: "stats", on: true },
    { id: "how", on: false },
    { id: "calculators", on: true },
    { id: "testimonials", on: false },
    { id: "faq", on: false },
    { id: "contact", on: true },
    { id: "whatsapp_strip", on: true },
  ],
  solo: [
    { id: "hero", on: true },
    { id: "about", on: true },
    { id: "how", on: true },
    { id: "services", on: true },
    { id: "calculators", on: true },
    { id: "faq", on: true },
    { id: "credentials", on: false },
    { id: "stats", on: false },
    { id: "testimonials", on: false },
    { id: "contact", on: true },
    { id: "whatsapp_strip", on: true },
  ],
  local: [
    { id: "hero", on: true },
    { id: "about", on: true },
    { id: "credentials", on: true },
    { id: "services", on: true },
    { id: "how", on: true },
    { id: "calculators", on: true },
    { id: "faq", on: true },
    { id: "stats", on: false },
    { id: "testimonials", on: false },
    { id: "contact", on: true },
    { id: "whatsapp_strip", on: true },
  ],
}

export function applyTemplate<T extends { template: TemplateId; sections: Array<{ id: SectionId; on: boolean }> }>(
  config: T,
  template: TemplateId,
): T {
  return {
    ...config,
    template,
    sections: sectionsByTemplate[template],
  }
}
