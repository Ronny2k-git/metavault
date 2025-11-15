import { formatBigIntToNumber, formatDate, getStatus } from '@/modules/global/utils'
import { Divider, EmptyBanner, Icon, Input, Modal } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { useState } from 'react'
import type { UseFormRegister, UseFormStateReturn } from 'react-hook-form'
import { useAccount } from 'wagmi'
import { useGetAllCreatedVaults } from '../hooks'
import type { DepositSchemaType } from '../schemas/TradesSchemas'
import { getTotalVaultAmount } from '../utils'
import type { BaseCardTradeProps } from './BaseCardTrade'
import { BaseCardTrade } from './BaseCardTrade'
import { VaultCardTradeSelect } from './VaultCardTradeSelect'

interface DepositCardProps extends Omit<BaseCardTradeProps, 'children'> {
  trigger?: React.ReactNode
  disabled?: boolean
  register: UseFormRegister<DepositSchemaType>
  error?: UseFormStateReturn<DepositSchemaType>
  vaultBalance: bigint
  tokenBalance: bigint
  selectedVault: baseVaultType | null
  setSelectedVault: React.Dispatch<React.SetStateAction<baseVaultType | null>>
}

export type baseVaultType = NonNullable<Awaited<ReturnType<typeof useGetAllCreatedVaults>>['data']>['items'][number]

export function DepositCard({
  title,
  variant,
  trigger,
  register,
  error,
  vaultBalance,
  tokenBalance,
  selectedVault,
  setSelectedVault,
  disabled = false,
}: DepositCardProps) {
  const { address } = useAccount()
  const [openModal, setOpenModal] = useState(false)
  const [tempVault, setTempVault] = useState<baseVaultType | null>(null)
  const { data: createdVaults, isLoading } = useGetAllCreatedVaults({ userAddress: address! })

  // Filter the live vaults
  const activeVaults = createdVaults?.items.filter(({ startDate, endDate }) => {
    const status = getStatus({ startDate: String(startDate), endDate: String(endDate) })

    return status === 'live'
  })

  // Only pass the selected vault data when the submit button is pressed.
  const handleDepositProceed = () => {
    if (tempVault) {
      setSelectedVault(tempVault)
      setOpenModal(false)
    }
  }

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
              return (
                <VaultCardTradeSelect
                  key={index}
                  vaultLogo={vault.logo}
                  vaultName={vault.vaultName}
                  vaultDate={formatDate(vault.startDate)}
                  tokenName={vault.assetTokenSymbol || 'Unknown'}
                  amount={getTotalVaultAmount(vault, vault.swaps) || 0}
                  checked={tempVault?.id === vault.id}
                  selected={() => setTempVault(vault)}
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
          onClick={() => handleDepositProceed()}
          disabled={!tempVault}
        >
          {!tempVault ? 'Select a vault' : 'Proceed with deposit'}
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
                {formatBigIntToNumber(tokenBalance, selectedVault?.assetTokenDecimals || 0)}
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
                  {formatBigIntToNumber(vaultBalance, selectedVault?.assetTokenDecimals || 0)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseCardTrade>
  )
}
