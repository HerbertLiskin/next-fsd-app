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

  if (!mounted)
    return <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />

  if (isConnected) {
    return (
      <button
        onClick={() => open()}
        className="bg-brand-primary hover:bg-opacity-90 rounded px-4 py-2 text-white transition-colors"
      >
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </button>
    )
  }

  return (
    <button
      onClick={() => open()}
      className="bg-brand-secondary hover:bg-opacity-90 rounded px-4 py-2 text-white transition-colors"
    >
      Connect Wallet
    </button>
  )
}
