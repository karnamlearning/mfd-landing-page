import { emptyPracticeConfig } from "@mfd/schema"
import { Site } from "@mfd/site-kit"

export const metadata = {
  title: "Empty tenant",
}

export default async function BlankPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>
}) {
  const { preview } = await searchParams
  return <Site config={emptyPracticeConfig} preview={preview === "1"} />
}
