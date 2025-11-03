import { Input } from '@/ui/components'
import type { BaseCardTradeProps } from './BaseCardTrade'
import { BaseCardTrade } from './BaseCardTrade'

interface WithdrawCardProps extends Omit<BaseCardTradeProps, 'children'> {
  disabled?: boolean
}

export function WithdrawCard({ title, variant, trigger, disabled }: WithdrawCardProps) {
  return (
    <BaseCardTrade title={title} variant={disabled ? 'disabled' : variant} trigger={trigger}>
      <div className="flex flex-col gap-2">
        <Input
          label=""
          className={`-pt-2 bg-transparent -ml-2 text-4xl placeholder:opacity-50 ${disabled ? 'cursor-not-allowed' : ''}`}
          type="number"
          placeholder="0"
          disabled={disabled}
        />
        <p>- </p>
      </div>
    </BaseCardTrade>
  )
}
