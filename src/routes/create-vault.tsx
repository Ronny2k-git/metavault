'use client'

import { vaultFormAtom } from '@/modules/create/atoms'
import { VaultDataForm } from '@/modules/create/components'
import { ConfirmAndApproveForm } from '@/modules/create/components/ConfirmAndApproveForm'
import { UserDataForm } from '@/modules/create/components/UserDataForm'
import { CREATE_INFO_STEPS, CREATE_TAB_STEPS } from '@/modules/create/constants'
import { useCreateVault } from '@/modules/create/hooks'
import type { VaultCreateFormType } from '@/modules/create/schemas/VaultCreateFormSchema'
import { vaultCreateFormSchema } from '@/modules/create/schemas/VaultCreateFormSchema'
import type { CreateTabSteps } from '@/modules/create/types'
import { Tabs } from '@/ui/components/Tabs'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'

export const Route = createFileRoute('/create-vault')({
  ssr: false,
  component: CreateVault,
  validateSearch: zodValidator(
    z.object({
      tab: z.enum(CREATE_TAB_STEPS, 'vault-data').default('vault-data'),
    }),
  ),
})

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

function CreateVault() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: '/create-vault' })

  const [, setVaultData] = useAtom(vaultFormAtom)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const navigate = useNavigate()

  const { register, handleSubmit, reset, formState } = useForm<VaultCreateFormType>({
    resolver: zodResolver(vaultCreateFormSchema),
    defaultValues: initialVaultForm,
  })

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

  const tabList = CREATE_INFO_STEPS

  return (
    <div className="min-h-screen background px-4 flex flex-col gap-1 items-center text-white">
      <div className="max-w-4xl my-14 w-full">
        <div>
          <Tabs
            variant={'blue'}
            size={'lg'}
            search={search.tab}
            onValueChange={(value) => {
              navigate({ search: { tab: value as CreateTabSteps } })
            }}
            key={search.tab}
            tabList={tabList}
            tabContent={[
              {
                value: 'vault-data',
                content: <VaultDataForm register={register} formState={formState} setVaultData={setVaultData} />,
              },
              {
                value: 'user-data',
                content: <UserDataForm register={register} formState={formState} setVaultData={setVaultData} />,
              },
              {
                value: 'confirm-approve',
                content: (
                  <ConfirmAndApproveForm
                    register={register}
                    formState={formState}
                    setVaultData={setVaultData}
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                  />
                ),
              },
            ]}
          />
        </div>

        {/* <div className="flex max-sm:flex-col col-span-full gap-3">
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
        </div> */}
      </div>
    </div>
  )
}
