import { cookieStorage, createStorage } from 'wagmi'
import {
  mainnet,
  bsc,
  arbitrum,
  sepolia,
  bscTestnet,
  arbitrumSepolia,
} from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'YOUR_PROJECT_ID'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

const enableTestnets = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'

export const networks = enableTestnets
  ? [sepolia, bscTestnet, arbitrumSepolia]
  : [mainnet, bsc, arbitrum]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
})

export const config = wagmiAdapter.wagmiConfig
