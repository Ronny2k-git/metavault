'use client'

import { TransactionCardDialog } from '@/modules/transactions/components'
import { Spinner } from '@/ui/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { vaultFormAtom } from '../atoms'
import { useCreateVault } from '../hooks'
import type { VaultCreateFormType } from '../schemas/VaultCreateFormSchema'
import { vaultCreateFormSchema } from '../schemas/VaultCreateFormSchema'
import { CardPreview, InputField } from './subcomponents'

const initialVaultForm = {
  network: '',
  vaultName: '',
  logo: '',
  banner: '',
  assetToken: '',
  salt: '',
  minDeposit: '',
  maxDeposit: '',
  startDate: '',
  endDate: '',
  description: '',
}

export function CreateVaultForm() {
  const [, setVaultData] = useAtom(vaultFormAtom)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const navigate = useNavigate()

  const { register, handleSubmit, reset, formState } =
    useForm<VaultCreateFormType>({
      resolver: zodResolver(vaultCreateFormSchema),
      defaultValues: initialVaultForm,
    })
  const networError = formState.errors.network
  const descriptionError = formState.errors.description

  const create = useCreateVault({
    onStatusChange: (status) => {
      if (status === 'openModal') setIsModalOpen(true)
      if (status === 'closeModal') setIsModalOpen(false)
    },

    onSuccess: () => {
      toast.success('Vault created successfully')
      setIsModalOpen(false)
    },
    onError: () => {
      setIsModalOpen(false)
      toast.error('Error creating vault')
    },
  })

  const onSubmit = (data: VaultCreateFormType) => {
    // 1. Create vault on the blockchain
    const { description, ...vaultData } = data
    create.createVault(vaultData)

    // setTimeout(() => navigate({ to: '/profile' }), 2500)
    // 2. Save the vault data on the database
    const save = 'test'
    console.log(save)
  }

  return (
    <div className={`grid grid-cols-2 max-sm:grid-cols-1 gap-5.5`}>
      {/* Basic data section */}
      <h1 className="text-2xl">Basic Vault Data</h1>
      <div className="flex flex-col relative">
        <select
          className={`h-10 w-full px-4 rounded-md text-gray-300 border-1 placeholder:text-gray-300
          ${networError ? 'border-red-400' : 'border-cyan-400'} focus:border-black border outline-none`}
          {...register('network', {
            onChange(event) {
              setVaultData((prev) => ({ ...prev, network: event.target.value }))
            },
          })}
        >
          <option value="" hidden>
            Select a network
          </option>
          <option value="Sepolia">Sepolia</option>
        </select>
        {networError && (
          <span className="text-sm absolute top-10 text-red-400">
            {networError.message}
          </span>
        )}
      </div>

      <InputField
        className="col-span-full"
        placeholder="Your vault name"
        {...register('vaultName', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, vaultName: event.target.value }))
          },
        })}
        error={formState.errors.vaultName?.message}
      />

      <InputField
        placeholder="Your logo url"
        className="col-span-full"
        {...register('logo', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, logo: event.target.value }))
          },
        })}
        error={formState.errors.logo?.message}
      />

      <InputField
        placeholder="Your banner url"
        className="col-span-full"
        {...register('banner', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, banner: event.target.value }))
          },
        })}
        error={formState.errors.banner?.message}
      />

      <div className="flex flex-col col-span-full">
        <textarea
          className={`p-2 h-30 border rounded-md border-cyan-400 placeholder:text-gray-300
        focus:border-black outline-none ${descriptionError ? 'border-red-400' : 'border-cyan-400'}`}
          placeholder="Your vault description..."
          maxLength={120}
          {...register('description', {
            onChange(event) {
              setVaultData((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            },
          })}
        />
        {descriptionError && (
          <span className="text-sm text-red-400 mt-1">
            {descriptionError.message}
          </span>
        )}
      </div>

      <div className="w-full h-0.5 my-4 bg-cyan-400 col-span-full" />

      {/* Token section */}
      <h1 className="col-span-full text-2xl">Token Data</h1>
      <InputField
        placeholder="Asset token"
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
      <InputField
        className="text-gray-300"
        placeholder="Salt"
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
      <InputField
        className="text-gray-300"
        placeholder="Min deposit"
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
      <InputField
        className="text-gray-300"
        placeholder="Max deposit"
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

      <div className="w-full h-0.5 my-4 bg-cyan-400 col-span-full" />

      {/* Time section */}
      <h1 className="col-span-full text-2xl">Vault Time</h1>
      <InputField
        className="text-gray-300"
        placeholder="Start date"
        type="date"
        {...register('startDate', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, startDate: event.target.value }))
          },
        })}
        error={formState.errors.startDate?.message}
      />
      <InputField
        className="text-gray-300"
        placeholder="End date"
        type="date"
        {...register('endDate', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, endDate: event.target.value }))
          },
        })}
        error={formState.errors.endDate?.message}
      />

      <div className="w-full h-0.5 my-4 bg-cyan-400 col-span-full" />

      <h1 className="col-span-full text-2xl">Card Preview</h1>
      <CardPreview />

      <div className="w-full h-0.5 my-4 bg-cyan-400 col-span-full" />

      <div className="flex max-sm:flex-col col-span-full gap-3">
        <button
          className="h-10 w-full bg-gray-600 hover:bg-gray-500 rounded-2xl cursor-pointer"
          onClick={() => {
            setVaultData(initialVaultForm)
            reset()
          }}
        >
          Reset fields
        </button>
        <button
          className="h-10 w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 rounded-2xl cursor-pointer"
          onClick={handleSubmit(onSubmit)}
        >
          {create.status && <Spinner />}
          {create.status ? create.status : 'Create Vault'}
        </button>
      </div>
      <TransactionCardDialog
        title="Create Vault"
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      >
        effe
      </TransactionCardDialog>
    </div>
  )
}
