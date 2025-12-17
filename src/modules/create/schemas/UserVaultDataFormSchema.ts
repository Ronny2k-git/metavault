import { TFunction } from 'i18next'
import z from 'zod'

export const userVaultDataFormSchema = (t: TFunction) =>
  z
    .object({
      discord: z.string().url(t('form.errors.discord')).or(z.literal('')).optional(),
      telegram: z.string().url(t('form.errors.telegram')).or(z.literal('')).optional(),
      twitter: z.string().url(t('form.errors.twitter')).or(z.literal('')).optional(),
      tag: z.string().optional(),
    })
    .refine((data) => data.discord || data.telegram || data.twitter, {
      message: t('form.errors.warn'),
      path: ['discord'],
    })

export type UserVaultDataFormType = z.infer<ReturnType<typeof userVaultDataFormSchema>>
