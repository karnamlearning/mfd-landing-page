import { notFound } from "next/navigation"
import { samplePracticeConfig, visibleToolIds, type ToolId } from "@mfd/schema"
import { Site, ToolBody } from "@mfd/site-kit"
import { loadPublicSite } from "@/lib/public-site"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ tool: string }> }

export default async function ToolPage({ params }: Props) {
  const { tool } = await params
  const site = await loadPublicSite()
  const config = site?.config ?? samplePracticeConfig
  const preview = !site
  if (!visibleToolIds(config).includes(tool as ToolId)) notFound()
  const id = tool as ToolId

  return (
    <Site config={config} preview={preview}>
      <ToolBody config={config} tool={id} preview={preview} />
    </Site>
  )
}
