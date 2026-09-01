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
