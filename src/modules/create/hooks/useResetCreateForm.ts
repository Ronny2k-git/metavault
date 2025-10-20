import { useAtom } from 'jotai'
import { confirmFormAtom, userFormAtom, userFormValidAtom, vaultFormAtom, vaultFormValidAtom } from '../atoms'
import { initialConfirmForm, initialUserForm, initialVaultForm } from '../utils'

export function useResetCreateForm() {
  const [, setVaultData] = useAtom(vaultFormAtom)
  const [, setUserData] = useAtom(userFormAtom)
  const [, setConfirmData] = useAtom(confirmFormAtom)
  const [, setVaultFormValid] = useAtom(vaultFormValidAtom)
  const [, setUserFormValid] = useAtom(userFormValidAtom)

  const resetAll = () => {
    setVaultData(initialVaultForm)
    setUserData(initialUserForm)
    setConfirmData(initialConfirmForm)
    setVaultFormValid(false)
    setUserFormValid(false)
  }

  return { resetAll }
}
