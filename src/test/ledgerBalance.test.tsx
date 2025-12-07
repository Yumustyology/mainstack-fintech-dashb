import React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import { vi } from 'vitest'

import * as actions from '@/lib/actions'
import LedgerBalance from '@/components/molecules/LedgerBalance'

describe('LedgerBalance', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders wallet values from getWallet', async () => {
    const mock = vi.spyOn(actions, 'getWallet').mockResolvedValue({
      balance: 750.56,
      total_payout: 500,
      total_revenue: 1250.56,
      pending_payout: 0,
      ledger_balance: 500,
    })

    render(<LedgerBalance />)

    // ledger balance should show $500.00 (ledger_balance)
    await waitFor(() => expect(screen.getByText(/Ledger Balance/i)).toBeInTheDocument())
    const ledgerLabel = screen.getByText(/Ledger Balance/i)
    const ledgerContainer = ledgerLabel.parentElement?.parentElement
    expect(ledgerContainer).toBeTruthy()
    if (ledgerContainer) {
      expect(within(ledgerContainer).getByText(/500.00/)).toBeInTheDocument()
    }

    // total payout - locate by its label to avoid ambiguous matches
    const payoutLabel = screen.getByText(/Total Payout/i)
    const payoutContainer = payoutLabel.parentElement?.parentElement
    expect(payoutContainer).toBeTruthy()
    if (payoutContainer) {
      expect(within(payoutContainer).getByText(/500.00/)).toBeInTheDocument()
    }

    // total revenue
    const revenueLabel = screen.getByText(/Total Revenue/i)
    const revenueContainer = revenueLabel.parentElement?.parentElement
    expect(revenueContainer).toBeTruthy()
    if (revenueContainer) {
      expect(within(revenueContainer).getByText(/1,250.56/)).toBeInTheDocument()
    }

    mock.mockRestore()
  })
})
