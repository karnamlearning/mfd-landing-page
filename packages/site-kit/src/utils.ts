export function waHref(raw: string) {
  const digits = raw.replace(/\D/g, "")
  const n = digits.length === 10 ? `91${digits}` : digits
  return `https://wa.me/${n}`
}

export function inr(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n)
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name
}

export function isExternalHref(a: HTMLAnchorElement, href: string) {
  if (a.target === "_blank") return true
  return /^(tel:|mailto:|sms:|https?:)/i.test(href)
}

/** Resolve an in-site href to a path + optional hash. External URLs return null. */
export function parseInternalHref(href: string): { path: string; hash: string } | null {
  if (!href || /^(tel:|mailto:|sms:|https?:)/i.test(href)) return null
  try {
    const url = new URL(href, "http://preview.local")
    const path = url.pathname || "/"
    const hash = url.hash.replace(/^#/, "")
    return { path: path === "" ? "/" : path, hash }
  } catch {
    return null
  }
}

function canScroll(node: HTMLElement) {
  const { overflowY } = getComputedStyle(node)
  return (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") && node.scrollHeight > node.clientHeight + 1
}

function nearestScroller(start: Element): HTMLElement | null {
  let node: HTMLElement | null = start instanceof HTMLElement ? start : start.parentElement
  while (node) {
    if (canScroll(node)) return node
    node = node.parentElement
  }
  return null
}

function pickScroller(from: Element, root: Element): HTMLElement | null {
  const frame = from.closest("[data-preview-frame]")
  if (frame instanceof HTMLElement && canScroll(frame)) return frame
  if (root instanceof HTMLElement && canScroll(root)) return root
  return nearestScroller(from)
}

/** Scroll to a section inside the site — works in Buyer Place’s overflow frame and on the public page. */
export function scrollSiteTo(from: Element, id: string) {
  const root = from.closest("[data-site-root]") ?? from
  const scroller = pickScroller(from, root)
  const behavior: ScrollBehavior = from.closest("[data-preview-frame]") ? "auto" : "smooth"

  if (id === "header") {
    if (scroller) scroller.scrollTo({ top: 0, behavior })
    else window.scrollTo({ top: 0, behavior })
    return
  }

  const el =
    root.querySelector(`[data-spot="${CSS.escape(id)}"]`) ??
    (id === "top" || id === "photo" ? null : root.querySelector(`#${CSS.escape(id)}`))

  if (!(el instanceof HTMLElement)) {
    if (id === "top" || id === "photo") {
      if (scroller) scroller.scrollTo({ top: 0, behavior })
      else window.scrollTo({ top: 0, behavior })
    }
    return
  }

  el.scrollIntoView({
    behavior,
    block: "start",
    inline: "nearest",
  })
}
