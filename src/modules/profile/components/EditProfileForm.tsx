import type { UserProfileDataFormType } from '@/modules/create/schemas/userProfileDataFormSchema'
import { userProfileDataFormSchema } from '@/modules/create/schemas/userProfileDataFormSchema'
import { useGetUserProfileData } from '@/modules/global/hooks'
import { Card, Divider, EmptyBanner, Icon, Input, TextArea } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { useEditUserProfile } from '../hooks/useEditUserProfile'

export function EditProfileForm() {
  const { address } = useAccount()
  const { data: userProfileData } = useGetUserProfileData(address!)
  const editUserProfile = useEditUserProfile()
  const { t } = useTranslation('global')
  const { t: tEditForm } = useTranslation('profile', { keyPrefix: 'editProfile' })

  const profileData = userProfileData?.[0]

  const editProfileForm = useForm<UserProfileDataFormType>({
    resolver: zodResolver(userProfileDataFormSchema),
  })

  useEffect(() => {
    if (profileData) {
      editProfileForm.reset({
        avatarUrl: profileData.avatarUrl,
        userAbout: profileData.about,
        webSite: profileData.webSite!,
        address: profileData.userAddress,
      })
    }
  }, [profileData])

  const onSubmit = async (formData: UserProfileDataFormType) => {
    await editUserProfile.mutateAsync({
      data: {
        data: formData,
        blockchainData: { userAddress: address! },
      },
    })

    toast.success('Profile updated successfully')
    setTimeout(() => window.location.reload(), 1000)
  }

  return (
    <div className="flex flex-col">
      <Divider className="my-12" />

      <Card id="edit-user-profile" className=" gap-6 p-8 rounded-2xl shadow-xs border-purple-900/50 " variant={'basic'}>
        {/* HEADER */}
        <div className="flex items-center gap-3">
          <Icon className="!text-4xl text-purple-300">person_edit</Icon>
          <h1 className="text-3xl font-semibold tracking-tight text-purple-100">{tEditForm('heading.title')}</h1>
        </div>

        <h2 className="text-indigo-300">{tEditForm('heading.subtitle')}</h2>

        <Divider className="border-purple-900/40" />

        {!userProfileData?.length ? (
          <EmptyBanner
            className="text-center"
            message={t('emptyBanner.editProfile.message')}
            subMessage={t('emptyBanner.editProfile.subMessage')}
            buttonLabel={t('emptyBanner.editProfile.buttonLabel')}
            icon={<Icon className="!text-7xl">sentiment_dissatisfied</Icon>}
          />
        ) : (
          <>
            {/* ABOUT */}
            <TextArea
              className="min-h-[14rem] max-h-[14rem]"
              label={tEditForm('inputs.about.label')}
              placeholder={tEditForm('inputs.about.placeholder')}
              error={editProfileForm.formState.errors.userAbout?.message}
              {...editProfileForm.register('userAbout')}
            />

            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
              <Input
                inputVariant="default"
                inputSize="xl"
                label={tEditForm('inputs.avatar.label')}
                placeholder={tEditForm('inputs.avatar.placeholder')}
                error={editProfileForm.formState.errors.avatarUrl?.message}
                {...editProfileForm.register('avatarUrl')}
              />

              <Input
                inputVariant="default"
                inputSize="xl"
                label={tEditForm('inputs.site.label')}
                placeholder={tEditForm('inputs.site.placeholder')}
                error={editProfileForm.formState.errors.webSite?.message}
                {...editProfileForm.register('webSite')}
              />

              <Input
                inputVariant="default"
                inputSize="xl"
                label={tEditForm('inputs.wallet.label')}
                placeholder={tEditForm('inputs.wallet.placeholder')}
                error={editProfileForm.formState.errors.address?.message}
                {...editProfileForm.register('address')}
              />
            </div>

            {/* WARNING */}
            <div className="mt-1 flex items-center gap-2 text-red-300/80 bg-red-900/10 px-3 py-2 rounded-lg border border-red-900/30">
              <Icon className="!text-2xl">warning</Icon>
              <p className="text-sm">{tEditForm('warning')}</p>
            </div>

            <Divider className="border-purple-900/40" />

            {/* BUTTONS */}
            <div className="flex max-sm:flex-col gap-3">
              <Button
                variant="secondary"
                size="md"
                iconLeft={<Icon>backspace</Icon>}
                onClick={() => editProfileForm.reset()}
              >
                {tEditForm('buttons.reset')}
              </Button>

              <Button
                disabled={!editProfileForm.formState.isDirty}
                variant="primary"
                size="md"
                iconLeft={<Icon>save</Icon>}
                onClick={editProfileForm.handleSubmit(onSubmit)}
              >
                {tEditForm('buttons.save')}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
