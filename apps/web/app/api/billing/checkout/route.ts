import { eq, tenants } from "@mfd/db"
import { planTotal } from "@mfd/schema"
import { json, requireSession } from "@/lib/auth"
import { billingDev, type PlanId } from "@/lib/billing"
import { getDb } from "@/lib/db"
import { createSubscription } from "@/lib/razorpay"
import { getTenant, resolvePublishSlug, toMePayload } from "@/lib/tenant"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const { session, error } = await requireSession()
  if (error || !session) return error!
  const row = await getTenant(session.tenantId)
  if (!row) return json({ error: "missing_tenant" }, 404)
  if (row.status === "active") return json({ error: "already_active", ...toMePayload(row) }, 409)

  let body: { plan?: string }
  try {
    body = await req.json()
  } catch {
    return json({ error: "invalid_json" }, 400)
  }
  const plan = body.plan === "yearly" ? "yearly" : body.plan === "monthly" ? "monthly" : null
  if (!plan) return json({ error: "invalid_plan" }, 400)

  const locked = await resolvePublishSlug(row)
  if ("error" in locked) return json({ error: locked.error }, 400)

  const db = getDb()
  if (!row.slugLocked || locked.slug !== row.slug) {
    await db
      .update(tenants)
      .set({ slug: locked.slug, config: locked.config })
      .where(eq(tenants.id, row.id))
  }

  if (billingDev()) {
    const subId = `sub_dev_${row.id}_${plan}`
    await db.update(tenants).set({ plan: plan as PlanId, razorpaySubId: subId }).where(eq(tenants.id, row.id))
    console.info(`[billing] tenant=${row.id} checkout dev plan=${plan} addons=${locked.config.addons.join(",") || "none"} amount=${planTotal(plan, locked.config.addons)}`)
    return json({ mode: "dev" as const, plan, subscriptionId: subId })
  }

  try {
    const sub = await createSubscription({
      plan,
      tenantId: row.id,
      email: row.ownerEmail,
      addons: locked.config.addons,
    })
    await db.update(tenants).set({ plan, razorpaySubId: sub.id }).where(eq(tenants.id, row.id))
    console.info(`[billing] tenant=${row.id} checkout sub=${sub.id} plan=${plan} addons=${locked.config.addons.join(",") || "none"} amount=${planTotal(plan, locked.config.addons)}`)
    return json({
      mode: "razorpay" as const,
      plan,
      subscriptionId: sub.id,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (err) {
    console.warn("[billing] checkout", err)
    return json({ error: "checkout_failed" }, 502)
  }
}
