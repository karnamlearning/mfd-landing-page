import { hostBase } from "./host"

function requestPort(hostHeader?: string | null): string | undefined {
  if (!hostHeader) return undefined
  const host = hostHeader.trim().toLowerCase()
  const v6 = host.match(/^\[.+\]:(\d+)$/)
  if (v6) return v6[1]
  const parts = host.split(":")
  if (parts.length === 2 && /^\d+$/.test(parts[1] ?? "")) return parts[1]
  return undefined
}

function siteOrigin(hostHeader?: string | null) {
  const proto = process.env.HOST_PROTOCOL || (process.env.NODE_ENV === "production" ? "https" : "http")
  const base = hostBase()
  const explicit = process.env.HOST_PORT
  const port = requestPort(hostHeader) ?? explicit ?? (proto === "https" ? "" : "3000")
  const portPart = !port || port === "80" || port === "443" ? "" : `:${port}`
  return { proto, base, portPart }
}

export function editorUrl(hostHeader?: string | null): string {
  const { proto, base, portPart } = siteOrigin(hostHeader)
  if (base === "localhost") return `${proto}://localhost${portPart}/place`
  return `${proto}://app.${base}${portPart}/place`
}

export function publicSiteUrl(slug: string, hostHeader?: string | null): string {
  const { proto, base, portPart } = siteOrigin(hostHeader)
  return `${proto}://${slug}.${base}${portPart}`
}

/** When Next picked another port (3001/3002), rewrite *.localhost URLs to this tab’s port. */
export function liveHref(publicUrl: string): string {
  if (typeof window === "undefined" || !publicUrl) return publicUrl
  try {
    const u = new URL(publicUrl)
    const here = window.location
    const local = (h: string) => h === "localhost" || h.endsWith(".localhost")
    if (!local(u.hostname) || !local(here.hostname)) return publicUrl.replace(/\/$/, "")
    u.protocol = here.protocol
    u.port = here.port
    return u.toString().replace(/\/$/, "")
  } catch {
    return publicUrl
  }
}
