import { createServerFn } from '@tanstack/react-start'
import { prisma } from './prisma'

export interface saveUserSwapOnDbProps {
  amount: string
  type: 'deposit' | 'withdraw'
  txHash: string
  sender: string
  vaultId: number
}

export const saveUserSwapOnDb = createServerFn({ method: 'POST' })
  .inputValidator((data: saveUserSwapOnDbProps) => data)
  .handler(async ({ data }) => {
    return prisma.swap.create({
      data: {
        amount: data.amount,
        type: data.type,
        txHash: data.txHash,
        sender: data.sender,
        vaultId: data.vaultId,
      },
    })
  })
