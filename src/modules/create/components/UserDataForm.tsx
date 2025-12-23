import { useGetUserProfileData } from '@/modules/global/hooks'
import { scrollToConteiner } from '@/modules/global/utils'
import { Divider, Icon, Input } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { userFormValidAtom, userProfileFormAtom, userVaultFormAtom } from '../atoms/createAtoms'
import type { UserProfileDataFormType } from '../schemas/userProfileDataFormSchema'
import { userProfileDataFormSchema } from '../schemas/userProfileDataFormSchema'
import type { UserVaultDataFormType } from '../schemas/UserVaultDataFormSchema'
import { userVaultDataFormSchema } from '../schemas/UserVaultDataFormSchema'
import { initialProfiletUserForm, initialVaultUserForm } from '../utils'
import { CreateFormHeading } from './subcomponents'
import { UserProfileForm } from './subcomponents/UserProfileForm'

export function UserDataForm() {
  const { address } = useAccount()
  const [userData, setUserData] = useAtom(userVaultFormAtom)
  const [userProfileDataAtom, setUserProfileDataAtom] = useAtom(userProfileFormAtom)
  const [, setUserFormValid] = useAtom(userFormValidAtom)
  const { data: userProfileData = [] } = useGetUserProfileData(address!)
  const { t } = useTranslation('create', { keyPrefix: 'userData' })

  const vaultForm = useForm<UserVaultDataFormType>({
    resolver: zodResolver(userVaultDataFormSchema(t)),
    defaultValues: userData,
  })

  const profileForm = useForm<UserProfileDataFormType>({
    resolver: zodResolver(userProfileDataFormSchema(t)),
    defaultValues: {
      ...userProfileDataAtom,
      address: address || '',
    },
  })

  const navigate = useNavigate({ from: '/create-vault' })

  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4.5">
      <Divider className="mt-12" />

      <CreateFormHeading
        className="col-span-full"
        title={t('titles.userVault')}
        icon={'help'}
        subTitle="( At least one social must be provided )"
      />

      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        className="max-md:col-span-full"
        label={t('fields.discord.label')}
        placeholder={t('fields.discord.placeholder')}
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
        label={t('fields.telegram.label')}
        placeholder={t('fields.telegram.placeholder')}
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
        label={t('fields.twitter.label')}
        placeholder={t('fields.twitter.placeholder')}
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
        label={t('fields.tag.label')}
        placeholder={t('fields.tag.placeholder')}
        className="max-md:col-span-full"
        {...vaultForm.register('tag', {
          onChange(event) {
            setUserData((prev) => ({ ...prev, tag: event.target.value }))
          },
        })}
        error={vaultForm.formState.errors.tag?.message}
      />

      {!userProfileData[0]?.id && (
        <>
          <Divider />

          <UserProfileForm
            heading={
              <CreateFormHeading
                className="col-span-full"
                title={t('titles.userProfile')}
                icon={'help'}
                subTitle={t('titles.userProfileInfo')}
              />
            }
            error={profileForm.formState.errors}
            register={profileForm.register}
            setUserProfile={setUserProfileDataAtom}
          />
        </>
      )}

      <Divider />

      <div className="flex col-span-full max-sm:flex-col gap-3">
        <Button
          className="sm:max-w-[13rem]"
          variant={'secondary'}
          size={'md'}
          iconLeft={<Icon>backspace</Icon>}
          onClick={() => {
            setUserData(initialVaultUserForm)
            setUserProfileDataAtom(initialProfiletUserForm)
            vaultForm.reset(initialVaultUserForm)
            profileForm.reset(initialProfiletUserForm)
          }}
        >
          {t('buttons.reset')}
        </Button>
        <Button
          className="sm:max-w-[15rem]"
          variant={'primary'}
          size={'md'}
          iconRight={<Icon>arrow_right_alt</Icon>}
          onClick={async () => {
            // Verify if the connected wallet is already has an account profile.
            const isProfileValid = !userProfileData[0]?.id ? await profileForm.trigger() : true
            const isVaultValid = await vaultForm.trigger()

            if (isProfileValid && isVaultValid) {
              setUserFormValid(true)
              requestAnimationFrame(() => scrollToConteiner('tab-confirm-create'))
              navigate({ search: { tab: 'confirm-create' } })
            }
          }}
        >
          {t('buttons.move')}
        </Button>
      </div>
    </div>
  )
}
