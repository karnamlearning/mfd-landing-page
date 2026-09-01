"use client"

import { saveConfig } from "./persist"
import { type ServerDraft, type TenantPlan, useDraft } from "./store"
import { formatInr, planTotal } from "@mfd/schema"

export type CheckoutPlan = NonNullable<TenantPlan>

type CheckoutOk = ServerDraft
type CheckoutStart =
  | { mode: "dev"; plan: CheckoutPlan; subscriptionId: string }
  | { mode: "razorpay"; plan: CheckoutPlan; subscriptionId: string; keyId: string }
  | (ServerDraft & { error?: string })

declare global {
  interface Window {
    Razorpay?: new (opts: {
      key: string
      subscription_id: string
      name: string
      description?: string
      handler: (res: {
        razorpay_payment_id: string
        razorpay_subscription_id: string
        razorpay_signature: string
      }) => void
      modal?: { ondismiss?: () => void }
    }) => { open: () => void }
  }
}

function loadScript() {
  if (window.Razorpay) return Promise.resolve()
  return new Promise<void>((resolve, reject) => {
    const s = document.createElement("script")
    s.src = "https://checkout.razorpay.com/v1/checkout.js"
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error("razorpay_script"))
    document.head.appendChild(s)
  })
}

async function confirm(body: Record<string, unknown>) {
  const res = await fetch("/api/billing/confirm", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = (await res.json()) as ServerDraft & { error?: string }
  if (!res.ok) throw new Error(data.error || "confirm_failed")
  return data
}

export async function startCheckout(plan: CheckoutPlan): Promise<CheckoutOk> {
  const saved = await saveConfig(true)
  if (!saved) throw new Error("save_failed")
  const res = await fetch("/api/billing/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ plan }),
  })
  const data = (await res.json()) as CheckoutStart
  if (res.status === 409 && "status" in data) return data as ServerDraft
  if (!res.ok) throw new Error("error" in data && data.error ? String(data.error) : "checkout_failed")

  if ("mode" in data && data.mode === "dev") {
    return confirm({ dev: true })
  }

  if (!("mode" in data) || data.mode !== "razorpay" || !data.keyId) {
    throw new Error("checkout_failed")
  }

  await loadScript()
  const Razorpay = window.Razorpay
  if (!Razorpay) throw new Error("razorpay_script")

  return new Promise((resolve, reject) => {
    const rzp = new Razorpay({
      key: data.keyId,
      subscription_id: data.subscriptionId,
      name: "Advisorkhoj",
      description: `${formatInr(planTotal(plan, useDraft.getState().config.addons))} / ${plan === "yearly" ? "year" : "month"}`,
      handler: (payload) => {
        void confirm(payload).then(resolve).catch(reject)
      },
      modal: { ondismiss: () => reject(new Error("dismissed")) },
    })
    rzp.open()
  })
}
