"use client"

import { FaWhatsapp } from "react-icons/fa6"
import { familyIds, familyMeta, type FamilyId } from "@mfd/schema"
import { useDraft } from "./store"
import * as U from "./styles"

const SALES_WA =
  "https://wa.me/919611235245?text=" +
  encodeURIComponent("Hi Advisorkhoj — I need a custom MFD site beyond Buyer Place.")

export function TemplateGallery({
  onPicked,
  browsing,
}: {
  onPicked?: () => void
  browsing?: boolean
}) {
  const current = useDraft((s) => s.config.family ?? "studio")
  const pickedFamily = useDraft((s) => s.config.pickedFamily)
  const setFamily = useDraft((s) => s.setFamily)

  function pick(id: FamilyId) {
    setFamily(id, { look: pickedFamily === false })
    onPicked?.()
  }

  return (
    <U.Gallery>
      <U.BrandMark>
        <U.BrandName>Advisorkhoj</U.BrandName>
        <U.BrandSub>Choose a template</U.BrandSub>
      </U.BrandMark>
      <U.GalleryLead>
        Three layouts to start from. Solo, practice, and local are variants you pick inside the editor.
        Need something we don’t ship? Ask for a custom site.
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
              <U.GalleryThumb $id={id} />
              <U.TplName>{meta.name}</U.TplName>
              <U.TplBlurb>{meta.blurb}</U.TplBlurb>
              <U.TplAction $on={on}>{on ? "Selected — continue" : "Use this template"}</U.TplAction>
            </U.GalleryCard>
          )
        })}
        <U.GalleryCard as="a" href={SALES_WA} target="_blank" rel="noreferrer" $on={false} $id="custom">
          <U.GalleryThumb $id="custom" />
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
