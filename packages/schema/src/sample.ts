import type { SectionId } from "./ids"
import { defaultServiceIds } from "./ids"
import type { TenantConfig, TenantDetails } from "./tenant"

/** Empty-field stand-ins for Buyer Place preview only. Never ship on the public site. */
export const sampleFill: TenantDetails = {
  name: "Rahul Sharma",
  photoUrl:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  heroImageUrl:
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2000&q=80",
  heroHeadline: "There are as many types of mutual funds as each of your financial goals.",
  pitch: "Mutual fund distributor helping families invest with discipline",
  whatsapp: "9876543210",
  phone: "9876543210",
  email: "rahul@example.com",
  address: "Koregaon Park, Pune",
  city: "Pune",
  languages: ["English", "Hindi", "Marathi"],
  bio: "I help families in Pune invest through mutual funds with a simple, long-term process. AMFI-registered. No guaranteed returns — just a clear plan you can stick to.",
  credentials: [{ label: "AMFI ARN", name: "Rahul Sharma", number: "123456" }],
  stats: [
    { value: "150+", label: "Happy families" },
    { value: "450+", label: "Clients" },
    { value: "₹12 Cr", label: "AUM" },
  ],
  hours: "Mon–Sat 10am–6pm",
  arn: "123456",
}

export const practiceSectionOrder: Array<{ id: SectionId; on: boolean }> = [
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
]

/** Hardcoded Practice demo (step 0.4) — sample content, forest + formal. */
export const samplePracticeConfig: TenantConfig = {
  slug: "rahul-sharma",
  template: "practice",
  theme: "forest",
  font: "formal",
  addons: [],
  details: {
    ...sampleFill,
    credentials: [
      { label: "AMFI ARN", name: "Rahul Sharma", number: "123456" },
      { label: "AMFI ARN", name: "Sharma Wealth", number: "654321" },
    ],
  },
  services: defaultServiceIds,
  sections: practiceSectionOrder,
  calculatorHidden: [],
}
