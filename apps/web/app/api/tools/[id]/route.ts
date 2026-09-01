import { readyToolIds, type ReadyToolId } from "@mfd/schema"
import { json } from "@/lib/auth"
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
  console.info(`[tools] tenant=${tenant?.id ?? "none"} tool=${id}`)

  const result = await runTool(id as ReadyToolId, body ?? {})
  return json(result)
}
