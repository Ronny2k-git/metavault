import z from 'zod'

export const userVaultDataFormSchema = z
  .object({
    discord: z.string().url('Invalid Discord URL').or(z.literal('')).optional(),
    telegram: z.string().url('Invalid Telegram URL').or(z.literal('')).optional(),
    twitter: z.string().url('Invalid Twitter URL').or(z.literal('')).optional(),
    tag: z.string().optional(),
  })
  .refine((data) => data.discord || data.telegram || data.twitter, {
    message: 'At least one social must be provided: discord, telegram or twitter',
    path: ['discord'],
  })

export type UserVaultDataFormType = z.infer<typeof userVaultDataFormSchema>
