"use client"

import styled from "styled-components"

const Img = styled.img<{ $h: number }>`
  display: block;
  height: ${({ $h }) => $h}px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
`

const HEIGHT = { sm: 28, md: 40, lg: 52 } as const

export function BrandLogo({
  src,
  size = "md",
}: {
  src: string
  size?: keyof typeof HEIGHT
}) {
  return <Img src={src} alt="Advisorkhoj" $h={HEIGHT[size]} />
}
