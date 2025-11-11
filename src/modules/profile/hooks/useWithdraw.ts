import { useApproveToken } from '@/modules/global/hooks'
import { vaultInteractionAbi } from '@/modules/global/utils/vaultInteractionAbi'
import { wagmiAppConfig } from '@/modules/wallet-connection/wagmi'
import type { Address } from 'viem'
import { sepolia } from 'viem/chains'
import { useWriteContract } from 'wagmi'
import { simulateContract, waitForTransactionReceipt } from 'wagmi/actions'

type useWithdrawProps = {
  tokenAddress: Address
  spenderAddress: Address
  amount: bigint
}

type useWithdrawStateProps = {
  onError?: VoidFunction
  onSuccess?: VoidFunction
}

export function useWithdraw({ onError, onSuccess }: useWithdrawStateProps) {
  const { approve } = useApproveToken()
  const { writeContractAsync } = useWriteContract()

  const withdraw = async ({ amount, tokenAddress, spenderAddress }: useWithdrawProps) => {
    const configParams = {
      abi: vaultInteractionAbi,
      address: spenderAddress, // Vault address
      chainId: sepolia.id,
    }

    try {
      // 1. Approve token hash to spend with the vault contract
      console.log('⏳ Approving token...')
      const approveHash = await approve({ amount, tokenAddress, spenderAddress })

      await waitForTransactionReceipt(wagmiAppConfig, {
        hash: approveHash,
        chainId: sepolia.id,
      })
      console.log('✅ Token approved!')

      // 2. Simulate transaction to verify errors
      console.log('🧪 Simulating deposit...')
      const simulation = await simulateContract(wagmiAppConfig, {
        ...configParams,
        functionName: 'withdraw',
        args: [amount],
      })

      // 3. Wait transaction to be confirmed
      console.log('🧪 Waiting user confirmation...')
      const txHash = await writeContractAsync(simulation.request)

      await waitForTransactionReceipt(wagmiAppConfig, {
        hash: txHash,
        chainId: sepolia.id,
      })

      console.log('✅ Vault Withdraw created successfully!')
      console.log('Result:', txHash)
      onSuccess?.()

      return { hash: txHash }
    } catch (error) {
      console.error('Errow withdraw...', error)
      onError?.()
    }
  }

  return { withdraw }
}
