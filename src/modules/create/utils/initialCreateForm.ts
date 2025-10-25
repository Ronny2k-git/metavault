import type { ConfirmAndCreateFormType } from '../schemas/ConfirmAndCreateFormSchema'
import type { UserDataFormType } from '../schemas/UserDataFormSchema'
import type { VaultDataFormType } from '../schemas/VaultDataFormSchema'

export const initialVaultForm: VaultDataFormType = {
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
}

export const initialUserForm: UserDataFormType = {
  discord: '',
  telegram: '',
  twitter: '',
  tag: '',
  avatarUrl: '',
  userAbout: '',
  webSite: '',
}

export const initialConfirmForm: ConfirmAndCreateFormType = {
  startDate: '',
  endDate: '',
}
