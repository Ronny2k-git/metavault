import { wagmiAppConfig } from '@/modules/wallet-connection/wagmi'
import type { Address } from 'viem'
import { erc20Abi } from 'viem'
import { readContract } from 'wagmi/actions'

export function useGetTokenDecimals() {
  const getTokenDecimal = async (tokenAddress: Address) => {
    const decimals = await readContract(wagmiAppConfig, {
      abi: erc20Abi,
      address: tokenAddress,
      functionName: 'decimals',
    })

    return decimals
  }

  return { getTokenDecimal }
}
