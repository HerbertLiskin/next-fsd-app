'use client'

import { useAppKitNetwork } from '@reown/appkit/react'
import { useAccount } from 'wagmi'
import { networks } from '@/shared/config/wagmi'
import { useEffect, useState } from 'react'

export const NetworkSelect = () => {
  const { isConnected } = useAccount()
  const { caipNetwork, switchNetwork } = useAppKitNetwork()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isConnected) return null

  return (
    <div className="relative">
      <select
        value={caipNetwork?.id}
        onChange={(e) => {
           const network = networks.find(n => n.id === Number(e.target.value))
           if(network) switchNetwork(network)
        }}
        className="appearance-none bg-white/10 text-white border border-white/20 rounded-lg py-2 pl-4 pr-8 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-tertiary cursor-pointer"
        style={{
             backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
             backgroundRepeat: "no-repeat",
             backgroundPosition: "right 0.5rem center",
             backgroundSize: "1em"
        }}
      >
        {networks.map((network) => (
          <option key={network.id} value={network.id} className="text-black bg-white">
            {network.name}
          </option>
        ))}
      </select>
    </div>
  )
}
