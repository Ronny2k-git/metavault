import { TFunction } from 'i18next'
import z from 'zod'

export const DepositSchema = (t: TFunction) =>
  z.object({
    amount: z.number(t('form.errors.amount')).positive({ message: t('form.errors.positiveAmount') }),
  })

export type DepositSchemaType = z.infer<ReturnType<typeof DepositSchema>>

export const WithdrawSchema = (t: TFunction) =>
  z.object({
    amount: z.number(t('form.errors.amount')).positive({ message: t('form.errors.positiveAmount') }),
  })

export type WithdrawSchemaType = z.infer<ReturnType<typeof WithdrawSchema>>
