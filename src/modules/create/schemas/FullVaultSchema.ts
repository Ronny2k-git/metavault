import type z from 'zod'
import { confirmAndCreateFormSchema } from './ConfirmAndCreateFormSchema'
import { userVaultDataFormSchema } from './UserVaultDataFormSchema'
import { vaultDataFormSchema } from './VaultDataFormSchema'
import { userProfileDataFormSchema } from './userProfileDataFormSchema'

export const fullVaultSchema = vaultDataFormSchema
  .and(userVaultDataFormSchema)
  .and(confirmAndCreateFormSchema)
  .and(userProfileDataFormSchema)

export type FullVaultType = z.infer<typeof fullVaultSchema>
