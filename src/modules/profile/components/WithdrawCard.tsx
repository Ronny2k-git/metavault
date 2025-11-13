import { formatDate, formatNumber } from '@/modules/global/utils'
import { Divider, EmptyBanner, Icon, Input, Modal } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { useState } from 'react'
import type { UseFormRegister, UseFormStateReturn } from 'react-hook-form'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'
import { useGetAllCreatedVaults } from '../hooks'
import type { WithdrawSchemaType } from '../schemas/TradesSchemas'
import { getTotalVaultAmount } from '../utils'
import type { BaseCardTradeProps } from './BaseCardTrade'
import { BaseCardTrade } from './BaseCardTrade'
import type { baseVaultType } from './DepositCard'
import { VaultCardTradeSelect } from './VaultCardTradeSelect'

interface WithdrawCardProps extends Omit<BaseCardTradeProps, 'children'> {
  trigger?: React.ReactNode
  disabled?: boolean
  register: UseFormRegister<WithdrawSchemaType>
  error?: UseFormStateReturn<WithdrawSchemaType>
  vaultBalance: bigint
  tokenBalance: bigint
  selectedVault: baseVaultType | null
  setSelectedVault: React.Dispatch<React.SetStateAction<baseVaultType | null>>
}

export function WithdrawCard({
  title,
  variant,
  trigger,
  error,
  register,
  vaultBalance,
  tokenBalance,
  selectedVault,
  setSelectedVault,
  disabled,
}: WithdrawCardProps) {
  const [openModal, setOpenModal] = useState(false)
  const [tempVault, setTempVault] = useState<baseVaultType | null>(null)
  const { address } = useAccount()
  const { data: createdVaults, isLoading } = useGetAllCreatedVaults(address!)

  // Filter the vaults that have at least some value deposited to withdraw
  const activeVaultsToWithdraw = createdVaults
    ?.map((vault) => {
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
    <BaseCardTrade title={title} variant={disabled ? 'disabled' : variant}>
      <Modal
        className="relative shadow-2xs flex flex-col"
        title="Select Your Vault To Withdraw"
        variant={'gradient'}
        trigger={trigger}
        isOpen={openModal}
        onOpenChange={setOpenModal}
      >
        <div className="max-h-[70vh] overflow-y-auto mb-4">
          {/* Heading */}
          <h2 className="text-lg text-gray-300 mb-4">Deposited Vaults</h2>
          <Divider />

          {isLoading || !address ? (
            <EmptyBanner
              className="h-40 p-4 text-center"
              subMessage="No vaults found. Try connecting your wallet or depositing into one."
              message=""
              icon={<Icon className="!text-5xl">sentiment_dissatisfied</Icon>}
            />
          ) : (
            activeVaultsToWithdraw?.map((vault, index) => (
              <VaultCardTradeSelect
                key={index}
                vaultName={vault.vaultName}
                vaultDate={formatDate(vault.startDate)}
                tokenName={vault.assetTokenSymbol!}
                amount={vault.totalDeposited}
                checked={tempVault?.id === vault.id}
                selected={() => setTempVault(vault)}
              />
            ))
          )}

          <Divider />

          <div className="flex gap-2 text-[14.5px]">
            <Icon className="mt-1 text-yellow-500">error</Icon>
            <span className="text-gray-300">The withdrawal token will be the same as you deposited.</span>
          </div>
        </div>

        <Button
          className="h-12 mt-4"
          variant={'primary'}
          size={'md'}
          onClick={() => handleWithdrawProceed()}
          disabled={!tempVault}
        >
          {!tempVault ? 'Select a vault' : 'Proceed with withdraw'}
        </Button>
      </Modal>

      <div className="flex flex-col gap-2">
        <Input
          label=""
          className={`-pt-0.5 bg-transparent my-0.5 -ml-2 text-4xl placeholder:opacity-50 ${disabled ? 'cursor-not-allowed text-gray-300' : ''}
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
                {formatNumber(Number(formatUnits(tokenBalance, selectedVault?.assetTokenDecimals || 0)))}
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
                  {formatNumber(Number(formatUnits(vaultBalance, selectedVault?.assetTokenDecimals || 0)))}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseCardTrade>
  )
}
