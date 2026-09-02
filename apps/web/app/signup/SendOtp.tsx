"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { ThemeProvider } from "styled-components"
import { themes } from "@mfd/tokens"
import { BrandLogo } from "../BrandLogo"
import { SIGNUP_LOGO } from "../brand"
import { PhoneNumber } from "../place/PhoneNumber"
import { AuthGlobal } from "./styles"
import { writePendingOtp } from "./pending"
import * as A from "./styles"

export function SendOtp() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function send(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error === "invalid_phone" ? "Enter a 10-digit mobile number." : "Could not send OTP.")
        return
      }
      writePendingOtp({
        phone,
        devCode: typeof data.devCode === "string" ? data.devCode : null,
      })
      router.push("/verify")
    } catch {
      setError("Could not send OTP.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <ThemeProvider theme={themes.slate}>
      <AuthGlobal />
      <A.Page>
        <A.Card>
          <A.LogoWrap>
            <BrandLogo src={SIGNUP_LOGO} size="sm" />
          </A.LogoWrap>
          <form onSubmit={send}>
            <A.Kicker>Buyer Place</A.Kicker>
            <A.Title>Sign in with mobile</A.Title>
            <A.Lead>We send a one-time code and open your site draft. New numbers get a draft automatically.</A.Lead>
            <A.Field>
              Mobile number
              <PhoneNumber white value={phone} onChange={setPhone} aria-label="Mobile number" />
            </A.Field>
            {error ? <A.Warn>{error}</A.Warn> : null}
            <A.Actions>
              <A.Primary type="submit" disabled={busy || phone.length !== 10}>
                {busy ? "Sending…" : "Send OTP"}
              </A.Primary>
            </A.Actions>
          </form>
        </A.Card>
      </A.Page>
    </ThemeProvider>
  )
}
