import type { Address } from 'viem'
import { sepolia } from 'viem/chains'
import { useAccount, useReadContract } from 'wagmi'
import { vaultInteractionAbi } from '../utils/vaultInteractionAbi'

export function useGetVaultBalance(vaultAddress: Address) {
  const { address } = useAccount()

  return useReadContract({
    abi: vaultInteractionAbi,
    address: vaultAddress,
    functionName: 'deposited',
    chainId: sepolia.id,
    args: [address as Address],
    query: {
      enabled: !!address,
    },
  })
}
