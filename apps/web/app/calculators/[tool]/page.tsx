import { notFound } from "next/navigation"
import { samplePracticeConfig, toolIds } from "@mfd/schema"
import { Site, ToolPlaceholder } from "@mfd/site-kit"

type Props = { params: Promise<{ tool: string }> }

export default async function ToolPage({ params }: Props) {
  const { tool } = await params
  if (!(toolIds as readonly string[]).includes(tool)) notFound()

  return (
    <Site config={samplePracticeConfig}>
      <ToolPlaceholder config={samplePracticeConfig} tool={tool} />
    </Site>
  )
}
