import { PublicSite } from "@/lib/public-page"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Disclosures",
}

export default function DisclosuresPage() {
  return <PublicSite page="/disclosures" />
}
