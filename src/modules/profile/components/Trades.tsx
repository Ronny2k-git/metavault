import { useGetTokenBalance, useGetTokenDecimals, useGetVaultBalance } from '@/modules/global/hooks'
import { Card, Divider, Icon, Input, Spinner } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { Address } from 'viem'
import { formatUnits, parseUnits } from 'viem'
import { useAccount } from 'wagmi'
import { useDeposit, useGetAllUserTransactions, useSaveUserSwap, useValidateTransactions, useWithdraw } from '../hooks'
import type { DepositSchemaType, WithdrawSchemaType } from '../schemas/TradesSchemas'
import { DepositSchema, WithdrawSchema } from '../schemas/TradesSchemas'
import type { baseVaultType } from './DepositCard'
import { DepositCard } from './DepositCard'
import { ProfileHeading } from './ProfileHeading'
import { UserCardRowTrades } from './UserCardRowTrades'
import { WithdrawCard } from './WithdrawCard'

export function Trades() {
  const [activeCard, setActiveCard] = useState<'Deposit' | 'Withdraw' | null>('Deposit')
  const [selectedVault, setSelectedVault] = useState<baseVaultType | null>(null)
  const [tempVault, setTempVault] = useState<baseVaultType | null>(null)
  const [searchTransaction, setSearchTransaction] = useState('')
  const [transactionsPage, setTransactionsPage] = useState(1)
  const account = useAccount()
  const queryClient = useQueryClient()
  const { data: userTransactions, isLoading } = useGetAllUserTransactions({ limit: 6, page: transactionsPage })

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
    onSuccess: () => {
      refetchVaultBalance()
      refetchTokenBalance()
      depositForm.reset()
    },
  })
  const { withdraw, status: withdrawStatus } = useWithdraw({
    onSuccess: () => {
      refetchVaultBalance()
      refetchTokenBalance()
      withdrawForm.reset()
    },
  })

  // Deposit Form
  const depositForm = useForm<DepositSchemaType>({
    resolver: zodResolver(DepositSchema),
    defaultValues: { amount: 0 },
  })
  // Withdraw Form
  const withdrawForm = useForm<WithdrawSchemaType>({
    resolver: zodResolver(WithdrawSchema),
    defaultValues: { amount: 0 },
  })

  // Deposit functionality
  const handleDeposit = async (data: DepositSchemaType) => {
    if (!selectedVault) {
      console.error('No vault selected')
      return
    }
    const decimals = await tokenDecimals()

    // 1. Validate transaction
    const validationError = error.validate(data.amount, 'deposit')
    if (validationError) {
      depositForm.setError('amount', { message: validationError })
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
    const validationError = error.validate(data.amount, 'withdraw')
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

  // TO DO

  // A FUNCTION TO FORMAT THE NUMBERS FOR DEPOSIT AND WITHDRAW

  return (
    <div className="h-full w-full flex flex-col relative">
      <Divider />

      <div className="flex flex-col w-full gap-8 my-12">
        <h1 className="sm:text-4xl text-3xl text-center">
          Deposit or Withdraw <br /> <span className="sm:text-3xl text-2xl text-gray-300">(anytime, anywhere)</span>
        </h1>
        <h2 className="flex items-center justify-center gap-2 text-gray-300 ">
          <Icon className="text-yellow-500 ">error</Icon>
          Deposits are only allowed in live vaults
        </h2>
        <div className="w-full flex flex-col items-center gap-8">
          <Card
            variant={'gradient'}
            className="relative w-full max-w-[30rem] min-h-81 flex flex-col items-center p-2 gap-2 rounded-3xl "
          >
            <button
              className={`absolute ${activeCard === 'Deposit' ? 'top-44' : 'top-31'} z-1 h-11 w-11 bg-gray-900 hover:bg-black/40 flex items-center rounded-xl justify-center 
            cursor-pointer border-2 border-purple-900/50`}
              onClick={() => {
                setActiveCard(activeCard === 'Deposit' ? 'Withdraw' : 'Deposit')
                depositForm.reset()
                withdrawForm.reset()
                setTempVault(null)
                setSelectedVault(null)
              }}
            >
              <Icon>Arrow_Downward</Icon>
            </button>

            {/* Deposit in a vault */}
            <DepositCard
              title="Deposit"
              variant={'secondary'}
              disabled={activeCard === 'Withdraw'}
              trigger={
                activeCard === 'Deposit' && (
                  <Button className={`absolute right-6 h-7 max-w-32 rounded-3xl text-sm`}>Select Vault</Button>
                )
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

            {/* Withdraw in a vault */}
            <WithdrawCard
              title="Withdraw"
              variant={'secondary'}
              disabled={activeCard === 'Deposit'}
              trigger={
                activeCard === 'Withdraw' && (
                  <Button className={`absolute right-6 h-7 max-w-32 rounded-3xl text-sm`}>Select Vault</Button>
                )
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
            <Button
              className="text-lg flex gap-2"
              variant={'primary'}
              size={'xl'}
              onClick={() => {
                if (activeCard === 'Deposit') {
                  depositForm.handleSubmit(handleDeposit)()
                } else {
                  withdrawForm.handleSubmit(handleWithdraw)()
                }
              }}
              disabled={!selectedVault || !!depositStatus || !!withdrawStatus}
            >
              {/*Spinner */}
              {(activeCard === 'Deposit' && depositStatus) || (activeCard === 'Withdraw' && withdrawStatus) ? (
                <Spinner className="size-6.5" />
              ) : null}

              {/*Button Label */}
              {selectedVault
                ? activeCard === 'Deposit'
                  ? depositStatus || 'Deposit'
                  : withdrawStatus || 'Withdraw'
                : 'Select a vault'}
            </Button>
          </Card>
          <p className="text-center max-sm:text-base text- max-w-[30rem] text-gray-300 mb-4">
            Deposit or withdraw in a vault on sepolia ethereum network anytime, anywhere
          </p>
        </div>
        <Divider />

        {/* User Transactions */}
        <section>
          <ProfileHeading
            id="user-transactions-heading"
            className="mt-12 max-sm:mb-4"
            icon={<Icon className="!text-4xl">live_tv</Icon>}
            title="User Transactions"
            valueLabel="Total User Transactions"
            value={userTransactions?.total || 0}
          />

          <Input
            className="w-full sm:max-w-[27rem]"
            iconLeft={<Icon className="text-indigo-300">search</Icon>}
            inputSize={'sm'}
            label="Search transaction"
            placeholder="Search your transactions by type and tx hash"
            value={searchTransaction}
            onChange={(e) => setSearchTransaction(e.target.value)}
          />

          <UserCardRowTrades
            className="mt-8"
            key={'user-recent-transactions'}
            searchTransaction={searchTransaction}
            page={transactionsPage}
            userTransactions={userTransactions!}
            onPageChange={setTransactionsPage}
            isLoading={isLoading}
          />
        </section>
      </div>
    </div>
  )
}
