import { Divider, Icon, Input } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { userFormAtom } from '../atoms/createAtoms'
import type { UserDataFormType } from '../schemas/UserDataFormSchema'
import { userDataFormSchema } from '../schemas/UserDataFormSchema'
import { initialUserForm } from '../utils'
import { CreateFormHeading } from './subcomponents'

export function UserDataForm() {
  const [, setUserData] = useAtom(userFormAtom)

  const { register, handleSubmit, reset, formState } = useForm<UserDataFormType>({
    resolver: zodResolver(userDataFormSchema),
    defaultValues: initialUserForm,
  })
  const navigate = useNavigate({ from: '/create-vault' })

  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4.5">
      <Divider />

      <CreateFormHeading className="col-span-full" title="User Data" icon={'help'} />

      <Input
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
        label="Tag (optional)"
        placeholder="Add your tag"
        className="max-md:col-span-full"
        {...register('tag', {
          onChange(event) {
            setUserData((prev) => ({ ...prev, tag: event.target.value }))
          },
        })}
        error={formState.errors.twitter?.message}
      />
      <Divider />

      <div className="flex col-span-full gap-3">
        <Button
          className="max-w-[10rem]"
          variant={'secondary'}
          size={'md'}
          iconLeft={<Icon>backspace</Icon>}
          onClick={() => {
            setUserData(initialUserForm)
            reset()
          }}
        >
          Reset fields
        </Button>
        <Button
          className="max-w-[15rem]"
          variant={'primary'}
          size={'md'}
          iconRight={<Icon>arrow_right_alt</Icon>}
          onClick={handleSubmit(() => navigate({ search: { tab: 'confirm-create' } }))}
        >
          Move to confirm
        </Button>
      </div>
    </div>
  )
}
