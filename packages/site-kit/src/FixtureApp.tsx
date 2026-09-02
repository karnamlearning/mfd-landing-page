"use client"

import { useState } from "react"
import { ThemeProvider } from "styled-components"
import { applyFamily, samplePracticeConfig, type FamilyId, type TenantConfig } from "@mfd/schema"
import { getTheme, type FontId, type ThemeId } from "@mfd/tokens"
import { LookDock } from "./LookDock"
import { Site } from "./Site"

export function FixtureApp() {
  const [config, setConfig] = useState<TenantConfig>(samplePracticeConfig)

  return (
    <>
      <Site config={config} preview />
      <ThemeProvider theme={getTheme(config.theme)}>
        <LookDock
          familyId={config.family ?? "classic"}
          themeId={config.theme}
          fontId={config.font}
          onFamily={(id: FamilyId) => setConfig((c) => applyFamily(c, id))}
          onTheme={(id: ThemeId) => setConfig((c) => ({ ...c, theme: id }))}
          onFont={(id: FontId) => setConfig((c) => ({ ...c, font: id }))}
        />
      </ThemeProvider>
    </>
  )
}
