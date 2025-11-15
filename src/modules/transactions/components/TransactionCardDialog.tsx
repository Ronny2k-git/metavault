import type { ModalProps } from '@/ui/components'
import { Card, Modal } from '@/ui/components'

export interface TransactionCardProps extends Omit<ModalProps, 'title' | 'trigger' | 'children'> {
  title: string
  subtitle?: string
  chainName?: string
  info?: string
  logo?: string
  children?: React.ReactNode
}

export function TransactionCardDialog({
  title,
  subtitle,
  isOpen,
  onOpenChange,
  chainName,
  info,
  logo,
  children,
  className,
  description,
}: TransactionCardProps) {
  return (
    <Modal
      title={title}
      variant={'gradient'}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className={className}
      description={description}
    >
      <div className="flex w-full justify-between mb-8">
        <span className="text-blue-200 text-[15px]">{subtitle}</span>
        <div className="flex flex-col text-lg gap-2">
          <span className="text-blue-200 text-sm text-end">{chainName}</span>
          <div className="flex gap-2">
            {info} {logo && <img src={logo} className="h-7 w-7 border border-blue-500 rounded-full" />}
          </div>
        </div>
      </div>

      <Card className="min-h-[6.5rem] rounded-xl p-4" variant={'disabled'}>
        {children}
      </Card>
    </Modal>
  )
}
