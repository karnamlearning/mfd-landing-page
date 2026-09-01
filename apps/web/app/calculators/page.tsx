import { samplePracticeConfig } from "@mfd/schema"
import { Site, ToolsIndex } from "@mfd/site-kit"
import { PaywallView } from "../missing/view"
import { loadPublicSite } from "@/lib/public-site"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Calculators",
}

export default async function CalculatorsPage() {
  const site = await loadPublicSite()
  if (site?.paywall) return <PaywallView />
  const config = site?.config ?? samplePracticeConfig
  const preview = !site?.config
  return (
    <Site config={config} preview={preview}>
      <ToolsIndex config={config} />
    </Site>
  )
}
