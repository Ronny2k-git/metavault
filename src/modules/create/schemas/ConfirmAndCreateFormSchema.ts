import z from 'zod'

export const confirmAndCreateFormSchema = z.object({
  startDate: z.string().nonempty({ message: 'Start date is required' }),
  endDate: z.string().nonempty({ message: 'End date is required' }),
})

export type ConfirmAndCreateFormType = z.infer<typeof confirmAndCreateFormSchema>
