'use client'

import { formatUnits } from 'viem'
import { useConnection, useBalance } from 'wagmi'

export const WalletBalance = () => {
    const { address, isConnected } = useConnection()
    const { data } = useBalance({ address })

    if (!isConnected) return null

    return (
        <div className="text-center mb-8 p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 transition-all hover:scale-[1.02]">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Total Balance</h3>
            <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl font-bold text-brand-primary">
                    {data ? parseFloat(formatUnits(data.value, data.decimals)).toFixed(4) : '0.0000'}
                </span>
                <span className="text-xl font-semibold text-brand-secondary">
                    {data?.symbol}
                </span>
            </div>
        </div>
    )
}
