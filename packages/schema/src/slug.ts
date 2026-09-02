export const reservedSlugs = [
  "app",
  "www",
  "www2",
  "admin",
  "api",
  "mail",
  "ftp",
  "localhost",
  "place",
  "verify",
  "templates",
  "signup",
  "look",
  "blank",
  "static",
  "assets",
  "uploads",
  "staging",
  "dev",
] as const

const reserved = new Set<string>(reservedSlugs)

export function slugifyName(name: string): string {
  const slug = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
  return slug || "site"
}

export function isPhoneStubSlug(slug: string): boolean {
  return /^n\d{8,15}$/.test(slug)
}

export function isReservedSlug(slug: string): boolean {
  return reserved.has(slug)
}

export function phoneStubSlug(phone: string): string {
  return `n${phone}`
}
