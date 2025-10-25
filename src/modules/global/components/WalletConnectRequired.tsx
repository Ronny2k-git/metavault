import WalletConnection from '@/modules/wallet-connection/components/WalletConnection'
import { Modal } from '@/ui/components'
import { useAccount } from 'wagmi'

export function WalletConnectionRequired() {
  const account = useAccount()

  return (
    <Modal title="Connect your wallet" isOpen={!account.address}>
      <div className="flex flex-col gap-8">
        <span className="text-gray-300">To create a new token sale, you first need to connect your wallet</span>
        <WalletConnection />
      </div>
    </Modal>
  )
}
