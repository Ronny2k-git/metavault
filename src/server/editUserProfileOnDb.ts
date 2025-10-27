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
      const update = prisma.user.update({
        where: { userAddress: blockchainData.userAddress },
        data: {
          about: data.userAbout,
          avatarUrl: data.avatarUrl,
          userAddress: data.address,
          webSite: data.webSite,
        },
      })

      return update
    } catch (error) {
      console.error(error)
      throw new Error('Failed to updating the user data')
    }
  })
