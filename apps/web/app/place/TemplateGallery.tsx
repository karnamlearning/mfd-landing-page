"use client"

import { FaWhatsapp } from "react-icons/fa6"
import { familyIds, familyMeta, type FamilyId } from "@mfd/schema"
import { useDraft } from "./store"
import * as U from "./styles"

const SALES_WA =
  "https://wa.me/919611235245?text=" +
  encodeURIComponent("Hi Advisorkhoj — I need a custom MFD site beyond Buyer Place.")

function Thumb({ id }: { id: FamilyId | "custom" }) {
  if (id === "classic") {
    return (
      <U.MotionThumb $id="classic" aria-hidden>
        <div className="hero" />
        <div className="cards">
          <i />
          <i />
          <i />
        </div>
      </U.MotionThumb>
    )
  }
  if (id === "herald") {
    return (
      <U.MotionThumb $id="herald" aria-hidden>
        <span className="rule" />
        <span className="rule" />
        <div className="cols">
          <i />
          <i />
          <i />
        </div>
      </U.MotionThumb>
    )
  }
  if (id === "lumen") {
    return (
      <U.MotionThumb $id="lumen" aria-hidden>
        <span className="orb a" />
        <span className="orb b" />
        <div className="cards">
          <i />
          <i />
        </div>
      </U.MotionThumb>
    )
  }
  return <U.MotionThumb $id="custom" aria-hidden />
}

export function TemplateGallery({
  onPicked,
  browsing,
}: {
  onPicked?: () => void
  browsing?: boolean
}) {
  const current = useDraft((s) => s.config.family ?? "classic")
  const setFamily = useDraft((s) => s.setFamily)

  function pick(id: FamilyId) {
    setFamily(id)
    onPicked?.()
  }

  return (
    <U.Gallery>
      <U.BrandMark>
        <U.BrandName>Advisorkhoj</U.BrandName>
        <U.BrandSub>Choose a template</U.BrandSub>
      </U.BrandMark>
      <U.GalleryLead>
        Three different sites. Practice is the usual advisor page. Newspaper is a city paper. Night is dark glass.
      </U.GalleryLead>
      {browsing ? (
        <U.NextBtn type="button" onClick={() => onPicked?.()} style={{ width: "fit-content" }}>
          Back to editor
        </U.NextBtn>
      ) : null}
      <U.GalleryGrid>
        {familyIds.map((id) => {
          const meta = familyMeta[id]
          const on = id === current
          return (
            <U.GalleryCard key={id} type="button" $on={on} $id={id} onClick={() => pick(id)}>
              <Thumb id={id} />
              <U.TplName>{meta.name}</U.TplName>
              <U.TplBlurb>{meta.blurb}</U.TplBlurb>
              <U.TplAction $on={on}>{on ? "Selected — continue" : "Use this template"}</U.TplAction>
            </U.GalleryCard>
          )
        })}
        <U.GalleryCard as="a" href={SALES_WA} target="_blank" rel="noreferrer" $on={false} $id="custom">
          <Thumb id="custom" />
          <U.TplName>Custom</U.TplName>
          <U.TplBlurb>Extra pages, a unique layout, or work this builder doesn’t cover — we’ll build it for you.</U.TplBlurb>
          <U.TplAction $on={false}>
            <FaWhatsapp size={12} aria-hidden /> Talk to us
          </U.TplAction>
        </U.GalleryCard>
      </U.GalleryGrid>
    </U.Gallery>
  )
}
