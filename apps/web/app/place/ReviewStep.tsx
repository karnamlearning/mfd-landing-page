"use client"

import { QRCodeSVG } from "qrcode.react"
import { ADDON_LABEL, familyMeta, slugifyName } from "@mfd/schema"
import { fontPairs, themes } from "@mfd/tokens"
import { saveConfig } from "./persist"
import { useDraft } from "./store"
import * as U from "./styles"

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

export function ReviewStep({ onPublish }: { onPublish: () => void }) {
  const config = useDraft((s) => s.config)
  const slugLocked = useDraft((s) => s.slugLocked)
  const publicUrl = useDraft((s) => s.publicUrl)
  const setSlug = useDraft((s) => s.setSlug)
  const visible = config.sections.filter((row) => row.on)
  const addons = config.addons.filter((id): id is keyof typeof ADDON_LABEL => id in ADDON_LABEL)

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
        <dd>{familyMeta[config.family ?? "classic"].name}</dd>
        <dt>Theme</dt>
        <dd>{themes[config.theme].name}</dd>
        <dt>Font</dt>
        <dd>{fontPairs[config.font].name}</dd>
        <dt>Sections</dt>
        <dd>{visible.map((row) => SECTION_NAME[row.id] ?? row.id).join(" → ")}</dd>
        <dt>Add-ons</dt>
        <dd>{addons.length ? addons.map((id) => ADDON_LABEL[id]).join(", ") : "None"}</dd>
        <dt>WhatsApp</dt>
        <dd>{config.details.whatsapp.trim() || "Sample until you type"}</dd>
        <dt>City</dt>
        <dd>{config.details.city.trim() || "Sample until you type"}</dd>
      </U.Summary>

      <U.NextRow>
        <U.NextBtn type="button" onClick={onPublish}>
          Publish
        </U.NextBtn>
      </U.NextRow>
    </>
  )
}
