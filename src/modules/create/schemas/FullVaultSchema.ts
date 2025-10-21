import type z from 'zod'
import { confirmAndCreateFormSchema } from './ConfirmAndCreateFormSchema'
import { userDataFormSchema } from './UserDataFormSchema'
import { vaultDataFormSchema } from './VaultDataFormSchema'

export const fullVaultSchema = vaultDataFormSchema.and(userDataFormSchema).and(confirmAndCreateFormSchema)

export type FullVaultType = z.infer<typeof fullVaultSchema>
