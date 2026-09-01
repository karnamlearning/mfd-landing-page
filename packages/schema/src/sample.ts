import { defaultServiceIds } from "./ids"
import { sectionsByTemplate } from "./defaults"
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
  bioHi:
    "पुणे में परिवारों को म्यूचुअल फंड से लंबी अवधि का निवेश समझने में मदद करता हूँ। AMFI पंजीकृत। गारंटीशुदा रिटर्न नहीं — एक साफ़ प्रक्रिया जिसे आप निभा सकें।",
  credentials: [{ label: "AMFI ARN", name: "Rahul Sharma", number: "123456" }],
  stats: [
    { value: "150+", label: "Happy families" },
    { value: "450+", label: "Clients" },
    { value: "₹12 Cr", label: "AUM" },
  ],
  hours: "Mon–Sat 10am–6pm",
  arn: "123456",
}

export const sampleTestimonials = [
  {
    quote: "Clear conversations, no pressure. We started a SIP and actually kept it.",
    name: "Meera Kulkarni",
    city: "Pune",
  },
  {
    quote: "He explained risk in plain language. That was enough to get my parents on board.",
    name: "Amit Deshpande",
    city: "Nashik",
  },
]

export const sampleFaq = [
  {
    q: "Do you charge a fee?",
    a: "As a mutual fund distributor I am paid by the AMC as commission. I do not charge you a separate advisory fee.",
    qHi: "क्या आप शुल्क लेते हैं?",
    aHi: "म्यूचुअल फंड वितरक के रूप में कमीशन एएमसी से मिलता है। आपसे अलग सलाह शुल्क नहीं लिया जाता।",
  },
  {
    q: "Are returns guaranteed?",
    a: "No. Mutual fund investments are subject to market risks. Past performance does not guarantee future results.",
    qHi: "क्या रिटर्न की गारंटी है?",
    aHi: "नहीं। म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन हैं।",
  },
  {
    q: "Can we talk on WhatsApp?",
    a: "Yes. Use the WhatsApp button — that is the fastest way to reach me.",
    qHi: "क्या व्हाट्सऐप पर बात हो सकती है?",
    aHi: "हाँ। व्हाट्सऐप बटन से सबसे जल्दी बात हो जाती है।",
  },
]

/** Hardcoded Practice demo — sample content, forest + formal. */
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
  sections: sectionsByTemplate.practice,
  testimonials: sampleTestimonials,
  faq: sampleFaq,
  calculatorHidden: [],
}

/** Empty details — for mergeSample tests. Live must not show sample names. */
export const emptyPracticeConfig: TenantConfig = {
  ...samplePracticeConfig,
  details: {
    name: "",
    whatsapp: "",
    city: "",
    languages: [],
    credentials: [],
    stats: [],
  },
  testimonials: [],
  faq: [],
}

/** New tenant draft — empty fields, preview fills sample until they type. */
export function emptyDraftConfig(slug: string): TenantConfig {
  return { ...emptyPracticeConfig, slug }
}
