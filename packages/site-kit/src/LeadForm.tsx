"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import * as S from "./styles"
import type { SkinCtx } from "./skin-shared"

export function LeadForm({ ctx, children }: { ctx: SkinCtx; children?: ReactNode }) {
  const { t } = ctx
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: String(fd.get("name") ?? ""),
          mobile: String(fd.get("mobile") ?? ""),
          city: String(fd.get("city") ?? ""),
          message: String(fd.get("message") ?? ""),
        }),
      })
      if (!res.ok) {
        setError("Could not send. Try again.")
        return
      }
      setSent(true)
    } catch {
      setError("Could not send. Try again.")
    } finally {
      setBusy(false)
    }
  }

  if (sent) return <S.Bio>{t.sent}</S.Bio>

  return (
    <S.Form onSubmit={(e) => void onSubmit(e)}>
      {children}
      <S.Field>
        {t.name}
        <S.Input name="name" required autoComplete="name" />
      </S.Field>
      <S.Field>
        {t.mobile}
        <S.PhoneField>
          <S.PhonePrefix>+91</S.PhonePrefix>
          <S.PhoneInput
            name="mobile"
            type="tel"
            required
            inputMode="numeric"
            autoComplete="tel"
            maxLength={10}
            placeholder="98765 43210"
          />
        </S.PhoneField>
      </S.Field>
      <S.Field>
        {t.city}
        <S.Input name="city" autoComplete="address-level2" />
      </S.Field>
      <S.Field>
        {t.message}
        <S.Area name="message" rows={3} />
      </S.Field>
      {error ? <S.ServiceCopy>{error}</S.ServiceCopy> : null}
      <S.Submit type="submit" disabled={busy}>
        {busy ? "…" : t.send}
      </S.Submit>
    </S.Form>
  )
}
