import { createServerFn } from '@tanstack/react-start'
import { prisma } from './prisma'

export const getAllVaultsCreated = createServerFn().handler(async () => {
  try {
    const vaults = prisma.vault.findMany({
      select: {
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
        chainId: true,
      },
    })

    return vaults
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetching vaults')
  }
})
