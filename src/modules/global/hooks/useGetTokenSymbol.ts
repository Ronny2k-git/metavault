import { wagmiAppConfig } from '@/modules/wallet-connection/wagmi'
import type { Address } from 'viem'
import { erc20Abi } from 'viem'
import { readContract } from 'wagmi/actions'

export function useGetTokenSymbol() {
  const getTokenSymbol = async (tokenAddress: Address) => {
    const name = await readContract(wagmiAppConfig, {
      abi: erc20Abi,
      address: tokenAddress,
      functionName: 'symbol',
    })

    return name
  }

  return { getTokenSymbol }
}
