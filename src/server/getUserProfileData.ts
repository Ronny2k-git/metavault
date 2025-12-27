export const runtime = 'nodejs'

import { createServerFn } from '@tanstack/react-start'
import { prisma } from './prisma'

export const getUserProfileData = createServerFn({ method: 'POST' })
  .inputValidator((data: { userAddress: string }) => data)
  .handler(async ({ data }) => {
    try {
      const user = prisma.user.findMany({
        where: {
          userAddress: data.userAddress,
        },
        select: {
          id: true,
          about: true,
          avatarUrl: true,
          userAddress: true,
          webSite: true,
        },
      })

      return user
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetching user data')
    }
  })
