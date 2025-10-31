import type { VariantProps } from 'class-variance-authority'
import { Dialog } from 'radix-ui'
import { RiCloseLine } from 'react-icons/ri'
import type { cardStyle } from './Card'
import { Card } from './Card'

type cardVariants = VariantProps<typeof cardStyle>

export type ModalProps = {
  title: React.ReactNode
  description?: React.ReactNode
  variant?: cardVariants['variant']
  trigger?: React.ReactNode
  className?: string
  children?: React.ReactNode
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Modal({
  isOpen,
  defaultOpen,
  onOpenChange,
  title,
  description,
  variant,
  trigger,
  className,
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20" />
        <Dialog.Content className={className} asChild>
          <Card
            variant={variant}
            className="fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 max-w-sm py-6 px-4 sm:px-6 rounded-xl"
          >
            <Dialog.Close>
              <RiCloseLine className="absolute size-6 top-4 right-4 cursor-pointer text-white" />
            </Dialog.Close>

            <Dialog.Title className="text-xl pr-8 mb-6">{title}</Dialog.Title>
            <Dialog.Description className="pr-8">{description}</Dialog.Description>
            {children}
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
