import { eq, users } from "@mfd/db"
import { json, setSessionCookie } from "@/lib/auth"
import { requireAdmin } from "@/lib/admin"
import { getDb } from "@/lib/db"
import { logEvent } from "@/lib/log"
import { editorUrl } from "@/lib/site-url"
import { getTenant } from "@/lib/tenant"

export const runtime = "nodejs"

type Props = { params: Promise<{ id: string }> }

export async function POST(_req: Request, { params }: Props) {
  const { ok, error } = await requireAdmin()
  if (!ok) return error

  const id = Number((await params).id)
  if (!Number.isFinite(id) || id <= 0) return json({ error: "invalid" }, 400)
  const tenant = await getTenant(id)
  if (!tenant) return json({ error: "missing_tenant" }, 404)

  const db = getDb()
  const rows = await db.select().from(users).where(eq(users.tenantId, id)).limit(1)
  const user = rows[0]
  if (!user) return json({ error: "missing_user" }, 404)

  await setSessionCookie({
    userId: user.id,
    tenantId: user.tenantId,
    phone: user.phone,
    impersonated: true,
  })
  logEvent("admin.impersonate", { tenant_id: id })
  return json({ ok: true, placeUrl: editorUrl() })
}
