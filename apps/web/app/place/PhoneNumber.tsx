"use client"

import type { ChangeEvent } from "react"
import * as U from "./styles"

export function PhoneNumber({
  value,
  onChange,
  placeholder = "98765 43210",
  autoComplete = "tel",
  white,
  "aria-label": ariaLabel,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoComplete?: string
  white?: boolean
  "aria-label"?: string
}) {
  function handle(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value.replace(/\D/g, "").slice(0, 10))
  }

  return (
    <U.PhoneField $white={white}>
      <U.PhonePrefix>+91</U.PhonePrefix>
      <U.PhoneInput
        type="tel"
        inputMode="numeric"
        autoComplete={autoComplete}
        maxLength={10}
        value={value}
        onChange={handle}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
    </U.PhoneField>
  )
}
