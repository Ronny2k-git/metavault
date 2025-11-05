import type { cardStyle } from '@/ui/components'
import { Card } from '@/ui/components'
import type { VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export type BaseCardTradeProps = {
  children?: React.ReactNode
  title: 'Deposit' | 'Withdraw'
  className?: string
} & VariantProps<typeof cardStyle>

export function BaseCardTrade({ children, variant, title, className }: BaseCardTradeProps) {
  return (
    <Card variant={variant} className={twMerge('h-42 p-4 rounded-3xl', className)}>
      <div className="flex w-full items-center justify-between">
        <p className="text-gray-300 text-lg font-semibold mb-1">{title}</p>
      </div>
      {children}
    </Card>
  )
}
