import { atom } from 'jotai'
import type { ConfirmAndCreateFormType } from '../schemas/ConfirmAndCreateFormSchema'
import type { UserDataFormType } from '../schemas/UserDataFormSchema'
import type { VaultDataFormType } from '../schemas/VaultDataFormSchema'

export const vaultFormAtom = atom<VaultDataFormType>({
  network: '',
  vaultName: '',
  logo: '',
  creatorName: '',
  banner: '',
  description: '',
  assetToken: '',
  salt: '',
  minDeposit: '',
  maxDeposit: '',
})

export const userFormAtom = atom<UserDataFormType>({
  discord: '',
  telegram: '',
  twitter: '',
  tag: '',
})

export const confirmFormAtom = atom<ConfirmAndCreateFormType>({
  startDate: '',
  endDate: '',
})

export const combinedCreateDataAtom = atom((get) => {
  const vault = get(vaultFormAtom)
  const user = get(userFormAtom)
  const confirm = get(confirmFormAtom)

  return {
    ...vault,
    ...user,
    ...confirm,
  }
})

// Atoms used to store the status of the create page steps
export const vaultFormValidAtom = atom(false)
export const userFormValidAtom = atom(false)
