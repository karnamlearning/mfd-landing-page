"use client"

import styled, { ThemeProvider } from "styled-components"
import { failingContrast, fontIds, fontPairs, getTheme, themeIds, themes } from "@mfd/tokens"

const Page = styled.main`
  padding: 2rem 1.25rem 4rem;
  font-family: var(--font-modern), system-ui, sans-serif;
`

const Grid = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
`

const Cell = styled.div`
  padding: 1rem 0.85rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.text}18;
  min-height: 7.5rem;
`

const Name = styled.p`
  margin: 0 0 0.35rem;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
`

const Sample = styled.p<{ $heading: string }>`
  margin: 0 0 0.75rem;
  font-family: ${({ $heading }) => $heading}, Georgia, serif;
  font-size: 1.35rem;
`

const Btn = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
`

const Fail = styled.pre`
  font-size: 0.8rem;
  color: #b91c1c;
`

export function LookMatrix() {
  const fails = failingContrast()
  return (
    <Page>
      <h1>Theme × font</h1>
      <p>All 8 themes × 5 pairs. Buttons use primary / btnText.</p>
      {fails.length ? (
        <Fail>
          Contrast failures:{" "}
          {fails.map((f) => `${f.theme} ${f.pair} ${f.ratio.toFixed(2)}`).join("\n")}
        </Fail>
      ) : (
        <p>Contrast checks passed (text/bg, text/surface, btn/primary ≥ 4.5; muted/bg ≥ 3).</p>
      )}
      {fontIds.map((fontId) => (
        <section key={fontId} style={{ marginTop: "2rem" }}>
          <h2>{fontPairs[fontId].name}</h2>
          <Grid>
            {themeIds.map((id) => (
              <ThemeProvider key={`${fontId}-${id}`} theme={getTheme(id)}>
                <Cell>
                  <Name>
                    {themes[id].name} · {fontId}
                  </Name>
                  <Sample $heading={fontPairs[fontId].headingVar}>Aa {themes[id].name}</Sample>
                  <Btn>Button</Btn>
                </Cell>
              </ThemeProvider>
            ))}
          </Grid>
        </section>
      ))}
    </Page>
  )
}
