import type { ConfirmAndCreateFormType } from '../schemas/ConfirmAndCreateFormSchema'
import type { UserProfileDataFormType } from '../schemas/userProfileDataFormSchema'
import type { UserVaultDataFormType } from '../schemas/UserVaultDataFormSchema'
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

export const initialVaultUserForm: UserVaultDataFormType = {
  discord: '',
  telegram: '',
  twitter: '',
  tag: '',
}

export const initialProfiletUserForm: UserProfileDataFormType = {
  avatarUrl: '',
  userAbout: '',
  webSite: '',
}

export const initialConfirmForm: ConfirmAndCreateFormType = {
  startDate: '',
  endDate: '',
}
