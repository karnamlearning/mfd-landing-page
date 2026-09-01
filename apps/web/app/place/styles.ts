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

export const Chrome = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`

export const Top = styled.header`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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

export const TrialBanner = styled.div<{ $warn?: boolean }>`
  padding: 0.45rem 1rem;
  font-size: 0.78rem;
  line-height: 1.4;
  background: ${({ $warn, theme }) => ($warn ? "#fef3c7" : `${theme.primary}14`)};
  color: ${({ $warn, theme }) => ($warn ? "#92400e" : theme.text)};
  border-bottom: 1px solid ${({ theme }) => theme.text}12;

  a {
    color: inherit;
    font-weight: 650;
    text-decoration: underline;
    text-underline-offset: 0.16em;
  }
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

  padding-bottom: 4.5rem;
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
  align-items: center;
  gap: 0.5rem;
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

  &:disabled {
    opacity: 0.55;
    cursor: default;
  }
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
          width: min(390px, 100%);
        `}
  overscroll-behavior: contain;
  scroll-behavior: smooth;
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

  & + & {
    margin-top: 0.75rem;
  }
`

export const AddonName = styled.h3`
  margin: 0 0 0.35rem;
  font-size: 0.92rem;
  font-weight: 650;
`

export const AddonCopy = styled.p`
  margin: 0 0 0.45rem;
  font-size: 0.78rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.muted};
`

export const AddonPrice = styled.p`
  margin: 0 0 0.85rem;
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.text};
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
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.text}18;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  padding: 0.5rem 0.65rem;
  font-family: inherit;
  font-size: 0.88rem;
`

export const PhoneField = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.text}18;
  background: ${({ theme }) => theme.bg};
  border-radius: 10px;
`

export const PhonePrefix = styled.span`
  display: flex;
  align-items: center;
  align-self: stretch;
  padding: 0 0.75rem;
  font-size: 0.88rem;
  font-weight: 650;
  color: ${({ theme }) => theme.text};
  border-right: 1px solid ${({ theme }) => theme.text}14;
  flex-shrink: 0;
`

export const PhoneInput = styled.input`
  flex: 1;
  min-width: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.text};
  padding: 0.55rem 0.75rem;
  font-family: inherit;
  font-size: 0.88rem;
  letter-spacing: 0.02em;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.muted};
    letter-spacing: 0;
  }
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

  > ${Hint} {
    display: block;
    margin: 0.55rem 0 0.7rem;
  }
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

export const ModalScrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background: ${({ theme }) => theme.text}66;
  backdrop-filter: blur(6px);
`

export const ModalCard = styled.div`
  width: min(32rem, 100%);
  max-height: min(92vh, 44rem);
  overflow: auto;
  padding: 1.25rem 1.35rem 1.15rem;
  border-radius: 20px;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  box-shadow:
    0 1px 0 ${({ theme }) => theme.text}0a,
    0 24px 64px ${({ theme }) => theme.text}28;
`

export const ModalTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
`

export const ModalKicker = styled.p`
  margin: 0 0 0.2rem;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
`

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.28rem;
  font-weight: 650;
  letter-spacing: -0.04em;
  line-height: 1.2;
`

export const ModalLead = styled.p`
  margin: 0.4rem 0 1rem;
  font-size: 0.86rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.muted};
`

export const ModalClose = styled.button`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.muted};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.text};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`

export const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`

export const PlanCard = styled.button<{ $on: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 8rem;
  padding: 0.85rem 2.35rem 0.9rem 0.95rem;
  border-radius: 16px;
  text-align: left;
  cursor: pointer;
  border: 1.5px solid ${({ $on, theme }) => ($on ? theme.primary : `${theme.text}14`)};
  background: ${({ $on, theme }) => ($on ? theme.surface : theme.bg)};
  color: ${({ theme }) => theme.text};
  box-shadow: ${({ $on, theme }) => ($on ? `0 0 0 3px ${theme.primary}18` : "none")};

  &:hover:not(:disabled) {
    border-color: ${({ $on, theme }) => ($on ? theme.primary : `${theme.text}28`)};
  }

  &:disabled {
    cursor: default;
  }
`

export const PlanHead = styled.span`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.45rem;
  padding-right: 0.2rem;
  margin-bottom: 0.7rem;
`

export const PlanName = styled.strong`
  font-size: 0.82rem;
  font-weight: 650;
  letter-spacing: -0.02em;
`

export const PlanTag = styled.span<{ $on: boolean }>`
  display: inline-block;
  padding: 0.1rem 0.4rem;
  border-radius: 999px;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: ${({ $on, theme }) => ($on ? theme.primary : `${theme.text}10`)};
  color: ${({ $on, theme }) => ($on ? theme.btnText : theme.muted)};
`

export const PlanPrice = styled.span`
  font-size: 1.55rem;
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1.05;
`

export const PlanPeriod = styled.span`
  margin-top: 0.18rem;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.muted};
`

export const PlanNote = styled.span`
  display: block;
  margin-top: auto;
  padding-top: 0.7rem;
  font-size: 0.72rem;
  line-height: 1.35;
  color: ${({ theme }) => theme.muted};
`

export const PlanMark = styled.span<{ $on: boolean }>`
  position: absolute;
  top: 0.9rem;
  right: 0.85rem;
  display: grid;
  place-items: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 999px;
  background: ${({ $on, theme }) => ($on ? theme.primary : "transparent")};
  color: ${({ theme }) => theme.btnText};
  border: 1.5px solid ${({ $on, theme }) => ($on ? theme.primary : `${theme.text}22`)};
`

export const PlanIncludes = styled.p`
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin: 0.8rem 0 0;
  font-size: 0.78rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.muted};

  svg {
    flex-shrink: 0;
    margin-top: 0.12rem;
    color: ${({ theme }) => theme.text};
  }
`

export const PlanBreak = styled.dl`
  margin: 0.85rem 0 0;
  padding: 0.75rem 0.8rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.text}12;
`

export const PlanBreakRow = styled.div<{ $total?: boolean }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: ${({ $total }) => ($total ? "0.88rem" : "0.78rem")};
  font-weight: ${({ $total }) => ($total ? 650 : 500)};
  color: ${({ $total, theme }) => ($total ? theme.text : theme.muted)};
  padding-top: ${({ $total }) => ($total ? "0.55rem" : "0")};
  margin-top: ${({ $total }) => ($total ? "0.55rem" : "0.35rem")};
  border-top: ${({ $total, theme }) => ($total ? `1px solid ${theme.text}12` : "none")};

  &:first-child {
    margin-top: 0;
    padding-top: 0;
  }
`

export const ModalGst = styled.div`
  margin-top: 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.76rem;
  color: ${({ theme }) => theme.muted};
`

export const GstLink = styled.button`
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0;
  border: 0;
  background: none;
  color: ${({ theme }) => theme.muted};
  font-size: 0.76rem;
  cursor: pointer;
  text-align: left;

  &:hover {
    color: ${({ theme }) => theme.text};
    text-decoration: underline;
    text-underline-offset: 0.18em;
  }
`

export const ModalCta = styled.button`
  width: 100%;
  margin-top: 1.05rem;
  border: 0;
  cursor: pointer;
  border-radius: 12px;
  padding: 0.82rem 1rem;
  font-size: 0.92rem;
  font-weight: 650;
  letter-spacing: -0.02em;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`

export const ModalHint = styled.p`
  margin: 0.55rem 0 0;
  text-align: center;
  font-size: 0.72rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.muted};
`

export const SiteChrome = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
  max-width: min(42vw, 28rem);
  margin: 0 0.5rem;

  @media (max-width: 760px) {
    order: 20;
    max-width: none;
    flex: 1 1 100%;
    margin: 0.15rem 0 0;
  }
`

export const UrlText = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.muted};
`

export const ChromeBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  border: 1px solid ${({ theme }) => theme.text}18;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border-radius: 999px;
  padding: 0.3rem 0.65rem;
  font-size: 0.72rem;
  cursor: pointer;
  text-decoration: none;
`

export const SaveBtn = styled.button<{ $err?: boolean }>`
  flex-shrink: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0;
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.02em;
  color: ${({ $err, theme }) => ($err ? "#b45309" : theme.primary)};
`

export const SaveHint = styled.span<{ $err?: boolean }>`
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.02em;
  color: ${({ $err, theme }) => ($err ? "#b45309" : theme.muted)};
  flex-shrink: 0;
`

export const Marketing = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 1.25rem;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-family: var(--font-modern), system-ui, sans-serif;
`

export const MarketingLead = styled.p`
  margin: 0;
  max-width: 28rem;
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.muted};
`

export const OtpCard = styled.div`
  width: min(100%, 22rem);
  padding: 1.25rem;
  border-radius: 16px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.text}14;
`

export const QrBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 0.5rem 0 1rem;
  padding: 0.85rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.text}12;
`

export const MissingPage = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
  font-family: system-ui, sans-serif;
  background: #f6f4ef;
  color: #1c1917;
`

export const MissingInner = styled.div`
  max-width: 28rem;
  text-align: center;

  h1 {
    margin: 0 0 0.5rem;
    font-size: 1.4rem;
    letter-spacing: -0.03em;
  }

  p {
    margin: 0;
    color: #57534e;
    line-height: 1.5;
  }
`

export const LeadTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;

  th,
  td {
    text-align: left;
    padding: 0.5rem 0.4rem;
    border-bottom: 1px solid ${({ theme }) => theme.text}12;
    vertical-align: middle;
  }

  th {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.muted};
  }

  td:last-child {
    white-space: nowrap;
  }
`

export const CustomBar = styled.div`
  position: fixed;
  left: 50%;
  bottom: max(0.85rem, env(safe-area-inset-bottom));
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: min(40rem, calc(100vw - 1.5rem));
  transform: translateX(-50%);
  padding: 0.65rem 0.7rem 0.65rem 1rem;
  border-radius: 16px;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.text}16;
  box-shadow:
    0 1px 0 ${({ theme }) => theme.text}0a,
    0 16px 40px ${({ theme }) => theme.text}24;

  @media (max-width: 560px) {
    width: calc(100vw - 1rem);
    padding: 0.6rem 0.65rem 0.6rem 0.85rem;
  }
`

export const CustomCopy = styled.p`
  margin: 0;
  flex: 1;
  min-width: 0;
  font-size: 0.8rem;
  line-height: 1.4;

  strong {
    font-weight: 650;
    letter-spacing: -0.02em;
  }
`

export const CustomMore = styled.span`
  color: ${({ theme }) => theme.muted};

  @media (max-width: 640px) {
    display: none;
  }
`

export const CustomCta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
  border: 0;
  border-radius: 999px;
  padding: 0.45rem 0.85rem;
  font-size: 0.78rem;
  font-weight: 650;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
  text-decoration: none;
  white-space: nowrap;
`
