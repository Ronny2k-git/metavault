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

  //   TO DO LATER:

  // 1 ALL THE BLUE COLORS ON THE SITE
  // 2 ADD A LOGO INSIDE THE TOPBAR AND CHANGE IT TO USE JUSTIFY BETWEEN
  // 3 UPDATE THE BANNERS TO PURPLE (Skeleton, EmptyBanner, HomePage,  )
  // 4 UPDATE COLOR FOR PRIMARY AND SECONDARY CARDS AND BUTTONS
  // 5 REUSE THE BRANDLOGO COMPONENT WHERE IT'S NECESSARY.
  //   MODIFY THE INPUT TO UPDATE THE USER WALLET ADDRESS IN EDIT PROFILE TAB.

  return (
    <header className=" w-full h-20 px-4 flex header-background text-white justify-between">
      <nav className="w-full flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex gap- h-full ">
          {PROJECT_ROUTES.map((route) => (
            <Link
              to={route.path}
              key={route.path}
              activeProps={{
                className: 'border-b-2 border-white',
              }}
            >
              <div className="hover:bg-purple-950/30 flex px-4 h-full items-center gap-2">
                <Icon>{route.icon}</Icon>
                {currentPath === route.path && <span className="sm:hidden">{route.label}</span>}
                <span className="max-sm:hidden">{route.label}</span>
              </div>
            </Link>
          ))}
        </div>
        <ClientOnly>
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
                    className={` !text-3xl mt-2 ${connectedWallet ? 'text-purple-800/50 hover:text-purple-800/80' : 'text-gray-300 hover:text-gray-400'} cursor-pointer`}
                  >
                    wallet
                  </Icon>
                </div>
              </div>
            }
          />
        </ClientOnly>
      </nav>
    </header>
  )
}
