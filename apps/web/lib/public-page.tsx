import { samplePracticeConfig } from "@mfd/schema"
import { Site } from "@mfd/site-kit"
import { PaywallView } from "../app/missing/view"
import { loadPublicSite } from "./public-site"

export async function PublicSite({ page = "/" }: { page?: string }) {
  const site = await loadPublicSite()
  if (site?.paywall) return <PaywallView />
  const config = site?.config ?? samplePracticeConfig
  return <Site config={config} preview={!site?.config} page={page} />
}
