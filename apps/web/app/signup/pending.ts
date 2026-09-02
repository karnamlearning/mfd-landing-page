const KEY = "mfd_otp_pending"

export type PendingOtp = { phone: string; devCode: string | null }

export function readPendingOtp(): PendingOtp | null {
  if (typeof window === "undefined") return null
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as PendingOtp
    if (!data.phone || data.phone.length !== 10) return null
    return { phone: data.phone, devCode: data.devCode ?? null }
  } catch {
    return null
  }
}

export function writePendingOtp(data: PendingOtp) {
  sessionStorage.setItem(KEY, JSON.stringify(data))
}

export function clearPendingOtp() {
  sessionStorage.removeItem(KEY)
}

export function afterAuthPath(pickedFamily: boolean | undefined) {
  return pickedFamily === false ? "/templates" : "/place"
}
