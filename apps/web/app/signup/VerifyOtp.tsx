"use client"

import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import { ThemeProvider } from "styled-components"
import { themes } from "@mfd/tokens"
import { BrandLogo } from "../BrandLogo"
import { VERIFY_LOGO } from "../brand"
import { AuthGlobal } from "./styles"
import type { ServerDraft } from "../place/store"
import { afterAuthPath, clearPendingOtp, readPendingOtp, writePendingOtp } from "./pending"
import * as A from "./styles"

function maskPhone(phone: string) {
  if (phone.length < 4) return `+91 ${phone}`
  return `+91 ${phone.slice(0, 2)}••••${phone.slice(-2)}`
}

export function VerifyOtp() {
  const router = useRouter()
  const [phone, setPhone] = useState<string | null>(null)
  const [digits, setDigits] = useState(["", "", "", "", "", ""])
  const [devCode, setDevCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const boxes = useRef<Array<HTMLInputElement | null>>([])

  const code = digits.join("")

  useEffect(() => {
    const pending = readPendingOtp()
    if (!pending) {
      router.replace("/")
      return
    }
    setPhone(pending.phone)
    setDevCode(pending.devCode)
  }, [router])

  function setDigit(i: number, raw: string) {
    const d = raw.replace(/\D/g, "").slice(-1)
    setDigits((prev) => {
      const next = [...prev]
      next[i] = d
      return next
    })
    if (d && i < 5) boxes.current[i + 1]?.focus()
  }

  function onKey(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      boxes.current[i - 1]?.focus()
    }
  }

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (!text) return
    e.preventDefault()
    const next = ["", "", "", "", "", ""]
    text.split("").forEach((ch, i) => {
      next[i] = ch
    })
    setDigits(next)
    boxes.current[Math.min(text.length, 5)]?.focus()
  }

  async function sendOtp() {
    if (!phone) return
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
        setError("Could not send OTP.")
        return
      }
      const nextDev = typeof data.devCode === "string" ? data.devCode : null
      setDevCode(nextDev)
      writePendingOtp({ phone, devCode: nextDev })
      setDigits(["", "", "", "", "", ""])
      boxes.current[0]?.focus()
    } catch {
      setError("Could not send OTP.")
    } finally {
      setBusy(false)
    }
  }

  async function verify(e: FormEvent) {
    e.preventDefault()
    if (!phone) return
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
      clearPendingOtp()
      const me = await fetch("/api/me/config")
      if (!me.ok) {
        router.replace("/templates")
        return
      }
      const draft = (await me.json()) as ServerDraft
      router.replace(afterAuthPath(draft.config.pickedFamily))
    } catch {
      setError("Could not verify.")
    } finally {
      setBusy(false)
    }
  }

  if (!phone) return null

  return (
    <ThemeProvider theme={themes.slate}>
      <AuthGlobal />
      <A.Page>
        <A.Card>
          <A.LogoWrap>
            <BrandLogo src={VERIFY_LOGO} size="lg" />
          </A.LogoWrap>
          <form onSubmit={verify}>
            <A.Kicker>Verify</A.Kicker>
            <A.Title>Enter the 6-digit code</A.Title>
            <A.Lead>Sent to {maskPhone(phone)}. It expires in a few minutes.</A.Lead>
            {devCode ? <A.DevChip>Dev code: {devCode}</A.DevChip> : null}
            <A.Field>
              One-time code
              <A.CodeRow>
                {digits.map((d, i) => (
                  <A.CodeBox
                    key={i}
                    ref={(el) => {
                      boxes.current[i] = el
                    }}
                    size={1}
                    inputMode="numeric"
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    autoFocus={i === 0}
                    maxLength={1}
                    value={d}
                    onChange={(e) => setDigit(i, e.target.value)}
                    onKeyDown={(e) => onKey(i, e)}
                    onPaste={onPaste}
                    aria-label={`Digit ${i + 1}`}
                  />
                ))}
              </A.CodeRow>
            </A.Field>
            {error ? <A.Warn>{error}</A.Warn> : null}
            <A.Actions>
              <A.Primary type="submit" disabled={busy || code.length !== 6}>
                {busy ? "Checking…" : "Verify OTP"}
              </A.Primary>
              <A.GoldLink type="button" onClick={() => void sendOtp()} disabled={busy}>
                Resend code
              </A.GoldLink>
              <A.Ghost
                type="button"
                onClick={() => {
                  clearPendingOtp()
                  router.push("/")
                }}
                disabled={busy}
              >
                Change number
              </A.Ghost>
            </A.Actions>
            <A.Hint>Check SMS. If nothing arrives, resend or change the number.</A.Hint>
          </form>
        </A.Card>
      </A.Page>
    </ThemeProvider>
  )
}
