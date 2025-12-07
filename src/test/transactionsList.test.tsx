import { render, screen, waitFor, act } from '@testing-library/react'
import { vi } from 'vitest'
import * as actions from '@/lib/actions'
import type { Transaction } from '@/lib/types/api'
import TransactionsList from '@/components/molecules/TransactionsList'
import { setTransactionsFilter, resetTransactionsFilter } from '@/lib/entities/transactions.entity'

const TXS: Transaction[] = [
  { payment_reference: 't1', date: '2025-12-01T12:00:00Z', type: 'typeA', status: 'ok', metadata: {} } as Transaction,
  { payment_reference: 't2', date: '2025-11-01T12:00:00Z', type: 'typeB', status: 'ok', metadata: {} } as Transaction,
]

describe('TransactionsList', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders transactions and updates when filter applied', async () => {
    vi.spyOn(actions, 'getTransactions').mockResolvedValue(TXS)
    render(<TransactionsList />)

    // wait for items to render (specifically the header with count)
    await waitFor(() => expect(screen.getByText(/2 Transactions/)).toBeInTheDocument())

    // apply a type filter to only show typeA
    act(() => {
      setTransactionsFilter({ type: 'typeA', status: 'all', from: null, to: null })
    })

    await waitFor(() => expect(screen.getByText(/1 Transactions/)).toBeInTheDocument())

    // reset filters
    act(() => {
      resetTransactionsFilter()
    })
    await waitFor(() => expect(screen.getByText(/2 Transactions/)).toBeInTheDocument())
  })
})
