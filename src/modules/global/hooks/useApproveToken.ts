import { wagmiAppConfig } from '@/modules/wallet-connection/wagmi'
import type { Address } from 'viem'
import { erc20Abi } from 'viem'
import { sepolia } from 'viem/chains'
import { writeContract } from 'wagmi/actions'

type useApproveTokenProps = {
  amount: bigint
  tokenAddress: Address
  spenderAddress: Address
}

export function useApproveToken() {
  const approve = async (data: useApproveTokenProps) => {
    try {
      const tx = await writeContract(wagmiAppConfig, {
        abi: erc20Abi,
        address: data.tokenAddress,
        functionName: 'approve',
        chainId: sepolia.id,
        args: [data.spenderAddress, data.amount],
      })

      return tx
    } catch (error) {
      console.error('Error approving token:', error)
      throw error
    }
  }
  return { approve }
}
