"use client"

import { clearPendingOtp } from "../signup/pending"

export async function logoutBuyer() {
  clearPendingOtp()
  await fetch("/api/auth/logout", { method: "POST" })
  window.location.assign("/")
}
