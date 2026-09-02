"use client"

import { FaWhatsapp } from "react-icons/fa6"
import * as U from "./styles"

const SALES_WA =
  "https://wa.me/919611235245?text=" +
  encodeURIComponent("Hi Advisorkhoj — I need a custom MFD site beyond Buyer Place.")

export function CustomSiteBar({ dock }: { dock?: boolean }) {
  return (
    <U.CustomBar $dock={dock}>
      <U.CustomCopy>
        <strong>Want a custom site?</strong>
        <U.CustomMore>
          {" "}
          Extra pages, a unique layout, or work this builder doesn’t cover — we’ll build it for you.
        </U.CustomMore>
      </U.CustomCopy>
      <U.CustomCta href={SALES_WA} target="_blank" rel="noreferrer">
        <FaWhatsapp size={14} aria-hidden />
        Talk to us
      </U.CustomCta>
    </U.CustomBar>
  )
}
