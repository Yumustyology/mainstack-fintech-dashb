import type { Transaction } from '@/lib/types/api'
import { fromSnake } from './string'

type Option = { value: string; label: string }

export function deriveTypeOptions(
  transactions: Transaction[] | undefined,
  fallback: Option[] = []
): Option[] {
  const set = new Set<string>()
  transactions?.forEach((t) => {
    if (t.metadata && typeof t.metadata.type === 'string') set.add(t.metadata.type)
    if (t.type) set.add(String(t.type))
  })
  if (set.size === 0) return fallback
  return Array.from(set).map((v) => ({ value: v, label: fromSnake(v) }))
}

export function deriveStatusOptions(
  transactions: Transaction[] | undefined,
  fallback: Option[] = []
): Option[] {
  const set = new Set<string>()
  transactions?.forEach((t) => {
    if (t.status) set.add(String(t.status))
  })
  if (set.size === 0) return fallback
  return Array.from(set).map((v) => ({ value: v, label: fromSnake(v) }))
}

export default { deriveTypeOptions, deriveStatusOptions }

export const FALLBACK_TYPE_OPTIONS: Option[] = [
  { value: "store_transactions", label: "Store Transactions" },
  { value: "get_tipped", label: "Get Tipped" },
  { value: "withdrawals", label: "Withdrawals" },
  { value: "chargebacks", label: "Chargebacks" },
  { value: "cashbacks", label: "Cashbacks" },
  { value: "refer_earn", label: "Refer & Earn" },
];

export const FALLBACK_STATUS_OPTIONS: Option[] = [
  { value: "successful", label: "Successful" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];
