"use client"

import { visibleToolIds, type TenantConfig, type ToolId } from "@mfd/schema"
import { copy, toolCopy, type Locale } from "./copy"
import { useChrome } from "./chrome-context"
import { Calculator } from "./Calculator"
import * as S from "./styles"

function loc(locale: Locale, config: TenantConfig) {
  return config.addons.includes("bilingual") ? locale : "en"
}

export function ToolsIndex({ config, locale = "en" }: { config: TenantConfig; locale?: Locale }) {
  const t = copy[loc(locale, config)]
  const ids = visibleToolIds(config)
  const hi = loc(locale, config) === "hi"

  return (
    <S.Section id="calculators" data-spot="calculators">
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

export function ToolBody({
  config,
  tool,
  locale = "en",
  preview,
}: {
  config: TenantConfig
  tool: string
  locale?: Locale
  preview?: boolean
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
        <div style={{ marginTop: "1.5rem" }}>
          <Calculator tool={tool as ToolId} config={config} t={t} preview={preview} />
        </div>
      </S.Wrap>
    </S.Section>
  )
}

export function ToolPlaceholder(props: {
  config: TenantConfig
  tool: string
  locale?: Locale
}) {
  return <ToolBody {...props} />
}

export function DisclosuresBody({ name, arn = "" }: { name: string; arn?: string }) {
  const chrome = useChrome()
  const t = chrome?.t ?? copy.en
  const displayName = chrome?.name || name
  const displayArn = (chrome?.arn || arn).trim()
  const paras = t.disclosuresBody(displayName, displayArn)

  return (
    <S.Section>
      <S.Wrap>
        <S.Kicker>{t.disclosures}</S.Kicker>
        <S.H2>{t.disclosuresTitle}</S.H2>
        {paras.map((p) => (
          <S.Bio key={p.slice(0, 40)} style={{ marginTop: "1rem" }}>
            {p}
          </S.Bio>
        ))}
      </S.Wrap>
    </S.Section>
  )
}
