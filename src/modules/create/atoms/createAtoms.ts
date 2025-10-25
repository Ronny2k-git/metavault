import { atom } from 'jotai'
import type { ConfirmAndCreateFormType } from '../schemas/ConfirmAndCreateFormSchema'
import type { UserVaultDataFormType } from '../schemas/UserVaultDataFormSchema'
import type { VaultDataFormType } from '../schemas/VaultDataFormSchema'
import type { UserProfileDataFormType } from '../schemas/userProfileDataFormSchema'

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

export const userVaultFormAtom = atom<UserVaultDataFormType>({
  discord: '',
  telegram: '',
  twitter: '',
  tag: '',
})

export const userProfiletFormAtom = atom<UserProfileDataFormType>({
  avatarUrl: '',
  userAbout: '',
  webSite: '',
})

export const confirmFormAtom = atom<ConfirmAndCreateFormType>({
  startDate: '',
  endDate: '',
})

export const combinedCreateDataAtom = atom((get) => {
  const vault = get(vaultFormAtom)
  const userVault = get(userVaultFormAtom)
  const userProfile = get(userProfiletFormAtom)
  const confirm = get(confirmFormAtom)

  return {
    ...vault,
    ...userVault,
    ...userProfile,
    ...confirm,
  }
})

// Atoms used to store the status of the create page steps
export const vaultFormValidAtom = atom(false)
export const userFormValidAtom = atom(false)
export const confirmFormValidAtom = atom(false)
