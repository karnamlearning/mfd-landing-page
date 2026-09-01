import { hostBase } from "./host"

export function publicSiteUrl(slug: string): string {
  const proto = process.env.HOST_PROTOCOL || (process.env.NODE_ENV === "production" ? "https" : "http")
  const base = hostBase()
  const explicit = process.env.HOST_PORT
  const port = explicit ?? (proto === "https" ? "" : "3000")
  const portPart = !port || port === "80" || port === "443" ? "" : `:${port}`
  return `${proto}://${slug}.${base}${portPart}`
}
