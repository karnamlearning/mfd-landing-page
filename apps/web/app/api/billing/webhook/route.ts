import { json } from "@/lib/auth"
import { activateTenant, billingDev, suspendTenant, verifyRazorpaySignature, type PlanId } from "@/lib/billing"
import { getTenant, getTenantBySubId } from "@/lib/tenant"

export const runtime = "nodejs"

type RazorpayEntity = {
  id?: string
  status?: string
  notes?: Record<string, string>
  subscription_id?: string
}

type RazorpayEvent = {
  event?: string
  payload?: {
    subscription?: { entity?: RazorpayEntity }
    payment?: { entity?: RazorpayEntity }
  }
}

const ACTIVATE = new Set(["subscription.activated", "subscription.charged"])
const SUSPEND = new Set(["subscription.cancelled", "subscription.completed", "subscription.halted", "subscription.expired"])

export async function POST(req: Request) {
  const raw = await req.text()
  const signature = req.headers.get("x-razorpay-signature") ?? ""
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!billingDev()) {
    if (!secret || !verifyRazorpaySignature(raw, signature, secret)) {
      return json({ error: "bad_signature" }, 400)
    }
  }

  let event: RazorpayEvent
  try {
    event = JSON.parse(raw) as RazorpayEvent
  } catch {
    return json({ error: "invalid_json" }, 400)
  }

  const sub = event.payload?.subscription?.entity
  const pay = event.payload?.payment?.entity
  const subId = sub?.id || pay?.subscription_id || ""
  const tenantId = Number(sub?.notes?.tenantId || "")
  const row =
    (subId ? await getTenantBySubId(subId) : null) || (tenantId ? await getTenant(tenantId) : null)
  if (!row) {
    console.info(`[billing] webhook miss event=${event.event} sub=${subId}`)
    return json({ ok: true, ignored: true })
  }

  const plan = (row.plan === "yearly" || row.plan === "monthly" ? row.plan : "monthly") as PlanId
  const name = event.event ?? ""

  if (ACTIVATE.has(name) && row.status !== "active") {
    await activateTenant(row, { subId: subId || row.razorpaySubId || `sub_${row.id}`, plan })
  } else if (SUSPEND.has(name)) {
    await suspendTenant(row)
  } else {
    console.info(`[billing] webhook skip event=${name} tenant=${row.id}`)
  }

  return json({ ok: true })
}
