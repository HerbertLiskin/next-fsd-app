'use client'

import { formatUnits } from 'viem'
import { useConnection, useBalance } from 'wagmi'

export const WalletBalance = () => {
  const { address, isConnected } = useConnection()
  const { data } = useBalance({ address })

  if (!isConnected) return null

  return (
    <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-lg transition-all hover:scale-[1.02] dark:border-neutral-800 dark:bg-neutral-900">
      <h3 className="mb-2 text-sm font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
        Total Balance
      </h3>
      <div className="flex items-baseline justify-center gap-2">
        <span className="text-brand-primary text-4xl font-bold">
          {data
            ? parseFloat(formatUnits(data.value, data.decimals)).toFixed(4)
            : '0.0000'}
        </span>
        <span className="text-brand-secondary text-xl font-semibold">
          {data?.symbol}
        </span>
      </div>
    </div>
  )
}
