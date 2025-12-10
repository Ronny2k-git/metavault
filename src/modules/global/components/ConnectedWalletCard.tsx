import { Card, Icon } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { twMerge } from 'tailwind-merge'
import type { Connector } from 'wagmi'
import { connectorIcons } from '../utils/connectorIcons'

interface ConnectedWalletCardProps {
  address?: string
  disconnect?: () => void
  connector?: Connector
  titleButton: string
  className?: string
}

export function ConnectedWalletCard({
  address,
  disconnect,
  connector,
  titleButton,
  className,
}: ConnectedWalletCardProps) {
  return (
    <Card
      className={twMerge(
        'relative bg-black/10 h-[14rem] min-w-[14rem] px-8 py-6 flex flex-col items-center justify-center gap-4 rounded-2xl border border-purple-900/50 cursor-auto',
        className,
      )}
      variant="disabled"
    >
      {/* Logout */}
      {disconnect && (
        <button onClick={disconnect} className="absolute top-3 right-3 text-gray-300 hover:text-white cursor-pointer">
          <Icon className="!text-2xl">logout</Icon>
        </button>
      )}

      {/* Wallet icon */}
      {connector && (
        <img
          src={connectorIcons[connector.id.toLowerCase()]}
          alt={connector.name}
          className="size-16 rounded-full border-2 p-2 border-purple-900/50 shadow"
        />
      )}

      {/* Wallet address */}
      <span className="text-white font-bold text-xl tracking-wide text-center break-all max-w-[14rem]">{address}</span>

      <a href="/profile">
        <Button
          className="rounded-full text-base h-8 max-w-24"
          iconLeft={<Icon className="!text-xl">account_circle</Icon>}
          variant={'primary'}
        >
          {titleButton}
        </Button>
      </a>
    </Card>
  )
}
