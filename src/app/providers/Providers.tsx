'use client'

import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { projectId, wagmiAdapter, networks } from '../../shared/config/wagmi'
import { TRPCReactProvider } from '../../trpc/react'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

const metadata = {
  name: 'Next FSD App',
  description: 'Next.js FSD App with WalletConnect',
  url: 'https://example.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

// Initialize AppKit
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: networks as [any, ...any[]],
  defaultNetwork: networks[0],
  metadata: metadata,
  features: {
    analytics: true,
  },
})

export function Providers({
  children,
  cookies,
}: {
  children: ReactNode
  cookies: string | null
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  )

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </WagmiProvider>
  )
}
