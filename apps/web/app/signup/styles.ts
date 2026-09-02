"use client"

import styled, { createGlobalStyle } from "styled-components"
import { brand } from "../brand"

export const AuthGlobal = createGlobalStyle`
  html, body { margin: 0; height: 100%; background: #fff; }
  body {
    color: ${brand.ink};
    font-family: var(--font-modern), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; text-decoration: none; }
  button, input, select, textarea { font: inherit; }
`

export const Page = styled.div`
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 1.5rem 1rem 2.5rem;
  background: #fff;
  color: ${brand.ink};
  font-family: var(--font-modern), system-ui, sans-serif;
`

export const Card = styled.section`
  width: min(100%, 26rem);
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 1.6rem 1.4rem 1.5rem;
  border-radius: 20px;
  background: #fff;
  border: 1px solid ${brand.navy}12;
  box-shadow: 0 18px 50px ${brand.navy}12;
`

export const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.15rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${brand.gold};
`

export const Kicker = styled.p`
  margin: 0 0 0.3rem;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${brand.gold};
  font-weight: 650;
`

export const Title = styled.h1`
  margin: 0 0 0.4rem;
  font-size: 1.45rem;
  letter-spacing: -0.03em;
  color: ${brand.navy};
`

export const Lead = styled.p`
  margin: 0 0 1.2rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #5b6578;
`

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.9rem;
  font-size: 0.78rem;
  font-weight: 650;
  color: ${brand.navy};
`

export const CodeRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.35rem;
  width: 100%;
  min-width: 0;
`

export const CodeBox = styled.input`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: 2.85rem;
  padding: 0;
  border: 1px solid ${brand.navy}22;
  background: #fff;
  color: ${brand.navy};
  border-radius: 10px;
  text-align: center;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0;
  outline: none;

  &:focus {
    border-color: ${brand.gold};
    box-shadow: 0 0 0 3px ${brand.gold}33;
  }
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.35rem;
`

export const Primary = styled.button`
  border: 0;
  cursor: pointer;
  border-radius: 999px;
  padding: 0.7rem 1.2rem;
  font-size: 0.88rem;
  font-weight: 650;
  background: ${brand.navy};
  color: #fff;

  &:disabled {
    opacity: 0.55;
    cursor: wait;
  }
`

export const Ghost = styled.button`
  border: 1px solid ${brand.navy}20;
  background: transparent;
  color: ${brand.navy};
  border-radius: 999px;
  padding: 0.65rem 1rem;
  font-size: 0.82rem;
  cursor: pointer;
`

export const GoldLink = styled.button`
  border: 0;
  background: transparent;
  color: ${brand.gold};
  font-size: 0.82rem;
  font-weight: 650;
  cursor: pointer;
  padding: 0.65rem 0.2rem;

  &:disabled {
    opacity: 0.5;
    cursor: wait;
  }
`

export const Warn = styled.p`
  margin: 0 0 0.75rem;
  font-size: 0.78rem;
  line-height: 1.4;
  color: #9a3412;
`

export const Hint = styled.p`
  margin: 0.85rem 0 0;
  font-size: 0.75rem;
  color: #6b7384;
`

export const DevChip = styled.p`
  margin: 0 0 0.9rem;
  padding: 0.45rem 0.65rem;
  border-radius: 8px;
  background: ${brand.gold}18;
  color: ${brand.navy};
  font-size: 0.78rem;
`
