import { themes, themeIds, type ThemeId } from "./theme"

function hexToRgb(hex: string) {
  const h = hex.replace("#", "")
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  }
}

function linearize(c: number) {
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}

export function contrastRatio(a: string, b: string) {
  const l1 = luminance(a)
  const l2 = luminance(b)
  const hi = Math.max(l1, l2)
  const lo = Math.min(l1, l2)
  return (hi + 0.05) / (lo + 0.05)
}

export type ContrastPair = {
  theme: ThemeId
  pair: string
  ratio: number
  min: number
  ok: boolean
}

export function themeContrastReport(): ContrastPair[] {
  const rows: ContrastPair[] = []
  for (const id of themeIds) {
    const t = themes[id]
    const checks: Array<[string, string, string, number]> = [
      ["text/bg", t.text, t.bg, 4.5],
      ["text/surface", t.text, t.surface, 4.5],
      ["btnText/primary", t.btnText, t.primary, 4.5],
      ["muted/bg", t.muted, t.bg, 3],
    ]
    for (const [pair, fg, bg, min] of checks) {
      const ratio = contrastRatio(fg, bg)
      rows.push({ theme: id, pair, ratio, min, ok: ratio >= min })
    }
  }
  return rows
}

export function failingContrast(): ContrastPair[] {
  return themeContrastReport().filter((r) => !r.ok)
}
