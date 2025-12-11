import WalletConnection from '@/modules/wallet-connection/components/WalletConnection'
import { Icon, Modal } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'

export function WalletConnectionRequired() {
  const account = useAccount()
  const { t } = useTranslation('create')

  return (
    <Modal title="" variant={'gradient'} className="flex flex-col max-w-sm" isOpen={!account.address}>
      {/* Animated icon */}
      <div className="flex items-center justify-center mb-6">
        <div className="bg-indigo-500/20 px-6 py-5 rounded-full border border-indigo-400 animate-pulse">
          <Icon className="!text-5xl text-indigo-400">wallet</Icon>
        </div>
      </div>
      {/* Primary text */}
      <h2 className="text-xl text-center mb-2 text-white">{t('WalletConnectionRequired.title')}</h2>
      <p className="text-gray-300 text-md text-center mb-8">{t('WalletConnectionRequired.desc')}</p>

      <div className="flex flex-col gap-3">
        <WalletConnection
          trigger={
            <Button className="text-md" variant={'gradient'} size={'md'} iconLeft={<Icon>wallet</Icon>}>
              {t('WalletConnectionRequired.walletButton')}
            </Button>
          }
        />
        <a href="/">
          <Button className="text-md" variant={'secondary'} size={'md'} iconLeft={<Icon>house</Icon>}>
            {t('WalletConnectionRequired.moveButton')}
          </Button>
        </a>

        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-purple-700 to-transparent w-full" />
      </div>
    </Modal>
  )
}
