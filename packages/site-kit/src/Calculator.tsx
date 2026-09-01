"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import { FaWhatsapp } from "react-icons/fa6"
import type { ReadyToolId, TenantConfig, ToolId } from "@mfd/schema"
import type { Copy } from "./copy"
import * as S from "./styles"
import { firstName, inr, waHref } from "./utils"

export type ToolResult = {
  invested: number
  value: number
  monthly?: number
  amount?: number
  corpus?: number
  remaining?: number
  withdrawn?: number
}

type Field = { key: string; label: keyof Copy; min: number; max: number; step?: number }

const FIELDS: Record<ReadyToolId, Field[]> = {
  sip: [
    { key: "monthly", label: "monthly", min: 500, max: 10000000 },
    { key: "years", label: "years", min: 1, max: 40 },
    { key: "rate", label: "expected", min: 1, max: 20, step: 0.5 },
  ],
  lumpsum: [
    { key: "amount", label: "amount", min: 1000, max: 100000000 },
    { key: "years", label: "years", min: 1, max: 40 },
    { key: "rate", label: "expected", min: 1, max: 20, step: 0.5 },
  ],
  goal_sip: [
    { key: "target", label: "target", min: 10000, max: 100000000 },
    { key: "years", label: "years", min: 1, max: 40 },
    { key: "rate", label: "expected", min: 1, max: 20, step: 0.5 },
  ],
  retirement: [
    { key: "expense", label: "expense", min: 5000, max: 1000000 },
    { key: "years", label: "years", min: 1, max: 40 },
    { key: "inflation", label: "inflation", min: 1, max: 15, step: 0.5 },
    { key: "rate", label: "expected", min: 1, max: 20, step: 0.5 },
  ],
  swp: [
    { key: "corpus", label: "startingCorpus", min: 10000, max: 100000000 },
    { key: "monthly", label: "withdrawal", min: 1000, max: 1000000 },
    { key: "years", label: "years", min: 1, max: 40 },
    { key: "rate", label: "expected", min: 1, max: 20, step: 0.5 },
  ],
  inflation: [
    { key: "amount", label: "amount", min: 1000, max: 100000000 },
    { key: "years", label: "years", min: 1, max: 40 },
    { key: "inflation", label: "inflation", min: 1, max: 15, step: 0.5 },
  ],
  compounding: [
    { key: "amount", label: "amount", min: 1000, max: 100000000 },
    { key: "years", label: "years", min: 1, max: 40 },
    { key: "rate", label: "expected", min: 1, max: 20, step: 0.5 },
  ],
  sip_stepup: [
    { key: "monthly", label: "monthly", min: 500, max: 10000000 },
    { key: "years", label: "years", min: 1, max: 40 },
    { key: "rate", label: "expected", min: 1, max: 20, step: 0.5 },
    { key: "stepup", label: "stepup", min: 0, max: 30, step: 1 },
  ],
  lumpsum_target: [
    { key: "target", label: "target", min: 10000, max: 100000000 },
    { key: "years", label: "years", min: 1, max: 40 },
    { key: "rate", label: "expected", min: 1, max: 20, step: 0.5 },
  ],
}

const DEFAULTS: Record<string, number> = {
  monthly: 10000,
  years: 15,
  rate: 12,
  amount: 100000,
  target: 5000000,
  inflation: 6,
  stepup: 10,
  expense: 50000,
  corpus: 5000000,
}

function leadKey() {
  return "mfd-lead-ok"
}

export function Calculator({
  tool,
  config,
  t,
  preview,
  compact,
}: {
  tool: ToolId
  config: TenantConfig
  t: Copy
  preview?: boolean
  compact?: boolean
}) {
  const fields = FIELDS[tool as ReadyToolId]
  const [values, setValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {}
    for (const f of fields ?? []) init[f.key] = DEFAULTS[f.key] ?? f.min
    return init
  })
  const [result, setResult] = useState<ToolResult | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [leadName, setLeadName] = useState("")
  const [leadMobile, setLeadMobile] = useState("")
  const [unlocked, setUnlocked] = useState(!!preview)

  async function run() {
    if (!fields) return
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(`/api/tools/${tool}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      })
      const data = (await res.json()) as ToolResult & { error?: string }
      if (!res.ok) {
        setError("Could not calculate.")
        return
      }
      setResult(data)
    } catch {
      setError("Could not calculate.")
    } finally {
      setBusy(false)
    }
  }

  async function submitLead(e: FormEvent) {
    e.preventDefault()
    const name = leadName.trim()
    const mobile = leadMobile.replace(/\D/g, "")
    if (!name || mobile.length !== 10) {
      setError("Enter name and a 10-digit mobile.")
      return
    }
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          mobile,
          source: tool,
          payload: { tool, ...values, result },
        }),
      })
      if (!res.ok) {
        setError("Could not save. Try again.")
        return
      }
      sessionStorage.setItem(leadKey(), "1")
      setUnlocked(true)
    } catch {
      setError("Could not save. Try again.")
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    if (preview) {
      setUnlocked(true)
      return
    }
    setUnlocked(sessionStorage.getItem(leadKey()) === "1")
  }, [preview])

  useEffect(() => {
    if (!compact || !fields) return
    void run()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- featured widget: run once with defaults
  }, [compact, tool])

  const waText = useMemo(() => {
    if (!result) return ""
    const bits = [`${tool}: ${t.illustrative} ${inr(result.value)}`]
    if (result.invested) bits.push(`${t.invested} ${inr(result.invested)}`)
    if (result.monthly) bits.push(`${t.monthly} ${inr(result.monthly)}`)
    return bits.join(". ")
  }, [result, t, tool])

  if (!fields) return null

  const showNumbers = preview || unlocked
  const wa = `${waHref(config.details.whatsapp)}?text=${encodeURIComponent(
    `Hi ${firstName(config.details.name)}, I'm ${leadName || "a visitor"}. ${waText}`,
  )}`

  return (
    <S.CalcGrid>
      <div>
        {fields.map((f) => (
          <S.Field key={f.key}>
            {String(t[f.label])}
            <S.Input
              type="number"
              min={f.min}
              max={f.max}
              step={f.step ?? 1}
              value={values[f.key] ?? ""}
              onChange={(e) => setValues((s) => ({ ...s, [f.key]: Number(e.target.value) || 0 }))}
            />
          </S.Field>
        ))}
        <S.CalcBtn type="button" disabled={busy} onClick={() => void run()}>
          {busy ? "…" : t.calculate}
        </S.CalcBtn>
      </div>
      <S.Result>
        {!result ? (
          <>
            <S.ServiceCopy>{error ?? t.calcNote}</S.ServiceCopy>
            {compact ? (
              <p style={{ marginTop: "1rem" }}>
                <a href="/calculators">{t.allTools}</a>
              </p>
            ) : null}
          </>
        ) : !showNumbers ? (
          <LeadBoxInner
            t={t}
            name={leadName}
            mobile={leadMobile}
            onName={setLeadName}
            onMobile={setLeadMobile}
            onSubmit={submitLead}
            busy={busy}
            error={error}
          />
        ) : (
          <>
            <S.ResultK>{t.illustrative}</S.ResultK>
            <S.ResultN>{inr(result.value)}</S.ResultN>
            {result.invested ? (
              <S.ServiceCopy>
                {t.invested}: {inr(result.invested)}
              </S.ServiceCopy>
            ) : null}
            {result.monthly && tool !== "sip" && tool !== "swp" ? (
              <S.ServiceCopy>
                {t.monthly}: {inr(result.monthly)}
              </S.ServiceCopy>
            ) : null}
            {result.corpus ? (
              <S.ServiceCopy>
                {t.corpus}: {inr(result.corpus)}
              </S.ServiceCopy>
            ) : null}
            {result.remaining != null && tool === "swp" ? (
              <S.ServiceCopy>
                {t.remaining}: {inr(result.remaining)}
              </S.ServiceCopy>
            ) : null}
            <S.ServiceCopy>{t.calcNote}</S.ServiceCopy>
            {config.details.whatsapp ? (
              <S.WaResult href={wa} target="_blank" rel="noreferrer">
                <FaWhatsapp size={16} aria-hidden />
                {t.discuss}
              </S.WaResult>
            ) : null}
            {compact ? (
              <p style={{ marginTop: "1rem" }}>
                <a href="/calculators">{t.allTools}</a>
              </p>
            ) : null}
          </>
        )}
        {error && showNumbers ? <S.ServiceCopy>{error}</S.ServiceCopy> : null}
      </S.Result>
    </S.CalcGrid>
  )
}

function LeadBoxInner({
  t,
  name,
  mobile,
  onName,
  onMobile,
  onSubmit,
  busy,
  error,
}: {
  t: Copy
  name: string
  mobile: string
  onName: (v: string) => void
  onMobile: (v: string) => void
  onSubmit: (e: FormEvent) => void
  busy: boolean
  error: string | null
}) {
  return (
    <S.LeadBox>
      <S.ServiceCopy>{t.leadHint}</S.ServiceCopy>
      <form onSubmit={onSubmit}>
        <S.Field>
          {t.name}
          <S.Input value={name} autoComplete="name" required onChange={(e) => onName(e.target.value)} />
        </S.Field>
        <S.Field>
          {t.mobile}
          <S.PhoneField>
            <S.PhonePrefix>+91</S.PhonePrefix>
            <S.PhoneInput
              value={mobile}
              inputMode="numeric"
              autoComplete="tel"
              maxLength={10}
              required
              onChange={(e) => onMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
            />
          </S.PhoneField>
        </S.Field>
        {error ? <S.ServiceCopy>{error}</S.ServiceCopy> : null}
        <S.CalcBtn type="submit" disabled={busy}>
          {t.seeResult}
        </S.CalcBtn>
      </form>
    </S.LeadBox>
  )
}
