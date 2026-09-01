import type { TenantConfig, Wording, WordingLine } from "@mfd/schema"
import { serviceCopy, type Copy, type Locale } from "./copy"
import { firstName } from "./utils"

function line(value: string | undefined, fallback: string) {
  const s = value?.trim()
  return s ? s : fallback
}

function pick(en: string | undefined, hi: string | undefined, locale: Locale, fallback: string) {
  return line(locale === "hi" ? hi || en : en, fallback)
}

function cards(
  override: WordingLine[] | undefined,
  canned: Array<{ title: string; body: string }>,
  locale: Locale,
) {
  if (!override?.length) return canned
  const mapped = override
    .map((row) => ({
      title: line(locale === "hi" ? row.titleHi || row.title : row.title, ""),
      body: line(locale === "hi" ? row.bodyHi || row.body : row.body, ""),
    }))
    .filter((row) => row.title || row.body)
  return mapped.length ? mapped : canned
}

export function brandService(id: string, wording: Wording | undefined, locale: Locale) {
  const canned = serviceCopy[id]
  if (!canned) return null
  const o = wording?.services?.[id]
  const hi = locale === "hi"
  return {
    title: pick(o?.title, o?.titleHi, locale, hi ? canned.titleHi : canned.title),
    body: pick(o?.body, o?.bodyHi, locale, hi ? canned.bodyHi : canned.body),
  }
}

export function brandCopy(config: TenantConfig, t: Copy, locale: Locale) {
  const w = config.wording ?? {}
  const city = config.details.city
  return {
    aboutTitle: pick(w.aboutTitle, w.aboutTitleHi, locale, t.aboutTitle(city)),
    whyTitle: pick(w.whyTitle, w.whyTitleHi, locale, t.whyTitle),
    why: cards(w.why, t.why, locale),
    servicesTitle: pick(w.servicesTitle, w.servicesTitleHi, locale, t.servicesTitle),
    servicesLead: pick(w.servicesLead, w.servicesLeadHi, locale, t.servicesLead),
    howTitle: pick(w.howTitle, w.howTitleHi, locale, t.howTitle),
    howLead: pick(w.howLead, w.howLeadHi, locale, t.howLead),
    how: cards(w.how, t.how, locale),
    calcTitle: pick(w.calcTitle, w.calcTitleHi, locale, t.calcTitle),
    calcLead: pick(w.calcLead, w.calcLeadHi, locale, t.calcLead),
    contactTitle: pick(w.contactTitle, w.contactTitleHi, locale, t.contactTitle),
    quotesTitle: pick(w.quotesTitle, w.quotesTitleHi, locale, t.quotesTitle),
    faqTitle: pick(w.faqTitle, w.faqTitleHi, locale, t.faqTitle),
    recordTitle: pick(w.recordTitle, w.recordTitleHi, locale, t.recordTitle),
    cta: pick(w.cta, w.ctaHi, locale, t.talkTo(firstName(config.details.name))),
  }
}

export type BrandCopy = ReturnType<typeof brandCopy>
