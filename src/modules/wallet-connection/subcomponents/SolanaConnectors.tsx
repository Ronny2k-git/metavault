import { ConnectedWalletCard } from '@/modules/global/components'
import { useTranslation } from 'react-i18next'
import { useConnect } from 'wagmi'

export function SolanaConnectors() {
  const { connectors } = useConnect()
  const { t } = useTranslation('global', { keyPrefix: 'header.walletConnection' })

  const connector = connectors.find((c) => c.id === 'injected'.toLowerCase())

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-base">{t('connectors')}</h1>

      {/* Mock */}
      <ConnectedWalletCard address="Not implemented" connector={connector} />
    </div>
  )
}
