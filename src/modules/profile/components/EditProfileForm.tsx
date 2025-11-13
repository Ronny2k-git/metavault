import type { UserProfileDataFormType } from '@/modules/create/schemas/userProfileDataFormSchema'
import { userProfileDataFormSchema } from '@/modules/create/schemas/userProfileDataFormSchema'
import { useGetUserProfileData } from '@/modules/global/hooks'
import { Divider, EmptyBanner, Icon, Input, TextArea } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAccount } from 'wagmi'
import { useEditUserProfile } from '../hooks/useEditUserProfile'

export function EditProfileForm() {
  const { address } = useAccount()
  const { data: userProfileData } = useGetUserProfileData(address!)
  const editUserProfile = useEditUserProfile(address!)

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
    // 1. Edit  user profile on the database
    await editUserProfile.mutateAsync({
      data: {
        data: formData,
        blockchainData: { userAddress: address! },
      },
    })

    // 2.Show a message and reload the page after one second.
    toast.success('Profile updated successfully')
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  return (
    <div className="grid grid-cols-2 col-span-full gap-4.5">
      <Divider className="h-0.5" />

      <div className="col-span-full flex items-center gap-2 my-4 mb-4">
        <Icon className="!text-3xl">person_edit</Icon>
        <h1 className="text-2xl ">Edit your profile</h1>
      </div>

      {!userProfileData?.length ? (
        <EmptyBanner
          className="col-span-full text-center"
          message="No profile data found"
          subMessage="Create your first vault to show your profile data or connect your wallet"
          buttonLabel="Create your vault"
          icon={<Icon className="!text-7xl">sentiment_dissatisfied</Icon>}
        />
      ) : (
        <>
          <TextArea
            className="max-md:col-span-full min-h-[15rem] max-h-[11.5rem] md:max-h-[10rem]"
            label="User about (required)"
            placeholder="Tell us a bit about yourselves"
            error={editProfileForm.formState.errors.userAbout?.message}
            {...editProfileForm.register('userAbout')}
          />
          <div className="max-md:col-span-full flex justify-center flex-col gap-4.5">
            <Input
              inputVariant={'default'}
              inputSize={'xl'}
              label="Avatar Url (required)"
              placeholder="Add your profile avatar url"
              className="max-md:col-span-full"
              error={editProfileForm.formState.errors.avatarUrl?.message}
              {...editProfileForm.register('avatarUrl')}
            />
            <Input
              inputVariant={'default'}
              inputSize={'xl'}
              label="Web Site (optional)"
              placeholder="Add your web site url"
              className="max-md:col-span-full"
              error={editProfileForm.formState.errors.webSite?.message}
              {...editProfileForm.register('webSite')}
            />
            <Input
              inputVariant={'default'}
              inputSize={'xl'}
              label="Your wallet address (required)"
              placeholder="Change your wallet address"
              className="max-md:col-span-full"
              error={editProfileForm.formState.errors.address?.message}
              {...editProfileForm.register('address')}
            />
          </div>

          <Divider />

          <div className="flex col-span-full gap-3">
            <Button
              className="max-w-[10rem]"
              variant={'secondary'}
              size={'md'}
              iconLeft={<Icon>backspace</Icon>}
              onClick={() => editProfileForm.reset()}
            >
              Reset fields
            </Button>
            <Button
              disabled={!editProfileForm.formState.isDirty}
              className="max-w-[15rem]"
              variant={'primary'}
              size={'md'}
              iconLeft={<Icon>save</Icon>}
              onClick={editProfileForm.handleSubmit(onSubmit)}
            >
              Save changes
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
