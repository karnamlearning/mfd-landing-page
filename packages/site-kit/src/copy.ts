export type Locale = "en" | "hi"

export type Copy = {
  amfi: string
  about: string
  services: string
  calculators: string
  contact: string
  registration: string
  planning: string
  aboutTitle: (city: string) => string
  recordTitle: string
  servicesTitle: string
  howTitle: string
  howKicker: string
  calcTitle: string
  contactTitle: string
  talkTo: (first: string) => string
  wa: string
  monthly: string
  years: string
  expected: string
  illustrative: string
  calcNote: string
  send: string
  name: string
  mobile: string
  city: string
  message: string
  disclosures: string
  disclaimer: (name: string) => string
  how: Array<{ title: string; body: string }>
  toolsIndex: string
  allTools: string
  toolPlaceholder: string
  backHome: string
  backTools: string
}

export const copy: Record<Locale, Copy> = {
  en: {
    amfi: "AMFI Registered Mutual Fund Distributor",
    about: "About",
    services: "Services",
    calculators: "Calculators",
    contact: "Contact",
    registration: "Registration",
    planning: "Planning",
    aboutTitle: (city) => `A practice in ${city}, not a product pitch.`,
    recordTitle: "On the record.",
    servicesTitle: "What we sit down to do.",
    howTitle: "How we work.",
    howKicker: "Process",
    calcTitle: "A SIP, on paper.",
    contactTitle: "Write, or just WhatsApp.",
    talkTo: (first) => `Talk to ${first}`,
    wa: "WhatsApp",
    monthly: "Monthly amount (₹)",
    years: "Years",
    expected: "Expected return (% p.a.)",
    illustrative: "Illustrative value",
    calcNote:
      "Mutual fund investments are subject to market risks. Figures are illustrative.",
    send: "Send",
    name: "Name",
    mobile: "Mobile",
    city: "City",
    message: "Message",
    disclosures: "Commission disclosures",
    disclaimer: (name) =>
      `Mutual fund investments are subject to market risks, read all scheme related documents carefully. ${name} is an AMFI-registered mutual fund distributor. This website does not offer financial planning or guaranteed returns.`,
    how: [
      { title: "Talk", body: "A short call or WhatsApp. Goals, time horizon, what you can save." },
      { title: "Map", body: "Suitable fund categories — not a scheme pitch on the website." },
      { title: "Start", body: "SIP or lump sum through the AMC / platform. You stay in control." },
    ],
    toolsIndex: "Calculators",
    allTools: "All calculators",
    toolPlaceholder: "Enter your numbers to see an illustration.",
    backHome: "Home",
    backTools: "All calculators",
  },
  hi: {
    amfi: "AMFI पंजीकृत म्यूचुअल फंड वितरक",
    about: "परिचय",
    services: "सेवाएँ",
    calculators: "कैलकुलेटर",
    contact: "संपर्क",
    registration: "पंजीकरण",
    planning: "योजना",
    aboutTitle: (city) => `${city} में एक साधारण प्रक्रिया, प्रोडक्ट पिच नहीं।`,
    recordTitle: "रिकॉर्ड पर।",
    servicesTitle: "जिस पर हम बैठकर बात करते हैं।",
    howTitle: "हम कैसे काम करते हैं।",
    howKicker: "तरीका",
    calcTitle: "कागज़ पर एक SIP।",
    contactTitle: "लिखें, या सीधे व्हाट्सऐप करें।",
    talkTo: (first) => `${first} से बात करें`,
    wa: "व्हाट्सऐप",
    monthly: "मासिक राशि (₹)",
    years: "वर्ष",
    expected: "अनुमानित रिटर्न (% वार्षिक)",
    illustrative: "उदाहरण मूल्य",
    calcNote: "म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन हैं। आंकड़े उदाहरण हैं।",
    send: "भेजें",
    name: "नाम",
    mobile: "मोबाइल",
    city: "शहर",
    message: "संदेश",
    disclosures: "कमीशन विवरण",
    disclaimer: (name) =>
      `म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन हैं, निवेश से पहले सभी स्कीम दस्तावेज़ पढ़ें। ${name} AMFI पंजीकृत म्यूचुअल फंड वितरक हैं। यह वेबसाइट वित्तीय योजना या गारंटीशुदा रिटर्न नहीं देती।`,
    how: [
      { title: "बात", body: "एक छोटी कॉल या व्हाट्सऐप। लक्ष्य, समय, और आप कितना बचा सकते हैं।" },
      { title: "नक्शा", body: "उपयुक्त फंड श्रेणियाँ — वेबसाइट पर स्कीम की सिफारिश नहीं।" },
      { title: "शुरुआत", body: "AMC / प्लेटफॉर्म से SIP या एकमुश्त। नियंत्रण आपके पास रहता है।" },
    ],
    toolsIndex: "कैलकुलेटर",
    allTools: "सभी कैलकुलेटर",
    toolPlaceholder: "अपनी राशि डालें और उदाहरण मूल्य देखें।",
    backHome: "होम",
    backTools: "सभी कैलकुलेटर",
  },
}

export const toolCopy: Record<string, { title: string; titleHi: string; blurb: string; blurbHi: string }> = {
  sip: {
    title: "SIP",
    titleHi: "SIP",
    blurb: "Monthly investing over a period.",
    blurbHi: "एक अवधि तक मासिक निवेश।",
  },
  lumpsum: {
    title: "Lumpsum",
    titleHi: "एकमुश्त",
    blurb: "One-time investment growth.",
    blurbHi: "एक बार के निवेश की वृद्धि।",
  },
  goal_sip: {
    title: "Goal SIP",
    titleHi: "लक्ष्य SIP",
    blurb: "SIP needed for a target amount.",
    blurbHi: "लक्ष्य राशि के लिए ज़रूरी SIP।",
  },
  retirement: {
    title: "Retirement",
    titleHi: "सेवानिवृत्ति",
    blurb: "Savings needed for retirement.",
    blurbHi: "सेवानिवृत्ति के लिए बचत।",
  },
  swp: {
    title: "SWP",
    titleHi: "SWP",
    blurb: "Systematic withdrawal.",
    blurbHi: "नियमित निकासी।",
  },
  nps: {
    title: "NPS",
    titleHi: "NPS",
    blurb: "National Pension System illustration.",
    blurbHi: "राष्ट्रीय पेंशन प्रणाली।",
  },
  inflation: {
    title: "Inflation",
    titleHi: "महंगाई",
    blurb: "Future cost of today’s amount.",
    blurbHi: "आज की राशि की भविष्य की लागत।",
  },
  compounding: {
    title: "Compounding",
    titleHi: "चक्रवृद्धि",
    blurb: "Interest on interest, simply.",
    blurbHi: "ब्याज पर ब्याज।",
  },
  goal_planner: {
    title: "Goal planner",
    titleHi: "लक्ष्य प्लानर",
    blurb: "Several goals in one view.",
    blurbHi: "कई लक्ष्य एक साथ।",
  },
  sip_stepup: {
    title: "SIP step-up",
    titleHi: "SIP स्टेप-अप",
    blurb: "SIP that rises each year.",
    blurbHi: "हर साल बढ़ने वाली SIP।",
  },
  lumpsum_target: {
    title: "Lumpsum target",
    titleHi: "एकमुश्त लक्ष्य",
    blurb: "Amount needed to hit a goal.",
    blurbHi: "लक्ष्य तक पहुँचने की राशि।",
  },
}

export const serviceCopy: Record<
  string,
  { title: string; titleHi: string; body: string; bodyHi: string }
> = {
  mutual_funds: {
    title: "Mutual funds",
    titleHi: "म्यूचुअल फंड",
    body: "Equity, debt, and hybrid schemes mapped to how long you can stay invested — not to a slogan.",
    bodyHi: "इक्विटी, डेट और हाइब्रिड — कितने समय तक निवेश रह सकते हैं, उसी से मैप।",
  },
  sip: {
    title: "SIP",
    titleHi: "SIP",
    body: "A monthly amount you can actually keep. We set it up, review it, and change it when life changes.",
    bodyHi: "एक मासिक राशि जिसे आप निभा सकें। ज़िंदगी बदले तो SIP भी बदल सकते हैं।",
  },
  goals: {
    title: "Goal-based investing",
    titleHi: "लक्ष्य के अनुसार निवेश",
    body: "Education, a home, retirement. Categories that fit the goal — scheme choice stays a conversation.",
    bodyHi: "शिक्षा, घर, सेवानिवृत्ति। श्रेणी लक्ष्य से जुड़ती है — स्कीम चुनाव बातचीत में रहता है।",
  },
  stp_swp: {
    title: "STP / SWP",
    titleHi: "STP / SWP",
    body: "Move or withdraw on a plan, not on a hunch.",
    bodyHi: "योजना के साथ स्थानांतरण या निकासी, अंदाज़े से नहीं।",
  },
  retirement: {
    title: "Retirement",
    titleHi: "सेवानिवृत्ति",
    body: "A corpus conversation in mutual fund categories, with risk said out loud.",
    bodyHi: "म्यूचुअल फंड श्रेणियों में कॉर्पस की बात, जोखिम साफ़ कहा जाता है।",
  },
  life_insurance: {
    title: "Life insurance",
    titleHi: "जीवन बीमा",
    body: "If licensed — protection is separate from investment. We say so on the site.",
    bodyHi: "लाइसेंस हो तो सुरक्षा निवेश से अलग है। यह साइट पर लिखा रहता है।",
  },
  health_insurance: {
    title: "Health insurance",
    titleHi: "स्वास्थ्य बीमा",
    body: "Cover first, invest second — when this service is offered.",
    bodyHi: "पहले कवर, फिर निवेश — जब यह सेवा दी जाती है।",
  },
  bonds: {
    title: "Bonds",
    titleHi: "बॉन्ड",
    body: "Fixed-income options as a complement, not a replacement for a risk talk.",
    bodyHi: "फिक्स्ड इनकम पूरक है, जोखिम की बात की जगह नहीं।",
  },
}
