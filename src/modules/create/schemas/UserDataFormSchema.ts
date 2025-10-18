import z from 'zod'

export const userDataFormSchema = z
  .object({
    discord: z.string().url('Invalid Discord URL').or(z.literal('')).optional(),
    telegram: z.string().url('Invalid Telegram URL').or(z.literal('')).optional(),
    twitter: z.string().url('Invalid Twitter URL').or(z.literal('')).optional(),
    tag: z.string().optional(),
  })
  .refine((data) => data.discord || data.telegram || data.twitter, {
    message: 'At least one social must be provided',
    path: ['discord'],
  })

export type UserDataFormType = z.infer<typeof userDataFormSchema>
