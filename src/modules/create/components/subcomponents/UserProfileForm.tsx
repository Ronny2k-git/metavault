import { Divider, Input, TextArea } from '@/ui/components'
import type { useForm } from 'react-hook-form'
import type { UserProfileDataFormType } from '../../schemas/userProfileDataFormSchema'
import { CreateFormHeading } from './CreateFormHeading'

type UserProfileFormProps = {
  register: ReturnType<typeof useForm<UserProfileDataFormType>>['register']
  errors: string
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfileDataFormType>>
}

export function UserProfileForm({ register, errors, setUserProfile }: UserProfileFormProps) {
  return (
    <div className="grid grid-cols-2 col-span-full gap-4.5">
      <Divider />

      <CreateFormHeading className="col-span-full" title="User Profile Data" icon={'help'} />

      <TextArea
        className="max-md:col-span-full min-h-[10rem] max-h-[10rem]"
        label="User about (required)"
        placeholder="Tell us a bit about yourselves"
        {...register('userAbout', {
          onChange(event) {
            setUserProfile((prev) => ({ ...prev, userAbout: event.target.value }))
          },
        })}
        maxLength={120}
        error={errors}
      />

      <div className="max-md:col-span-full flex justify-center flex-col gap-4.5">
        <Input
          inputVariant={'default'}
          inputSize={'xl'}
          label="Avatar Url (required)"
          placeholder="Add your profile avatar url"
          className="max-md:col-span-full"
          {...register('avatarUrl', {
            onChange(event) {
              setUserProfile((prev) => ({ ...prev, avatarUrl: event.target.value }))
            },
          })}
          error={errors}
        />
        <Input
          inputVariant={'default'}
          inputSize={'xl'}
          label="Web Site (optional)"
          placeholder="Add your web site url"
          className="max-md:col-span-full"
          {...register('webSite', {
            onChange(event) {
              setUserProfile((prev) => ({ ...prev, webSite: event.target.value }))
            },
          })}
          error={errors}
        />
      </div>
    </div>
  )
}
