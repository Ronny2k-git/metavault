import type z from 'zod'
import { confirmAndCreateFormSchema } from './ConfirmAndCreateFormSchema'
import { vaultDataFormSchema } from './VaultDataFormSchema'

export const vaultContractSchema = vaultDataFormSchema.merge(
  confirmAndCreateFormSchema.pick({ startDate: true, endDate: true }),
)

export type VaultContractData = z.infer<typeof vaultContractSchema>
