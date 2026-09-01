"use client"

import { FiMapPin } from "react-icons/fi"
import { useDraft, type PreviewSpot } from "./store"
import * as U from "./styles"

/** Jump the live preview to a block when the buyer clicks or focuses an editor field. */
export function spot(id: PreviewSpot) {
  return {
    onPointerDownCapture: () => useDraft.getState().focusPreview(id),
    onFocusCapture: () => useDraft.getState().focusPreview(id),
  }
}

export function ShowOnSite({ id }: { id: PreviewSpot }) {
  return (
    <U.ShowBtn type="button" onClick={() => useDraft.getState().focusPreview(id)}>
      <FiMapPin size={11} aria-hidden />
      On site
    </U.ShowBtn>
  )
}
