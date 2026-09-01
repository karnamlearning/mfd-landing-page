"use client"

import { fontIds, fontPairs } from "@mfd/tokens"
import { useDraft } from "./store"
import * as U from "./styles"

export function FontStep() {
  const current = useDraft((s) => s.config.font)
  const setFont = useDraft((s) => s.setFont)

  return (
    <>
      <U.StepTitle>Font</U.StepTitle>
      <U.StepLead>Heading and body are a pair. Applying updates the preview at once.</U.StepLead>
      <U.FontGrid>
        {fontIds.map((id) => {
          const pair = fontPairs[id]
          const on = id === current
          return (
            <U.FontCard
              key={id}
              type="button"
              $on={on}
              onClick={() => {
                setFont(id)
                useDraft.getState().focusPreview("top")
              }}
            >
              <U.Aa $heading={pair.headingVar}>Aa</U.Aa>
              <U.FontMeta>
                <U.FontName>{pair.name}</U.FontName>
                <U.FontPair>
                  {pair.heading}
                  {pair.body !== pair.heading ? ` + ${pair.body}` : ""}
                </U.FontPair>
              </U.FontMeta>
            </U.FontCard>
          )
        })}
      </U.FontGrid>
    </>
  )
}
