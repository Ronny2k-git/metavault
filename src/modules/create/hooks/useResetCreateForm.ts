import { useAtom } from 'jotai'
import {
  confirmFormAtom,
  confirmFormValidAtom,
  userFormAtom,
  userFormValidAtom,
  vaultFormAtom,
  vaultFormValidAtom,
} from '../atoms'
import { initialConfirmForm, initialUserForm, initialVaultForm } from '../utils'

export function useResetCreateForm() {
  const [, setVaultData] = useAtom(vaultFormAtom)
  const [, setUserData] = useAtom(userFormAtom)
  const [, setConfirmData] = useAtom(confirmFormAtom)
  const [, setVaultFormValid] = useAtom(vaultFormValidAtom)
  const [, setUserFormValid] = useAtom(userFormValidAtom)
  const [, setConfirmFormValid] = useAtom(confirmFormValidAtom)

  const resetAll = () => {
    setVaultData(initialVaultForm)
    setUserData(initialUserForm)
    setConfirmData(initialConfirmForm)
    setVaultFormValid(false)
    setUserFormValid(false)
    setConfirmFormValid(false)
  }

  return { resetAll }
}
