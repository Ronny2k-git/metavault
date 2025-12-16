import { formatBigIntToNumber, formatDate, formatNumber } from '@/modules/global/utils'
import { Divider, EmptyBanner, Icon, Input, Modal } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { useState } from 'react'
import type { UseFormRegister, UseFormStateReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { useAccount } from 'wagmi'
import { useGetAllVaultsCreated } from '../hooks'
import type { WithdrawSchemaType } from '../schemas/OperationSchema'
import { baseVaultCardTradesProps } from '../types'
import { getTotalVaultAmount } from '../utils'
import { BaseCardTrade } from './BaseCardTrade'
import { VaultOption } from './VaultOption'

interface WithdrawCardProps extends baseVaultCardTradesProps {
  trigger?: React.ReactNode
  disabled?: boolean
  register: UseFormRegister<WithdrawSchemaType>
  error?: UseFormStateReturn<WithdrawSchemaType>
  className?: string
}

export function WithdrawCard({
  title,
  variant,
  trigger,
  error,
  register,
  vaultBalance,
  tokenBalance,
  tempVault,
  setTempVault,
  selectedVault,
  setSelectedVault,
  disabled,
  className,
}: WithdrawCardProps) {
  const [openModal, setOpenModal] = useState(false)
  const { address } = useAccount()
  const { data: availableVaults, isLoading } = useGetAllVaultsCreated({ userAddress: address!, live: true })
  const { t } = useTranslation('global')

  // Filter the live vaults that have at least some value deposited to withdraw
  const activeVaultsToWithdraw = availableVaults?.items
    .map((vault) => {
      const totalDeposited = getTotalVaultAmount(vault, vault.swaps)

      return { ...vault, totalDeposited }
    })
    .filter((vault) => vault.totalDeposited > 0)

  // Only pass the selected vault data when the submit button is pressed.
  const handleWithdrawProceed = () => {
    if (tempVault) {
      setSelectedVault(tempVault)
      setOpenModal(false)
    }
  }

  return (
    <BaseCardTrade className={twMerge('', className)} title={title} variant={disabled ? 'disabled' : variant}>
      <Modal
        className="relative shadow-2xs max-w-md"
        title="Select Your Vault To Withdraw"
        variant={'gradient'}
        trigger={trigger}
        isOpen={openModal}
        onOpenChange={setOpenModal}
      >
        <div className="max-h-[50vh] overflow-y-auto mb-4">
          {/* Heading */}
          <h2 className="text-lg text-gray-300 mb-4">Deposited Vaults</h2>
          <Divider />

          {isLoading || !address || !activeVaultsToWithdraw?.length ? (
            <EmptyBanner
              className="h-40 p-4 text-center"
              subMessage={t('emptyBanner.operation.withdraw.subMessage')}
              message=""
              icon={<Icon className="!text-5xl">sentiment_dissatisfied</Icon>}
            />
          ) : (
            activeVaultsToWithdraw?.map((vault, index) => (
              <VaultOption
                key={`${index}_${vault.id}`}
                vaultName={vault.vaultName}
                vaultDate={formatDate(vault.startDate)}
                info="Balance"
                amount={formatNumber(getTotalVaultAmount(vault, vault.swaps))}
                tokenSymbol={vault.assetTokenSymbol!}
                selected={tempVault?.id === vault.id}
                onSelect={() => setTempVault(vault)}
              />
            ))
          )}

          <Divider />
        </div>

        <div className="flex gap-2 text-[14.5px]">
          <Icon className="mt-1 text-yellow-500">error</Icon>
          <span className="text-gray-300">The withdrawal token will be the same as you deposited.</span>
        </div>

        <Button
          className="h-12 mt-4"
          variant={'primary'}
          size={'md'}
          onClick={() => handleWithdrawProceed()}
          disabled={!tempVault || !activeVaultsToWithdraw}
        >
          {!tempVault ? 'Select a vault' : 'Proceed with withdraw'}
        </Button>
      </Modal>

      <section className="flex flex-col gap-2">
        <Input
          label=""
          className={`-pt-0.5 bg-transparent border-0 my-0.5 -ml-2 text-4xl placeholder:opacity-50 ${disabled ? 'cursor-not-allowed text-gray-300' : ''}
          ${error?.errors.amount?.message ? '-mb-0.5' : ''}
          `}
          type="number"
          placeholder="0"
          disabled={disabled}
          {...register('amount', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
          error={error?.errors.amount?.message}
          showErrorStyle={false}
        />

        {!disabled && (
          <section className="flex flex-col gap-3 mt-2">
            {/* MAIN GRID */}
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-2">
              {/* BASE CARD */}
              {[
                {
                  label: 'Balance',
                  value: formatNumber(formatBigIntToNumber(tokenBalance, selectedVault?.assetTokenDecimals || 0)),
                  symbol: selectedVault?.assetTokenSymbol,
                },
                {
                  label: 'Vault',
                  vault: selectedVault?.vaultName,
                  deposited: formatNumber(formatBigIntToNumber(vaultBalance, selectedVault?.assetTokenDecimals || 0)),
                  symbol: selectedVault?.assetTokenSymbol,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-purple-950/40 px-2 py-2 max-sm:px-1 max-sm:py-1 border border-white/10"
                >
                  {/* LABEL */}
                  <p className="text-[11px] text-gray-400 mb-1 tracking-wide">{item.label}</p>

                  {/* BALANCE */}
                  {item.value && (
                    <div className="flex items-end gap-1">
                      <span className="text-green-400 text-lg font-semibold leading-none max-sm:text-base">
                        {item.value}
                      </span>
                      <span className="text-gray-300 text-xs font-medium">{item.symbol}</span>
                    </div>
                  )}

                  {/* VAULT */}
                  {item.vault && (
                    <>
                      <p className="text-indigo-300 text-xs font-semibold truncate mb-1">{item.vault}</p>
                      <div className="flex items-center gap-1 text-gray-300 text-[11px]">
                        Deposited:
                        <span className="text-green-400 text-base font-semibold leading-none ml-1">
                          {item.deposited}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* MIN/MAX GRID */}
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2  gap-2">
              {[
                { label: 'Min Withdraw', value: selectedVault?.minDeposit || 0 },
                {
                  label: 'Max Withdraw',
                  value: formatBigIntToNumber(vaultBalance, selectedVault?.assetTokenDecimals || 0),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-purple-950/40 px-2 py-2 max-sm:px-1 max-sm:py-1 border border-white/10"
                >
                  <p className="text-[11px] text-gray-400 mb-1 tracking-wide">{item.label}</p>

                  <div className="flex items-end gap-1">
                    <span className="text-green-400 text-lg font-semibold leading-none max-sm:text-base">
                      {formatNumber(Number(item.value))}
                    </span>
                    <span className="text-gray-300 text-xs font-medium">{selectedVault?.assetTokenSymbol}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
    </BaseCardTrade>
  )
}
