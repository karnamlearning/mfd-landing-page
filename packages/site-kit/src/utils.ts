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

function nearestScroller(start: Element): HTMLElement | null {
  let node: HTMLElement | null = start.parentElement
  while (node) {
    const { overflowY } = getComputedStyle(node)
    if ((overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") && node.scrollHeight > node.clientHeight + 1) {
      return node
    }
    node = node.parentElement
  }
  return null
}

/** Scroll to a section inside the site — works in Buyer Place’s overflow frame and on the public page. */
export function scrollSiteTo(from: Element, id: string) {
  const root = from.closest("[data-site-root]") ?? document
  const header = root.querySelector("header")
  const offset = header instanceof HTMLElement ? header.getBoundingClientRect().height + 10 : 10
  const scroller = nearestScroller(from)

  if (id === "top") {
    if (scroller) scroller.scrollTo({ top: 0, behavior: "smooth" })
    else window.scrollTo({ top: 0, behavior: "smooth" })
    return
  }

  const el = root.querySelector(`#${CSS.escape(id)}`)
  if (!(el instanceof HTMLElement)) return

  if (scroller) {
    const top = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - offset
    scroller.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
    return
  }

  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
}
