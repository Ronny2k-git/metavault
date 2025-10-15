'use client'

import { TransactionCardDialog } from '@/modules/transactions/components'
import { Icon, Input, Stepper, TextArea } from '@/ui/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { vaultFormAtom } from '../atoms'
import { useCreateVault } from '../hooks'
import type { VaultCreateFormType } from '../schemas/VaultCreateFormSchema'
import { vaultCreateFormSchema } from '../schemas/VaultCreateFormSchema'
import { CardPreview, CreateFormHeading } from './subcomponents'

const initialVaultForm = {
  network: '',
  vaultName: '',
  logo: '',
  creatorName: '',
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

  const { register, handleSubmit, reset, formState } = useForm<VaultCreateFormType>({
    resolver: zodResolver(vaultCreateFormSchema),
    defaultValues: initialVaultForm,
  })
  const networError = formState.errors.network

  const create = useCreateVault({
    onStatusChange: (status) => {
      if (status === 'openModal') setIsModalOpen(true)
      if (status === 'closeModal') setIsModalOpen(false)
    },

    onSuccess: () => {
      setIsModalOpen(false)
    },
    onError: () => {
      setIsModalOpen(false)
      toast.error('Error creating vault')
    },
  })

  const onSubmit = async (data: VaultCreateFormType) => {
    // 1. Create a vault on the blockchain
    const { description, creatorName, ...vaultData } = data
    await create.createVault(vaultData)

    // 2. Save the vault data on the database
    const saveOnDB = 'test'
    console.log(saveOnDB)
    // setTimeout(() => navigate({ to: '/profile' }), 2500)
    toast.success('Vault created successfully')
  }

  return (
    <div className={`grid grid-cols-2 max-sm:grid-cols-1 gap-4.5`}>
      {/* Basic data section */}
      <CreateFormHeading title="Basic Vault Data" icon={'help'} />

      <div className="flex flex-col relative">
        <select
          className={`h-12 w-full px-4 rounded-3xl input-style text-gray-300 outline-none
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
        {networError && <span className="text-sm absolute top-10 text-red-400">{networError.message}</span>}
      </div>

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

      <div className="w-full h-0.5 my-4 bg-cyan-400 col-span-full" />

      {/* Token section */}
      <CreateFormHeading className="col-span-full" title="Token Data" icon={'help'} />

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

      <div className="w-full h-0.5 my-4 bg-cyan-400 col-span-full" />

      {/* Time section */}
      <CreateFormHeading className="col-span-full" title="Vault Time" icon={'help'} />

      <Input
        label="Start Date"
        type="date"
        {...register('startDate', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, startDate: event.target.value }))
          },
        })}
        error={formState.errors.startDate?.message}
      />
      <Input
        label="End Date"
        type="date"
        {...register('endDate', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, endDate: event.target.value }))
          },
        })}
        error={formState.errors.endDate?.message}
      />

      <div className="w-full h-0.5 my-4 bg-cyan-400 col-span-full" />

      {/* Card preview */}
      <CreateFormHeading className="col-span-full" title="Card Preview" icon={'help'} />
      <CardPreview />

      <div className="w-full h-0.5 my-4 bg-cyan-400 col-span-full" />

      <div className="flex max-sm:flex-col col-span-full gap-3">
        <button
          className="h-10 w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 rounded-2xl cursor-pointer"
          onClick={() => {
            setVaultData(initialVaultForm)
            reset()
          }}
        >
          <Icon>close</Icon>
          Reset fields
        </button>
        <button
          className="h-10 w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 rounded-2xl cursor-pointer"
          onClick={handleSubmit(onSubmit)}
        >
          <Icon>add_circle</Icon>
          Create Vault
        </button>
      </div>
      <TransactionCardDialog title="Create your vault" open={isModalOpen} onOpenChange={setIsModalOpen}>
        {create.steps && <Stepper steps={create.steps} />}
      </TransactionCardDialog>
    </div>
  )
}
