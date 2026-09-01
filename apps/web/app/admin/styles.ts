"use client"

import styled, { createGlobalStyle } from "styled-components"

export const Global = createGlobalStyle`
  html, body { margin: 0; }
  body { -webkit-font-smoothing: antialiased; }
  a { color: inherit; text-decoration: none; }
  button, input { font: inherit; }
`

export const Shell = styled.div`
  min-height: 100vh;
  font-family: var(--font-modern), system-ui, sans-serif;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bg};
`

export const Top = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1.15rem;
  background: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.text}14;
`

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
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

export const Ghost = styled.button`
  border: 1px solid ${({ theme }) => theme.text}18;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border-radius: 999px;
  padding: 0.4rem 0.85rem;
  font-size: 0.8rem;
  cursor: pointer;
`

export const Body = styled.main`
  max-width: 72rem;
  margin: 0 auto;
  padding: 1.25rem 1.15rem 2.5rem;
`

export const Lead = styled.p`
  margin: 0 0 1rem;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.muted};
`

export const Card = styled.div`
  max-width: 22rem;
  padding: 1.25rem;
  border-radius: 16px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.text}12;
`

export const Title = styled.h1`
  margin: 0 0 0.35rem;
  font-size: 1.2rem;
  font-weight: 650;
  letter-spacing: -0.03em;
`

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin: 1rem 0;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.muted};
`

export const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.text}18;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  padding: 0.5rem 0.65rem;
  font: inherit;
  font-size: 0.88rem;
`

export const Primary = styled.button`
  border: 0;
  cursor: pointer;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-size: 0.84rem;
  font-weight: 600;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`

export const Warn = styled.p`
  margin: 0 0 0.75rem;
  font-size: 0.78rem;
  color: #b45309;
`

export const TableWrap = styled.div`
  overflow: auto;
  border-radius: 14px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.text}12;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;

  th,
  td {
    text-align: left;
    padding: 0.7rem 0.85rem;
    border-bottom: 1px solid ${({ theme }) => theme.text}10;
    vertical-align: middle;
    white-space: nowrap;
  }

  th {
    font-size: 0.66rem;
    font-weight: 650;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.muted};
  }

  tr:last-child td {
    border-bottom: 0;
  }
`

export const Status = styled.span<{ $tone: "ok" | "warn" | "mute" }>`
  display: inline-block;
  padding: 0.12rem 0.45rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 650;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: ${({ $tone, theme }) =>
    $tone === "ok" ? `${theme.primary}14` : $tone === "warn" ? "#fef3c7" : `${theme.text}10`};
  color: ${({ $tone, theme }) =>
    $tone === "ok" ? theme.primary : $tone === "warn" ? "#92400e" : theme.muted};
`

export const RowActions = styled.div`
  display: flex;
  gap: 0.4rem;
`

export const TextBtn = styled.button`
  border: 0;
  background: none;
  color: ${({ theme }) => theme.text};
  font-size: 0.78rem;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 0.16em;
  padding: 0;

  &:disabled {
    opacity: 0.45;
    cursor: default;
    text-decoration: none;
  }
`

export const Link = styled.a`
  color: inherit;
  font-size: 0.78rem;
`
