import type { Transaction } from './types/api'

function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') {
    return `"${value.replace(/"/g, '""')}"`
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  try {
    const s = JSON.stringify(value)
    return `"${s.replace(/"/g, '""')}"`
  } catch (e) {
    return ''
  }
}

export function exportTransactionsCsv(items: Transaction[], filenamePrefix = 'transactions'): void {
  if (!items || items.length === 0) return

  const headers = ['payment_reference', 'date', 'amount', 'type', 'status', 'metadata']

  const rows = items.map((t) => {
    const meta = t.metadata ?? {}
    return [
      escapeCsvValue(t.payment_reference),
      escapeCsvValue(t.date),
      escapeCsvValue((t as Transaction).amount ?? ''),
      escapeCsvValue(t.type),
      escapeCsvValue(t.status),
      escapeCsvValue(meta),
    ].join(',')
  })

  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  const now = new Date()
  const ts = now.toISOString().slice(0, 19).replace(/[:T]/g, '-')
  a.download = `${filenamePrefix}-${ts}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default exportTransactionsCsv
