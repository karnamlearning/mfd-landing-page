import "server-only"
import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import { json } from "./auth"
import "./env"

export const ADMIN_COOKIE = "mfd_admin"

function secret() {
  const value = process.env.AUTH_SECRET || process.env.SESSION_SECRET
  if (value) return new TextEncoder().encode(value)
  if (process.env.NODE_ENV !== "production") {
    return new TextEncoder().encode("mfd-dev-insecure-auth-secret-change-me")
  }
  throw new Error("AUTH_SECRET is not set")
}

export function adminGateSecret() {
  if (process.env.ADMIN_SECRET) return process.env.ADMIN_SECRET
  if (process.env.NODE_ENV !== "production") return "admin"
  return ""
}

export function adminConfigured() {
  return Boolean(adminGateSecret())
}

export async function signAdminToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secret())
}

export async function setAdminCookie() {
  const jar = await cookies()
  const domain = process.env.COOKIE_DOMAIN || undefined
  jar.set(ADMIN_COOKIE, await signAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
    domain,
  })
}

export async function clearAdminCookie() {
  const jar = await cookies()
  const domain = process.env.COOKIE_DOMAIN || undefined
  jar.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    domain,
  })
}

export async function getAdminSession(): Promise<boolean> {
  if (!adminConfigured()) return false
  const jar = await cookies()
  const token = jar.get(ADMIN_COOKIE)?.value
  if (!token) return false
  try {
    const { payload } = await jwtVerify(token, secret())
    return payload.role === "admin"
  } catch {
    return false
  }
}

export async function requireAdmin() {
  if (!adminConfigured()) return { ok: false as const, error: json({ error: "not_configured" }, 404) }
  const ok = await getAdminSession()
  if (!ok) return { ok: false as const, error: json({ error: "unauthorized" }, 401) }
  return { ok: true as const, error: null }
}

export function secretsMatch(provided: string, expected: string) {
  if (!expected) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  let out = 0
  for (let i = 0; i < a.length; i++) out |= a[i]! ^ b[i]!
  return out === 0
}
