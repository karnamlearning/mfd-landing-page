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

export const classicThemeIds = [
  "navy",
  "forest",
  "maroon",
  "sky",
  "sand",
  "slate",
  "ink",
  "saffron",
] as const

export const heraldThemeIds = ["newsprint", "indigo", "brick"] as const
export const lumenThemeIds = ["dusk", "aurora", "ember"] as const
export const capitalThemeIds = ["ivory", "gilt", "obsidian"] as const

export const themeIds = [...classicThemeIds, ...heraldThemeIds, ...lumenThemeIds, ...capitalThemeIds] as const

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
  newsprint: {
    ...shared,
    id: "newsprint",
    name: "Broadsheet",
    bg: "#e4e4e4",
    surface: "#f3f3f3",
    text: "#111111",
    muted: "#555555",
    primary: "#111111",
    accent: "#c4101a",
    btnText: "#ffffff",
  },
  indigo: {
    ...shared,
    id: "indigo",
    name: "Evening edition",
    bg: "#0d0d0d",
    surface: "#1a1a1a",
    text: "#f5f5f5",
    muted: "#9a9a9a",
    primary: "#f5f5f5",
    accent: "#d01224",
    btnText: "#0d0d0d",
  },
  brick: {
    ...shared,
    id: "brick",
    name: "Press red",
    bg: "#f4f4f4",
    surface: "#ffffff",
    text: "#111111",
    muted: "#5c5c5c",
    primary: "#c4101a",
    accent: "#111111",
    btnText: "#ffffff",
  },
  dusk: {
    ...shared,
    id: "dusk",
    name: "Dusk",
    bg: "#0b1020",
    surface: "#151c32",
    text: "#eef1ff",
    muted: "#9aa3c2",
    primary: "#8aa4ff",
    accent: "#c4b5fd",
    btnText: "#0b1020",
  },
  aurora: {
    ...shared,
    id: "aurora",
    name: "Aurora",
    bg: "#071614",
    surface: "#0f2622",
    text: "#e8fff6",
    muted: "#8fb8ad",
    primary: "#3dcfb6",
    accent: "#7ee0c8",
    btnText: "#06201a",
  },
  ember: {
    ...shared,
    id: "ember",
    name: "Ember",
    bg: "#140c0a",
    surface: "#221611",
    text: "#fff3ea",
    muted: "#c4a494",
    primary: "#e08a4b",
    accent: "#f0c29e",
    btnText: "#1a0e08",
  },
  gilt: {
    ...shared,
    id: "gilt",
    name: "Gilt",
    bg: "#f6f1e6",
    surface: "#fffcf6",
    text: "#1c1915",
    muted: "#5f584c",
    primary: "#1a2744",
    accent: "#9a7429",
    btnText: "#fffcf6",
  },
  ivory: {
    ...shared,
    id: "ivory",
    name: "Ivory",
    bg: "#faf7f1",
    surface: "#ffffff",
    text: "#1a1d23",
    muted: "#5c616a",
    primary: "#1e3a5f",
    accent: "#b08d4a",
    btnText: "#ffffff",
  },
  obsidian: {
    ...shared,
    id: "obsidian",
    name: "Pearl",
    bg: "#f3f5f8",
    surface: "#ffffff",
    text: "#1b2430",
    muted: "#5b6573",
    primary: "#2a4a6e",
    accent: "#8a7344",
    btnText: "#ffffff",
  },
}

export const themesByFamily = {
  classic: classicThemeIds,
  herald: heraldThemeIds,
  lumen: lumenThemeIds,
  capital: capitalThemeIds,
} as const

export function getTheme(id: ThemeId): Theme {
  return themes[id] ?? themes.forest
}

export function themesForFamily(family: keyof typeof themesByFamily): readonly ThemeId[] {
  return themesByFamily[family] ?? classicThemeIds
}

export function coerceTheme(family: keyof typeof themesByFamily, theme: ThemeId): ThemeId {
  const allowed = themesByFamily[family]
  return (allowed as readonly string[]).includes(theme) ? theme : allowed[0]
}
