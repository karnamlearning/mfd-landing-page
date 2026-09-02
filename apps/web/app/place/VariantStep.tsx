"use client"

import { familyMeta, familyOf, templateMeta, templateOf, variantIds } from "@mfd/schema"
import { useDraft } from "./store"
import * as U from "./styles"

export function VariantStep() {
  const family = useDraft((s) => familyOf(s.config))
  const current = useDraft((s) => templateOf(s.config))
  const setTemplate = useDraft((s) => s.setTemplate)

  return (
    <>
      <U.StepTitle>Variant</U.StepTitle>
      <U.StepLead>
        Two layouts for {familyMeta[family].name}. Practice is the usual full site. Solo is leaner, with the portrait
        in the hero.
      </U.StepLead>
      <U.CardGrid>
        {variantIds.map((id) => {
          const meta = templateMeta[id]
          const on = id === current
          return (
            <U.TplCard
              key={id}
              type="button"
              $on={on}
              onClick={() => {
                if (id === current && useDraft.getState().config.template === id) return
                setTemplate(id)
                useDraft.getState().focusPreview("top")
              }}
            >
              <U.TplThumb $id={id} />
              <U.TplName>{meta.name}</U.TplName>
              <U.TplBlurb>{meta.blurb}</U.TplBlurb>
            </U.TplCard>
          )
        })}
      </U.CardGrid>
    </>
  )
}
