export type PresetKey = 'today' | 'last7' | 'month' | 'last3'

export const toISODate = (d: Date): string => d.toISOString().slice(0, 10)

export const presets: { key: PresetKey; label: string; range: () => [string, string] }[] = [
  {
    key: 'today',
    label: 'Today',
    range: () => {
      const t = new Date()
      return [toISODate(t), toISODate(t)]
    },
  },
  {
    key: 'last7',
    label: 'Last 7 days',
    range: () => {
      const to = new Date()
      const from = new Date()
      from.setDate(to.getDate() - 6)
      return [toISODate(from), toISODate(to)]
    },
  },
  {
    key: 'month',
    label: 'This month',
    range: () => {
      const to = new Date()
      const from = new Date(to.getFullYear(), to.getMonth(), 1)
      return [toISODate(from), toISODate(to)]
    },
  },
  {
    key: 'last3',
    label: 'Last 3 months',
    range: () => {
      const to = new Date()
      const from = new Date(to.getFullYear(), to.getMonth() - 2, 1)
      return [toISODate(from), toISODate(to)]
    },
  },
]

export function getDateRangeFromPreset(preset?: PresetKey | string): { from: Date | null; to: Date | null } {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  switch (preset) {
    case 'today':
      return { from: today, to: now }
    case 'last7': {
      const last7 = new Date(today)
      last7.setDate(last7.getDate() - 7)
      return { from: last7, to: now }
    }
    case 'month': {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      return { from: monthStart, to: now }
    }
    case 'last3': {
      const last3Months = new Date(today)
      last3Months.setMonth(last3Months.getMonth() - 3)
      return { from: last3Months, to: now }
    }
    default:
      return { from: null, to: null }
  }
}

export default { presets, getDateRangeFromPreset, toISODate }
