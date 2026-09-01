"use client"

import { useEffect, useState } from "react"
import { FiCheck, FiX } from "react-icons/fi"
import {
  ADDON_LABEL,
  BASE_PRICE,
  addonDelta,
  formatInr,
  planTotal,
  type AddonId,
} from "@mfd/schema"
import { startCheckout, type CheckoutPlan } from "./checkout"
import { saveConfig } from "./persist"
import { useDraft } from "./store"
import * as U from "./styles"

function planNote(id: CheckoutPlan, total: number, addons: readonly string[]) {
  if (id === "yearly") {
    return addons.length
      ? `${formatInr(Math.round(total / 12))} / month billed yearly`
      : "₹250 / month · two months free"
  }
  return addons.length ? "Billed each month" : "About ₹10 a day"
}

export function PublishModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const status = useDraft((s) => s.status)
  const currentPlan = useDraft((s) => s.plan)
  const publicUrl = useDraft((s) => s.publicUrl)
  const gstin = useDraft((s) => s.config.details.gstin ?? "")
  const addons = useDraft((s) => s.config.addons)
  const patchDetails = useDraft((s) => s.patchDetails)
  const applyServer = useDraft((s) => s.applyServer)
  const [plan, setPlan] = useState<CheckoutPlan>(currentPlan ?? "yearly")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [gstOpen, setGstOpen] = useState(Boolean(gstin))
  const live = status === "active"
  const host = publicUrl.replace(/^https?:\/\//, "")
  const extras = addons.filter((id): id is AddonId => id === "tools" || id === "bilingual")
  const total = planTotal(plan, extras)

  useEffect(() => {
    if (!open) return
    setPlan(currentPlan ?? "yearly")
    setError(null)
    setGstOpen(Boolean(gstin))
  }, [open, currentPlan])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !busy) onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, busy, onClose])

  async function pay() {
    setBusy(true)
    setError(null)
    try {
      const data = await startCheckout(plan)
      applyServer(data)
      onClose()
    } catch (err) {
      if (err instanceof Error && err.message === "dismissed") return
      setError("Payment did not complete. Try again.")
    } finally {
      setBusy(false)
    }
  }

  if (!open) return null

  return (
    <U.ModalScrim
      onClick={() => {
        if (!busy) onClose()
      }}
    >
      <U.ModalCard
        role="dialog"
        aria-modal="true"
        aria-labelledby="publish-title"
        onClick={(e) => e.stopPropagation()}
      >
        <U.ModalTop>
          <div>
            <U.ModalKicker>{live ? "Your plan" : "Go live"}</U.ModalKicker>
            <U.ModalTitle id="publish-title">{live ? "Site is published" : "Publish your site"}</U.ModalTitle>
          </div>
          <U.ModalClose type="button" aria-label="Close" disabled={busy} onClick={onClose}>
            <FiX size={18} />
          </U.ModalClose>
        </U.ModalTop>
        <U.ModalLead>
          {live
            ? `Live on ${host || "your public URL"}${currentPlan ? ` · ${currentPlan === "yearly" ? "Yearly" : "Monthly"}` : ""}.`
            : host
              ? `${host} goes live after you subscribe.`
              : "Your public URL goes live after you subscribe."}
        </U.ModalLead>

        <U.PlanGrid>
          {(["yearly", "monthly"] as const).map((id) => {
            const on = plan === id
            const amount = planTotal(id, extras)
            return (
              <U.PlanCard
                key={id}
                type="button"
                $on={on}
                disabled={live}
                aria-pressed={on}
                onClick={() => setPlan(id)}
              >
                <U.PlanHead>
                  <U.PlanName>{id === "yearly" ? "Yearly" : "Monthly"}</U.PlanName>
                  {id === "yearly" ? <U.PlanTag $on={on}>Best value</U.PlanTag> : null}
                </U.PlanHead>
                <U.PlanPrice>{formatInr(amount)}</U.PlanPrice>
                <U.PlanPeriod>{id === "yearly" ? "per year" : "per month"}</U.PlanPeriod>
                <U.PlanNote>{planNote(id, amount, extras)}</U.PlanNote>
                <U.PlanMark $on={on} aria-hidden>
                  {on ? <FiCheck size={14} /> : null}
                </U.PlanMark>
              </U.PlanCard>
            )
          })}
        </U.PlanGrid>

        <U.PlanIncludes>
          <FiCheck size={14} aria-hidden />
          Branded site, lead inbox, and base calculators on both plans.
        </U.PlanIncludes>

        <U.PlanBreak>
          <U.PlanBreakRow>
            <span>Site</span>
            <span>{formatInr(BASE_PRICE[plan])}</span>
          </U.PlanBreakRow>
          {extras.map((id) => (
            <U.PlanBreakRow key={id}>
              <span>{ADDON_LABEL[id]}</span>
              <span>+{formatInr(addonDelta(id, plan))}</span>
            </U.PlanBreakRow>
          ))}
          <U.PlanBreakRow $total>
            <span>Total</span>
            <span>
              {formatInr(total)} {plan === "yearly" ? "/ year" : "/ month"}
            </span>
          </U.PlanBreakRow>
        </U.PlanBreak>

        {gstOpen ? (
          <U.ModalGst>
            <U.LabelRow>GSTIN — optional</U.LabelRow>
            <U.Input
              value={gstin}
              onChange={(e) => patchDetails({ gstin: e.target.value.toUpperCase().slice(0, 15) })}
              onBlur={() => void saveConfig(true)}
              spellCheck={false}
              placeholder="22AAAAA0000A1Z5"
              autoComplete="off"
            />
          </U.ModalGst>
        ) : (
          <U.GstLink type="button" onClick={() => setGstOpen(true)}>
            Add GSTIN for the invoice
          </U.GstLink>
        )}

        {error ? <U.Warn>{error}</U.Warn> : null}

        {live ? (
          <U.ModalCta type="button" onClick={onClose}>
            Close
          </U.ModalCta>
        ) : (
          <>
            <U.ModalCta type="button" disabled={busy} onClick={() => void pay()}>
              {busy
                ? "Opening checkout…"
                : `Publish · ${formatInr(total)} ${plan === "yearly" ? "per year" : "per month"}`}
            </U.ModalCta>
            <U.ModalHint>Checkout opens next. The site goes live as soon as payment succeeds.</U.ModalHint>
          </>
        )}
      </U.ModalCard>
    </U.ModalScrim>
  )
}

export function PublishStep({ onOpen }: { onOpen: () => void }) {
  const status = useDraft((s) => s.status)
  const publicUrl = useDraft((s) => s.publicUrl)
  const host = publicUrl.replace(/^https?:\/\//, "")
  return (
    <>
      <U.StepTitle>Publish</U.StepTitle>
      <U.StepLead>
        {status === "active"
          ? "Your site is live. Open Publish to see the plan."
          : host
            ? `${host} is ready. Publish to put it live.`
            : "Set your public URL in Review, then publish."}
      </U.StepLead>
      <U.NextRow>
        <U.NextBtn type="button" onClick={onOpen}>
          Publish
        </U.NextBtn>
      </U.NextRow>
    </>
  )
}
