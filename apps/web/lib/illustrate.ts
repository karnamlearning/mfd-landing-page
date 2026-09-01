import type { ReadyToolId } from "@mfd/schema"

export type ToolInputs = Record<string, number>
export type ToolPoint = { year: number; value: number }
export type ToolResult = {
  invested: number
  value: number
  monthly?: number
  amount?: number
  corpus?: number
  remaining?: number
  withdrawn?: number
  points: ToolPoint[]
}

function round(n: number) {
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.round(n)
}

function yearlyPoints(start: number, grow: (value: number, year: number) => number, years: number): ToolPoint[] {
  const points: ToolPoint[] = [{ year: 0, value: round(start) }]
  let v = start
  const n = Math.min(Math.max(years, 1), 40)
  for (let y = 1; y <= n; y++) {
    v = grow(v, y)
    points.push({ year: y, value: round(v) })
  }
  return points
}

function sipFv(monthly: number, years: number, annualPct: number) {
  const r = annualPct / 100 / 12
  const n = years * 12
  if (r === 0) return monthly * n
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
}

function sipPmt(fv: number, years: number, annualPct: number) {
  const r = annualPct / 100 / 12
  const n = years * 12
  if (n <= 0) return 0
  if (r === 0) return fv / n
  return fv / (((Math.pow(1 + r, n) - 1) / r) * (1 + r))
}

export function illustrate(id: ReadyToolId, raw: ToolInputs): ToolResult {
  const n = (k: string, fallback: number) => {
    const v = Number(raw[k])
    return Number.isFinite(v) ? v : fallback
  }

  if (id === "sip") {
    const monthly = Math.max(n("monthly", 10000), 0)
    const years = Math.min(Math.max(n("years", 15), 1), 40)
    const rate = Math.min(Math.max(n("rate", 12), 0), 30)
    const value = sipFv(monthly, years, rate)
    const invested = monthly * years * 12
    const r = rate / 100 / 12
    return {
      invested: round(invested),
      value: round(value),
      monthly: round(monthly),
      points: yearlyPoints(0, (v, y) => {
        for (let m = 0; m < 12; m++) v = (v + monthly) * (1 + r)
        return v
      }, years),
    }
  }

  if (id === "lumpsum") {
    const amount = Math.max(n("amount", 100000), 0)
    const years = Math.min(Math.max(n("years", 10), 1), 40)
    const rate = Math.min(Math.max(n("rate", 12), 0), 30)
    const value = amount * Math.pow(1 + rate / 100, years)
    return {
      invested: round(amount),
      value: round(value),
      amount: round(amount),
      points: yearlyPoints(amount, (v) => v * (1 + rate / 100), years),
    }
  }

  if (id === "goal_sip") {
    const target = Math.max(n("target", 5000000), 0)
    const years = Math.min(Math.max(n("years", 15), 1), 40)
    const rate = Math.min(Math.max(n("rate", 12), 0), 30)
    const monthly = sipPmt(target, years, rate)
    const invested = monthly * years * 12
    return {
      invested: round(invested),
      value: round(sipFv(monthly, years, rate)),
      monthly: round(monthly),
      points: [],
    }
  }

  if (id === "retirement") {
    const expense = Math.max(n("expense", 50000), 0)
    const years = Math.min(Math.max(n("years", 20), 1), 40)
    const inflation = Math.min(Math.max(n("inflation", 6), 0), 20)
    const rate = Math.min(Math.max(n("rate", 12), 0), 30)
    const futureExpense = expense * Math.pow(1 + inflation / 100, years)
    const corpus = futureExpense * 12 * 20
    const monthly = sipPmt(corpus, years, rate)
    return {
      invested: round(monthly * years * 12),
      value: round(corpus),
      monthly: round(monthly),
      corpus: round(corpus),
      points: [],
    }
  }

  if (id === "swp") {
    const corpus = Math.max(n("corpus", 5000000), 0)
    const monthly = Math.max(n("monthly", 30000), 0)
    const years = Math.min(Math.max(n("years", 15), 1), 40)
    const rate = Math.min(Math.max(n("rate", 8), 0), 30)
    const r = rate / 100 / 12
    let remaining = corpus
    let withdrawn = 0
    const nMonths = years * 12
    for (let i = 0; i < nMonths; i++) {
      remaining = remaining * (1 + r) - monthly
      if (remaining < 0) {
        withdrawn += monthly + remaining
        remaining = 0
        break
      }
      withdrawn += monthly
    }
    return {
      invested: round(corpus),
      value: round(remaining),
      remaining: round(remaining),
      withdrawn: round(withdrawn),
      monthly: round(monthly),
      corpus: round(corpus),
      points: [],
    }
  }

  if (id === "inflation") {
    const amount = Math.max(n("amount", 100000), 0)
    const years = Math.min(Math.max(n("years", 10), 1), 40)
    const inflation = Math.min(Math.max(n("inflation", 6), 0), 20)
    const value = amount * Math.pow(1 + inflation / 100, years)
    return {
      invested: round(amount),
      value: round(value),
      amount: round(amount),
      points: yearlyPoints(amount, (v) => v * (1 + inflation / 100), years),
    }
  }

  if (id === "compounding") {
    const amount = Math.max(n("amount", 100000), 0)
    const years = Math.min(Math.max(n("years", 10), 1), 40)
    const rate = Math.min(Math.max(n("rate", 12), 0), 30)
    const value = amount * Math.pow(1 + rate / 100, years)
    return {
      invested: round(amount),
      value: round(value),
      amount: round(amount),
      points: yearlyPoints(amount, (v) => v * (1 + rate / 100), years),
    }
  }

  if (id === "sip_stepup") {
    const start = Math.max(n("monthly", 10000), 0)
    const years = Math.min(Math.max(n("years", 15), 1), 40)
    const rate = Math.min(Math.max(n("rate", 12), 0), 30)
    const stepup = Math.min(Math.max(n("stepup", 10), 0), 50)
    const r = rate / 100 / 12
    let value = 0
    let invested = 0
    let monthly = start
    const points: ToolPoint[] = [{ year: 0, value: 0 }]
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        value = (value + monthly) * (1 + r)
        invested += monthly
      }
      points.push({ year: y, value: round(value) })
      monthly *= 1 + stepup / 100
    }
    return { invested: round(invested), value: round(value), monthly: round(start), points }
  }

  // lumpsum_target
  const target = Math.max(n("target", 5000000), 0)
  const years = Math.min(Math.max(n("years", 10), 1), 40)
  const rate = Math.min(Math.max(n("rate", 12), 0), 30)
  const amount = target / Math.pow(1 + rate / 100, years)
  return {
    invested: round(amount),
    value: round(target),
    amount: round(amount),
    points: [],
  }
}

export async function runTool(id: ReadyToolId, inputs: ToolInputs): Promise<ToolResult> {
  const base = process.env.TOOLS_API_BASE
  const key = process.env.TOOLS_API_KEY
  if (base) {
    try {
      const res = await fetch(`${base.replace(/\/$/, "")}/tools/${id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(key ? { authorization: `Bearer ${key}` } : {}),
        },
        body: JSON.stringify(inputs),
      })
      if (res.ok) {
        const data = (await res.json()) as Partial<ToolResult>
        if (typeof data.invested === "number" && typeof data.value === "number") {
          return {
            invested: round(data.invested),
            value: round(data.value),
            monthly: data.monthly,
            amount: data.amount,
            corpus: data.corpus,
            remaining: data.remaining,
            withdrawn: data.withdrawn,
            points: Array.isArray(data.points) ? data.points : [],
          }
        }
      }
    } catch (err) {
      console.warn("[tools] upstream", id, err)
    }
  }
  return illustrate(id, inputs)
}
