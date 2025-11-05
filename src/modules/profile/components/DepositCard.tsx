import { formatDate, getStatus } from '@/modules/global/utils'
import { Divider, EmptyBanner, Icon, Input, Modal } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useGetAllCreatedVaults } from '../hooks'
import type { BaseCardTradeProps } from './BaseCardTrade'
import { BaseCardTrade } from './BaseCardTrade'
import { VaultCardTradeSelect } from './VaultCardTradeSelect'

interface DepositCardProps extends Omit<BaseCardTradeProps, 'children'> {
  trigger?: React.ReactNode
  disabled?: boolean
}

export function DepositCard({ title, variant, trigger, disabled = false }: DepositCardProps) {
  const [selectedVault, setSelectedVault] = useState<number | null>(null)
  const { address } = useAccount()
  const { data: createdVaults, isLoading } = useGetAllCreatedVaults(address!)

  const activeVaults = createdVaults?.filter(({ startDate, endDate }) => {
    const status = getStatus({ startDate: String(startDate), endDate: String(endDate) })

    return status === 'live'
  })

  return (
    <BaseCardTrade title={title} variant={disabled ? 'disabled' : variant}>
      <Modal
        className="relative shadow-2xs flex flex-col"
        title="Select Your Vault To Deposit"
        variant={'gradient'}
        trigger={trigger}
      >
        <div className="max-h-[70vh] overflow-y-auto mb-4">
          <h2 className="text-lg text-gray-300 mb-4">Active Vaults to deposit</h2>
          <Divider />

          {isLoading || !address ? (
            <EmptyBanner
              className="h-40 p-4 text-center"
              subMessage="No active vaults to deposit, please create a vault or connect your wallet"
              message=""
              icon={<Icon className="!text-5xl">sentiment_dissatisfied</Icon>}
            />
          ) : (
            activeVaults?.map((vault, index) => (
              <VaultCardTradeSelect
                key={index}
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
            <span className="text-gray-300">
              The token used to deposit in the vault will be the one you provided on the creation page for specific
              vault.
            </span>
          </div>
        </div>

        <Button className="absolut h-12 border border-blue-200" variant={'primary'} size={'md'}>
          Proceed with deposit
        </Button>
      </Modal>

      <div className="flex flex-col gap-2">
        <Input
          label=""
          className={`-pt-2 bg-transparent -ml-2 text-4xl placeholder:opacity-50 ${disabled ? 'cursor-not-allowed' : ''}`}
          type="number"
          placeholder="0"
          disabled={disabled}
        />

        {!disabled && (
          <div className="flex w-full justify-between">
            <p className="text-sm">- Token Balance</p>
            <div className="text-sm flex gap-2">
              Vault: <span className="text-gray-300">selected vault name</span>
            </div>
          </div>
        )}
      </div>
    </BaseCardTrade>
  )
}
