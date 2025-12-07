import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import DateSelect from '@/components/atoms/DateSelect'

describe('DateSelect', () => {
  it('displays formatted value when value prop is provided', () => {
    render(<DateSelect id="d1" value={'2025-12-01'} />)
    // formatted date uses long month and 2-digit day
    expect(screen.getByDisplayValue(/December 01, 2025/)).toBeInTheDocument()
  })

  it('calls onChange when typing a valid date', () => {
    const onChange = vi.fn()
    render(<DateSelect id="d2" value={''} onChange={onChange} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.change(input, { target: { value: '12/07/2025' } })

    // onChange should be called with an ISO date string (yyyy-mm-dd)
    expect(onChange).toHaveBeenCalled()
    const calledWith = onChange.mock.calls[0][0]
    expect(typeof calledWith).toBe('string')
    expect(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(calledWith)).toBe(true)
  })
})
