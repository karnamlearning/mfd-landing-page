import { eq, tenants } from "@mfd/db"
import { json } from "@/lib/auth"
import { requireAdmin } from "@/lib/admin"
import { getDb } from "@/lib/db"
import { logEvent } from "@/lib/log"
import { getTenant, statusAfterRestore } from "@/lib/tenant"

export const runtime = "nodejs"

type Props = { params: Promise<{ id: string }> }

export async function POST(req: Request, { params }: Props) {
  const { ok, error } = await requireAdmin()
  if (!ok) return error

  const id = Number((await params).id)
  if (!Number.isFinite(id) || id <= 0) return json({ error: "invalid" }, 400)
  const row = await getTenant(id)
  if (!row) return json({ error: "missing_tenant" }, 404)

  let body: { action?: string } = {}
  try {
    body = await req.json()
  } catch {
    body = {}
  }
  const action = body.action === "restore" ? "restore" : "suspend"
  const status = action === "restore" ? statusAfterRestore(row) : "suspended"

  const db = getDb()
  await db.update(tenants).set({ status }).where(eq(tenants.id, id))
  logEvent("admin.suspend", { tenant_id: id, action, status })
  return json({ ok: true, status })
}
