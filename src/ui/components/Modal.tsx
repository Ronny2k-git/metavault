import { Dialog } from 'radix-ui'
import { RiCloseLine } from 'react-icons/ri'

type ModalProps = {
  title: React.ReactNode
  description?: React.ReactNode
  trigger: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function Modal({
  title,
  description,
  trigger,
  className,
  children,
}: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-xs" />
        <Dialog.Content className={className} asChild>
          <div
            className="background-modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col 
            h-auto w-full max-w-sm py-6 px-4 sm:px-6 rounded-xl text-white"
          >
            <Dialog.Close>
              <RiCloseLine className="absolute size-6 top-4 right-4 cursor-pointer text-white" />
            </Dialog.Close>

            <Dialog.Title className="text-xl pr-8 mb-6">{title}</Dialog.Title>
            <Dialog.Description className="pr-8">
              {description}
            </Dialog.Description>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
