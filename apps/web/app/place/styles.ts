"use client"

import styled, { createGlobalStyle, css } from "styled-components"

export const EditorGlobal = createGlobalStyle`
  html, body { margin: 0; height: 100%; }
  body {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; text-decoration: none; }
  button, input, select, textarea { font: inherit; }
`

export const Shell = styled.div`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  height: 100vh;
  overflow: hidden;
  font-family: var(--font-modern), system-ui, sans-serif;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bg};

  @media (max-width: 760px) {
    height: auto;
    min-height: 100vh;
    overflow: auto;
  }
`

export const Top = styled.header`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: 0.7rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.text}14;
  background: ${({ theme }) => theme.surface};
  min-height: 56px;
`

export const BrandMark = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
`

export const BrandName = styled.span`
  font-size: 0.92rem;
  font-weight: 650;
  letter-spacing: -0.03em;
`

export const BrandSub = styled.span`
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
`

export const TopGrow = styled.div`
  flex: 1;
`

export const Seg = styled.div`
  display: flex;
  padding: 3px;
  gap: 2px;
  border-radius: 999px;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.text}12;
`

export const SegBtn = styled.button<{ $on: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 0;
  cursor: pointer;
  border-radius: 999px;
  padding: 0.35rem 0.7rem;
  font-size: 0.78rem;
  background: ${({ $on, theme }) => ($on ? theme.primary : "transparent")};
  color: ${({ $on, theme }) => ($on ? theme.btnText : theme.muted)};
`

export const GhostBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid ${({ theme }) => theme.text}18;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border-radius: 999px;
  padding: 0.4rem 0.85rem;
  font-size: 0.8rem;
  cursor: pointer;

  @media (min-width: 761px) {
    display: none;
  }
`

export const PayBtn = styled.button`
  border: 0;
  cursor: pointer;
  border-radius: 999px;
  padding: 0.45rem 1rem;
  font-size: 0.82rem;
  font-weight: 600;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
`

export const Body = styled.div`
  display: grid;
  grid-template-columns: 268px minmax(0, 1fr) 236px;
  min-height: 0;

  @media (max-width: 1100px) {
    grid-template-columns: 248px minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) auto;
  }

  @media (max-width: 760px) {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
`

export const Left = styled.aside`
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-right: 1px solid ${({ theme }) => theme.text}12;
  background: ${({ theme }) => theme.surface};

  @media (max-width: 760px) {
    border-right: 0;
    border-bottom: 1px solid ${({ theme }) => theme.text}12;
  }
`

export const Steps = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0.65rem 0;
  gap: 2px;
`

export const StepBtn = styled.button<{ $on: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  width: 100%;
  text-align: left;
  border: 0;
  cursor: pointer;
  border-radius: 10px;
  padding: 0.5rem 0.65rem;
  background: ${({ $on, theme }) => ($on ? theme.bg : "transparent")};
  color: ${({ $on, theme }) => ($on ? theme.text : theme.muted)};
`

export const StepN = styled.span<{ $on: boolean }>`
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 650;
  background: ${({ $on, theme }) => ($on ? theme.primary : `${theme.text}12`)};
  color: ${({ $on, theme }) => ($on ? theme.btnText : theme.muted)};
`

export const StepPanel = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 1rem 1rem 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.text}0d;
  margin-top: 0.5rem;
`

export const StepTitle = styled.h2`
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
  font-weight: 650;
  letter-spacing: -0.03em;
`

export const StepLead = styled.p`
  margin: 0 0 1rem;
  font-size: 0.82rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.muted};
`

export const Later = styled.p`
  margin: 0;
  padding: 0.85rem 0.9rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.bg};
  border: 1px dashed ${({ theme }) => theme.text}18;
  font-size: 0.84rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.muted};
`

export const NextRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;
`

export const NextBtn = styled.button`
  border: 0;
  cursor: pointer;
  border-radius: 10px;
  padding: 0.5rem 0.9rem;
  font-size: 0.82rem;
  font-weight: 600;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
`

export const Stage = styled.section<{ $open: boolean }>`
  min-width: 0;
  min-height: 0;
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 1.1rem;
  background:
    radial-gradient(1200px 400px at 50% -10%, ${({ theme }) => theme.text}08, transparent),
    ${({ theme }) => theme.bg};

  @media (max-width: 1100px) {
    grid-column: 2;
    grid-row: 1;
  }

  @media (max-width: 760px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    height: min(72vh, 680px);
    flex-shrink: 0;
    padding: 0.75rem;
  }
`

export const Frame = styled.div<{ $desktop: boolean }>`
  width: ${({ $desktop }) => ($desktop ? "100%" : "390px")};
  max-width: 100%;
  height: 100%;
  overflow: auto;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.text}16;
  box-shadow: 0 18px 50px ${({ theme }) => theme.text}14;
  ${({ $desktop }) =>
    $desktop
      ? css`
          border-radius: 12px;
        `
      : css`
          border-radius: 28px;
        `}
`

export const Rail = styled.aside`
  min-height: 0;
  overflow: auto;
  padding: 1rem 0.9rem;
  border-left: 1px solid ${({ theme }) => theme.text}12;
  background: ${({ theme }) => theme.surface};

  @media (max-width: 1100px) {
    grid-column: 1 / -1;
    grid-row: 2;
    border-left: 0;
    border-top: 1px solid ${({ theme }) => theme.text}12;
  }
`

export const RailKicker = styled.p`
  margin: 0 0 0.85rem;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
`

export const AddonCard = styled.article<{ $on: boolean }>`
  padding: 0.9rem;
  border-radius: 14px;
  border: 1px solid ${({ $on, theme }) => ($on ? theme.primary : `${theme.text}16`)};
  background: ${({ theme }) => theme.bg};
`

export const AddonName = styled.h3`
  margin: 0 0 0.35rem;
  font-size: 0.92rem;
  font-weight: 650;
`

export const AddonCopy = styled.p`
  margin: 0 0 0.85rem;
  font-size: 0.78rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.muted};
`

export const AddonBtn = styled.button<{ $on: boolean }>`
  width: 100%;
  border: 0;
  cursor: pointer;
  border-radius: 10px;
  padding: 0.45rem 0.7rem;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ $on, theme }) => ($on ? theme.text : theme.primary)};
  color: ${({ $on, theme }) => ($on ? theme.bg : theme.btnText)};
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.85rem;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.muted};
`

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`

export const SampleTag = styled.span`
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.12rem 0.4rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.text}10;
  color: ${({ theme }) => theme.muted};
`

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.text}18;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  padding: 0.5rem 0.65rem;
  font-size: 0.88rem;
`

export const Area = styled.textarea`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.text}18;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  padding: 0.5rem 0.65rem;
  font-size: 0.88rem;
  resize: vertical;
  min-height: 88px;
`

export const Hint = styled.span`
  font-size: 0.72rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.muted};
`

export const Warn = styled.span`
  font-size: 0.72rem;
  line-height: 1.4;
  color: #b45309;
`

export const Thumb = styled.img`
  width: 100%;
  height: 88px;
  object-fit: cover;
  border-radius: 10px;
  background: ${({ theme }) => theme.bg};
`

export const FileRow = styled.div`
  display: flex;
  gap: 0.45rem;
  align-items: center;

  ${Input} {
    width: auto;
    flex: 1;
    min-width: 0;
  }
`

export const FileBtn = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  border-radius: 10px;
  padding: 0.4rem 0.7rem;
  font-size: 0.78rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};

  input {
    display: none;
  }
`

export const ClearBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.text}18;
  background: transparent;
  color: ${({ theme }) => theme.muted};
  border-radius: 10px;
  padding: 0.4rem 0.7rem;
  font-size: 0.78rem;
  cursor: pointer;
`

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`

export const Chip = styled.button<{ $on: boolean }>`
  border: 1px solid ${({ $on, theme }) => ($on ? theme.primary : `${theme.text}18`)};
  background: ${({ $on, theme }) => ($on ? theme.primary : "transparent")};
  color: ${({ $on, theme }) => ($on ? theme.btnText : theme.text)};
  border-radius: 999px;
  padding: 0.28rem 0.7rem;
  font-size: 0.78rem;
  cursor: pointer;
`

export const Group = styled.div`
  margin: 1.1rem 0 0.4rem;
  padding-top: 0.9rem;
  border-top: 1px solid ${({ theme }) => theme.text}10;
`

export const GroupTitle = styled.h3`
  margin: 0 0 0.75rem;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
  font-weight: 650;
`

export const RowCard = styled.div`
  padding: 0.7rem;
  margin-bottom: 0.55rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.text}12;
`

export const AddLink = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.primary};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.2rem 0;
`

export const CardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`

export const TplCard = styled.button<{ $on: boolean }>`
  display: block;
  width: 100%;
  text-align: left;
  border: 1px solid ${({ $on, theme }) => ($on ? theme.primary : `${theme.text}16`)};
  background: ${({ theme }) => theme.bg};
  color: inherit;
  border-radius: 14px;
  padding: 0.7rem;
  cursor: pointer;
  box-shadow: ${({ $on, theme }) => ($on ? `0 0 0 1px ${theme.primary}` : "none")};
`

export const TplThumb = styled.div<{ $id: string }>`
  height: 72px;
  border-radius: 10px;
  margin-bottom: 0.6rem;
  overflow: hidden;
  position: relative;
  background: #d6d3d1;

  ${({ $id }) =>
    $id === "solo"
      ? css`
          display: grid;
          grid-template-columns: 38% 1fr;
          background: #ece7dc;
          &::before {
            content: "";
            background: #c4b8a4;
          }
          &::after {
            content: "";
            margin: 14px 10px;
            border-radius: 4px;
            background: linear-gradient(#8a8174 0 8px, transparent 8px 14px, #b7aea3 14px 18px) no-repeat;
          }
        `
      : $id === "practice"
        ? css`
            background:
              linear-gradient(#0f2a22cc, #0f2a22aa),
              linear-gradient(90deg, #134e3a, #1b6b4a);
            &::after {
              content: "";
              position: absolute;
              left: 12px;
              bottom: 12px;
              width: 46%;
              height: 8px;
              border-radius: 4px;
              background: #f3efe6;
            }
          `
        : css`
            background: #faf6ee;
            &::before {
              content: "EN  हिं";
              position: absolute;
              top: 8px;
              right: 10px;
              font-size: 0.58rem;
              letter-spacing: 0.04em;
              color: #c2410c;
            }
            &::after {
              content: "";
              position: absolute;
              left: 12px;
              bottom: 14px;
              width: 58%;
              height: 12px;
              border-radius: 4px;
              background: #1c1917;
            }
          `}
`

export const TplName = styled.strong`
  display: block;
  font-size: 0.88rem;
  font-weight: 650;
  margin-bottom: 0.2rem;
`

export const TplBlurb = styled.span`
  display: block;
  font-size: 0.75rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.muted};
`

export const TplAction = styled.span<{ $on: boolean }>`
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ $on, theme }) => ($on ? theme.primary : theme.muted)};
`

export const SwatchGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.55rem;
`

export const Swatch = styled.button<{ $on: boolean }>`
  display: block;
  width: 100%;
  text-align: left;
  border: 1px solid ${({ $on, theme }) => ($on ? theme.primary : `${theme.text}16`)};
  background: ${({ theme }) => theme.bg};
  color: inherit;
  border-radius: 12px;
  padding: 0.55rem;
  cursor: pointer;
  box-shadow: ${({ $on, theme }) => ($on ? `0 0 0 1px ${theme.primary}` : "none")};
`

export const SwatchChips = styled.span`
  display: flex;
  height: 26px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.45rem;
  border: 1px solid ${({ theme }) => theme.text}10;
`

export const SwatchChip = styled.span<{ $c: string }>`
  flex: 1;
  background: ${({ $c }) => $c};
`

export const SwatchName = styled.span`
  display: block;
  font-size: 0.78rem;
  font-weight: 650;
`

export const FontGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`

export const FontCard = styled.button<{ $on: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  text-align: left;
  border: 1px solid ${({ $on, theme }) => ($on ? theme.primary : `${theme.text}16`)};
  background: ${({ theme }) => theme.bg};
  color: inherit;
  border-radius: 12px;
  padding: 0.6rem 0.7rem;
  cursor: pointer;
  box-shadow: ${({ $on, theme }) => ($on ? `0 0 0 1px ${theme.primary}` : "none")};
`

export const Aa = styled.span<{ $heading: string }>`
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: ${({ theme }) => theme.surface};
  font-family: ${({ $heading }) => $heading}, Georgia, serif;
  font-size: 1.45rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  flex-shrink: 0;
`

export const FontMeta = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`

export const FontName = styled.strong`
  font-size: 0.86rem;
  font-weight: 650;
`

export const FontPair = styled.span`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.muted};
`

export const SecList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

export const SecRow = styled.div<{ $dim?: boolean }>`
  border-radius: 12px;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.text}12;
  opacity: ${({ $dim }) => ($dim ? 0.55 : 1)};
`

export const SecMain = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.45rem;
`

export const Handle = styled.button`
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.muted};
  cursor: grab;
  padding: 0.25rem;
  touch-action: none;
`

export const SecName = styled.span`
  flex: 1;
  min-width: 0;
  font-size: 0.84rem;
  font-weight: 550;
  color: ${({ theme }) => theme.text};
`

export const IconBtn = styled.button<{ $muted?: boolean }>`
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0.28rem;
  border-radius: 8px;
  color: ${({ $muted, theme }) => ($muted ? theme.muted : theme.text)};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.35;
  }
`

export const Nested = styled.div`
  padding: 0 0.65rem 0.7rem;
  border-top: 1px solid ${({ theme }) => theme.text}0d;
`

export const Tick = styled.button<{ $on: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  text-align: left;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 0.8rem;
  padding: 0.35rem 0;
  cursor: pointer;
`

export const TickBox = styled.span<{ $on: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid ${({ $on, theme }) => ($on ? theme.primary : `${theme.text}28`)};
  background: ${({ $on, theme }) => ($on ? theme.primary : "transparent")};
  flex-shrink: 0;
`

export const Summary = styled.dl`
  margin: 0;

  dt {
    margin: 0.85rem 0 0.2rem;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.muted};
  }

  dd {
    margin: 0;
    font-size: 0.88rem;
  }
`

export const PayStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-top: 1.1rem;
`

export const PlanBtn = styled.button<{ $on?: boolean }>`
  border: 1px solid ${({ $on, theme }) => ($on ? theme.primary : `${theme.text}18`)};
  background: ${({ $on, theme }) => ($on ? theme.primary : theme.bg)};
  color: ${({ $on, theme }) => ($on ? theme.btnText : theme.text)};
  border-radius: 12px;
  padding: 0.7rem 0.85rem;
  cursor: pointer;
  text-align: left;
`

export const PlanName = styled.strong`
  display: block;
  font-size: 0.88rem;
`

export const PlanNote = styled.span`
  display: block;
  margin-top: 0.15rem;
  font-size: 0.72rem;
  opacity: 0.8;
`
