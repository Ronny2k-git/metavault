import { Divider, Icon, Input } from '@/ui/components'
import type { CreateFormProps } from '../types'
import { CreateFormHeading } from './subcomponents'

interface UserDataFormProps extends CreateFormProps {
  className?: string
}

export function UserDataForm({ register, setVaultData, formState }: UserDataFormProps) {
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
            setVaultData((prev) => ({ ...prev, discord: event.target.value }))
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
            setVaultData((prev) => ({ ...prev, telegram: event.target.value }))
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
            setVaultData((prev) => ({ ...prev, twitter: event.target.value }))
          },
        })}
        error={formState.errors.twitter?.message}
      />
      <Input
        label="Tag (optional)"
        placeholder="Add your tag"
        className="max-md:col-span-full"
        {...register('twitter', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, twitter: event.target.value }))
          },
        })}
        error={formState.errors.twitter?.message}
      />
      <Divider />

      <div className="flex col-span-full gap-3">
        <button
          className="h-10 w-[10rem] flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 rounded-4xl cursor-pointer"
          // onClick={() => {
          //   setVaultData(initialVaultForm)
          //   reset()
          // }}
        >
          <Icon>backspace</Icon>
          Reset fields
        </button>
        <button
          className="h-10 w-[15rem] flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 rounded-4xl cursor-pointer"
          // onClick={handleSubmit(onSubmit)}
        >
          Move to confirm
          <Icon>arrow_right_alt</Icon>
        </button>
      </div>
    </div>
  )
}
