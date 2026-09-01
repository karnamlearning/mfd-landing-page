export type HostRole = "app" | "public" | "marketing"

export type ParsedHost = {
  role: HostRole
  slug: string | null
  hostname: string
}

function hostnameOf(hostHeader: string): string {
  return hostHeader.trim().toLowerCase().split(":")[0] ?? ""
}

export function hostBase(): string {
  return (process.env.HOST_BASE || "localhost").toLowerCase()
}

export function parseHost(hostHeader: string, base = hostBase()): ParsedHost {
  const hostname = hostnameOf(hostHeader)
  if (!hostname || hostname === "127.0.0.1" || hostname === "[::1]" || hostname === "0.0.0.0") {
    return { role: "marketing", slug: null, hostname }
  }
  if (hostname === base || hostname === "localhost" || hostname === `www.${base}`) {
    return { role: "marketing", slug: null, hostname }
  }
  if (hostname === `app.${base}` || hostname === "app.localhost") {
    return { role: "app", slug: null, hostname }
  }
  const suffix = `.${base}`
  if (hostname.endsWith(suffix)) {
    const slug = hostname.slice(0, -suffix.length)
    if (!slug || slug === "www" || slug === "app") {
      return { role: "marketing", slug: null, hostname }
    }
    return { role: "public", slug, hostname }
  }
  if (base === "localhost" && hostname.endsWith(".localhost")) {
    const slug = hostname.slice(0, -".localhost".length)
    if (!slug || slug === "www") return { role: "marketing", slug: null, hostname }
    if (slug === "app") return { role: "app", slug: null, hostname }
    return { role: "public", slug, hostname }
  }
  return { role: "marketing", slug: null, hostname }
}
