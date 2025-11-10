import { createServerFn } from '@tanstack/react-start'

export interface saveUserSwapOnDbProps {
  amount: string
  type: string
  txHash: string
  sender: string
  createdAt: Date
  vaultId: bigint
}

export const saveUserSwapOnDb = createServerFn({ method: 'POST' }).inputValidator((data) => data)
