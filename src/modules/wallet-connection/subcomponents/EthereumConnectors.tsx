'use client'

import { abreviateAddress } from '@/modules/global/utils'
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
        <div className="text-sm flex items-center text-black bg-white rounded-full px-2">
          {!isConnected ? 'Not connected' : `${abreviateAddress(address)}`}
        </div>
      </div>
      {isConnected ? (
        <div className="flex bg-sky-600 p-2 gap-2 justify-between items-center rounded-2xl">
          {conn && (
            <img
              src={connectorIcons[conn.id.toLowerCase()]}
              alt={`${conn.name}`}
              className="rounded-full size-8"
            />
          )}
          <button
            className="h-8 w-24 rounded-full text-sm text-black bg-gray-100 hover:bg-gray-300 cursor-pointer"
            onClick={() => disconnect()}
          >
            disconnect
          </button>
        </div>
      ) : (
        connectors.map((connector) => (
          <button
            className="flex p-2 gap-2 items-center bg-sky-600 hover:bg-sky-500 rounded-xl cursor-pointer"
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            <img
              alt="connector icon"
              className="rounded-full size-7"
              src={
                connectorIcons[connector.id.toLowerCase()] ??
                '/icons/default.png'
              }
            />
            {connector.name}
          </button>
        ))
      )}
    </div>
  )
}
