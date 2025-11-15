import { createServerFn } from '@tanstack/react-start'
import { prisma } from './prisma'

export const getAllVaultsCreated = createServerFn({ method: 'POST' })
  .inputValidator((data: { userAddress: string; page?: number; limit?: number }) => data)
  .handler(async ({ data }) => {
    const page = data.page ?? 1
    const limit = data.limit ?? 10
    const skip = (page - 1) * limit

    // TO DO LATER >>>>>>>>>>>>>

    // IMPLEMENT A FILTER TO RETURN THE LIVE AND COMPLETED VAULTS SEPARETED

    try {
      const [items, total] = await Promise.all([
        prisma.vault.findMany({
          where: {
            userAddress: data.userAddress,
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
          where: { userAddress: data.userAddress },
        }),
      ])
      return { items, total, page, limit, totalPages: Math.ceil(total / limit) }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetching vaults')
    }
  })
