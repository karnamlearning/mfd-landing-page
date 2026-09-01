import { createHash } from "node:crypto"

export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "")
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2)
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1)
  if (digits.length === 10) return digits
  return null
}

export function hashOtp(phone: string, code: string) {
  return createHash("sha256").update(`${phone}:${code}`).digest("hex")
}

export function randomOtp() {
  const n = Math.floor(Math.random() * 1_000_000)
  return n.toString().padStart(6, "0")
}

export function isOtpDev() {
  return process.env.OTP_DEV === "1" || process.env.NODE_ENV !== "production"
}

/** Local login always uses this code. Empty in production unless OTP_DEV_CODE is set. */
export function staticDevOtp() {
  if (process.env.OTP_DEV_CODE) return process.env.OTP_DEV_CODE.replace(/\D/g, "").slice(0, 6)
  if (isOtpDev()) return "000000"
  return ""
}
