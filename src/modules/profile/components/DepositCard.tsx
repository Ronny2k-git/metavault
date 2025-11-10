import { useGetTokenBalance, useGetVaultBalance } from '@/modules/global/hooks'
import { formatDate, formatNumber, getStatus } from '@/modules/global/utils'
import { Divider, EmptyBanner, Icon, Input, Modal } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { useState } from 'react'
import type { UseFormRegister, UseFormStateReturn } from 'react-hook-form'
import type { Address } from 'viem'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'
import { useGetAllCreatedVaults } from '../hooks'
import type { DepositSchemaType } from '../schemas/TradesSchemas'
import type { BaseCardTradeProps } from './BaseCardTrade'
import { BaseCardTrade } from './BaseCardTrade'
import { VaultCardTradeSelect } from './VaultCardTradeSelect'

interface DepositCardProps extends Omit<BaseCardTradeProps, 'children'> {
  trigger?: React.ReactNode
  disabled?: boolean
  register: UseFormRegister<DepositSchemaType>
  error?: UseFormStateReturn<DepositSchemaType>
  selectedVault: baseVaultType | null
  setSelectedVault: React.Dispatch<React.SetStateAction<baseVaultType | null>>
}

export type baseVaultType = NonNullable<Awaited<ReturnType<typeof useGetAllCreatedVaults>>['data']>[number]

export function DepositCard({
  title,
  variant,
  trigger,
  register,
  error,
  selectedVault,
  setSelectedVault,
  disabled = false,
}: DepositCardProps) {
  const { address } = useAccount()
  const [openModal, setOpenModal] = useState(false)
  const { data: createdVaults, isLoading } = useGetAllCreatedVaults(address!)
  const { data: vaultBalance } = useGetVaultBalance(selectedVault?.address as Address)
  const { data: tokenBalance } = useGetTokenBalance(selectedVault?.assetTokenAddress as Address)

  const activeVaults = createdVaults?.filter(({ startDate, endDate }) => {
    const status = getStatus({ startDate: String(startDate), endDate: String(endDate) })

    return status === 'live'
  })

  // TO DO LATER:

  // 4 TEST DEPOSIT AND WITHDRAW LATER

  // 5 REPLACE WITHDRAW CARD DATA (for modal also) BY THE CORRECT
  //   VALUES (balance, vaultName, token symbol and deposited)

  return (
    <BaseCardTrade className="relative" title={title} variant={disabled ? 'disabled' : variant}>
      <Modal
        isOpen={openModal}
        onOpenChange={setOpenModal}
        className="relative shadow-2xs "
        title="Select a Vault to Deposit"
        variant={'gradient'}
        trigger={trigger}
      >
        <div className="max-h-[70vh] overflow-y-auto mb-4">
          {/* Heading */}
          <h2 className="text-lg text-gray-300 mb-4">Available Vaults ( Live )</h2>
          <Divider />

          {isLoading || !address ? (
            <EmptyBanner
              className="h-40 p-4 text-center"
              subMessage="No vaults found. Try connecting your wallet or creating one"
              message=""
              icon={<Icon className="!text-5xl">sentiment_dissatisfied</Icon>}
            />
          ) : (
            activeVaults?.map((vault, index) => {
              const totalDeposited = vault.swaps
                .filter((swap) => swap.type === 'deposit')
                .reduce((acc, swap) => acc + Number(formatUnits(BigInt(swap.amount), vault.assetTokenDecimals)), 0)

              return (
                <VaultCardTradeSelect
                  key={index}
                  vaultLogo={vault.logo}
                  vaultName={vault.vaultName}
                  vaultDate={formatDate(vault.startDate)}
                  tokenName={vault.assetTokenSymbol || 'Unknown'}
                  amount={totalDeposited || 0}
                  checked={selectedVault?.id === vault.id}
                  selected={() => setSelectedVault(vault)}
                />
              )
            })
          )}

          <Divider />

          <div className="flex gap-2 text-[14.5px]">
            <Icon className="mt-1 text-yellow-500">error</Icon>
            <span className="text-gray-300">Deposits use the same token chosen when the vault was created.</span>
          </div>
        </div>

        <Button
          className="h-12 mt-4"
          variant={'primary'}
          size={'md'}
          onClick={() => setOpenModal(!openModal)}
          disabled={!selectedVault}
        >
          {!selectedVault ? 'Select a vault' : 'Proceed with deposit'}
        </Button>
      </Modal>

      <div className="flex flex-col gap-2">
        <Input
          label=""
          className={`-pt-0.5 bg-transparent -ml-2 my-0.5 text-4xl placeholder:opacity-50 ${disabled ? 'cursor-not-allowed text-gray-300' : ''}
          ${error?.errors.amount?.message ? '-mb-0.5' : ''}
          `}
          type="number"
          placeholder="0"
          disabled={disabled}
          {...register('amount', { valueAsNumber: true })}
          error={error?.errors.amount?.message}
          showErrorStyle={false}
        />

        {!disabled && (
          <div className="flex w-full justify-between gap-4">
            <div className="flex flex-col text-sm text-gray-300">
              <p className="text-white">Balance:</p>
              <div className="flex gap-2 items-center text-green-500 font-semibold text-[17px]">
                {formatNumber(Number(formatUnits(tokenBalance ?? 0n, selectedVault?.assetTokenDecimals || 0)))}
                <span className="text-gray-300 font-normal text-sm">{selectedVault?.assetTokenSymbol || ''}</span>
              </div>
            </div>

            <div className="flex flex-col text-sm">
              <div className="flex gap-2 text-gray-300">
                <span className="text-white">Vault:</span>
                {selectedVault?.vaultName || 'No selected'}
              </div>
              <div className="flex items-center gap-2 ">
                Deposited:
                <span className="text-[17px] text-green-500 font-semibold">
                  {formatNumber(Number(formatUnits(vaultBalance ?? 0n, selectedVault?.assetTokenDecimals || 0)))}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseCardTrade>
  )
}
