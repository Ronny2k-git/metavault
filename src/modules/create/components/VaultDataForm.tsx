import { Divider, Icon, Input, TextArea } from '@/ui/components'
import type { CreateFormProps } from '../types'
import { CreateFormHeading } from './subcomponents'

interface VaultDataFormProps extends CreateFormProps {
  className?: string
}

export function VaultDataForm({ register, setVaultData, formState }: VaultDataFormProps) {
  const networError = formState.errors.network

  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4.5">
      <Divider />

      <CreateFormHeading className="col-span-full" title="Basic Vault Data" icon={'help'} />

      <Input
        className="max-md:col-span-full"
        label="Vault Name"
        placeholder="Your vault name"
        {...register('vaultName', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, vaultName: event.target.value }))
          },
        })}
        error={formState.errors.vaultName?.message}
      />
      <Input
        label="Logo Url"
        placeholder="Your logo url"
        className="max-md:col-span-full"
        {...register('logo', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, logo: event.target.value }))
          },
        })}
        error={formState.errors.logo?.message}
      />
      <Input
        placeholder="Your banner url"
        label="Banner Url"
        className="max-md:col-span-full"
        {...register('banner', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, banner: event.target.value }))
          },
        })}
        error={formState.errors.banner?.message}
      />
      <Input
        className="max-md:col-span-full"
        label="Creator Name"
        placeholder="Creatror Vault Name"
        {...register('creatorName', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, creatorName: event.target.value }))
          },
        })}
        error={formState.errors.creatorName?.message}
      />
      <TextArea
        className="col-span-full"
        label="Vault Description"
        placeholder="Talk a bit about your vault"
        {...register('description', {
          onChange(event) {
            setVaultData((prev) => ({
              ...prev,
              description: event.target.value,
            }))
          },
        })}
        maxLength={120}
        error={formState.errors.description?.message}
      />

      <Divider />

      <div className="col-span-full w-full flex max-sm:flex-col justify-between gap-4.5">
        <CreateFormHeading title="Token Data" icon={'help'} />

        <div className="flex flex-col relative">
          <select
            className={`h-12 w-full px-4 sm:px-8  rounded-3xl input-style text-gray-300 outline-none
          ${networError ? 'shadow-[0_0_5px_1px_rgba(255_1_1)] border-0' : 'border-transparent'}`}
            {...register('network', {
              onChange(event) {
                setVaultData((prev) => ({ ...prev, network: event.target.value }))
              },
            })}
          >
            <option value="" hidden>
              Select a network
            </option>
            <option className="bg-blue-900" value="Sepolia">
              Sepolia
            </option>
          </select>
          {networError && <span className="text-sm absolute top-11.5 pl-2 text-red-400">{networError.message}</span>}
        </div>
      </div>

      <Input
        label="Asset Token"
        placeholder="Your Asset token"
        {...register('assetToken', {
          onChange(event) {
            setVaultData((prev) => ({
              ...prev,
              assetToken: event.target.value,
            }))
          },
        })}
        error={formState.errors.assetToken?.message}
      />
      <Input
        label="Salt"
        placeholder="Vault Salt"
        type={'number'}
        min={0}
        {...register('salt', {
          onChange(event) {
            setVaultData((prev) => ({
              ...prev,
              salt: event.target.value,
            }))
          },
        })}
        error={formState.errors.salt?.message}
      />
      <Input
        label="Min Deposit"
        placeholder="Min deposit per wallet"
        type={'number'}
        min={0}
        {...register('minDeposit', {
          onChange(event) {
            setVaultData((prev) => ({
              ...prev,
              minDeposit: event.target.value,
            }))
          },
        })}
        error={formState.errors.minDeposit?.message}
      />
      <Input
        label="Max Deposit"
        placeholder="Max deposit per wallet"
        type={'number'}
        min={0}
        {...register('maxDeposit', {
          onChange(event) {
            setVaultData((prev) => ({
              ...prev,
              maxDeposit: event.target.value,
            }))
          },
        })}
        error={formState.errors.maxDeposit?.message}
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
          Move to user data
          <Icon>arrow_right_alt</Icon>
        </button>
      </div>
    </div>
  )
}
