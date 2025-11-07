import { useApproveToken } from '@/modules/global/hooks'
import { vaultInteractionAbi } from '@/modules/global/utils/vaultInteractionAbi'
import { wagmiAppConfig } from '@/modules/wallet-connection/wagmi'
import type { Address } from 'viem'
import { sepolia } from 'viem/chains'
import { useWriteContract } from 'wagmi'
import { simulateContract, waitForTransactionReceipt } from 'wagmi/actions'

export type useDepositProps = {
  amount: bigint
  tokenAddress: Address
  spenderAddress: Address
}

export function useDeposit() {
  const { writeContractAsync } = useWriteContract()
  const { approve } = useApproveToken()

  const deposit = async ({ amount, tokenAddress, spenderAddress }: useDepositProps) => {
    const configParams = {
      abi: vaultInteractionAbi,
      address: spenderAddress, // Vault address
      chainId: sepolia.id,
    }

    try {
      // 1. Approve token hash to spend with the vault contract
      console.log('⏳ Approving token...')
      const approveHash = await approve({ amount, spenderAddress, tokenAddress })

      await waitForTransactionReceipt(wagmiAppConfig, {
        hash: approveHash,
        chainId: sepolia.id,
      })
      console.log('✅ Token approved!')

      console.log('🧪 Simulating deposit...')
      const simulation = await simulateContract(wagmiAppConfig, {
        ...configParams,
        functionName: 'deposit',
        args: [amount],
      })

      // const tx = await writeContractAsync(simulation.request)

      // await waitForTransactionReceipt(wagmiAppConfig, {
      //   hash: tx,
      //   chainId: sepolia.id,
      // })

      console.log('✅ Vault Deposit simulated successfully!')
      console.log('Result:', simulation.result)
      console.log('Request:', simulation.request)
    } catch (error) {
      console.error('❌ Error Depositing:', error)
    }
  }

  return { deposit }
}
