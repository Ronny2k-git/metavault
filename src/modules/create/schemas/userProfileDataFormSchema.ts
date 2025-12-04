import z from 'zod'

export const userProfileDataFormSchema = z.object({
  avatarUrl: z.string().nonempty({ message: 'Avatar url is required' }).url(),
  userAbout: z
    .string()
    .min(25, { message: 'Minimum of 25 characters ' })
    .max(120, { message: 'Maximum of 120 characters' }),
  webSite: z.string().url('Invalid URL').or(z.literal('')).optional(),
  address: z
    .string()
    .nonempty({ message: 'Wallet address is required' })
    .regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid wallet address format' }),
})

export type UserProfileDataFormType = z.infer<typeof userProfileDataFormSchema>
