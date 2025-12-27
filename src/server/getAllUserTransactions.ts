export const runtime = 'nodejs'

import { createServerFn } from '@tanstack/react-start'
import type { Address } from 'viem'
import { prisma } from './prisma'

export type getAllUserTransactionsProps = {
  sender: Address
  limit: number
  page: number
}

export const getAllUserTransactions = createServerFn({ method: 'POST' })
  .inputValidator((data: getAllUserTransactionsProps) => data)
  .handler(async ({ data }) => {
    const page = data.page ?? 1
    const limit = data.limit ?? 10
    const skip = (page - 1) * limit

    const [items, total] = await Promise.all([
      prisma.swap.findMany({
        where: {
          sender: data.sender,
        },
        skip: skip,
        take: limit,
        select: {
          amount: true,
          createdAt: true,
          sender: true,
          txHash: true,
          type: true,
          vault: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),

      prisma.swap.count({
        where: { sender: data.sender },
      }),
    ])
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) }
  })
