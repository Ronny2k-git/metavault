import { useApproveToken } from '@/modules/global/hooks'
import { vaultInteractionAbi } from '@/modules/global/utils/vaultInteractionAbi'
import { wagmiAppConfig } from '@/modules/wallet-connection/wagmi'
import type { Address } from 'viem'
import { sepolia } from 'viem/chains'
import { simulateContract, waitForTransactionReceipt } from 'wagmi/actions'

type useWithdrawProps = {
  tokenAddress: Address
  spenderAddress: Address
  amount: bigint
}

export function useWithdraw() {
  const { approve } = useApproveToken()

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

      // 2. Simulate transaction to verify errors
      console.log('🧪 Simulating deposit...')
      const simulation = await simulateContract(wagmiAppConfig, {
        ...configParams,
        functionName: 'deposit',
        args: [amount],
      })

      // 3. Wait transaction to be confirmed
      // console.log('🧪 Waiting user confirmation...')
      // const tx = await writeContractAsync(simulation.request)

      // await waitForTransactionReceipt(wagmiAppConfig, {
      //   hash: tx,
      //   chainId: sepolia.id,
      // })

      console.log('✅ Vault Withdraw simulated successfully!')
      console.log('Result:', simulation.result)
      console.log('Request:', simulation.request)
    } catch (error) {
      console.error('Errow withdraw...', error)
    }
  }

  return { withdraw }
}
