"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { fontPairs, themes } from "@mfd/tokens"
import { slugifyName } from "@mfd/schema"
import { saveConfig } from "./persist"
import { useDraft, type ServerDraft } from "./store"
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
  const slugLocked = useDraft((s) => s.slugLocked)
  const publicUrl = useDraft((s) => s.publicUrl)
  const setSlug = useDraft((s) => s.setSlug)
  const applyServer = useDraft((s) => s.applyServer)
  const [plan, setPlan] = useState<"monthly" | "yearly" | null>(null)
  const [publishing, setPublishing] = useState(false)
  const [publishError, setPublishError] = useState<string | null>(null)
  const visible = config.sections.filter((row) => row.on)
  const tools = config.addons.includes("tools")

  async function publish() {
    setPublishing(true)
    setPublishError(null)
    await saveConfig(true)
    try {
      const res = await fetch("/api/me/publish", { method: "POST" })
      const data = (await res.json()) as ServerDraft & { error?: string }
      if (!res.ok) {
        setPublishError(data.error === "reserved_slug" ? "That URL is reserved. Pick another." : "Could not publish.")
        return
      }
      applyServer(data)
    } catch {
      setPublishError("Could not publish.")
    } finally {
      setPublishing(false)
    }
  }

  return (
    <>
      <U.StepTitle>Review</U.StepTitle>
      <U.StepLead>
        {slugLocked
          ? "Your public URL is locked. The preview matches the live site."
          : "Choose your public URL. After you publish, it cannot change."}
      </U.StepLead>

      <U.Field>
        <U.LabelRow>Public URL</U.LabelRow>
        {slugLocked ? (
          <>
            <U.Input value={config.slug} readOnly />
            <U.Hint>Locked after publish.</U.Hint>
          </>
        ) : (
          <>
            <U.Input
              value={config.slug}
              onChange={(e) => setSlug(slugifyName(e.target.value))}
              onBlur={() => void saveConfig(true)}
              spellCheck={false}
            />
            <U.Hint>Editable once, here. Two practices cannot share the same slug.</U.Hint>
          </>
        )}
      </U.Field>

      {publicUrl ? (
        <U.QrBox>
          <QRCodeSVG value={publicUrl} size={128} />
          <U.Hint>{publicUrl}</U.Hint>
        </U.QrBox>
      ) : null}

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

      {!slugLocked ? (
        <U.NextRow>
          <U.NextBtn type="button" onClick={() => void publish()} disabled={publishing}>
            {publishing ? "Publishing…" : "Publish site"}
          </U.NextBtn>
        </U.NextRow>
      ) : null}
      {publishError ? <U.Warn>{publishError}</U.Warn> : null}

      <U.PayStack>
        <U.PlanBtn type="button" $on={plan === "monthly"} onClick={() => setPlan("monthly")}>
          <U.PlanName>₹299 / month</U.PlanName>
          <U.PlanNote>About ₹10 a day.</U.PlanNote>
        </U.PlanBtn>
        <U.PlanBtn type="button" $on={plan === "yearly"} onClick={() => setPlan("yearly")}>
          <U.PlanName>₹2,999 / year</U.PlanName>
          <U.PlanNote>Two months free versus monthly.</U.PlanNote>
        </U.PlanBtn>
      </U.PayStack>
    </>
  )
}
