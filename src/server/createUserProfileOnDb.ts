export const runtime = 'nodejs'

import type { UserProfileDataFormType } from '@/modules/create/schemas/userProfileDataFormSchema'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from './prisma'

interface CreateUserProfileOnDbProps {
  data: UserProfileDataFormType
}

export const createUserProfiletOnDb = createServerFn({ method: 'POST' })
  .inputValidator((data: CreateUserProfileOnDbProps) => data)
  .handler(async ({ data: { data } }) => {
    return prisma.user.create({
      data: {
        about: data.userAbout,
        avatarUrl: data.avatarUrl,
        webSite: data.webSite,
        userAddress: data.address,
      },
    })
  })
