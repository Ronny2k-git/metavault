import { Input, TextArea } from '@/ui/components'
import type { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { UserProfileDataFormType } from '../../schemas/userProfileDataFormSchema'

type UserProfileFormProps = {
  register: ReturnType<typeof useForm<UserProfileDataFormType>>['register']
  error: ReturnType<typeof useForm<UserProfileDataFormType>>['formState']['errors']
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfileDataFormType>>
  heading?: React.ReactNode
}

export function UserProfileForm({ register, error, setUserProfile, heading }: UserProfileFormProps) {
  const { t } = useTranslation('create', { keyPrefix: 'userData' })

  return (
    <div className="grid grid-cols-2 col-span-full gap-4.5">
      {heading}

      <TextArea
        className="max-md:col-span-full min-h-[10rem] max-h-[11.5rem] md:max-h-[10rem]"
        label={t('fields.userAbout.label')}
        placeholder={t('fields.userAbout.placeholder')}
        {...register('userAbout', {
          onChange(event) {
            setUserProfile((prev) => ({ ...prev, userAbout: event.target.value }))
          },
        })}
        maxLength={120}
        error={error.userAbout?.message}
      />
      <div className="max-md:col-span-full flex justify-center flex-col gap-4.5">
        <Input
          inputVariant={'default'}
          inputSize={'xl'}
          label={t('fields.userAvatar.label')}
          placeholder={t('fields.userAvatar.placeholder')}
          className="max-md:col-span-full"
          {...register('avatarUrl', {
            onChange(event) {
              setUserProfile((prev) => ({ ...prev, avatarUrl: event.target.value }))
            },
          })}
          error={error.avatarUrl?.message}
        />
        <Input
          inputVariant={'default'}
          inputSize={'xl'}
          label={t('fields.userSite.label')}
          placeholder={t('fields.userSite.placeholder')}
          className="max-md:col-span-full"
          {...register('webSite', {
            onChange(event) {
              setUserProfile((prev) => ({ ...prev, webSite: event.target.value }))
            },
          })}
          error={error.webSite?.message}
        />
      </div>
    </div>
  )
}
