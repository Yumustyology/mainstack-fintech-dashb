import { useEffect, useState } from 'react'

export default function useHeaderOffset(): string {
  const [offset, setOffset] = useState('0px')

  useEffect(() => {
    const setHeaderOffset = () => {
      const header = document.querySelector('.header-nav') as HTMLElement | null
      if (!header) {
        setOffset('0px')
        return
      }
      const rect = header.getBoundingClientRect()
      setOffset(`${rect.bottom}px`)
    }

    setHeaderOffset()
    window.addEventListener('resize', setHeaderOffset)

    return () => window.removeEventListener('resize', setHeaderOffset)
  }, [])

  return offset
}
