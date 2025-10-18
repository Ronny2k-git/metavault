'use client'

import { abreviateAddress } from '@/modules/global/utils'
import { Icon, Tooltip } from '@/ui/components'
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
      <h1 className="text-md mb-2">Ethereum Connectors</h1>

      {isConnected ? (
        <div className="flex bg-sky-600 p-2 gap-2 justify-between items-center rounded-2xl">
          <div className="flex gap-3 items-center">
            {conn && (
              <img src={connectorIcons[conn.id.toLowerCase()]} alt={`${conn.name}`} className="rounded-full size-8" />
            )}
            <span className="hover:underline text-gray-100">{abreviateAddress(address)}</span>
          </div>

          <Tooltip
            className="text-gray-200"
            trigger={
              <button className="cursor-pointer" onClick={() => disconnect()}>
                <Icon className="mx-2 !text-2xl text-gray-200">logout</Icon>
              </button>
            }
            content="Logout"
          />
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
