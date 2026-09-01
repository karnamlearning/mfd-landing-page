import { sampleFaq, sampleFill, sampleTestimonials } from "./sample"
import type { TenantConfig, TenantDetails } from "./tenant"

function emptyStr(v: string | undefined) {
  return v == null || v.trim() === ""
}

function mergeDetails(details: TenantDetails): TenantDetails {
  const s = sampleFill
  return {
    ...details,
    name: emptyStr(details.name) ? s.name : details.name,
    logoUrl: emptyStr(details.logoUrl) ? s.logoUrl : details.logoUrl,
    photoUrl: emptyStr(details.photoUrl) ? s.photoUrl : details.photoUrl,
    heroImageUrl: emptyStr(details.heroImageUrl) ? s.heroImageUrl : details.heroImageUrl,
    heroHeadline: emptyStr(details.heroHeadline) ? s.heroHeadline : details.heroHeadline,
    pitch: emptyStr(details.pitch) ? s.pitch : details.pitch,
    whatsapp: emptyStr(details.whatsapp) ? s.whatsapp : details.whatsapp,
    phone: emptyStr(details.phone)
      ? emptyStr(details.whatsapp)
        ? s.phone
        : details.whatsapp
      : details.phone,
    email: emptyStr(details.email) ? s.email : details.email,
    address: emptyStr(details.address) ? s.address : details.address,
    city: emptyStr(details.city) ? s.city : details.city,
    languages: details.languages.length ? details.languages : s.languages,
    bio: emptyStr(details.bio) ? s.bio : details.bio,
    bioHi: emptyStr(details.bioHi) ? s.bioHi : details.bioHi,
    credentials: details.credentials.length ? details.credentials : s.credentials,
    stats: details.stats.length ? details.stats : s.stats,
    hours: emptyStr(details.hours) ? s.hours : details.hours,
    arn: emptyStr(details.arn) ? s.arn : details.arn,
  }
}

/** Fill empty fields from sampleFill only when `preview` is true. Public/live must pass false. */
export function mergeSample(config: TenantConfig, preview: boolean): TenantConfig {
  if (!preview) return config
  return {
    ...config,
    details: mergeDetails(config.details),
    testimonials: config.testimonials.length ? config.testimonials : sampleTestimonials,
    faq: config.faq.length ? config.faq : sampleFaq,
  }
}
