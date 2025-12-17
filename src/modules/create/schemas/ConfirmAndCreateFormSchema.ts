import { TFunction } from 'i18next'
import z from 'zod'

export const confirmAndCreateFormSchema = (t: TFunction) =>
  z.object({
    startDate: z.string().nonempty({ message: t('form.errors.startDate') }),
    endDate: z.string().nonempty({ message: t('form.errors.endDate') }),
  })

export type ConfirmAndCreateFormType = z.infer<ReturnType<typeof confirmAndCreateFormSchema>>
