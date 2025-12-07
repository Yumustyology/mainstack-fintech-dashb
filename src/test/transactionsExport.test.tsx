import { vi, describe, it, beforeEach, expect } from 'vitest'

import { exportTransactionsCsv } from '@/lib/exportCsv'

const TXS = [
  { payment_reference: 't1', date: '2025-12-01T12:00:00Z', type: 'typeA', status: 'ok', metadata: {} },
  { payment_reference: 't2', date: '2025-11-01T12:00:00Z', type: 'typeB', status: 'ok', metadata: {} },
]

describe('Transactions export', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('generates a CSV blob and triggers a download when Export clicked', async () => {
    let createdBlob: Blob | null = null
    const originalCreateObjectURL = URL.createObjectURL
    const originalRevokeObjectURL = URL.revokeObjectURL
    
    const createObjectURL = vi.fn((b: Blob) => {
      createdBlob = b
      return 'blob:fake'
    })
    
    URL.createObjectURL = createObjectURL as any
    URL.revokeObjectURL = vi.fn()

    let appendedEl: HTMLAnchorElement | null = null
    const appendSpy = vi.spyOn(document.body, 'appendChild').mockImplementation((el) => {
      appendedEl = el as HTMLAnchorElement
      return el
    })
    const removeSpy = vi.spyOn(document.body, 'removeChild').mockImplementation((el) => el)

    // Call the util directly to generate CSV and trigger download
    exportTransactionsCsv(TXS)

    expect(createObjectURL).toHaveBeenCalled()

    expect(createdBlob).toBeInstanceOf(Blob)
    
    // Read blob content using FileReader for better test environment compatibility
    const csvText = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(reader.error)
      reader.readAsText(createdBlob!)
    })
    
    expect(csvText).toContain('payment_reference,date,amount,type,status,metadata')
    expect(csvText).toContain('t1')

    expect(appendSpy).toHaveBeenCalled()
    expect(appendedEl).toBeTruthy()
    expect(appendedEl!.download).toMatch(/^transactions-\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}\.csv$/)

    // cleanup
    URL.createObjectURL = originalCreateObjectURL
    URL.revokeObjectURL = originalRevokeObjectURL
    appendSpy.mockRestore()
    removeSpy.mockRestore()
  })
})