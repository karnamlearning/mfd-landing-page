import { redirect } from "next/navigation"
import { buyerDestination } from "@/lib/buyer"
import { PlaceApp } from "./PlaceApp"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Buyer Place",
  description: "Configure your mutual fund distributor site.",
}

export default async function PlacePage() {
  const dest = await buyerDestination()
  if (!dest) redirect("/")
  if (dest === "/templates") redirect("/templates")
  return <PlaceApp />
}
