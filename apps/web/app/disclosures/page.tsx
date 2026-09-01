import { samplePracticeConfig } from "@mfd/schema"
import { DisclosuresBody, Site } from "@mfd/site-kit"
import { loadPublicSite } from "@/lib/public-site"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Disclosures",
}

export default async function DisclosuresPage() {
  const site = await loadPublicSite()
  const config = site?.config ?? samplePracticeConfig
  const preview = !site
  const name = config.details.name.trim() || (preview ? samplePracticeConfig.details.name : "")
  return (
    <Site config={config} preview={preview}>
      <DisclosuresBody name={name} />
    </Site>
  )
}
