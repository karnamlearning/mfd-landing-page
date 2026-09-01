import "server-only"
import { SignJWT, jwtVerify, type JWTPayload } from "jose"
import { cookies } from "next/headers"
import "./env"

export const SESSION_COOKIE = "mfd_session"

export type Session = {
  userId: number
  tenantId: number
  phone: string
}

function secret() {
  const value = process.env.AUTH_SECRET || process.env.SESSION_SECRET
  if (value) return new TextEncoder().encode(value)
  if (process.env.NODE_ENV !== "production") {
    return new TextEncoder().encode("mfd-dev-insecure-auth-secret-change-me")
  }
  throw new Error("AUTH_SECRET is not set")
}

export async function signSession(session: Session): Promise<string> {
  const payload: JWTPayload = {
    userId: session.userId,
    tenantId: session.tenantId,
    phone: session.phone,
  }
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret())
}

export async function readSessionToken(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, secret())
    const userId = Number(payload.userId)
    const tenantId = Number(payload.tenantId)
    const phone = typeof payload.phone === "string" ? payload.phone : ""
    if (!userId || !tenantId || !phone) return null
    return { userId, tenantId, phone }
  } catch {
    return null
  }
}

export async function getSession(): Promise<Session | null> {
  const jar = await cookies()
  const token = jar.get(SESSION_COOKIE)?.value
  if (!token) return null
  return readSessionToken(token)
}

export async function setSessionCookie(session: Session) {
  const jar = await cookies()
  const domain = process.env.COOKIE_DOMAIN || undefined
  jar.set(SESSION_COOKIE, await signSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    domain,
  })
}

export function json(data: unknown, status = 200) {
  return Response.json(data, { status })
}

export async function requireSession() {
  const session = await getSession()
  if (!session) return { session: null as Session | null, error: json({ error: "unauthorized" }, 401) }
  return { session, error: null }
}
