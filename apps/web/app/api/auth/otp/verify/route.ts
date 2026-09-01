import { eq, otpChallenges, tenants, users } from "@mfd/db"
import { emptyDraftConfig, phoneStubSlug } from "@mfd/schema"
import { json, setSessionCookie } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { hashOtp, normalizePhone } from "@/lib/phone"
import { uniqueSlug } from "@/lib/slug"

export const runtime = "nodejs"

export async function POST(req: Request) {
  let body: { phone?: string; code?: string }
  try {
    body = await req.json()
  } catch {
    return json({ error: "invalid_json" }, 400)
  }
  const phone = normalizePhone(body.phone ?? "")
  const code = (body.code ?? "").replace(/\D/g, "")
  if (!phone || code.length !== 6) return json({ error: "invalid" }, 400)

  const db = getDb()
  const devCode = process.env.OTP_DEV_CODE || (process.env.NODE_ENV !== "production" ? "000000" : "")
  const devOk = Boolean(devCode && code === devCode)

  if (!devOk) {
    const rows = await db.select().from(otpChallenges).where(eq(otpChallenges.phone, phone)).limit(1)
    const row = rows[0]
    if (!row || row.expiresAt.getTime() < Date.now()) {
      return json({ error: "expired" }, 400)
    }
    if (row.attempts >= 5) return json({ error: "too_many_attempts" }, 429)
    if (row.codeHash !== hashOtp(phone, code)) {
      await db
        .update(otpChallenges)
        .set({ attempts: row.attempts + 1 })
        .where(eq(otpChallenges.phone, phone))
      return json({ error: "invalid_code" }, 400)
    }
    await db.delete(otpChallenges).where(eq(otpChallenges.phone, phone))
  } else {
    await db.delete(otpChallenges).where(eq(otpChallenges.phone, phone))
  }

  const existing = await db.select().from(users).where(eq(users.phone, phone)).limit(1)
  let user = existing[0]
  if (!user) {
    const slug = await uniqueSlug(phoneStubSlug(phone))
    const [tenantIdRow] = await db
      .insert(tenants)
      .values({
        slug,
        status: "draft",
        config: emptyDraftConfig(slug),
        ownerPhone: phone,
        slugLocked: false,
      })
      .$returningId()
    if (!tenantIdRow) return json({ error: "create_failed" }, 500)
    const tenantId = tenantIdRow.id
    const [userIdRow] = await db.insert(users).values({ phone, tenantId }).$returningId()
    if (!userIdRow) return json({ error: "create_failed" }, 500)
    user = {
      id: userIdRow.id,
      phone,
      tenantId,
      createdAt: new Date(),
    }
  }

  await setSessionCookie({ userId: user.id, tenantId: user.tenantId, phone: user.phone })
  return json({ ok: true })
}
