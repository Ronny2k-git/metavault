import { createServerFn } from '@tanstack/react-start'
import { prisma } from './prisma'

export type getAllVaultsCreatedProps = {
  userAddress: string
  page?: number
  limit?: number
  live?: boolean
}

export const getAllVaultsCreated = createServerFn({ method: 'POST' })
  .inputValidator((data: getAllVaultsCreatedProps) => data)
  .handler(async ({ data }) => {
    const page = data.page ?? 1
    const limit = data.limit ?? 10
    const skip = (page - 1) * limit
    const now = new Date()

    const dateFilter = data.live ? { endDate: { gte: now } } : { endDate: { lt: now } }

    try {
      const [items, total] = await Promise.all([
        prisma.vault.findMany({
          where: {
            userAddress: data.userAddress,
            ...dateFilter,
          },
          skip: skip,
          take: limit,
          orderBy: { startDate: 'desc' },
          select: {
            id: true,
            vaultName: true,
            logo: true,
            banner: true,
            creatorName: true,
            description: true,
            assetTokenAddress: true,
            minDeposit: true,
            maxDeposit: true,
            startDate: true,
            endDate: true,
            discord: true,
            telegram: true,
            twitter: true,
            tag: true,
            address: true,
            assetTokenDecimals: true,
            assetTokenName: true,
            assetTokenSymbol: true,
            chainId: true,
            userAddress: true,
            swaps: {
              select: {
                id: true,
                amount: true,
                type: true,
                txHash: true,
                sender: true,
                createdAt: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        }),

        prisma.vault.count({
          where: {
            userAddress: data.userAddress,
            ...dateFilter,
          },
        }),
      ])
      return { items, total, page, limit, totalPages: Math.ceil(total / limit) }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetching vaults')
    }
  })
