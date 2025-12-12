import { useApproveToken } from '@/modules/global/hooks'
import { vaultInteractionAbi } from '@/modules/global/utils/vaultInteractionAbi'
import { wagmiAppConfig } from '@/modules/wallet-connection/wagmi'
import { useState } from 'react'
import type { Address } from 'viem'
import { sepolia } from 'viem/chains'
import { useWriteContract } from 'wagmi'
import { simulateContract, waitForTransactionReceipt } from 'wagmi/actions'

export type useDepositProps = {
  amount: bigint
  tokenAddress: Address
  spenderAddress: Address
}

type useDepositStateProps = {
  onError?: VoidFunction
  onSuccess?: VoidFunction
}

export function useDeposit({ onError, onSuccess }: useDepositStateProps) {
  const [status, setStatus] = useState('')
  const { approve } = useApproveToken()
  const { writeContractAsync } = useWriteContract()

  const deposit = async ({ amount, tokenAddress, spenderAddress }: useDepositProps) => {
    const configParams = {
      abi: vaultInteractionAbi,
      address: spenderAddress, // Vault address
      chainId: sepolia.id,
    }

    try {
      // 1. Approve token hash to spend with the vault contract
      setStatus('Approving token...')
      const approveHash = await approve({ amount, spenderAddress, tokenAddress })

      await waitForTransactionReceipt(wagmiAppConfig, {
        hash: approveHash,
        chainId: sepolia.id,
      })

      setStatus('Simulating Deposit...')
      const simulation = await simulateContract(wagmiAppConfig, {
        ...configParams,
        functionName: 'deposit',
        args: [amount],
      })

      setStatus('Depositing...')
      const txHash = await writeContractAsync(simulation.request)

      await waitForTransactionReceipt(wagmiAppConfig, {
        hash: txHash,
        chainId: sepolia.id,
      })

      setStatus('Deposit made successfully')
      onSuccess?.()
      setTimeout(() => {
        setStatus('')
      }, 1500)
      return { hash: txHash }
    } catch (error) {
      setStatus('')
      console.error('❌ Error Depositing:', error)
      onError?.()
    }
  }

  return { deposit, status }
}
