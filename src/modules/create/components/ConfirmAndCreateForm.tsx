import { useGetTokenDecimals, useGetTokenName, useGetTokenSymbol, useGetUserProfileData } from '@/modules/global/hooks'
import { getChainName } from '@/modules/global/utils'
import { TransactionCardDialog } from '@/modules/transactions/components'
import { Divider, Icon, Input, Stepper } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useAtom, useAtomValue } from 'jotai'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import type { Address } from 'viem'
import { sepolia } from 'viem/chains'
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
  const { t } = useTranslation('create', { keyPrefix: 'confirmAndCreate' })
  const { t: t2 } = useTranslation('global')
  const { t: t3 } = useTranslation('global', { keyPrefix: 'cardDialogCreate.messages' })

  const account = useAccount()
  const createVaultOnDb = useCreateVaultOnDb()
  const createUserProfile = useCreateUserProfileOnDb()
  const { data: userProfileData = [] } = useGetUserProfileData(address!)
  const { getTokenDecimal } = useGetTokenDecimals()
  const { getTokenName } = useGetTokenName()
  const { getTokenSymbol } = useGetTokenSymbol()
  const { resetAll } = useResetCreateForm()
  const allFormData = useAtomValue(combinedCreateDataAtom)

  const { register, handleSubmit, reset, formState } = useForm<ConfirmAndCreateFormType>({
    resolver: zodResolver(confirmAndCreateFormSchema(t)),
    defaultValues: confirmData,
  })

  const create = useCreateVault({
    messages: {
      connectWallet: t2('globalMessages.connectWallet'),
      simulate: t3('simulate'),
      simulatePending: t3('simulatePending'),
      simulationSuccess: t3('simulated'),
      confirm: t3('confirm'),
      confirmPending: t3('confirmPending'),
      wait: t3('wait'),
      vaultCreated: t3('success'),
    },

    onStatusChange: (status) => {
      if (status === 'openModal') setIsModalOpen(true)
      if (status === 'closeModal') setIsModalOpen(false)
    },
    onSuccess: () => {
      setIsModalOpen(false)
    },
    onError: () => {
      setIsModalOpen(false)
      toast.error(t3('error'))
    },
  })

  const onSubmit = async () => {
    if (!account.address) {
      toast.error(t2('globalMessages.connectWallet'))
      return
    }
    // Get token data
    const tokenAddress = allFormData.assetToken as Address
    const [tokenDecimals, tokenName, tokenSymbol] = await Promise.all([
      getTokenDecimal(tokenAddress),
      getTokenName(tokenAddress),
      getTokenSymbol(tokenAddress),
    ])

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
      console.error(t('messages.error'))
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
          tokenName,
          tokenSymbol,
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
    toast.success(t('messages.success'))
    resetAll()
    navigate({ from: '/profile' })
  }

  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4.5">
      <Divider className="mt-12" />

      <CreateFormHeading
        className="col-span-full"
        title={t('titles.vault')}
        icon={'help'}
        subTitle={t('titles.required')}
      />

      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        label={t('fields.start')}
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
        label={t('fields.end')}
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
        title={t('titles.preview')}
        icon={'help'}
        subTitle={t('titles.previewInfo')}
      />
      <CardPreview />

      <Divider />

      <div className="flex col-span-full gap-3">
        <Button
          className="max-w-[13rem]"
          variant={'secondary'}
          size={'md'}
          iconLeft={<Icon>backspace</Icon>}
          onClick={() => {
            setConfirmData(initialConfirmForm)
            reset(initialConfirmForm)
          }}
        >
          {t('buttons.reset')}
        </Button>
        <Button
          className="max-w-[15rem]"
          variant={'primary'}
          size={'md'}
          iconLeft={<Icon>add_circle</Icon>}
          onClick={handleSubmit(onSubmit)}
        >
          {t('buttons.create')}
        </Button>
      </div>
      <TransactionCardDialog
        className="min-h-64 max-w-sm"
        title={t2('cardDialogCreate.title')}
        subtitle={t2('cardDialogCreate.subtitle')}
        chainName={getChainName(sepolia.id)}
        info={allFormData.vaultName}
        vaultLogo={allFormData.logo}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        valueTitle={t2('cardDialogCreate.valueTitle')}
      >
        {create.steps && <Stepper steps={create.steps} />}
      </TransactionCardDialog>
    </div>
  )
}
