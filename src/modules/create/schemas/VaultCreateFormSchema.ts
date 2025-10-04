import * as z from 'zod'

export const vaultCreateFormSchema = z.object({
  network: z.string().nonempty({ message: 'Network is required' }),
  vaultName: z.string().nonempty({ message: 'Vault name is required' }),
  logo: z.string().nonempty({ message: 'Logo is required' }),
  banner: z.string().nonempty({ message: 'Banner is required' }),

  assetToken: z.string().nonempty({ message: 'Asset token is required' }),
  salt: z.coerce.number().min(1, { message: 'Salt is required' }),
  minDeposit: z.coerce
    .number()
    .min(1, { message: 'Minimum deposit must be greater than 0' }),
  maxDeposit: z.coerce
    .number()
    .min(1, { message: 'Maximum deposit must be greater than 0' }),

  startDate: z.coerce.date({ message: 'Start date is required' }),
  endDate: z.coerce.date({ message: 'End date is required' }),
})

export type VaultCreateFormType = z.infer<typeof vaultCreateFormSchema>
