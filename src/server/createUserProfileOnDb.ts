import type { UserProfileDataFormType } from '@/modules/create/schemas/userProfileDataFormSchema'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from './prisma'

interface CreateUserProfileOnDbProps {
  data: UserProfileDataFormType
  blockchainData: { userAddress: string }
}

export const createUserProfiletOnDb = createServerFn({ method: 'POST' })
  .inputValidator((data: CreateUserProfileOnDbProps) => data)
  .handler(async ({ data: { data, blockchainData } }) => {
    return prisma.user.create({
      data: {
        about: data.userAbout,
        avatarUrl: data.avatarUrl,
        webSite: data.webSite,
        userAddress: blockchainData.userAddress,
      },
    })
  })
