"use client"

import { FaWhatsapp } from "react-icons/fa6"
import { FiLogOut } from "react-icons/fi"
import { familyIds, familyMeta, type FamilyId } from "@mfd/schema"
import { BrandLogo } from "../BrandLogo"
import { TEMPLATES_LOGO } from "../brand"
import { logoutBuyer } from "./logout"
import { saveConfig } from "./persist"
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
  if (id === "capital") {
    return (
      <U.MotionThumb $id="capital" aria-hidden>
        <div className="hero" />
        <div className="cards" />
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

  async function pick(id: FamilyId) {
    setFamily(id)
    await saveConfig(true)
    onPicked?.()
  }

  return (
    <U.Gallery>
      <U.GalleryHead>
        <U.GalleryBrand>
          <U.GalleryLogo>
            <BrandLogo src={TEMPLATES_LOGO} size="sm" />
          </U.GalleryLogo>
          <U.GalleryActions>
            {browsing ? (
              <U.NextBtn type="button" onClick={() => onPicked?.()}>
                Back to editor
              </U.NextBtn>
            ) : null}
            <U.GhostBtn $always type="button" onClick={() => void logoutBuyer()}>
              <FiLogOut size={14} aria-hidden />
              Log out
            </U.GhostBtn>
          </U.GalleryActions>
        </U.GalleryBrand>
        <U.GalleryCopy>
          <U.GalleryKicker>Buyer Place</U.GalleryKicker>
          <U.GalleryTitle>Choose a template</U.GalleryTitle>
          <U.GalleryLead>
            Four sites. Switching a template starts it clean — layout, theme, and page copy reset. Your name, contact,
            and photos stay. Practice is the usual advisor page. Newspaper is a city paper. Night is dark glass. Capital
            is a light wealth-house with a consult form and a services menu.
          </U.GalleryLead>
        </U.GalleryCopy>
      </U.GalleryHead>
      <U.GalleryGrid>
        {familyIds.map((id) => {
          const meta = familyMeta[id]
          const on = id === current
          return (
            <U.GalleryCard key={id} type="button" $on={on} $id={id} onClick={() => void pick(id)}>
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
