import { Divider, Input } from '@/ui/components'
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
    </div>
  )
}
