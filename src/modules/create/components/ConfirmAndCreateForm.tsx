import { useGetTokenDecimals, useGetUserProfileData } from '@/modules/global/hooks'
import { TransactionCardDialog } from '@/modules/transactions/components'
import { Divider, Icon, Input, Stepper } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useAtom, useAtomValue } from 'jotai'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'
import { combinedCreateDataAtom, confirmFormAtom, confirmFormValidAtom } from '../atoms/createAtoms'
import { useCreateVault, useCreateVaultOnDb, useResetCreateForm } from '../hooks'
import { useCreateUserProfileOnDb } from '../hooks/useCreateUserProfileOnDb'
import type { VaultContractData } from '../schemas'
import type { ConfirmAndCreateFormType } from '../schemas/ConfirmAndCreateFormSchema'
import { confirmAndCreateFormSchema } from '../schemas/ConfirmAndCreateFormSchema'
import { initialConfirmForm } from '../utils'
import { CardPreview, CreateFormHeading } from './subcomponents'

export function ConfirmAndCreateForm() {
  const { address } = useAccount()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [confirmData, setConfirmData] = useAtom(confirmFormAtom)
  const [, setConfirmFormValid] = useAtom(confirmFormValidAtom)
  const navigate = useNavigate()

  const account = useAccount()
  const createVaultOnDb = useCreateVaultOnDb()
  const createUserProfile = useCreateUserProfileOnDb()
  const { data: userProfileData = [] } = useGetUserProfileData(address!)
  const { getTokenDecimal } = useGetTokenDecimals()
  const { resetAll } = useResetCreateForm()
  const allFormData = useAtomValue(combinedCreateDataAtom)

  const { register, handleSubmit, reset, formState } = useForm<ConfirmAndCreateFormType>({
    resolver: zodResolver(confirmAndCreateFormSchema),
    defaultValues: confirmData,
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
    if (!account.address) {
      toast.error('Please connect your wallet')
      return
    }
    const tokenDecimals = await getTokenDecimal(allFormData.assetToken as Address)

    // 1. Update info tabs
    setConfirmFormValid(true)

    // 2. Create a vault on the blockchain
    const {
      creatorName,
      description,
      discord,
      telegram,
      tag,
      twitter,
      userAbout,
      webSite,
      avatarUrl,
      address: userAddress,
      ...vaultData
    } = allFormData
    const tx = await create.createVault(vaultData as VaultContractData)

    if (!tx) {
      console.error('Failed to get contract address')
      return
    }

    // 3. Save the vault data on the database
    await createVaultOnDb.mutateAsync({
      data: {
        data: allFormData,
        blockchainData: {
          address: tx,
          userAddress: account.address,
          tokenDecimals,
        },
      },
    })

    // 4. Create the user profile
    if (!userProfileData[0]?.id) {
      await createUserProfile.mutateAsync({
        data: {
          data: {
            avatarUrl,
            userAbout,
            webSite,
            address: account.address,
          },
        },
      })
    }

    // 5. Clean the form and all states and redirect from profile page.
    toast.success('Vault created successfully')
    resetAll()
    navigate({ from: '/profile' })
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
        inputVariant={'default'}
        inputSize={'xl'}
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
        inputVariant={'default'}
        inputSize={'xl'}
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
            reset(initialConfirmForm)
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
