import { Card, Icon } from '@/ui/components'
import { twMerge } from 'tailwind-merge'
import type { Connector } from 'wagmi'
import { connectorIcons } from '../utils/connectorIcons'

interface ConnectedWalletCardProps {
  address?: string
  disconnect: () => void
  connector?: Connector
  className?: string
}

export function ConnectedWalletCard({ address, disconnect, connector, className }: ConnectedWalletCardProps) {
  return (
    <Card
      className={twMerge(
        'relative bg-black/10 h-[16rem] min-w-[17rem] px-8 py-6 flex flex-col items-center justify-center gap-4 rounded-2xl border border-blue-900/50 cursor-auto',
        className,
      )}
      variant="disabled"
    >
      {/* Logout */}
      <button onClick={disconnect} className="absolute top-3 right-3 text-gray-300 hover:text-white cursor-pointer">
        <Icon className="!text-2xl">logout</Icon>
      </button>

      {/* Wallet icon */}
      {connector && (
        <img
          src={connectorIcons[connector.id.toLowerCase()]}
          alt={connector.name}
          className="size-16 rounded-full border-2 p-2 border-blue-900/50 shadow"
        />
      )}

      {/* Wallet address */}
      <span className="text-white font-bold text-xl tracking-wide text-center break-all max-w-[14rem]">{address}</span>

      <a
        href="/profile"
        className="px-3 py-1 rounded-full bg-blue-700/40 hover:bg-blue-700/60 transition text-white text-sm flex items-center gap-1"
      >
        <Icon className="!text-base">account_circle</Icon>
        Profile
      </a>
    </Card>
  )
}
