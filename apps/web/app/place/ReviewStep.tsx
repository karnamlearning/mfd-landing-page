"use client"

import { useState } from "react"
import { fontPairs, themes } from "@mfd/tokens"
import { useDraft } from "./store"
import * as U from "./styles"

const TEMPLATE_NAME = {
  solo: "Solo Advisor",
  practice: "Practice / Office",
  local: "Local / Bilingual",
} as const

const SECTION_NAME: Record<string, string> = {
  hero: "Hero",
  about: "About",
  credentials: "Credentials",
  services: "Services",
  stats: "Stats",
  how: "How I work",
  calculators: "Calculators",
  testimonials: "Testimonials",
  faq: "FAQ",
  contact: "Contact",
  whatsapp_strip: "WhatsApp strip",
}

export function ReviewStep() {
  const config = useDraft((s) => s.config)
  const [plan, setPlan] = useState<"monthly" | "yearly" | null>(null)
  const visible = config.sections.filter((row) => row.on)
  const tools = config.addons.includes("tools")

  return (
    <>
      <U.StepTitle>Review</U.StepTitle>
      <U.StepLead>This is what publishes. Preview stays live. Pay is a stub until billing.</U.StepLead>
      <U.Summary>
        <dt>Template</dt>
        <dd>{TEMPLATE_NAME[config.template]}</dd>
        <dt>Theme</dt>
        <dd>{themes[config.theme].name}</dd>
        <dt>Font</dt>
        <dd>{fontPairs[config.font].name}</dd>
        <dt>Sections</dt>
        <dd>{visible.map((row) => SECTION_NAME[row.id] ?? row.id).join(" → ")}</dd>
        <dt>Add-ons</dt>
        <dd>{tools ? "Tools pack" : "None"}</dd>
        <dt>WhatsApp</dt>
        <dd>{config.details.whatsapp.trim() || "Sample until you type"}</dd>
        <dt>City</dt>
        <dd>{config.details.city.trim() || "Sample until you type"}</dd>
      </U.Summary>
      <U.PayStack>
        <U.PlanBtn type="button" $on={plan === "monthly"} onClick={() => setPlan("monthly")}>
          <U.PlanName>₹299 / month</U.PlanName>
          <U.PlanNote>About ₹10 a day. Checkout comes in billing.</U.PlanNote>
        </U.PlanBtn>
        <U.PlanBtn type="button" $on={plan === "yearly"} onClick={() => setPlan("yearly")}>
          <U.PlanName>₹2,999 / year</U.PlanName>
          <U.PlanNote>Two months free vs monthly. Checkout comes in billing.</U.PlanNote>
        </U.PlanBtn>
      </U.PayStack>
    </>
  )
}
