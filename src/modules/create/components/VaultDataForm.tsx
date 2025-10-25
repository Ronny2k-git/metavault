import { scrollToConteiner } from '@/modules/global/utils'
import { Divider, Icon, Input, TextArea } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { vaultFormAtom, vaultFormValidAtom } from '../atoms/createAtoms'
import type { VaultDataFormType } from '../schemas/VaultDataFormSchema'
import { vaultDataFormSchema } from '../schemas/VaultDataFormSchema'
import { initialVaultForm } from '../utils'
import { CreateFormHeading } from './subcomponents'

export function VaultDataForm() {
  const [vaultData, setVaultData] = useAtom(vaultFormAtom)
  const [, setVaultFormValid] = useAtom(vaultFormValidAtom)

  const { register, handleSubmit, reset, formState } = useForm<VaultDataFormType>({
    resolver: zodResolver(vaultDataFormSchema),
    defaultValues: vaultData,
  })
  const navigate = useNavigate({ from: '/create-vault' })

  const networError = formState.errors.network

  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4.5">
      <Divider />

      <CreateFormHeading
        className="col-span-full"
        title="Basic Vault Data"
        icon={'help'}
        subTitle="( All fields are required )"
      />

      <Input
        inputVariant={'default'}
        inputSize={'xl'}
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
        inputVariant={'default'}
        inputSize={'xl'}
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
        inputVariant={'default'}
        inputSize={'xl'}
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
        inputVariant={'default'}
        inputSize={'xl'}
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
        className="col-span-full min-h-[14rem] max-h-[14rem]"
        label="Vault Description"
        placeholder="Tell us a bit about your vault"
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
        <CreateFormHeading title="Token Data" icon={'help'} subTitle="( All fields are required )" />

        <div className="flex flex-col relative">
          <select
            className={`bg-[#0a2278] h-12 w-full px-6 rounded-3xl text-gray-300 outline-none
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
          {networError && <span className="mt-1 pl-2 text-sm text-red-400">{networError.message}</span>}
        </div>
      </div>

      <Input
        inputVariant={'default'}
        inputSize={'xl'}
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
        inputVariant={'default'}
        inputSize={'xl'}
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
        inputVariant={'default'}
        inputSize={'xl'}
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
        inputVariant={'default'}
        inputSize={'xl'}
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
        <Button
          className="max-w-[10rem]"
          variant={'secondary'}
          size={'md'}
          iconLeft={<Icon>backspace</Icon>}
          onClick={() => {
            setVaultData(initialVaultForm)
            reset(initialVaultForm)
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
            setVaultFormValid(true)
            requestAnimationFrame(() => scrollToConteiner('tab-user-data'))
            navigate({ search: { tab: 'user-data' } })
          })}
        >
          Move to user data
        </Button>
      </div>
    </div>
  )
}
