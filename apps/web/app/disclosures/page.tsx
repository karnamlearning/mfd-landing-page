import { samplePracticeConfig } from "@mfd/schema"
import { DisclosuresBody, Site } from "@mfd/site-kit"
import { PaywallView } from "../missing/view"
import { loadPublicSite } from "@/lib/public-site"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Disclosures",
}

export default async function DisclosuresPage() {
  const site = await loadPublicSite()
  if (site?.paywall) return <PaywallView />
  const config = site?.config ?? samplePracticeConfig
  const preview = !site?.config
  const name = config.details.name.trim() || (preview ? samplePracticeConfig.details.name : "")
  return (
    <Site config={config} preview={preview}>
      <DisclosuresBody name={name} />
    </Site>
  )
}
