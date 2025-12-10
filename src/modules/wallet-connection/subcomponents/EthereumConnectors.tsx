'use client'

import { ConnectedWalletCard } from '@/modules/global/components'
import { abreviateAddress } from '@/modules/global/utils'
import { connectorIcons } from '@/modules/global/utils/connectorIcons'
import { Button } from '@/ui/components/Button'
import { useTranslation } from 'react-i18next'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export type EthereumConnectorsProps = {
  title: string
}

export function EthereumConnectors() {
  const { connect, connectors } = useConnect()
  const { address, isConnected, connector: conn } = useAccount()
  const { disconnect } = useDisconnect()
  const { t } = useTranslation('global', { keyPrefix: 'header.walletConnection' })

  return (
    <div className="flex flex-col gap-2 max-h-[18rem] overflow-y-auto">
      <h1 className="text-md mb-2">{isConnected ? t('connectedTitle') : `${t('connectors')}`}</h1>

      {isConnected ? (
        <ConnectedWalletCard
          address={abreviateAddress(address)}
          disconnect={() => disconnect()}
          connector={conn}
          titleButton={t('connectedTitleButton')}
        />
      ) : (
        connectors.map((connector, index) => {
          const isFirst = index === 0
          const isLast = index === connectors.length - 1

          return (
            <Button
              className={`flex w-full justify-start ${isFirst ? 'rounded-t-xl' : ''} ${isLast ? 'rounded-b-xl' : ''}`}
              size="base"
              variant={'primary'}
              onClick={() => connect({ connector })}
              key={connector.id}
              iconLeft={
                <img
                  alt="connector icon"
                  className="rounded-full size-8.5"
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
