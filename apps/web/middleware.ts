import { NextResponse, type NextRequest } from "next/server"
import { parseHost } from "./lib/host"

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

  if (parsed.role === "public" && (pathname === "/admin" || pathname.startsWith("/admin/"))) {
    const url = req.nextUrl.clone()
    url.pathname = "/missing"
    return NextResponse.rewrite(url, { request: { headers } })
  }

  if (parsed.role === "app" && !pass && pathname !== "/place" && !pathname.startsWith("/place/")) {
    const url = req.nextUrl.clone()
    url.pathname = "/place"
    return NextResponse.rewrite(url, { request: { headers } })
  }

  if (parsed.role === "public" && (pathname === "/place" || pathname.startsWith("/place/"))) {
    const url = req.nextUrl.clone()
    url.pathname = "/missing"
    return NextResponse.rewrite(url, { request: { headers } })
  }

  return NextResponse.next({ request: { headers } })
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
}
