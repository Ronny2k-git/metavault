import WalletConnection from '@/modules/wallet-connection/components/WalletConnection'
import { Icon, Modal } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { useAccount } from 'wagmi'

export function WalletConnectionRequired() {
  const account = useAccount()

  return (
    <Modal title="" variant={'gradient'} className="flex flex-col" isOpen={!account.address}>
      {/* Animated icon */}
      <div className="flex items-center justify-center mb-6">
        <div className="bg-sky-500/10 p-6 rounded-full border border-sky-400/30 animate-pulse">
          <Icon className="!text-5xl text-sky-400">wallet</Icon>
        </div>
      </div>
      {/* Primary text */}
      <h2 className="text-xl text-center mb-2 text-white">Connect Your Wallet</h2>
      <p className="text-gray-300 text-md text-center mb-8">
        To create a new vault, you first need to connect your wallet. This ensures your assets and profile are linked
        securely.
      </p>

      <div className="flex flex-col gap-3">
        <WalletConnection
          trigger={
            <Button className="text-md" variant={'gradient'} size={'md'} iconLeft={<Icon>wallet</Icon>}>
              Connect your wallet
            </Button>
          }
        />
        <a href="/">
          <Button className="text-md" variant={'secondary'} size={'md'} iconLeft={<Icon>house</Icon>}>
            Move back to home page
          </Button>
        </a>

        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-sky-600/50 to-transparent w-full" />
      </div>
    </Modal>
  )
}
