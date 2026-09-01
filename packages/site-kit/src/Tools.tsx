"use client"

import { visibleToolIds, type TenantConfig, type ToolId } from "@mfd/schema"
import { copy, toolCopy, type Locale } from "./copy"
import * as S from "./styles"

function loc(locale: Locale, config: TenantConfig) {
  return config.template === "local" ? locale : "en"
}

export function ToolsIndex({ config, locale = "en" }: { config: TenantConfig; locale?: Locale }) {
  const t = copy[loc(locale, config)]
  const ids = visibleToolIds(config)
  const hi = loc(locale, config) === "hi"

  return (
    <S.Section>
      <S.Wrap>
        <S.Kicker>{t.toolsIndex}</S.Kicker>
        <S.H2>{t.toolsIndex}</S.H2>
        <S.ServiceGrid>
          {ids.map((id) => {
            const item = toolCopy[id]
            if (!item) return null
            return (
              <a key={id} href={`/calculators/${id}`} style={{ color: "inherit", textDecoration: "none" }}>
                <S.ServiceCard>
                  <S.ServiceTitle>{hi ? item.titleHi : item.title}</S.ServiceTitle>
                  <S.ServiceCopy>{hi ? item.blurbHi : item.blurb}</S.ServiceCopy>
                </S.ServiceCard>
              </a>
            )
          })}
        </S.ServiceGrid>
      </S.Wrap>
    </S.Section>
  )
}

export function ToolPlaceholder({
  config,
  tool,
  locale = "en",
}: {
  config: TenantConfig
  tool: string
  locale?: Locale
}) {
  const t = copy[loc(locale, config)]
  const item = toolCopy[tool as ToolId]
  const hi = loc(locale, config) === "hi"

  return (
    <S.Section>
      <S.Wrap>
        <p>
          <a href="/calculators">{t.backTools}</a>
          {" · "}
          <a href="/">{t.backHome}</a>
        </p>
        <S.Kicker>{t.toolsIndex}</S.Kicker>
        <S.H2>{item ? (hi ? item.titleHi : item.title) : tool}</S.H2>
        <S.Bio>{item ? (hi ? item.blurbHi : item.blurb) : null}</S.Bio>
        <S.Bio style={{ marginTop: "1rem" }}>{t.toolPlaceholder}</S.Bio>
      </S.Wrap>
    </S.Section>
  )
}

export function DisclosuresBody({ name }: { name: string }) {
  return (
    <S.Section>
      <S.Wrap>
        <S.H2>Commission disclosures</S.H2>
        <S.Bio>
          This distributor may receive commission from AMCs as permitted by SEBI / AMFI. Details are
          available on request and will be published here when the live site is connected to the
          MFD’s ARN.
        </S.Bio>
        <S.Bio style={{ marginTop: "1rem" }}>
          Mutual fund investments are subject to market risks, read all scheme related documents
          carefully. {name} is an AMFI-registered mutual fund distributor.
        </S.Bio>
      </S.Wrap>
    </S.Section>
  )
}
