import type { FormState, UseFormRegister } from 'react-hook-form'
import type { CREATE_TAB_STEPS } from '../constants'
import type { VaultCreateFormType } from '../schemas/VaultCreateFormSchema'

export type CreateTabSteps = (typeof CREATE_TAB_STEPS)[number]

export type CreateFormProps = {
  register: UseFormRegister<VaultCreateFormType>
  formState: FormState<VaultCreateFormType>
  setVaultData: (update: (prev: VaultCreateFormType) => VaultCreateFormType) => void
}
