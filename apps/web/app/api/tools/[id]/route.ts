import { readyToolIds, type ReadyToolId } from "@mfd/schema"
import { getSession, json } from "@/lib/auth"
import { logError, logEvent } from "@/lib/log"
import { requestHost } from "@/lib/public-site"
import { getTenantBySlug } from "@/lib/tenant"
import { runTool, type ToolInputs } from "@/lib/illustrate"

export const runtime = "nodejs"

type Props = { params: Promise<{ id: string }> }

export async function POST(req: Request, { params }: Props) {
  const { id } = await params
  if (!(readyToolIds as readonly string[]).includes(id)) {
    return json({ error: "unknown_tool" }, 404)
  }

  let body: ToolInputs = {}
  try {
    body = (await req.json()) as ToolInputs
  } catch {
    body = {}
  }

  const { slug } = await requestHost()
  const tenant = slug ? await getTenantBySlug(slug) : null
  const session = tenant ? null : await getSession()
  const tenantId = tenant?.id ?? session?.tenantId ?? null
  logEvent("tools", { tenant_id: tenantId ?? "none", tool: id })

  try {
    const result = await runTool(id as ReadyToolId, body ?? {})
    return json(result)
  } catch (err) {
    logError("tools.fail", err, { tenant_id: tenantId ?? "none", tool: id })
    return json({ error: "tool_failed" }, 500)
  }
}
