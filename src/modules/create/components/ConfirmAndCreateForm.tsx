import { TransactionCardDialog } from '@/modules/transactions/components'
import { Divider, Icon, Input, Stepper } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom, useAtomValue } from 'jotai'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { combinedCreateDataAtom, confirmFormAtom } from '../atoms/createAtoms'
import { useCreateVault } from '../hooks'
import type { ConfirmAndCreateFormType } from '../schemas/ConfirmAndCreateFormSchema'
import { confirmAndCreateFormSchema } from '../schemas/ConfirmAndCreateFormSchema'
import type { VaultContractData } from '../schemas/VaultContractSchema'
import { initialConfirmForm } from '../utils'
import { CardPreview, CreateFormHeading } from './subcomponents'

export function ConfirmAndCreateForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [, setConfirmData] = useAtom(confirmFormAtom)

  const allFormData = useAtomValue(combinedCreateDataAtom)

  const { register, handleSubmit, reset, formState } = useForm<ConfirmAndCreateFormType>({
    resolver: zodResolver(confirmAndCreateFormSchema),
    defaultValues: initialConfirmForm,
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
  const onSubmit = async () => {
    // 1. Create a vault on the blockchain

    // const { description, creatorName, ...vaultData } = data
    const { creatorName, description, discord, telegram, tag, twitter, ...vaultData } = allFormData
    await create.createVault(vaultData as VaultContractData)

    // 2. Save the vault data on the database
    const saveOnDB = 'test'
    console.log(saveOnDB)
    // setTimeout(() => navigate({ to: '/profile' }), 2500)
    // toast.success('Vault created successfully')
  }

  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4.5">
      <Divider />

      <CreateFormHeading
        className="col-span-full"
        title="Vault Time"
        icon={'help'}
        subTitle="( All fields are required )"
      />

      <Input
        label="Start Date"
        type="date"
        {...register('startDate', {
          onChange(event) {
            setConfirmData((prev) => ({ ...prev, startDate: event.target.value }))
          },
        })}
        error={formState.errors.startDate?.message}
      />
      <Input
        label="End Date"
        type="date"
        {...register('endDate', {
          onChange(event) {
            setConfirmData((prev) => ({ ...prev, endDate: event.target.value }))
          },
        })}
        error={formState.errors.endDate?.message}
      />

      <Divider />

      <CreateFormHeading
        className="col-span-full"
        title="Card Preview"
        icon={'help'}
        subTitle="( Your vault will look like )"
      />
      <CardPreview />

      <Divider />

      <div className="flex col-span-full gap-3">
        <Button
          className="max-w-[10rem]"
          variant={'secondary'}
          size={'md'}
          iconLeft={<Icon>backspace</Icon>}
          onClick={() => {
            setConfirmData(initialConfirmForm)
            reset()
          }}
        >
          Reset fields
        </Button>
        <Button
          className="max-w-[15rem]"
          variant={'primary'}
          size={'md'}
          iconLeft={<Icon>add_circle</Icon>}
          onClick={handleSubmit(onSubmit)}
        >
          Create a vault
        </Button>
      </div>
      <TransactionCardDialog title="Create your vault" isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        {create.steps && <Stepper steps={create.steps} />}
      </TransactionCardDialog>
    </div>
  )
}
