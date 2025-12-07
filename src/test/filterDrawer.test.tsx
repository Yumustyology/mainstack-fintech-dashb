import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import FilterDrawer from '@/components/molecules/FilterDrawer'
import * as entity from '@/lib/entities/transactions.entity'

describe('FilterDrawer', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    if (typeof window.matchMedia !== 'function') {
      window.matchMedia = (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      })
    }
  })

  it('applies preset and calls setTransactionsFilter when Apply clicked', async () => {
    const setTransactionsFilter = vi.spyOn(entity, 'setTransactionsFilter')
    render(<FilterDrawer />)

    const trigger = screen.getByRole('button', { name: /filter/i })
    fireEvent.click(trigger)

    // click first preset button
    const presetBtn = await screen.findByRole("button", { name: /today/i });
    fireEvent.click(presetBtn);

    // Apply should be present and enabled
    const apply = screen.getByRole('button', { name: /apply/i })
    fireEvent.click(apply)

    expect(setTransactionsFilter).toHaveBeenCalled()
  })

  it('calls resetTransactionsFilter when Clear clicked', async () => {
    const resetTransactionsFilter = vi.spyOn(entity, 'resetTransactionsFilter')
    render(<FilterDrawer />)

    const trigger = screen.getByRole('button', { name: /filter/i })
    fireEvent.click(trigger)

    const clear = await screen.findByText(/^Clear$/i)
    fireEvent.click(clear)

    expect(resetTransactionsFilter).toHaveBeenCalled()
  })
})
