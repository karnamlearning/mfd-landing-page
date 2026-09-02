"use client"

import styled from "styled-components"
import { familyIds, familyMeta, type FamilyId } from "@mfd/schema"
import { fontIds, fontPairs, themes, themesForFamily, type FontId, type ThemeId } from "@mfd/tokens"

const Bar = styled.aside`
  position: fixed;
  z-index: 50;
  right: ${({ theme }) => theme.space[2]};
  bottom: ${({ theme }) => theme.space[2]};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 14px;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.text}18;
  border-radius: 12px;
  box-shadow: 0 12px 40px ${({ theme }) => theme.text}14;
  max-width: 220px;
`

const Label = styled.p`
  margin: 0 0 6px;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
`

const Swatches = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const Dot = styled.button<{ $color: string; $on: boolean }>`
  width: 18px;
  height: 18px;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
  background: ${({ $color }) => $color};
  border: 2px solid ${({ $on, theme }) => ($on ? theme.text : "transparent")};
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.text}22;
`

const Fonts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`

const FontChip = styled.button<{ $on: boolean }>`
  border: 0;
  cursor: pointer;
  border-radius: 999px;
  padding: 3px 8px;
  font-size: 0.7rem;
  background: ${({ $on, theme }) => ($on ? theme.primary : "transparent")};
  color: ${({ $on, theme }) => ($on ? theme.btnText : theme.muted)};
`

type Props = {
  familyId: FamilyId
  themeId: ThemeId
  fontId: FontId
  onFamily: (id: FamilyId) => void
  onTheme: (id: ThemeId) => void
  onFont: (id: FontId) => void
}

export function LookDock({ familyId, themeId, fontId, onFamily, onTheme, onFont }: Props) {
  const pack = themesForFamily(familyId)
  return (
    <Bar aria-label="Preview look">
      <div>
        <Label>Template</Label>
        <Fonts>
          {familyIds.map((id) => (
            <FontChip key={id} type="button" $on={id === familyId} onClick={() => onFamily(id)}>
              {familyMeta[id].name}
            </FontChip>
          ))}
        </Fonts>
      </div>
      <div>
        <Label>Theme</Label>
        <Swatches>
          {pack.map((id) => (
            <Dot
              key={id}
              type="button"
              title={themes[id].name}
              $color={themes[id].primary}
              $on={id === themeId}
              onClick={() => onTheme(id)}
            />
          ))}
        </Swatches>
      </div>
      <div>
        <Label>Font</Label>
        <Fonts>
          {fontIds.map((id) => (
            <FontChip key={id} type="button" $on={id === fontId} onClick={() => onFont(id)}>
              {fontPairs[id].name}
            </FontChip>
          ))}
        </Fonts>
      </div>
    </Bar>
  )
}
