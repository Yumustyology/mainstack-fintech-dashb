export function formatUSD(value?: number | null): string {
  if (value === undefined || value === null) return 'USD 0.00'
  const formatted = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
  return `USD ${formatted}`
}

export default formatUSD
