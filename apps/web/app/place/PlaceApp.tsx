"use client"

import { ThemeProvider } from "styled-components"
import { FiEye, FiMonitor, FiSmartphone } from "react-icons/fi"
import { themes } from "@mfd/tokens"
import { DetailsStep } from "./DetailsStep"
import { FontStep } from "./FontStep"
import { PreviewFrame } from "./PreviewFrame"
import { ReviewStep } from "./ReviewStep"
import { SectionsStep } from "./SectionsStep"
import { STEPS, useDraft, type StepId } from "./store"
import * as U from "./styles"
import { TemplateStep } from "./TemplateStep"
import { ThemeStep } from "./ThemeStep"

const NEXT: Partial<Record<StepId, StepId>> = {
  details: "template",
  template: "theme",
  theme: "font",
  font: "sections",
  sections: "review",
}

function StepBody() {
  const step = useDraft((s) => s.step)
  if (step === "details") return <DetailsStep />
  if (step === "template") return <TemplateStep />
  if (step === "theme") return <ThemeStep />
  if (step === "font") return <FontStep />
  if (step === "sections") return <SectionsStep />
  return <ReviewStep />
}

function AddonsRail() {
  const on = useDraft((s) => s.config.addons.includes("tools"))
  const setToolsPack = useDraft((s) => s.setToolsPack)
  return (
    <U.Rail>
      <U.RailKicker>Add-ons</U.RailKicker>
      <U.AddonCard $on={on}>
        <U.AddonName>Tools pack</U.AddonName>
        <U.AddonCopy>
          Extra investor calculators on the Calculators section. Preview shows the extra slots as soon
          as you add it.
        </U.AddonCopy>
        <U.AddonBtn type="button" $on={on} onClick={() => setToolsPack(!on)}>
          {on ? "Remove" : "Add"}
        </U.AddonBtn>
      </U.AddonCard>
    </U.Rail>
  )
}

export function PlaceApp() {
  const step = useDraft((s) => s.step)
  const setStep = useDraft((s) => s.setStep)
  const viewport = useDraft((s) => s.viewport)
  const setViewport = useDraft((s) => s.setViewport)
  const previewOpen = useDraft((s) => s.previewOpen)
  const setPreviewOpen = useDraft((s) => s.setPreviewOpen)
  const next = NEXT[step]

  return (
    <ThemeProvider theme={themes.slate}>
      <U.EditorGlobal />
      <U.Shell>
        <U.Top>
          <U.BrandMark>
            <U.BrandName>Advisorkhoj</U.BrandName>
            <U.BrandSub>Buyer Place</U.BrandSub>
          </U.BrandMark>
          <U.TopGrow />
          <U.GhostBtn type="button" onClick={() => setPreviewOpen(!previewOpen)}>
            <FiEye size={14} aria-hidden />
            {previewOpen ? "Hide preview" : "Show preview"}
          </U.GhostBtn>
          <U.Seg>
            <U.SegBtn type="button" $on={viewport === "mobile"} onClick={() => setViewport("mobile")}>
              <FiSmartphone size={14} aria-hidden />
              Mobile
            </U.SegBtn>
            <U.SegBtn type="button" $on={viewport === "desktop"} onClick={() => setViewport("desktop")}>
              <FiMonitor size={14} aria-hidden />
              Desktop
            </U.SegBtn>
          </U.Seg>
          <U.PayBtn type="button" onClick={() => setStep("review")}>
            Pay
          </U.PayBtn>
        </U.Top>
        <U.Body>
          <U.Left>
            <U.Steps aria-label="Steps">
              {STEPS.map((s) => (
                <U.StepBtn key={s.id} type="button" $on={s.id === step} onClick={() => setStep(s.id)}>
                  <U.StepN $on={s.id === step}>{s.n}</U.StepN>
                  {s.label}
                </U.StepBtn>
              ))}
            </U.Steps>
            <U.StepPanel>
              <StepBody />
              {next ? (
                <U.NextRow>
                  <U.NextBtn type="button" onClick={() => setStep(next)}>
                    Next
                  </U.NextBtn>
                </U.NextRow>
              ) : null}
            </U.StepPanel>
          </U.Left>
          <PreviewFrame />
          <AddonsRail />
        </U.Body>
      </U.Shell>
    </ThemeProvider>
  )
}
