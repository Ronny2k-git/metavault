import type { ModalProps } from '@/ui/components'
import { Modal } from '@/ui/components'

export interface TransactionCardProps
  extends Omit<ModalProps, 'title' | 'trigger' | 'children'> {
  title: string
  children?: React.ReactNode
}

export function TransactionCardDialog({
  title,
  open,
  onOpenChange,
  children,
  className,
  description,
}: TransactionCardProps) {
  return (
    <Modal
      title={title}
      open={open}
      onOpenChange={onOpenChange}
      className={className}
      description={description}
    >
      <hr className="text-sky-700 border-1 mb-6" />
      {children}
    </Modal>
  )
}
