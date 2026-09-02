import { PublicSite } from "@/lib/public-page"

export const dynamic = "force-dynamic"

export const metadata = { title: "Notes" }

export default function BlogPage() {
  return <PublicSite page="/blog" />
}
