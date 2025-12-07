"use client"

import React, { useMemo } from 'react'
import useSWR from 'swr'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from 'recharts'

import { getTransactions } from '@/lib/actions'
import type { Transaction as Tx } from '@/lib/types/api'

type Props = {
  className?: string
}

const fetcher = async (): Promise<Tx[]> => {
  return getTransactions()
}

function formatLabel(dateStr: string) {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  } catch {
    return dateStr
  }
}

function groupByDate(data: Tx[]) {
  const map = new Map<string, number>()
  data.forEach((t) => {
    const key = t.date
    const prev = map.get(key) ?? 0
    map.set(key, prev + (t.amount ?? 0))
  })
  const arr = Array.from(map.entries()).map(([date, amount]) => ({ date, amount }))
  arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  return arr
}

type ChartDatum = { date: string; amount: number }

type TooltipRendererProps = {
  active?: boolean
  label?: string | number
  payload?: Array<{ payload: ChartDatum; dataKey?: string; value?: number }>
}

const TooltipContent: React.FC<TooltipRendererProps> = (props) => {
  const { active, payload } = props
  if (!active || !payload || !payload.length) return null
  const data = payload[0].payload
  return (
    <div className="bg-white border rounded-md p-2 text-sm shadow">
      <div className="font-medium">{formatLabel(data.date)}</div>
      <div className="text-xs text-gray-500">Total: {data.amount}</div>
    </div>
  )
}

const TransactionChart: React.FC<Props> = ({ className }) => {
  const { data, error, isLoading } = useSWR<Tx[]>('transactions', fetcher)

  const chartData = useMemo(() => {
    if (!data) return []
    return groupByDate(data as Tx[])
  }, [data])

  if (error) return <div className={className}>Failed to load transactions</div>

  return (
    <div className={className}>
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatLabel}
            />
            <Tooltip content={<TooltipContent />} cursor={false} />
            <Area
              dataKey="amount"
              type="natural"
              stroke="#ff7a45"
              fill="#ff7a45"
              fillOpacity={0.06}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {isLoading && <div className="text-sm text-gray-500 mt-2">Loading...</div>}
      {!isLoading && (!chartData || chartData.length === 0) && (
        <div className="text-sm text-gray-500 mt-2">No transactions</div>
      )}
    </div>
  )
}

export default TransactionChart
