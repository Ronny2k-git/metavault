import { createServerFn } from '@tanstack/react-start'
import type { Address } from 'viem'
import { prisma } from './prisma'

export const getAllUserTransactions = createServerFn({ method: 'POST' })
  .inputValidator((data: { sender: Address }) => data)
  .handler(async ({ data }) => {
    return prisma.swap.findMany({
      where: {
        sender: data.sender,
      },
      select: {
        amount: true,
        createdAt: true,
        sender: true,
        txHash: true,
        type: true,
        vault: true,
      },
    })
  })
