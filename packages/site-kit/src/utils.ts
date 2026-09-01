export function waHref(raw: string) {
  const digits = raw.replace(/\D/g, "")
  const n = digits.length === 10 ? `91${digits}` : digits
  return `https://wa.me/${n}`
}

export function inr(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n)
}

export function sipFuture(monthly: number, years: number, annualPct: number) {
  const r = annualPct / 100 / 12
  const n = years * 12
  if (r === 0) return monthly * n
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name
}
