import { TFunction } from 'i18next'
import * as z from 'zod'

export const vaultDataFormSchema = (t: TFunction) =>
  z.object({
    network: z.string().nonempty({ message: t('form.errors.network') }),
    vaultName: z.string().nonempty({ message: t('form.errors.vaultName') }),
    logo: z.string().nonempty({ message: t('form.errors.logo') }),
    banner: z.string().nonempty({ message: t('form.errors.banner') }),
    creatorName: z.string().nonempty({ message: t('form.errors.creatorName') }),
    description: z
      .string()
      .min(50, { message: t('form.errors.description.min') })
      .max(120, { message: t('form.errors.description.max') }),
    assetToken: z
      .string()
      .nonempty({ message: t('form.errors.token.required') })
      .regex(/^0x[a-fA-F0-9]{40}$/, { message: t('form.errors.token.invalid') }),
    salt: z
      .string()
      .nonempty({ message: t('form.errors.salt.required') })
      .refine((v) => Number(v) >= 1, t('form.errors.salt.invalid')),
    minDeposit: z
      .string()
      .nonempty({ message: t('form.errors.minDeposit.required') })
      .refine((v) => Number(v) >= 0.1, t('form.errors.minDeposit.invalid')),
    maxDeposit: z
      .string()
      .nonempty({ message: t('form.errors.maxDeposit.required') })
      .refine((v) => Number(v) >= 1, t('form.errors.maxDeposit.invalid')),
  })

export type VaultDataFormType = z.infer<ReturnType<typeof vaultDataFormSchema>>
