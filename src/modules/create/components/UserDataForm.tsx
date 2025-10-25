import { scrollToConteiner } from '@/modules/global/utils'
import { Divider, Icon, Input } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { reset } from 'viem/actions'
import { userFormValidAtom, userProfiletFormAtom, userVaultFormAtom } from '../atoms/createAtoms'
import type { UserProfileDataFormType } from '../schemas/userProfileDataFormSchema'
import { userProfileDataFormSchema } from '../schemas/userProfileDataFormSchema'
import type { UserVaultDataFormType } from '../schemas/UserVaultDataFormSchema'
import { userVaultDataFormSchema } from '../schemas/UserVaultDataFormSchema'
import { initialVaultUserForm } from '../utils'
import { CreateFormHeading } from './subcomponents'

export function UserDataForm() {
  const [userData, setUserData] = useAtom(userVaultFormAtom)
  const [userProfileData, setUserProfileData] = useAtom(userProfiletFormAtom)
  const [, setUserFormValid] = useAtom(userFormValidAtom)

  const vaultForm = useForm<UserVaultDataFormType>({
    resolver: zodResolver(userVaultDataFormSchema),
    defaultValues: userData,
  })

  const profileForm = useForm<UserProfileDataFormType>({
    resolver: zodResolver(userProfileDataFormSchema),
    defaultValues: userProfileData,
  })

  const navigate = useNavigate({ from: '/create-vault' })

  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4.5">
      <Divider />

      <CreateFormHeading
        className="col-span-full"
        title="User Vault Data"
        icon={'help'}
        subTitle="( At least one social must be provided )"
      />

      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        className="max-md:col-span-full"
        label="Discord Url"
        placeholder="Your discord url"
        {...vaultForm.register('discord', {
          onChange(event) {
            setUserData((prev) => ({ ...prev, discord: event.target.value }))
          },
        })}
        error={vaultForm.formState.errors.discord?.message}
      />
      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        label="Telegram Url"
        placeholder="Your telegram url"
        className="max-md:col-span-full"
        {...vaultForm.register('telegram', {
          onChange(event) {
            setUserData((prev) => ({ ...prev, telegram: event.target.value }))
          },
        })}
        error={vaultForm.formState.errors.telegram?.message}
      />
      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        label="Twitter Url"
        placeholder="Your Twitter url"
        className="max-md:col-span-full"
        {...vaultForm.register('twitter', {
          onChange(event) {
            setUserData((prev) => ({ ...prev, twitter: event.target.value }))
          },
        })}
        error={vaultForm.formState.errors.twitter?.message}
      />
      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        label="Tag (optional)"
        placeholder="Add your tag"
        className="max-md:col-span-full"
        {...vaultForm.register('tag', {
          onChange(event) {
            setUserData((prev) => ({ ...prev, tag: event.target.value }))
          },
        })}
        error={vaultForm.formState.errors.tag?.message}
      />

      {/* <UserProfileForm errors={}  /> */}

      <Divider />

      <div className="flex col-span-full gap-3">
        <Button
          className="max-w-[10rem]"
          variant={'secondary'}
          size={'md'}
          iconLeft={<Icon>backspace</Icon>}
          onClick={() => {
            setUserData(initialVaultUserForm)
            reset(initialVaultUserForm)
          }}
        >
          Reset fields
        </Button>
        <Button
          className="max-w-[15rem]"
          variant={'primary'}
          size={'md'}
          iconRight={<Icon>arrow_right_alt</Icon>}
          onClick={vaultForm.handleSubmit(() => {
            setUserFormValid(true)
            requestAnimationFrame(() => scrollToConteiner('tab-confirm-create'))
            navigate({ search: { tab: 'confirm-create' } })
          })}
        >
          Move to confirm
        </Button>
      </div>
    </div>
  )
}
