import type { Config } from 'wagmi'
import { createConfig, http, injected } from 'wagmi'
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains'
import { metaMask, safe } from 'wagmi/connectors'

export const wagmiAppConfig: Config = createConfig({
  chains: [mainnet, sepolia, base],
  connectors: [injected(), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(
      'https://eth-mainnet.g.alchemy.com/v2/tjpt7a_-Hkd4t7MG-0SuM542HkoIGvfg',
    ),
    [sepolia.id]: http(
      'https://eth-sepolia.g.alchemy.com/v2/tjpt7a_-Hkd4t7MG-0SuM542HkoIGvfg',
    ),
    [base.id]: http(
      'https://base-mainnet.g.alchemy.com/v2/tjpt7a_-Hkd4t7MG-0SuM542HkoIGvfg',
    ),
    [polygon.id]: http(
      'https://polygon-mainnet.g.alchemy.com/v2/tjpt7a_-Hkd4t7MG-0SuM542HkoIGvfg',
    ),
    [optimism.id]: http(
      'https://opitimis-mainnet.g.alchemy.com/v2/tjpt7a_-Hkd4t7MG-0SuM542HkoIGvfg',
    ),
    [arbitrum.id]: http(
      'https://arbitrum-mainnet.g.alchemy.com/v2/tjpt7a_-Hkd4t7MG-0SuM542HkoIGvfg',
    ),
  },
})
