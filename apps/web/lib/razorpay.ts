import "server-only"
import type { PlanId } from "./billing"

const API = "https://api.razorpay.com/v1"

export type RazorpaySubscription = {
  id: string
  status: string
  plan_id?: string
  notes?: Record<string, string>
}

function authHeader() {
  const id = process.env.RAZORPAY_KEY_ID
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!id || !secret) throw new Error("razorpay_unconfigured")
  return `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`
}

function planId(plan: PlanId) {
  const id = plan === "yearly" ? process.env.RAZORPAY_PLAN_YEARLY : process.env.RAZORPAY_PLAN_MONTHLY
  if (!id) throw new Error("razorpay_plan_missing")
  return id
}

export async function createSubscription(input: { plan: PlanId; tenantId: number; email?: string | null }) {
  const res = await fetch(`${API}/subscriptions`, {
    method: "POST",
    headers: {
      authorization: authHeader(),
      "content-type": "application/json",
    },
    body: JSON.stringify({
      plan_id: planId(input.plan),
      total_count: input.plan === "yearly" ? 10 : 120,
      quantity: 1,
      customer_notify: 1,
      notes: { tenantId: String(input.tenantId) },
    }),
  })
  const data = (await res.json()) as RazorpaySubscription & { error?: { description?: string } }
  if (!res.ok || !data.id) {
    console.warn("[billing] razorpay create", data)
    throw new Error(data.error?.description || "razorpay_create_failed")
  }
  return data
}

export async function fetchSubscription(id: string) {
  const res = await fetch(`${API}/subscriptions/${id}`, {
    headers: { authorization: authHeader() },
  })
  if (!res.ok) return null
  return (await res.json()) as RazorpaySubscription
}
