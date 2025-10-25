import z from 'zod'

export const userProfileDataFormSchema = z.object({
  avatarUrl: z.string().nonempty({ message: 'Avatar url is required' }).url(),
  userAbout: z.string().min(25, { message: 'Minimum of 25 words ' }).max(120, { message: 'Maximum of 120 words' }),
  webSite: z.string().url('Invalid URL').or(z.literal('')).optional(),
})

export type UserProfileDataFormType = z.infer<typeof userProfileDataFormSchema>
