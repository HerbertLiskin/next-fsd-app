'use client'

import { useAppKit } from '@reown/appkit/react'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'

export const ConnectButton = () => {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-32 h-10 bg-gray-200 rounded animate-pulse" />

  if (isConnected) {
     return (
        <button onClick={() => open()} className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-opacity-90 transition-colors">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </button>
     )
  }

  return (
    <button onClick={() => open()} className="px-4 py-2 bg-brand-secondary text-white rounded hover:bg-opacity-90 transition-colors">
      Connect Wallet
    </button>
  )
}
