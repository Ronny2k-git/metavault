import { ConnectedWalletCard } from '@/modules/global/components'
import { useConnect } from 'wagmi'

export function MoveConnectors() {
  const { connectors } = useConnect()

  const connector = connectors.find((c) => c.id === 'injected')

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-md">Move Connectors</h1>

      {/*Mock */}
      <ConnectedWalletCard address="Not implemented" connector={connector} />
    </div>
  )
}
