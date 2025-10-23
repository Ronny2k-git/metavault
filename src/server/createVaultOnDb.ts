import type { FullVaultType } from '@/modules/create/schemas'
import { getChainId } from '@/modules/global/utils'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from './prisma'

interface CreateVaultOnDbProps {
  data: FullVaultType
  blockchainData: { address: string; userAddress: string }
}

export const createVaultOnDb = createServerFn({
  method: 'POST',
})
  .inputValidator((data: CreateVaultOnDbProps) => data)
  .handler(async ({ data: { data, blockchainData } }) => {
    return prisma.vault.create({
      data: {
        vaultName: data.vaultName,
        logo: data.logo,
        banner: data.banner,
        creatorName: data.creatorName,
        description: data.description,
        assetTokenAddress: data.assetToken,
        salt: data.salt,
        minDeposit: data.minDeposit,
        maxDeposit: data.maxDeposit,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        discord: data.discord ?? null,
        telegram: data.telegram ?? null,
        twitter: data.twitter ?? null,
        tag: data.tag ?? null,
        address: blockchainData.address,
        assetTokenDecimals: 18,
        chainId: Number(getChainId(data.network)),
        userAddress: blockchainData.userAddress,
      },
    })
  })
