import { convertTimestamp } from '@/modules/global/utils'
import { vaultAbi } from '@/modules/global/utils/vaultAbi'
import { wagmiAppConfig } from '@/modules/wallet-connection/wagmi'
import { useState } from 'react'
import toast from 'react-hot-toast'
import type { Abi, Address } from 'viem'
import { sepolia } from 'viem/chains'
import { useAccount, useChainId, useWriteContract } from 'wagmi'
import { simulateContract, waitForTransactionReceipt } from 'wagmi/actions'
import type { VaultCreateFormType } from '../schemas/VaultCreateFormSchema'

export type ContractParams = {
  abi: Abi
  address: Address
  functionName: string
  args: [
    assetToken: string,
    startDate: number,
    endDate: number,
    minDeposit: string,
    maxDeposit: string,
    salt: string,
  ]
}

export type useCreateVaultArgs = {
  onError?: VoidFunction
  onSuccess?: VoidFunction
}

export function useCreateVault({ onError, onSuccess }: useCreateVaultArgs) {
  const { writeContractAsync } = useWriteContract()
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const [status, setStatus] = useState<string | null>(null)

  const createVault = async (data: VaultCreateFormType) => {
    const configParams: ContractParams = {
      abi: vaultAbi,
      address: '0x3f78066D1E2184f912F7815e30F9C0a02d3a87D3',
      functionName: 'createVault',
      args: [
        data.assetToken,
        convertTimestamp(new Date(data.startDate)),
        convertTimestamp(new Date(data.endDate)),
        data.minDeposit,
        data.maxDeposit,
        data.salt,
      ],
    }

    try {
      if (!isConnected) {
        toast.error('Please connect your wallet')
        return
      }
      if (chainId != sepolia.id) {
        toast.error('Switch your wallet to Sepolia testnet')
        return
      }

      // 1. Simulate transaction to avoid errors
      setStatus('Simulating transaction...')
      const simulation = await simulateContract(wagmiAppConfig, configParams)

      // 2. Wait for user confirm the transaction
      setStatus('Confirm in you wallet...')
      const tx = await writeContractAsync((await simulation).request)

      // 3. Wait transaction to be confirmed
      setStatus('Waiting for tx...')
      await waitForTransactionReceipt(wagmiAppConfig, {
        hash: tx,
        chainId: sepolia.id,
      })

      setStatus('Vault created successfully')
      onSuccess?.()
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 1_000))
      console.error('Error creating: ', error)
      onError?.()
    } finally {
      setTimeout(() => setStatus(null), 3000)
    }
  }
  return { createVault, status }
}
