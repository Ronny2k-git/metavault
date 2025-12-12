import { useApproveToken } from '@/modules/global/hooks'
import { vaultInteractionAbi } from '@/modules/global/utils/vaultInteractionAbi'
import { wagmiAppConfig } from '@/modules/wallet-connection/wagmi'
import { useState } from 'react'
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
  messages: {
    approve: string
    simulate: string
    withdraw: string
    success: string
  }
}

export function useWithdraw({ onError, onSuccess, messages }: useWithdrawStateProps) {
  const [status, setStatus] = useState('')
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
      setStatus(messages.approve)

      const approveHash = await approve({ amount, tokenAddress, spenderAddress })

      await waitForTransactionReceipt(wagmiAppConfig, {
        hash: approveHash,
        chainId: sepolia.id,
      })

      // 2. Simulate transaction to verify errors
      setStatus(messages.simulate)
      const simulation = await simulateContract(wagmiAppConfig, {
        ...configParams,
        functionName: 'withdraw',
        args: [amount],
      })

      // 3. Wait transaction to be confirmed
      setStatus(messages.withdraw)
      const txHash = await writeContractAsync(simulation.request)

      await waitForTransactionReceipt(wagmiAppConfig, {
        hash: txHash,
        chainId: sepolia.id,
      })

      setStatus(messages.success)
      onSuccess?.()
      setTimeout(() => {
        setStatus('')
      }, 1500)
      return { hash: txHash }
    } catch (error) {
      setStatus('')
      console.error('Errow withdraw...', error)
      onError?.()
    }
  }

  return { withdraw, status }
}
