import { NextResponse, type NextRequest } from "next/server"
import { parseHost } from "./lib/host"

function isPrefix(pathname: string, root: string) {
  return pathname === root || pathname.startsWith(`${root}/`)
}

export function middleware(req: NextRequest) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || ""
  const parsed = parseHost(host)
  const headers = new Headers(req.headers)
  headers.set("x-mfd-role", parsed.role)
  if (parsed.slug) headers.set("x-mfd-slug", parsed.slug)
  else headers.delete("x-mfd-slug")

  const { pathname } = req.nextUrl
  const pass =
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/uploads")

  const publicBlocked =
    isPrefix(pathname, "/admin") ||
    isPrefix(pathname, "/place") ||
    isPrefix(pathname, "/verify") ||
    isPrefix(pathname, "/templates")

  if (parsed.role === "public" && publicBlocked) {
    const url = req.nextUrl.clone()
    url.pathname = "/missing"
    return NextResponse.rewrite(url, { request: { headers } })
  }

  const appAllowed =
    pathname === "/" ||
    isPrefix(pathname, "/place") ||
    isPrefix(pathname, "/verify") ||
    isPrefix(pathname, "/templates") ||
    isPrefix(pathname, "/admin") ||
    isPrefix(pathname, "/look") ||
    isPrefix(pathname, "/blank") ||
    isPrefix(pathname, "/missing")

  if (parsed.role === "app" && !pass && !appAllowed) {
    const url = req.nextUrl.clone()
    url.pathname = "/place"
    return NextResponse.rewrite(url, { request: { headers } })
  }

  return NextResponse.next({ request: { headers } })
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
}
