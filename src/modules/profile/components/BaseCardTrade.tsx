import type { cardStyle } from '@/ui/components'
import { Card, Modal } from '@/ui/components'
import type { VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export type BaseCardTradeProps = {
  children?: React.ReactNode
  title: 'Deposit' | 'Withdraw'
  trigger?: React.ReactNode
  className?: string
} & VariantProps<typeof cardStyle>

export function BaseCardTrade({ children, variant, title, trigger, className }: BaseCardTradeProps) {
  return (
    <Card variant={variant} className={twMerge('h-34 p-4 rounded-3xl', className)}>
      <div className="flex w-full items-center justify-between">
        <p className="text-gray-300 text-[15px] mb-1">{title}</p>
        <Modal title="" trigger={trigger} />
      </div>
      {children}
    </Card>
  )
}
