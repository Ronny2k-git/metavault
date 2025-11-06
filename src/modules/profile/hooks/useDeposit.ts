import { vaultInteractionAbi } from '@/modules/global/utils/vaultInteractionAbi'
import { wagmiAppConfig } from '@/modules/wallet-connection/wagmi'
import type { Address } from 'viem'
import { erc20Abi } from 'viem'
import { sepolia } from 'viem/chains'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

type approveProps = {
  amount: bigint
  tokenAddress: Address
  spenderAddress: Address
}

export function useDeposit({ amount, tokenAddress, spenderAddress }: approveProps) {
  const approveToken = async () =>
    await writeContract(wagmiAppConfig, {
      abi: erc20Abi,
      address: tokenAddress,
      functionName: 'approve',
      chainId: sepolia.id,
      args: [spenderAddress, amount],
    })

  const deposit = async () => {
    const configParams = {
      abi: vaultInteractionAbi,
      address: spenderAddress, // Vault address
      chainId: sepolia.id,
    }

    try {
      console.log('⏳ Approving token...')
      const approveHash = await approveToken()

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

      console.log('✅ Vault Deposit simulated successfully!')
      console.log('Result:', simulation.result)
      console.log('Request:', simulation.request)
    } catch (error) {
      console.error('❌ Error Depositing:', error)
    }
  }

  return { deposit }
}
