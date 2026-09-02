import { notFound, redirect } from "next/navigation"
import { buyerDestination } from "@/lib/buyer"
import { requestHost } from "@/lib/public-site"
import { TemplatesApp } from "./TemplatesApp"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Choose a template",
  description: "Pick a site template for your mutual fund practice.",
}

export default async function TemplatesPage() {
  const { role } = await requestHost()
  if (role === "public") notFound()
  const dest = await buyerDestination()
  if (!dest) redirect("/")
  return <TemplatesApp />
}
