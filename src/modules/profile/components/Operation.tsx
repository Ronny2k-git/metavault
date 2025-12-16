import { useGetTokenBalance, useGetTokenDecimals, useGetVaultBalance } from '@/modules/global/hooks'
import { Card, Divider, Icon, Input, Spinner } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { Tabs } from '@/ui/components/Tabs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { Address } from 'viem'
import { formatUnits, parseUnits } from 'viem'
import { useAccount } from 'wagmi'
import { OPERATION_TAB_INFO } from '../constants'
import { useDeposit, useGetAllUserTransactions, useSaveUserSwap, useValidateTransactions, useWithdraw } from '../hooks'
import type { DepositSchemaType, WithdrawSchemaType } from '../schemas/OperationSchema'
import { DepositSchema, WithdrawSchema } from '../schemas/OperationSchema'
import type { baseVaultType } from './DepositCard'
import { DepositCard } from './DepositCard'
import { ProfileHeading } from './ProfileHeading'
import { UserCardRowTrades } from './UserCardRowTrades'
import { WithdrawCard } from './WithdrawCard'

export function Operation() {
  const [operationTab, setOperationTab] = useState<'deposit' | 'withdraw'>('deposit')
  const [selectedVault, setSelectedVault] = useState<baseVaultType | null>(null)
  const [tempVault, setTempVault] = useState<baseVaultType | null>(null)
  const [searchTransaction, setSearchTransaction] = useState('')
  const [transactionsPage, setTransactionsPage] = useState(1)
  const account = useAccount()
  const queryClient = useQueryClient()
  const { data: userTransactions, isLoading } = useGetAllUserTransactions({ limit: 6, page: transactionsPage })
  const { t } = useTranslation('profile')
  const { t: t2 } = useTranslation('profile', { keyPrefix: 'operation' })
  const { t: tOperation } = useTranslation('profile', { keyPrefix: 'operation.cardOperations' })

  const tabList = OPERATION_TAB_INFO.map((tab) => ({
    ...tab,
    label: tOperation(tab.label),
  }))

  // Hooks used to get the token and vault values
  const { getTokenDecimal } = useGetTokenDecimals()
  const { data: vaultBalance, refetch: refetchVaultBalance } = useGetVaultBalance(selectedVault?.address as Address)
  const { data: tokenBalance, refetch: refetchTokenBalance } = useGetTokenBalance(
    selectedVault?.assetTokenAddress as Address,
  )
  const tokenAddress = selectedVault?.assetTokenAddress as Address
  const spenderAddress = selectedVault?.address as Address
  const tokenDecimals = async () => getTokenDecimal(tokenAddress)

  // Validate transaction errors
  const formattedTokenBallance = Number(formatUnits(tokenBalance || 0n, selectedVault?.assetTokenDecimals!))
  const formattedVaultBallance = Number(formatUnits(vaultBalance || 0n, selectedVault?.assetTokenDecimals!))
  const error = useValidateTransactions({
    selectedVault: selectedVault,
    tokenBalance: formattedTokenBallance || 0,
    totalDeposited: formattedVaultBallance || 0,
  })

  const saveSwap = useSaveUserSwap()
  const { deposit, status: depositStatus } = useDeposit({
    messages: {
      approve: t('status.deposit.approve'),
      simulate: t('status.deposit.simulate'),
      deposit: t('status.deposit.store'),
      success: t('status.deposit.success'),
    },
    onSuccess: () => {
      refetchVaultBalance()
      refetchTokenBalance()
      depositForm.reset()
    },
  })
  const { withdraw, status: withdrawStatus } = useWithdraw({
    messages: {
      approve: t('status.withdraw.approve'),
      simulate: t('status.withdraw.simulate'),
      withdraw: t('status.withdraw.redeem'),
      success: t('status.withdraw.success'),
    },
    onSuccess: () => {
      refetchVaultBalance()
      refetchTokenBalance()
      withdrawForm.reset()
    },
  })

  // Deposit Form
  const depositForm = useForm<DepositSchemaType>({
    resolver: zodResolver(DepositSchema),
    defaultValues: { amount: undefined },
  })
  // Withdraw Form
  const withdrawForm = useForm<WithdrawSchemaType>({
    resolver: zodResolver(WithdrawSchema),
    defaultValues: { amount: undefined },
  })

  // Deposit functionality
  const handleDeposit = async (data: DepositSchemaType) => {
    if (!selectedVault) {
      console.error('No vault selected')
      return
    }
    const decimals = await tokenDecimals()

    // 1. Validate transaction
    const transactionValidation = error.validate({ amount: data.amount, type: 'deposit' })
    if (transactionValidation) {
      depositForm.setError('amount', { message: transactionValidation })
      return null
    }

    // 2. Deposit in the vault
    const depositTx = await deposit({
      tokenAddress,
      amount: BigInt(parseUnits(data.amount.toString(), Number(decimals))),
      spenderAddress,
    })

    // 3. Save the transaction in the database
    await saveSwap.mutateAsync({
      data: {
        amount: String(parseUnits(data.amount.toString(), Number(decimals))),
        sender: String(account.address),
        txHash: String(depositTx?.hash),
        type: 'deposit',
        vaultId: selectedVault.id,
      },
    })

    // 4. Refetch the vaults and user transactions
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['get-user-transactions', account.address] }),
      queryClient.invalidateQueries({ queryKey: ['vaults', account.address] }),
    ])
  }

  // Withdraw functionality
  const handleWithdraw = async (data: WithdrawSchemaType) => {
    if (!selectedVault) {
      console.error('No vault selected')
      return
    }
    const decimals = await tokenDecimals()

    // 1. Validate transaction
    const validationError = error.validate({ amount: data.amount, type: 'withdraw' })
    if (validationError) {
      withdrawForm.setError('amount', { message: validationError })
      return null
    }

    // 2. Withdraw of a vault
    const withdrawTx = await withdraw({
      tokenAddress,
      amount: BigInt(parseUnits(data.amount.toString(), Number(decimals))),
      spenderAddress,
    })

    // 3. Save the transaction in the database
    await saveSwap.mutateAsync({
      data: {
        amount: String(parseUnits(data.amount.toString(), Number(decimals))),
        sender: String(account.address),
        txHash: String(withdrawTx?.hash),
        type: 'withdraw',
        vaultId: selectedVault.id,
      },
    })

    // 4. Refetch the vaults and user transactions
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['get-user-transactions', account.address] }),
      queryClient.invalidateQueries({ queryKey: ['vaults', account.address] }),
    ])
  }

  return (
    <div className="h-full w-full flex flex-col relative">
      <Divider className="mt-12" />

      <div className="flex flex-col w-full gap-8 my-12">
        <h1 className="sm:text-4xl text-3xl text-center">
          {t2('heading.title')} <br />{' '}
          <span className="sm:text-3xl text-2xl text-gray-300">{t2('heading.subtitle')}</span>
        </h1>
        <h2 className="flex items-center justify-center gap-2 text-gray-300 ">
          <Icon className="text-yellow-500 ">error</Icon>
          {t2('heading.warning')}
        </h2>
        <div className="w-full flex flex-col items-center gap-8">
          <Card
            variant={'gradient'}
            className="relative w-full max-w-[30rem] min-h-81 flex flex-col items-center p-2 gap-2 rounded-3xl "
          >
            <Tabs
              variant={'operation'}
              size={'operation'}
              search={operationTab}
              onValueChange={(value) => {
                setOperationTab(value as 'deposit' | 'withdraw')
                depositForm.reset()
                withdrawForm.reset()
                setTempVault(null)
                setSelectedVault(null)
              }}
              tabList={tabList}
              tabContent={[
                {
                  value: 'deposit',
                  content: (
                    <DepositCard
                      className="mt-2"
                      title={tOperation('cardLabels.deposit')}
                      variant={'secondary'}
                      trigger={
                        <Button className={`absolute right-[19.5px] h-7 max-w-32 rounded-3xl text-sm`}>
                          {tOperation('buttons.modal')}
                        </Button>
                      }
                      register={depositForm.register}
                      error={depositForm.formState}
                      tokenBalance={tokenBalance || 0n}
                      vaultBalance={vaultBalance || 0n}
                      tempVault={tempVault}
                      setTempVault={setTempVault}
                      selectedVault={selectedVault}
                      setSelectedVault={setSelectedVault}
                    />
                  ),
                },
                {
                  value: 'withdraw',
                  content: (
                    <WithdrawCard
                      className="mt-2"
                      title={tOperation('cardLabels.withdraw')}
                      variant={'secondary'}
                      trigger={
                        <Button className={`absolute right-7 h-7 max-w-32 rounded-3xl text-sm`}>
                          {tOperation('buttons.modal')}
                        </Button>
                      }
                      register={withdrawForm.register}
                      error={withdrawForm.formState}
                      tokenBalance={tokenBalance || 0n}
                      vaultBalance={vaultBalance || 0n}
                      tempVault={tempVault}
                      setTempVault={setTempVault}
                      selectedVault={selectedVault}
                      setSelectedVault={setSelectedVault}
                    />
                  ),
                },
              ]}
            />

            <Button
              className="text-lg flex gap-2"
              variant={'primary'}
              size={'xl'}
              onClick={() => {
                if (operationTab === 'deposit') {
                  depositForm.handleSubmit(handleDeposit)()
                } else {
                  withdrawForm.handleSubmit(handleWithdraw)()
                }
              }}
              disabled={!selectedVault || !!depositStatus || !!withdrawStatus}
            >
              {/* Spinner */}
              {(operationTab === 'deposit' && depositStatus) || (operationTab === 'withdraw' && withdrawStatus) ? (
                <Spinner className="size-6.5" />
              ) : null}

              {/* Button Label */}
              {selectedVault
                ? operationTab === 'deposit'
                  ? depositStatus || tOperation('buttons.transaction.deposit')
                  : withdrawStatus || tOperation('buttons.transaction.withdraw')
                : tOperation('buttons.transaction.select')}
            </Button>
          </Card>
          <p className="text-center max-sm:text-base text- max-w-[30rem] text-gray-300 mb-4">{t2('heading.info')}</p>
        </div>
        <Divider />

        {/* User Transactions */}
        <section>
          <ProfileHeading
            id="user-transactions-heading"
            className="mt-12 max-sm:mb-4"
            icon={<Icon className="!text-4xl">live_tv</Icon>}
            title={t2('transactions.heading.title')}
            valueLabel={t2('transactions.heading.info')}
            value={userTransactions?.total || 0}
          />

          <Input
            className="w-full sm:max-w-[27rem]"
            iconLeft={<Icon className="text-indigo-300">search</Icon>}
            inputSize={'sm'}
            label={t2('transactions.input.info.label')}
            placeholder={t2('transactions.input.info.placeholder')}
            value={searchTransaction}
            onChange={(e) => setSearchTransaction(e.target.value)}
          />

          <UserCardRowTrades
            className="mt-8"
            key={'user-recent-transactions'}
            searchTransaction={searchTransaction}
            page={transactionsPage}
            userTransactions={userTransactions}
            onPageChange={setTransactionsPage}
            isLoading={isLoading}
          />
        </section>
      </div>
    </div>
  )
}
