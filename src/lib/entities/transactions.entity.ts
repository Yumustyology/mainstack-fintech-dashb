import { entity } from 'simpler-state'
import type { Transaction } from '@/lib/types/api'

export const transactionsEntity = entity<Transaction[]>([])

export type TransactionsFilter = {
  // preset shortcuts: 'today' | 'last7' | 'month' | 'last3' or undefined
  preset?: 'today' | 'last7' | 'month' | 'last3'
  // explicit date range (ISO yyyy-mm-dd)
  from?: string | null
  to?: string | null
  // type/status filters
  type?: string | 'all'
  status?: string | 'all'
}

export const transactionsFilterEntity = entity<TransactionsFilter>({ type: 'all', status: 'all' })

export const setTransactions = (tx: Transaction[]) => transactionsEntity.set(tx)
export const setTransactionsFilter = (f: TransactionsFilter) => transactionsFilterEntity.set(f)
export const getTransactionsFilter = () => transactionsFilterEntity.get()
export const resetTransactionsFilter = () => transactionsFilterEntity.set({ type: 'all', status: 'all', from: null, to: null, preset: undefined })

export default {
  transactionsEntity,
  transactionsFilterEntity,
  setTransactions,
  setTransactionsFilter,
  getTransactionsFilter,
  resetTransactionsFilter,
}
