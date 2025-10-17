'use client'

import { abreviateAddress } from '@/modules/global/utils'
import { Button } from '@/ui/components/Button'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function EthereumConnectors() {
  const { connect, connectors } = useConnect()
  const { address, isConnected, connector: conn } = useAccount()
  const { disconnect } = useDisconnect()

  const connectorIcons: Record<string, string> = {
    metamasksdk: '/icons/metamask.png',
    walletconnect: '/icons/walletconnect.png',
    injected: '/icons/injected.webp',
    safe: '/icons/safe.jpeg',
    'app.phantom': '/icons/phantom.jpeg',
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex max-sm:flex-col gap-2 sm:gap-6 mb-2 justify-between sm:items-center">
        <h1 className="text-md">Ethereum Connectors</h1>
        <Button className="max-h-6 max-w-36" size="sm" variant={'secondary'}>
          {!isConnected ? 'Not connected' : `${abreviateAddress(address)}`}
        </Button>
      </div>
      {isConnected ? (
        <div className="flex bg-sky-600 p-2 gap-2 justify-between items-center rounded-2xl">
          {conn && (
            <img src={connectorIcons[conn.id.toLowerCase()]} alt={`${conn.name}`} className="rounded-full size-8" />
          )}

          <Button className="max-w-24 h-8 mx-2" size="xs" variant={'white'} onClick={() => disconnect()}>
            disconnect
          </Button>
        </div>
      ) : (
        connectors.map((connector) => (
          <Button
            className=""
            size="base"
            variant={'primary'}
            onClick={() => connect({ connector })}
            key={connector.id}
            iconLeft={
              <img
                alt="connector icon"
                className="rounded-full size-7"
                src={connectorIcons[connector.id.toLowerCase()] ?? '/icons/default.png'}
              />
            }
          >
            {connector.name}
          </Button>
        ))
      )}
    </div>
  )
}
