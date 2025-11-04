import { Divider, Input, Modal } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import type { BaseCardTradeProps } from './BaseCardTrade'
import { BaseCardTrade } from './BaseCardTrade'
import { VaultCardTradeSelect } from './VaultCardTradeSelect'

interface WithdrawCardProps extends Omit<BaseCardTradeProps, 'children'> {
  trigger?: React.ReactNode
  disabled?: boolean
}

export function WithdrawCard({ title, variant, trigger, disabled }: WithdrawCardProps) {
  return (
    <BaseCardTrade title={title} variant={disabled ? 'disabled' : variant}>
      <Modal
        className="relative shadow-2xs flex flex-col"
        title="Select Your Vault To Withdraw"
        variant={'gradient'}
        trigger={trigger}
      >
        <div className="max-h-[70vh] overflow-y-auto mb-4">
          <h2 className="text-lg text-gray-300 mb-4">Deposited Vaults</h2>
          <Divider />

          {Array.from({ length: 3 }).map((_, index) => (
            <VaultCardTradeSelect key={index} vaultName="Test Vault Name" vaultDate="10/12/2025" amount={10} />
          ))}

          <Divider />
        </div>

        <Button className="absolut h-12 border border-blue-200" variant={'primary'} size={'md'}>
          Proceed with withdraw
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
        <p>- Balance Here</p>
      </div>
    </BaseCardTrade>
  )
}
