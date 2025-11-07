import * as z from 'zod'

export const vaultDataFormSchema = z.object({
  network: z.string().nonempty({ message: 'Network is required' }),
  vaultName: z.string().nonempty({ message: 'Vault name is required' }),
  logo: z.string().nonempty({ message: 'Logo is required' }),
  banner: z.string().nonempty({ message: 'Banner is required' }),
  creatorName: z.string().nonempty({ message: 'Creator name is required' }),
  description: z.string().min(50, { message: 'Minimum of 50 words ' }).max(120, { message: 'Maximum of 120 words' }),
  assetToken: z
    .string()
    .nonempty({ message: 'Asset token is required' })
    .regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid Ethereum address format' }),
  salt: z
    .string()
    .nonempty({ message: 'Salt is required' })
    .refine((v) => Number(v) >= 1, 'Value must be greater than or equal to 1'),
  minDeposit: z
    .string()
    .nonempty({ message: 'Minimum deposit is required ' })
    .refine((v) => Number(v) >= 0, 'Value must be greater than 0'),
  maxDeposit: z
    .string()
    .nonempty({ message: 'Maximum deposit is required ' })
    .refine((v) => Number(v) >= 1, 'Value must be greater than or equal to 1'),
})

export type VaultDataFormType = z.infer<typeof vaultDataFormSchema>
