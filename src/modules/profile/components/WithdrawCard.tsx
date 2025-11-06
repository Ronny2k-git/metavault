import { useGetTokenName } from '@/modules/global/hooks/useGetTokenName'
import { formatNumber } from '@/modules/global/utils'
import { Divider, EmptyBanner, Icon, Input, Modal } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { useState } from 'react'
import type { UseFormRegister, UseFormStateReturn } from 'react-hook-form'
import { useAccount } from 'wagmi'
import type { WithdrawSchemaType } from '../schemas/TradesSchemas'
import type { BaseCardTradeProps } from './BaseCardTrade'
import { BaseCardTrade } from './BaseCardTrade'
import { VaultCardTradeSelect } from './VaultCardTradeSelect'

interface WithdrawCardProps extends Omit<BaseCardTradeProps, 'children'> {
  trigger?: React.ReactNode
  disabled?: boolean
  register: UseFormRegister<WithdrawSchemaType>
  error?: UseFormStateReturn<WithdrawSchemaType>
}

export function WithdrawCard({ title, variant, trigger, error, register, disabled }: WithdrawCardProps) {
  const [selectedVault, setSelectedVault] = useState<number | null>(null)
  const { address } = useAccount()
  const { getTokenName } = useGetTokenName()

  return (
    <BaseCardTrade title={title} variant={disabled ? 'disabled' : variant}>
      <Modal
        className="relative shadow-2xs flex flex-col"
        title="Select Your Vault To Withdraw"
        variant={'gradient'}
        trigger={trigger}
      >
        <div className="max-h-[70vh] overflow-y-auto mb-4">
          {/* Heading */}
          <h2 className="text-lg text-gray-300 mb-4">Deposited Vaults</h2>
          <Divider />

          {!address ? (
            <EmptyBanner
              className="h-40 p-4 text-center"
              subMessage="No vaults found. Try connecting your wallet or depositing into one."
              message=""
              icon={<Icon className="!text-5xl">sentiment_dissatisfied</Icon>}
            />
          ) : (
            Array.from({ length: 3 }).map((_, index) => (
              <VaultCardTradeSelect
                key={index}
                vaultName="Test Vault Name"
                vaultDate="10/12/2025"
                tokenName="USDt"
                amount={100}
                checked={selectedVault === index}
                selected={() => setSelectedVault(index)}
              />
            ))
          )}

          <Divider />

          <div className="flex gap-2 text-[14.5px]">
            <Icon className="mt-1 text-yellow-500">error</Icon>
            <span className="text-gray-300">The withdrawal token will be the same as you deposited.</span>
          </div>
        </div>

        <Button className="h-12 mt-4 border border-blue-300" variant={'primary'} size={'md'}>
          Proceed with withdraw
        </Button>
      </Modal>

      <div className="flex flex-col gap-2">
        <Input
          label=""
          className={`-pt-0.5 bg-transparent my-0.5 -ml-2 text-4xl placeholder:opacity-50 ${disabled ? 'cursor-not-allowed' : ''}`}
          type="number"
          placeholder="0"
          disabled={disabled}
          {...register('amount')}
          error={error?.errors.amount?.message}
          showErrorStyle={false}
        />
        {!disabled && (
          <div className="flex w-full justify-between gap-4">
            <div className="flex flex-col text-sm text-gray-300">
              <p className="text-white">Balance:</p>
              {formatNumber(100)} {'USDCt'}
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
