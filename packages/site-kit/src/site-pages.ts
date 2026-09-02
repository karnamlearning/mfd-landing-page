export function sitePath(path: string) {
  if (!path) return "/"
  const trimmed = path.replace(/\/+$/, "")
  return trimmed === "" ? "/" : trimmed
}

export function isHomePath(path: string) {
  return sitePath(path) === "/"
}

/** Home keeps every block. Inner URLs show only that page. */
export function showSection(path: string, page: string) {
  const p = sitePath(path)
  return p === "/" || p === page
}

export function isToolPath(path: string) {
  const p = sitePath(path)
  return p === "/calculators" || p.startsWith("/calculators/")
}

export function isKitPage(path: string) {
  return isToolPath(path) || sitePath(path) === "/disclosures"
}

export const PAGES = {
  home: "/",
  about: "/about",
  services: "/services",
  calculators: "/calculators",
  how: "/how",
  insights: "/insights",
  blog: "/blog",
  contact: "/contact",
  disclosures: "/disclosures",
} as const
