import { useSteps } from '@/modules/global/hooks'
import { convertTimestamp } from '@/modules/global/utils'
import { vaultAbi } from '@/modules/global/utils/vaultAbi'
import { wagmiAppConfig } from '@/modules/wallet-connection/wagmi'
import toast from 'react-hot-toast'
import type { Abi, Address } from 'viem'
import { sepolia } from 'viem/chains'
import { useAccount, useChainId, useWriteContract } from 'wagmi'
import { simulateContract, waitForTransactionReceipt } from 'wagmi/actions'
import type { VaultCreateFormType } from '../schemas/VaultDataFormSchema'

export type ContractParams = {
  abi: Abi
  address: Address
  functionName: string
  args: [assetToken: string, startDate: number, endDate: number, minDeposit: string, maxDeposit: string, salt: string]
}

export type useCreateVaultArgs = {
  onError?: VoidFunction
  onSuccess?: VoidFunction
  onStatusChange: (status: 'openModal' | 'closeModal' | null) => void
}

const initialCreateSteps = {
  simulation: { label: 'Simulate ', status: 'pending' },
  'confirm-create': { label: 'Confirm Create', status: 'idle' },
} as const

export function useCreateVault({ onError, onSuccess, onStatusChange }: useCreateVaultArgs) {
  const { writeContractAsync } = useWriteContract()
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const steps = useSteps(initialCreateSteps)

  const createVault = async (data: Omit<VaultCreateFormType, 'description' | 'creatorName'>) => {
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
      onStatusChange('openModal')
      steps.init()

      // 1. Simulate transaction to avoid errors
      steps.update({ id: 'simulation', label: 'Simulating Contract', status: 'pending' })
      await new Promise((resolve) => setTimeout(resolve, 2_000))
      const simulation = await simulateContract(wagmiAppConfig, configParams)
      steps.update({ id: 'simulation', label: 'Simulated Successfully', status: 'success' })

      // 2. Wait for user confirm the transaction
      steps.update({ id: 'confirm-create', label: 'Confirm in your wallet', status: 'pending' })
      const tx = await writeContractAsync((await simulation).request)

      // 3. Wait transaction to be confirmed
      steps.update({ id: 'confirm-create', label: 'Waiting For Tx Receipt', status: 'pending' })
      await waitForTransactionReceipt(wagmiAppConfig, {
        hash: tx,
        chainId: sepolia.id,
      })

      steps.update({ id: 'confirm-create', label: 'Vault Created!', status: 'success' })
      await new Promise((resolve) => setTimeout(resolve, 1_000))
      onSuccess?.()
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 1_000))
      console.error('Error creating:', error)
      onError?.()
    } finally {
      steps.clear()
    }
  }
  return { createVault, steps: steps.toStepper() }
}
