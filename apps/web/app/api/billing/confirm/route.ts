import { json, requireSession } from "@/lib/auth"
import { activateTenant, billingDev, verifyRazorpaySignature, type PlanId } from "@/lib/billing"
import { getTenant, toMePayload } from "@/lib/tenant"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const { session, error } = await requireSession()
  if (error || !session) return error!
  const row = await getTenant(session.tenantId)
  if (!row) return json({ error: "missing_tenant" }, 404)

  let body: {
    dev?: boolean
    razorpay_payment_id?: string
    razorpay_subscription_id?: string
    razorpay_signature?: string
  }
  try {
    body = await req.json()
  } catch {
    return json({ error: "invalid_json" }, 400)
  }

  const plan = (row.plan === "yearly" || row.plan === "monthly" ? row.plan : "monthly") as PlanId

  if (body.dev) {
    if (!billingDev()) return json({ error: "dev_disabled" }, 403)
    const subId = row.razorpaySubId || `sub_dev_${row.id}_${plan}`
    const next = await activateTenant(row, { subId, plan })
    if (!next) return json({ error: "missing_tenant" }, 404)
    return json(await toMePayload(next))
  }

  const paymentId = body.razorpay_payment_id ?? ""
  const subId = body.razorpay_subscription_id ?? ""
  const signature = body.razorpay_signature ?? ""
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!paymentId || !subId || !signature || !secret) return json({ error: "invalid" }, 400)
  if (!verifyRazorpaySignature(`${paymentId}|${subId}`, signature, secret)) {
    return json({ error: "bad_signature" }, 400)
  }
  if (row.razorpaySubId && row.razorpaySubId !== subId) return json({ error: "wrong_subscription" }, 400)

  const next = await activateTenant(row, { subId, plan })
  if (!next) return json({ error: "missing_tenant" }, 404)
  return json(await toMePayload(next))
}
