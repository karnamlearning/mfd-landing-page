"use client"

import type { TemplateId } from "@mfd/schema"
import { useDraft } from "./store"
import * as U from "./styles"

const TEMPLATES: Array<{ id: TemplateId; name: string; blurb: string }> = [
  {
    id: "solo",
    name: "Solo Advisor",
    blurb: "Person-first: headshot in the hero, WhatsApp-heavy. Default for new ARNs.",
  },
  {
    id: "practice",
    name: "Practice / Office",
    blurb: "Investbux-like. Firm logo, lifestyle hero, credentials, service cards, stats.",
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
      <U.StepTitle>Template</U.StepTitle>
      <U.StepLead>Same details, different layout. Theme, font, and add-ons stay as they are.</U.StepLead>
      <U.CardGrid>
        {TEMPLATES.map((tpl) => {
          const on = tpl.id === current
          return (
            <U.TplCard key={tpl.id} type="button" $on={on} onClick={() => setTemplate(tpl.id)}>
              <U.TplThumb $id={tpl.id} />
              <U.TplName>{tpl.name}</U.TplName>
              <U.TplBlurb>{tpl.blurb}</U.TplBlurb>
              <U.TplAction $on={on}>{on ? "Selected" : "Preview this"}</U.TplAction>
            </U.TplCard>
          )
        })}
      </U.CardGrid>
    </>
  )
}
