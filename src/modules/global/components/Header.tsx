import { PROJECT_ROUTES } from '@/modules/global/constants'
import WalletConnection from '@/modules/wallet-connection/components/WalletConnection'
import { Icon } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { ClientOnly, Link, useRouter } from '@tanstack/react-router'
import { useAccount } from 'wagmi'
import { abreviateAddress } from '../utils'

export default function Header() {
  const account = useAccount()
  const connectedWallet = account.address
  const router = useRouter()
  const currentPath = router.state.location.pathname

  return (
    <header className=" w-full min-h-20 h-auto max-md:p-4 px-4 flex header-background text-white justify-between">
      <nav className="w-full flex max-md:flex-col gap-8 md:gap-4 items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <img src="/icon.png" className="size-14 max-md:hidden" />

        <div className="flex h-full ">
          {PROJECT_ROUTES.map((route) => (
            <Link
              to={route.path}
              key={route.path}
              activeProps={{
                className: 'border-b-2 p-6 hover:bg-purple-950/20 border-indigo-300',
              }}
            >
              <div className="hover:bg-purple-950/20 flex px-4 h-full items-center gap-2">
                <Icon>{route.icon}</Icon>
                {currentPath === route.path && <span className="hidden max-[900px]:flex">{route.label}</span>}
                <span className="max-[900px]:hidden">{route.label}</span>
              </div>
            </Link>
          ))}
        </div>
        <ClientOnly>
          <div className="flex items-center gap-6">
            <span className="w-30 h-6 bg-gray-300 rounded-full "></span>
            <WalletConnection
              trigger={
                <div>
                  <Button
                    className="w-full px-6 hidden rounded-xl sm:flex"
                    size={'md'}
                    variant={connectedWallet ? 'primary' : 'secondary'}
                    iconLeft={<Icon>wallet</Icon>}
                  >
                    {connectedWallet ? `${abreviateAddress(account.address)}` : 'Connect Wallet'}
                  </Button>
                  <div className="sm:hidden">
                    <Icon
                      className={` !text-3xl mt-2 ${connectedWallet ? 'text-purple-800/90 hover:text-purple-700/50' : 'text-gray-300 hover:text-gray-400'} cursor-pointer`}
                    >
                      wallet
                    </Icon>
                  </div>
                </div>
              }
            />
          </div>
        </ClientOnly>
      </nav>
    </header>
  )
}
