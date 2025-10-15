import { atom } from 'jotai'
import type { VaultCreateFormType } from '../schemas/VaultCreateFormSchema'

export const vaultFormAtom = atom<VaultCreateFormType>({
  network: '',
  vaultName: '',
  logo: '',
  banner: '',
  creatorName: '',
  assetToken: '',
  salt: '',
  minDeposit: '',
  maxDeposit: '',
  startDate: '',
  endDate: '',
  description: '',
})
