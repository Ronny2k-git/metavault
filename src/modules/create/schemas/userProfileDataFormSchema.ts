import { TFunction } from 'i18next'
import z from 'zod'

export const userProfileDataFormSchema = (t: TFunction) =>
  z.object({
    avatarUrl: z
      .string()
      .nonempty({ message: t('form.errors.avatar.required') })
      .url(t('form.errors.avatar.invalid')),
    userAbout: z
      .string()
      .min(25, { message: t('form.errors.userAbout.min') })
      .max(120, { message: t('form.errors.userAbout.max') }),
    webSite: z.string().url(t('form.errors.website')).or(z.literal('')).optional(),
    address: z
      .string()
      .nonempty({ message: t('form.errors.wallet.required') })
      .regex(/^0x[a-fA-F0-9]{40}$/, { message: t('form.errors.wallet.invalid') }),
  })

export type UserProfileDataFormType = z.infer<ReturnType<typeof userProfileDataFormSchema>>
