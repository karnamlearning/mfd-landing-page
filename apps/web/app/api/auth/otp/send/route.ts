import { otpChallenges } from "@mfd/db"
import { json } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { hashOtp, normalizePhone, randomOtp } from "@/lib/phone"

export const runtime = "nodejs"

const TTL_MS = 10 * 60 * 1000

export async function POST(req: Request) {
  let body: { phone?: string }
  try {
    body = await req.json()
  } catch {
    return json({ error: "invalid_json" }, 400)
  }
  const phone = normalizePhone(body.phone ?? "")
  if (!phone) return json({ error: "invalid_phone" }, 400)

  const code = randomOtp()
  const db = getDb()
  const expiresAt = new Date(Date.now() + TTL_MS)
  await db
    .insert(otpChallenges)
    .values({ phone, codeHash: hashOtp(phone, code), expiresAt, attempts: 0 })
    .onDuplicateKeyUpdate({
      set: { codeHash: hashOtp(phone, code), expiresAt, attempts: 0 },
    })

  console.info(`[otp] ${phone} ${code}`)
  const dev = process.env.OTP_DEV === "1" || process.env.NODE_ENV !== "production"
  return json(dev ? { ok: true, devCode: code } : { ok: true })
}
