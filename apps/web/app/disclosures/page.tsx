import { samplePracticeConfig } from "@mfd/schema"
import { DisclosuresBody, Site } from "@mfd/site-kit"

export const metadata = {
  title: "Disclosures",
}

export default function DisclosuresPage() {
  return (
    <Site config={samplePracticeConfig}>
      <DisclosuresBody name={samplePracticeConfig.details.name} />
    </Site>
  )
}
