import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import * as actions from '@/lib/actions'
import WalletBalance from '@/components/molecules/WalletBalance'

describe('WalletBalance', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the available balance from getWallet', async () => {
    const mock = vi.spyOn(actions, 'getWallet').mockResolvedValue({
      balance: 750.56,
      total_payout: 500,
      total_revenue: 1250.56,
      pending_payout: 0,
      ledger_balance: 500,
    })

    render(<WalletBalance />)

    // Title
    expect(await screen.findByText(/Available Balance/i)).toBeInTheDocument()

    // Formatted balance (uses formatUSD -> "USD 750.56")
    expect(await screen.findByText(/USD 750.56/)).toBeInTheDocument()

    mock.mockRestore()
  })
})
