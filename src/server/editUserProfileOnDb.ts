export const runtime = 'nodejs'

import type { UserProfileDataFormType } from '@/modules/create/schemas/userProfileDataFormSchema'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from './prisma'

interface editUserProfileOnDb {
  data: UserProfileDataFormType
  blockchainData: { userAddress: string }
}

export const editUserProfileOnDb = createServerFn({ method: 'POST' })
  .inputValidator((data: editUserProfileOnDb) => data)
  .handler(async ({ data: { data, blockchainData } }) => {
    try {
      const oldAddress = blockchainData.userAddress
      const newAddress = data.address

      const updateUser = prisma.user.update({
        where: { userAddress: oldAddress },
        data: {
          about: data.userAbout,
          avatarUrl: data.avatarUrl,
          userAddress: newAddress,
          webSite: data.webSite,
        },
      })

      await prisma.vault.updateMany({
        where: { userAddress: oldAddress },
        data: { userAddress: newAddress },
      })

      await prisma.swap.updateMany({
        where: { sender: oldAddress },
        data: { sender: newAddress },
      })

      return updateUser
    } catch (error) {
      console.error(error)
      throw new Error('Failed to updating the user data')
    }
  })
