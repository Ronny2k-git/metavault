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
        'h-50 bg-[url(/card6.webp)] bg-center bg-cover relative justify-center px-8 rounded-lg border-blue-900',
        className,
      )}
    >
      {connector && (
        <img
          src={connectorIcons[connector.id.toLowerCase()]}
          alt={`${connector.name}`}
          className="rounded-full size-6 absolute left-2 bottom-2"
        />
      )}

      <button className="absolute top-3 right-2 cursor-pointer hover:border-b hover:border-white" onClick={disconnect}>
        <Icon>logout</Icon>
      </button>

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <img className="h-10 w-12" src="/chip.png" />
          <Icon className="mt-1">contactless</Icon>
        </div>
        <span className="text-lg">{address}</span>
      </div>
      <div className="flex items-center gap-1 absolute bottom-2 right-2 ">
        <Icon>account_circle</Icon>
        <a href="/profile">
          <span className="hover:underline cursor-pointer">{'profile'}</span>
        </a>
      </div>
    </Card>
  )
}
