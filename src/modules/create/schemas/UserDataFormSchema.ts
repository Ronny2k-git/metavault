import z from 'zod'

export const userDataFormSchema = z
  .object({
    discord: z.url().optional(),
    telegram: z.url().optional(),
    twitter: z.url().optional(),
    tag: z.string().optional(),
  })
  .refine((data) => data.discord || data.telegram || data.twitter, {
    message: 'At least one social must be provided',
    path: ['discord', 'telegram', 'twitter'],
  })

export type UserDataFormType = z.infer<typeof userDataFormSchema>
