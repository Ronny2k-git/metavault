import { useGetTokenName } from '@/modules/global/hooks/useGetTokenName'
import { formatDate, formatNumber, getStatus } from '@/modules/global/utils'
import { Divider, EmptyBanner, Icon, Input, Modal } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { useState } from 'react'
import type { UseFormRegister, UseFormStateReturn } from 'react-hook-form'
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
}

export function DepositCard({ title, variant, trigger, register, error, disabled = false }: DepositCardProps) {
  const [selectedVault, setSelectedVault] = useState<number | null>(null)
  const { address } = useAccount()
  const { data: createdVaults, isLoading } = useGetAllCreatedVaults(address!)
  const { getTokenName } = useGetTokenName()

  const activeVaults = createdVaults?.filter(({ startDate, endDate }) => {
    const status = getStatus({ startDate: String(startDate), endDate: String(endDate) })

    return status === 'live'
  })

  return (
    <BaseCardTrade className="relative" title={title} variant={disabled ? 'disabled' : variant}>
      <Modal
        className="relative shadow-2xs flex flex-col"
        title="Select a Vault to Deposit"
        variant={'gradient'}
        trigger={trigger}
      >
        <div className="max-h-[70vh] overflow-y-auto mb-4">
          {/* Heading */}
          <h2 className="text-lg text-gray-300 mb-4">Available Vaults</h2>
          <Divider />

          {isLoading || !address ? (
            <EmptyBanner
              className="h-40 p-4 text-center"
              subMessage="No vaults found. Try connecting your wallet or creating one"
              message=""
              icon={<Icon className="!text-5xl">sentiment_dissatisfied</Icon>}
            />
          ) : (
            activeVaults?.map((vault, index) => (
              <VaultCardTradeSelect
                key={index}
                vaultLogo={vault.logo}
                vaultName={vault.vaultName}
                vaultDate={formatDate(vault.startDate)}
                tokenName={'USDCt'}
                amount={0}
                checked={selectedVault === index}
                selected={() => setSelectedVault(index)}
              />
            ))
          )}

          <Divider />

          <div className="flex gap-2 text-[14.5px]">
            <Icon className="mt-1 text-yellow-500">error</Icon>
            <span className="text-gray-300">Deposits use the same token chosen when the vault was created.</span>
          </div>
        </div>

        <Button className="h-12 border mt-4 border-blue-300" variant={'primary'} size={'md'}>
          Proceed with deposit
        </Button>
      </Modal>

      <div className="flex flex-col gap-2">
        <Input
          label=""
          className={`-pt-0.5 bg-transparent -ml-2 my-0.5 text-4xl placeholder:opacity-50 ${disabled ? 'cursor-not-allowed' : ''}`}
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
              {formatNumber(100000000)} {'USDC'}
            </div>

            <div className="flex flex-col text-sm">
              <div className="flex gap-2 text-gray-300">
                <span className="text-white">Vault:</span>
                Test Vault Name
              </div>
              <div className="flex items-center gap-2 ">
                Deposited:
                <span className="text-[18px] text-green-500 font-semibold">{formatNumber(10000000)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseCardTrade>
  )
}
