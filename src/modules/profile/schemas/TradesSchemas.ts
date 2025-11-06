import z from 'zod'

export const DepositSchema = z.object({
  amount: z.number('Please enter an amount').positive({ message: 'Amount must be greater than 0' }),
})

export type DepositSchemaType = z.infer<typeof DepositSchema>

export const WithdrawSchema = z.object({
  amount: z.number('Please enter an amount').positive({ message: 'Amount must be greater than 0' }),
})

export type WithdrawSchemaType = z.infer<typeof WithdrawSchema>
