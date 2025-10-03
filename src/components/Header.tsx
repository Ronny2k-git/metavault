import { PROJECT_ROUTES } from '@/modules/global/constants'
import { Link } from '@tanstack/react-router'
import { FaWallet } from 'react-icons/fa'

export default function Header() {
  return (
    <header className="h-20 px-4 flex header-background text-white justify-between">
      <nav className="w-full flex items-center max-md:justify-between justify-center gap-12">
        <div className="flex gap- h-full">
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
                {route.label}
              </div>
            </Link>
          ))}
        </div>
        <button className="hidden sm:flex p-2 px-4 md:mx-8 bg-sky-600 hover:bg-sky-500 rounded-lg">
          Connect Wallet
        </button>
        <button className="hidden max-sm:flex">
          <FaWallet className="size-6 text-cyan-300" />
          {/* color={connectedWallet ? "purple" : "white"} */}
        </button>
      </nav>
    </header>
  )
}
