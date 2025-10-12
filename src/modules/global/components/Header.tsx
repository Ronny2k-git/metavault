import { PROJECT_ROUTES } from '@/modules/global/constants'
import WalletConnection from '@/modules/wallet-connection/components/WalletConnection'
import { Icon } from '@/ui/components'
import { ClientOnly, Link, useRouter } from '@tanstack/react-router'

export default function Header() {
  const router = useRouter()
  const currentPath = router.state.location.pathname

  return (
    <header className="h-20 px-4 flex header-background text-white justify-between">
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
              <div className="hover:bg-blue-900 flex px-4 h-full items-center gap-1">
                <Icon>{route.icon}</Icon>
                {currentPath === route.path && <span className="sm:hidden">{route.label}</span>}
                <span className="max-sm:hidden">{route.label}</span>
              </div>
            </Link>
          ))}
        </div>
        <ClientOnly>
          <WalletConnection />
        </ClientOnly>
      </nav>
    </header>
  )
}
