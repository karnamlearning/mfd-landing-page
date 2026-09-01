export const space = {
  1: "0.5rem",
  2: "1rem",
  3: "1.5rem",
  4: "2rem",
  5: "3rem",
  6: "4rem",
  8: "6rem",
} as const

export type Space = typeof space

export const themeIds = [
  "navy",
  "forest",
  "maroon",
  "sky",
  "sand",
  "slate",
  "ink",
  "saffron",
] as const

export type ThemeId = (typeof themeIds)[number]

export type Theme = {
  id: ThemeId
  name: string
  bg: string
  surface: string
  text: string
  muted: string
  primary: string
  accent: string
  btnText: string
  space: Space
}

const shared = { space }

export const themes: Record<ThemeId, Theme> = {
  navy: {
    ...shared,
    id: "navy",
    name: "Navy trust",
    bg: "#f4f1ea",
    surface: "#fffcf8",
    text: "#0c1a2e",
    muted: "#5a6573",
    primary: "#0c1a2e",
    accent: "#b8860b",
    btnText: "#ffffff",
  },
  forest: {
    ...shared,
    id: "forest",
    name: "Forest",
    bg: "#f3efe6",
    surface: "#fffcf7",
    text: "#14110e",
    muted: "#5e584e",
    primary: "#134e3a",
    accent: "#1b6b4a",
    btnText: "#ffffff",
  },
  maroon: {
    ...shared,
    id: "maroon",
    name: "Maroon",
    bg: "#f7f2ef",
    surface: "#fffdfb",
    text: "#1a1012",
    muted: "#6a5652",
    primary: "#6f1d28",
    accent: "#8c2a36",
    btnText: "#ffffff",
  },
  sky: {
    ...shared,
    id: "sky",
    name: "Sky",
    bg: "#f0f4f8",
    surface: "#ffffff",
    text: "#10243d",
    muted: "#5b6d80",
    primary: "#1a4a7a",
    accent: "#2b6ea8",
    btnText: "#ffffff",
  },
  sand: {
    ...shared,
    id: "sand",
    name: "Sand",
    bg: "#f6f0e6",
    surface: "#fffaf2",
    text: "#2a2118",
    muted: "#6a5d4e",
    primary: "#7a4e28",
    accent: "#a56b35",
    btnText: "#ffffff",
  },
  slate: {
    ...shared,
    id: "slate",
    name: "Slate",
    bg: "#f3f3f4",
    surface: "#ffffff",
    text: "#18181b",
    muted: "#52525b",
    primary: "#27272a",
    accent: "#3f3f46",
    btnText: "#ffffff",
  },
  ink: {
    ...shared,
    id: "ink",
    name: "Ink",
    bg: "#0e0e0e",
    surface: "#171717",
    text: "#f5f5f4",
    muted: "#a8a29e",
    primary: "#fafafa",
    accent: "#d6d3d1",
    btnText: "#111111",
  },
  saffron: {
    ...shared,
    id: "saffron",
    name: "Saffron",
    bg: "#faf6ee",
    surface: "#fffdf9",
    text: "#1c1917",
    muted: "#57534e",
    primary: "#c2410c",
    accent: "#ea580c",
    btnText: "#ffffff",
  },
}

export function getTheme(id: ThemeId): Theme {
  return themes[id]
}
