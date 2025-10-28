'use client'

import { ConnectedWalletCard } from '@/modules/global/components'
import { abreviateAddress } from '@/modules/global/utils'
import { connectorIcons } from '@/modules/global/utils/connectorIcons'
import { Button } from '@/ui/components/Button'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function EthereumConnectors() {
  const { connect, connectors } = useConnect()
  const { address, isConnected, connector: conn } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-3.5">
        <h1 className="text-md">{isConnected ? 'Your User Data' : 'Ethereum Connectors'}</h1>
        <div className="text-sm font-semibold h-7 w-40 flex items-center justify-center bg-black/15 rounded-full">
          Balance: <p className="mx-2 text-sky-400">0 sepolia</p>
        </div>
      </div>

      {isConnected ? (
        <ConnectedWalletCard address={abreviateAddress(address)} disconnect={() => disconnect()} connector={conn} />
      ) : (
        connectors.map((connector, index) => {
          const isFirst = index === 0
          const isLast = index === connectors.length - 1

          return (
            <Button
              className={`flex w-full justify-start ${isFirst ? 'rounded-t-2xl' : ''} ${isLast ? 'rounded-b-2xl' : ''}`}
              size="base"
              variant={'primary'}
              onClick={() => connect({ connector })}
              key={connector.id}
              iconLeft={
                <img
                  alt="connector icon"
                  className="rounded-full size-9.5"
                  src={connectorIcons[connector.id.toLowerCase()] ?? '/icons/default.png'}
                />
              }
            >
              {connector.name}
            </Button>
          )
        })
      )}
    </div>
  )
}
