import type { ModalProps } from '@/ui/components'
import { Card, Modal } from '@/ui/components'

export interface TransactionCardProps extends Omit<ModalProps, 'title' | 'trigger' | 'children'> {
  title: string
  subtitle?: string
  chainName?: string
  info?: string
  vaultLogo?: string
  valueTitle?: string
  value?: number
  tokenSymbol?: string
  children?: React.ReactNode
}

export function TransactionCardDialog({
  title,
  subtitle,
  isOpen,
  onOpenChange,
  chainName,
  info,
  vaultLogo,
  valueTitle,
  value,
  tokenSymbol,
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
        <span className="text-indigo-300 text-[15px]">{subtitle}</span>

        <div className="flex flex-col items-end text-lg gap-2">
          <span className="text-indigo-300 text-sm text-end">{chainName}</span>
          <div className="flex gap-2">
            {info}{' '}
            {vaultLogo && (
              <img alt="vault-logo" src={vaultLogo} className="h-7 w-7 border border-purple-900 rounded-full" />
            )}
          </div>
          {value && (
            <div className="flex items-center gap-2 text-indigo-300 text-base">
              {valueTitle}: <span className="text-white ">{value}</span>
              <p>{tokenSymbol}</p>
            </div>
          )}
        </div>
      </div>

      <Card className="min-h-[6.5rem] rounded-xl p-4" variant={'disabled'}>
        {children}
      </Card>
    </Modal>
  )
}
