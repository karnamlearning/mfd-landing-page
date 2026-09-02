import { notFound } from "next/navigation"
import { samplePracticeConfig, visibleToolIds, type ToolId } from "@mfd/schema"
import { PaywallView } from "../../missing/view"
import { loadPublicSite } from "@/lib/public-site"
import { PublicSite } from "@/lib/public-page"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ tool: string }> }

export default async function ToolPage({ params }: Props) {
  const { tool } = await params
  const site = await loadPublicSite()
  if (site?.paywall) return <PaywallView />
  const config = site?.config ?? samplePracticeConfig
  if (!visibleToolIds(config).includes(tool as ToolId)) notFound()

  return <PublicSite page={`/calculators/${tool}`} />
}
