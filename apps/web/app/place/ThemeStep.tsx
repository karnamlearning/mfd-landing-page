"use client"

import { familyMeta, familyOf } from "@mfd/schema"
import { themes, themesForFamily } from "@mfd/tokens"
import { useDraft } from "./store"
import * as U from "./styles"

export function ThemeStep() {
  const family = useDraft((s) => familyOf(s.config))
  const current = useDraft((s) => s.config.theme)
  const setTheme = useDraft((s) => s.setTheme)
  const ids = themesForFamily(family)

  return (
    <>
      <U.StepTitle>Theme</U.StepTitle>
      <U.StepLead>
        Colours for {familyMeta[family].name} only. The other templates have their own packs.
      </U.StepLead>
      <U.SwatchGrid>
        {ids.map((id) => {
          const theme = themes[id]
          const on = id === current
          return (
            <U.Swatch
              key={id}
              type="button"
              $on={on}
              onClick={() => {
                setTheme(id)
                useDraft.getState().focusPreview("top")
              }}
            >
              <U.SwatchChips>
                <U.SwatchChip $c={theme.bg} />
                <U.SwatchChip $c={theme.surface} />
                <U.SwatchChip $c={theme.primary} />
                <U.SwatchChip $c={theme.accent} />
              </U.SwatchChips>
              <U.SwatchName>{theme.name}</U.SwatchName>
            </U.Swatch>
          )
        })}
      </U.SwatchGrid>
    </>
  )
}
