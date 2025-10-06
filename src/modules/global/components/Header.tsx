import { PROJECT_ROUTES } from '@/modules/global/constants'
import WalletConnection from '@/modules/wallet-connection/components/WalletConnection'
import { Link, useRouter } from '@tanstack/react-router'

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
                className: 'border-b-2 border-cyan-600',
              }}
            >
              <div className="hover:bg-blue-900 flex rounded-ful px-4 h-full items-center gap-1">
                {route.icon}
                {currentPath === route.path && (
                  <div className="sm:hidden">{route.label}</div>
                )}
                <div className="max-sm:hidden">{route.label}</div>
              </div>
            </Link>
          ))}
        </div>
        <WalletConnection />
      </nav>
    </header>
  )
}
