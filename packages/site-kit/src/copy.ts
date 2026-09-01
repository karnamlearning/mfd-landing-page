export type Locale = "en" | "hi"

export type Copy = {
  amfi: string
  about: string
  welcome: string
  services: string
  calculators: string
  contact: string
  registration: string
  planning: string
  quotesTitle: string
  quotesKicker: string
  quotesNav: string
  faqTitle: string
  faqKicker: string
  faqNav: string
  howNav: string
  whyTitle: string
  why: Array<{ title: string; body: string }>
  servicesLead: string
  howLead: string
  calcLead: string
  seeCalcs: string
  home: string
  call: string
  hoursLabel: string
  menu: string
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
  disclosuresTitle: string
  disclosuresBody: (name: string, arn: string) => string[]
  disclaimer: (name: string) => string
  how: Array<{ title: string; body: string }>
  toolsIndex: string
  allTools: string
  toolPlaceholder: string
  backHome: string
  backTools: string
  calculate: string
  invested: string
  corpus: string
  remaining: string
  withdrawn: string
  leadHint: string
  seeResult: string
  discuss: string
  sent: string
  amount: string
  target: string
  inflation: string
  stepup: string
  expense: string
  startingCorpus: string
  withdrawal: string
}

export const copy: Record<Locale, Copy> = {
  en: {
    amfi: "AMFI Registered Mutual Fund Distributor",
    about: "About",
    welcome: "Welcome",
    services: "Services",
    calculators: "Calculators",
    contact: "Contact",
    registration: "Registration",
    planning: "Planning",
    quotesTitle: "What families say",
    quotesKicker: "From the practice",
    quotesNav: "Stories",
    faqTitle: "Questions we hear often",
    faqKicker: "FAQ",
    faqNav: "FAQ",
    howNav: "How we work",
    whyTitle: "Why families start here",
    why: [
      {
        title: "One WhatsApp number",
        body: "Call, message, or write the form. The same person replies. No call centre, no scheme ads in the inbox.",
      },
      {
        title: "Categories, not a pitch",
        body: "Equity, debt, or hybrid — mapped to how long you can stay invested. Scheme names stay a conversation, not a banner.",
      },
      {
        title: "A SIP you can keep",
        body: "We pick an amount that fits this year. When salary, a child, or a house changes the picture, we sit down again.",
      },
    ],
    servicesLead:
      "Mutual funds, SIPs, and a few related tools. Insurance and bonds only if this practice actually offers them. Nothing here is a recommendation to buy a named scheme.",
    howLead:
      "Same beats every time: understand the goal and the horizon, map a category, then start through the AMC or platform you already use.",
    calcLead:
      "Illustrations only. Change the monthly amount and years. Figures are not a scheme’s past or future return.",
    seeCalcs: "See calculators",
    home: "Home",
    call: "Call",
    hoursLabel: "Hours",
    menu: "Menu",
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
    disclosuresTitle: "Commission disclosures",
    disclosuresBody: (name, arn) => [
      `${name} is an AMFI-registered Mutual Fund Distributor${arn ? ` (ARN ${arn})` : ""}. This website is for information only. It is not an offer, solicitation, or recommendation to buy or sell any mutual fund scheme, and it is not investment advice.`,
      "Mutual fund investments are subject to market risks. Please read all scheme related documents carefully before investing. Past performance is not a guide to future returns. NAVs and returns are not guaranteed.",
      "The distributor may receive commission from asset management companies for distributing mutual fund schemes, as permitted by SEBI and AMFI. Commission differs by scheme and can change. Details are in the scheme documents and are available from the distributor on request.",
      "Nothing on this website should be read as a promise of returns. Figures on calculators are illustrations, not actual scheme performance.",
    ],
    disclaimer: (name) =>
      `Mutual fund investments are subject to market risks, read all scheme related documents carefully. ${name} is an AMFI-registered mutual fund distributor. This website does not offer financial planning or guaranteed returns.`,
    how: [
      { title: "Talk", body: "A short call or WhatsApp. What you are saving for, how long you can stay invested, and an amount you can keep without stretching the month." },
      { title: "Map", body: "Fund categories that fit that horizon — equity, debt, or hybrid. Not a scheme pitch on the website. Risk is said in plain language." },
      { title: "Start", body: "SIP or lump sum through the AMC or platform. You stay in control of the folio. We do not log in as you." },
      { title: "Review", body: "Once or twice a year, or when life changes. We check whether the SIP still matches the goal — not whether last quarter looked exciting." },
    ],
    toolsIndex: "Calculators",
    allTools: "All calculators",
    toolPlaceholder: "Enter your numbers to see an illustration.",
    backHome: "Home",
    backTools: "All calculators",
    calculate: "Calculate",
    invested: "Amount invested",
    corpus: "Corpus needed",
    remaining: "Amount remaining",
    withdrawn: "Withdrawn",
    leadHint: "Share your name and mobile to see the illustration.",
    seeResult: "Show illustration",
    discuss: "Discuss this on WhatsApp",
    sent: "Sent. We will get back to you.",
    amount: "Amount (₹)",
    target: "Target amount (₹)",
    inflation: "Inflation (% p.a.)",
    stepup: "Annual increase (%)",
    expense: "Monthly expense today (₹)",
    startingCorpus: "Starting amount (₹)",
    withdrawal: "Monthly withdrawal (₹)",
  },
  hi: {
    amfi: "AMFI पंजीकृत म्यूचुअल फंड वितरक",
    about: "परिचय",
    welcome: "स्वागत",
    services: "सेवाएँ",
    calculators: "कैलकुलेटर",
    contact: "संपर्क",
    registration: "पंजीकरण",
    planning: "योजना",
    quotesTitle: "परिवार क्या कहते हैं",
    quotesKicker: "अभ्यास से",
    quotesNav: "कहानियाँ",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faqKicker: "प्रश्न",
    faqNav: "प्रश्न",
    howNav: "कैसे काम करते हैं",
    whyTitle: "यहाँ से शुरू क्यों",
    why: [
      {
        title: "एक व्हाट्सऐप नंबर",
        body: "कॉल, संदेश, या फ़ॉर्म। वही व्यक्ति जवाब देता है। कोई कॉल सेंटर नहीं, इनबॉक्स में स्कीम विज्ञापन नहीं।",
      },
      {
        title: "श्रेणी, पिच नहीं",
        body: "इक्विटी, डेट या हाइब्रिड — कितने समय तक निवेश रह सकते हैं। स्कीम नाम बातचीत में रहता है, बैनर पर नहीं।",
      },
      {
        title: "SIP जिसे निभा सकें",
        body: "इस साल की आय के हिसाब से राशि। वेतन, बच्चा या घर बदले तो फिर बैठते हैं।",
      },
    ],
    servicesLead:
      "म्यूचुअल फंड, SIP, और कुछ संबंधित उपकरण। बीमा और बॉन्ड तभी जब यह अभ्यास वाकई देता है। यहाँ किसी नामित स्कीम की सिफारिश नहीं है।",
    howLead:
      "हर बार वही क्रम: लक्ष्य और समय समझना, श्रेणी चुनना, फिर उसी AMC या प्लेटफॉर्म से शुरू करना जिसका आप उपयोग करते हैं।",
    calcLead: "केवल उदाहरण। मासिक राशि और वर्ष बदलें। आंकड़े किसी स्कीम का पिछला या भविष्य का रिटर्न नहीं हैं।",
    seeCalcs: "कैलकुलेटर देखें",
    home: "होम",
    call: "कॉल",
    hoursLabel: "समय",
    menu: "मेनू",
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
    disclosuresTitle: "कमीशन विवरण",
    disclosuresBody: (name, arn) => [
      `${name} AMFI पंजीकृत म्यूचुअल फंड वितरक हैं${arn ? ` (ARN ${arn})` : ""}। यह वेबसाइट केवल जानकारी के लिए है। यह किसी स्कीम को खरीदने या बेचने का प्रस्ताव या सिफारिश नहीं है, और निवेश सलाह भी नहीं है।`,
      "म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन हैं। निवेश से पहले सभी स्कीम संबंधित दस्तावेज़ ध्यान से पढ़ें। पिछला प्रदर्शन भविष्य के रिटर्न का संकेत नहीं है। NAV और रिटर्न की गारंटी नहीं है।",
      "वितरक को SEBI और AMFI की अनुमति के अनुसार AMC से कमीशन मिल सकता है। कमीशन स्कीम के अनुसार अलग होता है और बदल सकता है। विवरण स्कीम दस्तावेज़ों में हैं और वितरक से माँगने पर उपलब्ध हैं।",
      "इस वेबसाइट पर कुछ भी रिटर्न का वादा नहीं है। कैलकुलेटर के आंकड़े उदाहरण हैं, किसी स्कीम का वास्तविक प्रदर्शन नहीं।",
    ],
    disclaimer: (name) =>
      `म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन हैं, निवेश से पहले सभी स्कीम दस्तावेज़ पढ़ें। ${name} AMFI पंजीकृत म्यूचुअल फंड वितरक हैं। यह वेबसाइट वित्तीय योजना या गारंटीशुदा रिटर्न नहीं देती।`,
    how: [
      { title: "बात", body: "एक छोटी कॉल या व्हाट्सऐप। लक्ष्य, समय, और एक राशि जिसे बिना महीने खींचे निभा सकें।" },
      { title: "नक्शा", body: "उस समय-सीमा के लिए श्रेणी — इक्विटी, डेट या हाइब्रिड। वेबसाइट पर स्कीम पिच नहीं। जोखिम सादी भाषा में।" },
      { title: "शुरुआत", body: "AMC / प्लेटफॉर्म से SIP या एकमुश्त। फोलियो आपके नियंत्रण में। हम आपके रूप में लॉगिन नहीं करते।" },
      { title: "समीक्षा", body: "साल में एक-दो बार, या ज़िंदगी बदले तब। SIP लक्ष्य से मेल खाती है या नहीं — पिछली तिमाही चमकदार थी या नहीं।" },
    ],
    toolsIndex: "कैलकुलेटर",
    allTools: "सभी कैलकुलेटर",
    toolPlaceholder: "अपनी राशि डालें और उदाहरण मूल्य देखें।",
    backHome: "होम",
    backTools: "सभी कैलकुलेटर",
    calculate: "गणना करें",
    invested: "निवेशित राशि",
    corpus: "ज़रूरी कॉर्पस",
    remaining: "शेष राशि",
    withdrawn: "निकासी",
    leadHint: "उदाहरण देखने के लिए नाम और मोबाइल लिखें।",
    seeResult: "उदाहरण दिखाएँ",
    discuss: "इस पर व्हाट्सऐप करें",
    sent: "भेज दिया। हम आपसे संपर्क करेंगे।",
    amount: "राशि (₹)",
    target: "लक्ष्य राशि (₹)",
    inflation: "महंगाई (% वार्षिक)",
    stepup: "वार्षिक वृद्धि (%)",
    expense: "आज का मासिक खर्च (₹)",
    startingCorpus: "शुरुआती राशि (₹)",
    withdrawal: "मासिक निकासी (₹)",
  },
}

export const toolCopy: Record<string, { title: string; titleHi: string; blurb: string; blurbHi: string }> = {
  sip: {
    title: "SIP",
    titleHi: "SIP",
    blurb: "A monthly amount, a number of years, and an assumed rate. See how a SIP could add up on paper.",
    blurbHi: "मासिक राशि, वर्ष, और एक माना गया दर। कागज़ पर SIP कैसे जुड़ सकती है।",
  },
  lumpsum: {
    title: "Lumpsum",
    titleHi: "एकमुश्त",
    blurb: "A one-time amount left invested for a period. Useful when you have a bonus or matured deposit to place.",
    blurbHi: "एक बार की राशि, एक अवधि तक। बोनस या मैच्योर जमा रखने पर उपयोगी।",
  },
  goal_sip: {
    title: "Goal SIP",
    titleHi: "लक्ष्य SIP",
    blurb: "Back-solve the monthly SIP that could reach a target — education, a house down-payment, or a written number.",
    blurbHi: "लक्ष्य राशि तक पहुँचने के लिए ज़रूरी मासिक SIP — शिक्षा, घर, या एक लिखी संख्या।",
  },
  retirement: {
    title: "Retirement",
    titleHi: "सेवानिवृत्ति",
    blurb: "Today’s monthly expense, years to go, and inflation. An illustration of corpus — not a pension promise.",
    blurbHi: "आज का मासिक खर्च, बचे वर्ष, महंगाई। कॉर्पस का उदाहरण — पेंशन का वादा नहीं।",
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
    body: "Equity, debt, and hybrid schemes mapped to how long you can stay invested — not to a slogan. We explain the category; the scheme name comes later, in conversation.",
    bodyHi: "इक्विटी, डेट और हाइब्रिड — कितने समय तक निवेश रह सकते हैं, उसी से मैप। श्रेणी यहाँ; स्कीम नाम बातचीत में।",
  },
  sip: {
    title: "SIP",
    titleHi: "SIP",
    body: "A monthly amount you can actually keep. We set it up through the AMC or platform, review it, and change it when income or a goal changes.",
    bodyHi: "एक मासिक राशि जिसे आप निभा सकें। AMC या प्लेटफॉर्म से शुरू; आय या लक्ष्य बदले तो SIP भी।",
  },
  goals: {
    title: "Goal-based investing",
    titleHi: "लक्ष्य के अनुसार निवेश",
    body: "Education, a home, retirement. Each goal gets a horizon and a category. Scheme choice stays a conversation — this page will not name one.",
    bodyHi: "शिक्षा, घर, सेवानिवृत्ति। हर लक्ष्य की समय-सीमा और श्रेणी। स्कीम चुनाव बातचीत में — इस पेज पर नाम नहीं।",
  },
  stp_swp: {
    title: "STP / SWP",
    titleHi: "STP / SWP",
    body: "Move money from one category toward another on a written schedule (STP), or take a regular withdrawal (SWP). Not a reaction to last week’s market.",
    bodyHi: "एक श्रेणी से दूसरी की ओर निर्धारित स्थानांतरण (STP), या नियमित निकासी (SWP)। पिछले हफ्ते के बाज़ार की प्रतिक्रिया नहीं।",
  },
  retirement: {
    title: "Retirement",
    titleHi: "सेवानिवृत्ति",
    body: "A corpus conversation in mutual fund categories. Time horizon comes first. Risk is said out loud. This is not a pension product and not a guaranteed income plan.",
    bodyHi: "म्यूचुअल फंड श्रेणियों में कॉर्पस की बात। पहले समय-सीमा, जोखिम साफ़। यह पेंशन उत्पाद या गारंटीशुदा आय नहीं है।",
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
    body: "Fixed-income options as a complement to equity funds — for money you may need sooner. Not a substitute for talking about risk, and not a promise of yield.",
    bodyHi: "इक्विटी के पूरक के रूप में फिक्स्ड इनकम — जल्दी चाहिए हो तो। जोखिम की बात की जगह नहीं, यील्ड का वादा नहीं।",
  },
}
