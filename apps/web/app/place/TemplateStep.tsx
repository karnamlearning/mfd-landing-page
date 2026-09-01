"use client"

import type { TemplateId } from "@mfd/schema"
import { useDraft } from "./store"
import * as U from "./styles"

const VARIANTS: Array<{ id: TemplateId; name: string; blurb: string }> = [
  {
    id: "solo",
    name: "Solo Advisor",
    blurb: "Person-first: headshot in the hero, WhatsApp-heavy. Default for new ARNs.",
  },
  {
    id: "practice",
    name: "Practice / Office",
    blurb: "Firm logo, lifestyle or editorial hero, credentials, service cards, stats.",
  },
  {
    id: "local",
    name: "Local",
    blurb: "Larger type, simpler nav, city-first. Hindi is a paid add-on on the right.",
  },
]

export function TemplateStep() {
  const current = useDraft((s) => s.config.template)
  const setTemplate = useDraft((s) => s.setTemplate)

  return (
    <>
      <U.StepTitle>Variant</U.StepTitle>
      <U.StepLead>
        Same template, different emphasis. Layout stays; hero, type size, and default sections change.
      </U.StepLead>
      <U.CardGrid>
        {VARIANTS.map((row) => {
          const on = row.id === current
          return (
            <U.TplCard key={row.id} type="button" $on={on} onClick={() => setTemplate(row.id)}>
              <U.TplThumb $id={row.id} />
              <U.TplName>{row.name}</U.TplName>
              <U.TplBlurb>{row.blurb}</U.TplBlurb>
              <U.TplAction $on={on}>{on ? "Selected" : "Preview this"}</U.TplAction>
            </U.TplCard>
          )
        })}
      </U.CardGrid>
    </>
  )
}
