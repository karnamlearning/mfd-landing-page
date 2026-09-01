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
  pitch: "A Pune mutual fund distributor for families who want a SIP they can keep — categories mapped to time, not a product pitch.",
  whatsapp: "9876543210",
  phone: "9876543210",
  email: "rahul@example.com",
  address: "Koregaon Park, Pune",
  city: "Pune",
  languages: ["English", "Hindi", "Marathi"],
  bio: "Your trusted partner for mutual fund investing in Pune. We sit with families, map equity, debt, or hybrid to how long you can stay invested, and set up SIPs you can actually keep. AMFI-registered. No guaranteed returns, no scheme banners on this site — a clear process you can stick to, reviewed when salary, a child, or a house changes the picture.",
  bioHi:
    "पुणे में म्यूचुअल फंड निवेश के लिए एक साधारण साथी। परिवारों के साथ बैठते हैं, इक्विटी, डेट या हाइब्रिड को समय-सीमा से जोड़ते हैं, और SIP ऐसी रखते हैं जिसे निभा सकें। AMFI पंजीकृत। गारंटीशुदा रिटर्न नहीं, इस साइट पर स्कीम बैनर नहीं — एक साफ़ प्रक्रिया, वेतन, बच्चा या घर बदले तो दोबारा देखी जाती है।",
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
  {
    quote: "We review once a year. Nothing fancy — just whether the SIP still fits the goal.",
    name: "Sneha Patil",
    city: "Pune",
  },
]

export const sampleFaq = [
  {
    q: "Do you charge a fee?",
    a: "As a mutual fund distributor I am paid by the AMC as commission. I do not charge you a separate advisory fee. Commission differs by scheme; ask and I will share what applies.",
    qHi: "क्या आप शुल्क लेते हैं?",
    aHi: "म्यूचुअल फंड वितरक के रूप में कमीशन एएमसी से मिलता है। आपसे अलग सलाह शुल्क नहीं लिया जाता। स्कीम के अनुसार कमीशन अलग हो सकता है।",
  },
  {
    q: "Are returns guaranteed?",
    a: "No. Mutual fund investments are subject to market risks. Past performance does not guarantee future results. Calculator figures on this site are illustrations only.",
    qHi: "क्या रिटर्न की गारंटी है?",
    aHi: "नहीं। म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन हैं। कैलकुलेटर के आंकड़े केवल उदाहरण हैं।",
  },
  {
    q: "Can we talk on WhatsApp?",
    a: "Yes. Use the WhatsApp button — that is the fastest way to reach me. You can also call or send the contact form.",
    qHi: "क्या व्हाट्सऐप पर बात हो सकती है?",
    aHi: "हाँ। व्हाट्सऐप बटन से सबसे जल्दी बात हो जाती है। कॉल या फ़ॉर्म भी चलता है।",
  },
  {
    q: "How much do I need to start a SIP?",
    a: "Many schemes allow a SIP from a few hundred rupees a month. We pick an amount you can keep, then change it when income or goals change.",
    qHi: "SIP शुरू करने के लिए कितना चाहिए?",
    aHi: "कई स्कीमों में SIP कुछ सौ रुपये से शुरू हो सकती है। राशि ऐसी चुनते हैं जिसे आप निभा सकें।",
  },
  {
    q: "Do you tell me which scheme to buy on this website?",
    a: "No. This site explains categories and process. Scheme choice is a conversation, after we understand time horizon and risk.",
    qHi: "क्या वेबसाइट पर स्कीम बताते हैं?",
    aHi: "नहीं। यहाँ श्रेणी और प्रक्रिया है। स्कीम चुनाव बातचीत में होता है।",
  },
  {
    q: "What is KYC, and do I need it?",
    a: "Know Your Customer is a one-time registration most AMCs require before a folio is opened. If you already have KYC with a KRA, we reuse it. If not, we walk you through the documents.",
    qHi: "KYC क्या है, क्या ज़रूरी है?",
    aHi: "अधिकतर AMC फोलियो से पहले KYC चाहते हैं। अगर पहले से है तो वही चलता है। नहीं तो दस्तावेज़ साथ बैठकर पूरे करते हैं।",
  },
  {
    q: "Can I pause or increase my SIP later?",
    a: "Yes. SIPs can usually be paused, stopped, or stepped up with the AMC or platform. We help you do it when the month gets tight or income rises — that is part of the review, not a lock-in.",
    qHi: "SIP बाद में रोक या बढ़ा सकते हैं?",
    aHi: "हाँ। AMC या प्लेटफॉर्म पर SIP रोक, बंद, या बढ़ाई जा सकती है। महीना तंग हो या आय बढ़े तो समीक्षा में यही करते हैं।",
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
  wording: {},
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
