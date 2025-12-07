import React from 'react'

type Props = {
  rows?: number
}

const TransactionShimmer: React.FC<Props> = ({ rows = 3 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-start justify-between animate-pulse" style={{ animation: 'var(--animate-pulse)' }}>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div className="w-40 h-4 bg-gray-200 rounded" />
          </div>
          <div className="w-24 h-4 bg-gray-200 rounded" />
        </div>
      ))}
    </>
  )
}

export default TransactionShimmer