import { scrollToConteiner } from '@/modules/global/utils'
import { Divider, Icon, Input, TextArea } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { userFormAtom, userFormValidAtom } from '../atoms/createAtoms'
import type { UserDataFormType } from '../schemas/UserDataFormSchema'
import { userDataFormSchema } from '../schemas/UserDataFormSchema'
import { initialUserForm } from '../utils'
import { CreateFormHeading } from './subcomponents'

export function UserDataForm() {
  const [userData, setUserData] = useAtom(userFormAtom)
  const [, setUserFormValid] = useAtom(userFormValidAtom)

  const { register, handleSubmit, reset, formState } = useForm<UserDataFormType>({
    resolver: zodResolver(userDataFormSchema),
    defaultValues: userData,
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
        {...register('discord', {
          onChange(event) {
            setUserData((prev) => ({ ...prev, discord: event.target.value }))
          },
        })}
        error={formState.errors.discord?.message}
      />
      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        label="Telegram Url"
        placeholder="Your telegram url"
        className="max-md:col-span-full"
        {...register('telegram', {
          onChange(event) {
            setUserData((prev) => ({ ...prev, telegram: event.target.value }))
          },
        })}
        error={formState.errors.telegram?.message}
      />
      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        label="Twitter Url"
        placeholder="Your Twitter url"
        className="max-md:col-span-full"
        {...register('twitter', {
          onChange(event) {
            setUserData((prev) => ({ ...prev, twitter: event.target.value }))
          },
        })}
        error={formState.errors.twitter?.message}
      />
      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        label="Tag (optional)"
        placeholder="Add your tag"
        className="max-md:col-span-full"
        {...register('tag', {
          onChange(event) {
            setUserData((prev) => ({ ...prev, tag: event.target.value }))
          },
        })}
        error={formState.errors.tag?.message}
      />

      <div className="grid grid-cols-2 col-span-full gap-4.5">
        <Divider />

        <CreateFormHeading className="col-span-full" title="User Profile Data" icon={'help'} />

        <TextArea
          className="max-md:col-span-full min-h-[10rem] max-h-[10rem]"
          label="User about (required)"
          placeholder="Tell us a bit about yourselves"
          {...register('userAbout', {
            onChange(event) {
              setUserData((prev) => ({ ...prev, userAbout: event.target.value }))
            },
          })}
          maxLength={120}
          error={formState.errors.userAbout?.message}
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
                setUserData((prev) => ({ ...prev, avatarUrl: event.target.value }))
              },
            })}
            error={formState.errors.avatarUrl?.message}
          />
          <Input
            inputVariant={'default'}
            inputSize={'xl'}
            label="Web Site (optional)"
            placeholder="Add your web site url"
            className="max-md:col-span-full"
            {...register('webSite', {
              onChange(event) {
                setUserData((prev) => ({ ...prev, webSite: event.target.value }))
              },
            })}
            error={formState.errors.webSite?.message}
          />
        </div>
      </div>

      <Divider />

      <div className="flex col-span-full gap-3">
        <Button
          className="max-w-[10rem]"
          variant={'secondary'}
          size={'md'}
          iconLeft={<Icon>backspace</Icon>}
          onClick={() => {
            setUserData(initialUserForm)
            reset(initialUserForm)
          }}
        >
          Reset fields
        </Button>
        <Button
          className="max-w-[15rem]"
          variant={'primary'}
          size={'md'}
          iconRight={<Icon>arrow_right_alt</Icon>}
          onClick={handleSubmit(() => {
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
