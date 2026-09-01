import { samplePracticeConfig } from "@mfd/schema"
import { Site, ToolsIndex } from "@mfd/site-kit"

export const metadata = {
  title: "Calculators",
}

export default function CalculatorsPage() {
  return (
    <Site config={samplePracticeConfig}>
      <ToolsIndex config={samplePracticeConfig} />
    </Site>
  )
}
