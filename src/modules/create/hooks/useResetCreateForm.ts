import { useAtom } from 'jotai'
import {
  confirmFormAtom,
  confirmFormValidAtom,
  userFormValidAtom,
  userProfileFormAtom,
  userVaultFormAtom,
  vaultFormAtom,
  vaultFormValidAtom,
} from '../atoms'
import { initialConfirmForm, initialProfiletUserForm, initialVaultForm, initialVaultUserForm } from '../utils'

export function useResetCreateForm() {
  const [, setVaultData] = useAtom(vaultFormAtom)
  const [, setVaultUserData] = useAtom(userVaultFormAtom)
  const [, setProfileUserData] = useAtom(userProfileFormAtom)
  const [, setConfirmData] = useAtom(confirmFormAtom)
  const [, setVaultFormValid] = useAtom(vaultFormValidAtom)
  const [, setUserFormValid] = useAtom(userFormValidAtom)
  const [, setConfirmFormValid] = useAtom(confirmFormValidAtom)

  const resetAll = () => {
    setVaultData(initialVaultForm)
    setVaultUserData(initialVaultUserForm)
    setProfileUserData(initialProfiletUserForm)
    setConfirmData(initialConfirmForm)
    setVaultFormValid(false)
    setUserFormValid(false)
    setConfirmFormValid(false)
  }

  return { resetAll }
}
