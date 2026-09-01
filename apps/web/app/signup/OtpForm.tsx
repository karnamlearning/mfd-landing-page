"use client"

import { useState, type FormEvent } from "react"
import * as U from "../place/styles"
import { PhoneNumber } from "../place/PhoneNumber"

export function OtpForm({ onAuthed }: { onAuthed: () => void }) {
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [sent, setSent] = useState(false)
  const [devCode, setDevCode] = useState<string | null>(null)
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
      setSent(true)
      setDevCode(typeof data.devCode === "string" ? data.devCode : null)
    } catch {
      setError("Could not send OTP.")
    } finally {
      setBusy(false)
    }
  }

  async function verify(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone, code }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(
          data.error === "expired"
            ? "That code expired. Send again."
            : data.error === "too_many_attempts"
              ? "Too many tries. Send a new code."
              : "Wrong code. Try again.",
        )
        return
      }
      onAuthed()
    } catch {
      setError("Could not verify.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <U.OtpCard>
      <U.StepTitle>Sign in with mobile</U.StepTitle>
      <U.StepLead>We send a one-time code and create your site draft.</U.StepLead>
      {!sent ? (
        <form onSubmit={send}>
          <U.Field>
            Mobile number
            <PhoneNumber
              value={phone}
              onChange={setPhone}
              aria-label="Mobile number"
            />
          </U.Field>
          {error ? <U.Warn>{error}</U.Warn> : null}
          <U.NextRow>
            <U.NextBtn type="submit" disabled={busy}>
              {busy ? "Sending…" : "Send OTP"}
            </U.NextBtn>
          </U.NextRow>
        </form>
      ) : (
        <form onSubmit={verify}>
          <U.Field>
            6-digit code
            <U.Input
              value={code}
              inputMode="numeric"
              autoComplete="one-time-code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="000000"
            />
          </U.Field>
          {error ? <U.Warn>{error}</U.Warn> : null}
          <U.NextRow>
            <U.ClearBtn type="button" onClick={() => setSent(false)} disabled={busy}>
              Change number
            </U.ClearBtn>
            <U.NextBtn type="submit" disabled={busy}>
              {busy ? "Checking…" : "Verify"}
            </U.NextBtn>
          </U.NextRow>
        </form>
      )}
    </U.OtpCard>
  )
}
