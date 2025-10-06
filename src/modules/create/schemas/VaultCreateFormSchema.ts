import * as z from 'zod'

export const vaultCreateFormSchema = z.object({
  network: z.string().nonempty({ message: 'Network is required' }),
  vaultName: z.string().nonempty({ message: 'Vault name is required' }),
  logo: z.string().nonempty({ message: 'Logo is required' }),
  banner: z.string().nonempty({ message: 'Banner is required' }),

  assetToken: z.string().nonempty({ message: 'Asset token is required' }),
  // salt: z.number().min(1, { message: 'Salt is required' }).optional(),
  // minDeposit: z
  //   .number()
  //   .min(1, {
  //     message: 'Minimum deposit must be greater than 0',
  //   })
  //   .optional(),
  // maxDeposit: z
  //   .number()
  //   .min(1, { message: 'Maximum deposit must be greater than 0' })
  //   .optional(),
  salt: z
    .string()
    .nonempty({ message: 'Salt is required and must be greater than 1' }),
  minDeposit: z
    .string()
    .nonempty({ message: 'Minimum deposit must be greater than 1' }),
  maxDeposit: z
    .string()
    .nonempty({ message: 'Maximum deposit must be greater than 1' }),

  startDate: z.string().nonempty({ message: 'Start date is required' }),
  endDate: z.string().nonempty({ message: 'End date is required' }),
})

export type VaultCreateFormType = z.infer<typeof vaultCreateFormSchema>
