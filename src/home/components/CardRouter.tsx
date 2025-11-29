import { Card } from '@/ui/components'
import { twMerge } from 'tailwind-merge'

export type CardRouterProps = {
  className?: string
}

export function CardRouter({ className }: CardRouterProps) {
  return <Card variant={'secondary'} className={twMerge('min-h-60 rounded-2xl', className)}></Card>
}
