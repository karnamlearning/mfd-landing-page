"use client"

import { themeIds, themes } from "@mfd/tokens"
import { useDraft } from "./store"
import * as U from "./styles"

export function ThemeStep() {
  const current = useDraft((s) => s.config.theme)
  const setTheme = useDraft((s) => s.setTheme)

  return (
    <>
      <U.StepTitle>Theme</U.StepTitle>
      <U.StepLead>Colour packs only. Contrast is designed in — no free picker.</U.StepLead>
      <U.SwatchGrid>
        {themeIds.map((id) => {
          const theme = themes[id]
          const on = id === current
          return (
            <U.Swatch key={id} type="button" $on={on} onClick={() => setTheme(id)}>
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
