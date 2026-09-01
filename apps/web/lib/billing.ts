import "server-only"
import { createHmac } from "node:crypto"
import { eq, tenants, type TenantRow } from "@mfd/db"
import { getDb } from "./db"
import { getTenant, resolvePublishSlug } from "./tenant"

export type PlanId = "monthly" | "yearly"

export function billingDev() {
  if (process.env.BILLING_DEV === "1") return true
  const keyed = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
  return !keyed && process.env.NODE_ENV !== "production"
}

export async function activateTenant(row: TenantRow, input: { subId: string; plan: PlanId }) {
  const locked = await resolvePublishSlug(row)
  if ("error" in locked) {
    throw Object.assign(new Error(locked.error), { name: locked.error })
  }
  const db = getDb()
  await db
    .update(tenants)
    .set({
      slug: locked.slug,
      slugLocked: true,
      status: "active",
      config: locked.config,
      plan: input.plan,
      razorpaySubId: input.subId,
    })
    .where(eq(tenants.id, row.id))
  console.info(`[billing] tenant=${row.id} active plan=${input.plan}`)
  return getTenant(row.id)
}

export async function suspendTenant(row: TenantRow) {
  if (row.status === "suspended") return row
  const db = getDb()
  await db.update(tenants).set({ status: "suspended" }).where(eq(tenants.id, row.id))
  console.info(`[billing] tenant=${row.id} suspended`)
  return getTenant(row.id)
}

export function verifyRazorpaySignature(payload: string, signature: string, secret: string) {
  const expected = createHmac("sha256", secret).update(payload).digest("hex")
  if (expected.length !== signature.length) return false
  let out = 0
  for (let i = 0; i < expected.length; i++) out |= expected.charCodeAt(i) ^ signature.charCodeAt(i)
  return out === 0
}
