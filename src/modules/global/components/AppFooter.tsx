import { GithubIcon } from '@/ui/components/icons'
import { Link } from '@tanstack/react-router'

export function AppFooter() {
  return (
    <footer className="header-background relative text-gray-300 text-sm w-full border-t border-white/10">
      <img
        className="absolute max-md:hidden max-w-4xl object-cover -top-[13rem] max-h-[32.5rem] left-1/2 -translate-1/2"
        src="/banners/footer-banner1.2.png"
      />

      <img
        className="absolute max-max-w-4xl object-cover -top-[15rem] h-[40rem] max-md:pl-10 md:pr-8 left-1/2 -translate-1/2"
        src="/banners/mascot.png"
      />

      <div className="w-full flex justify-center px-6 py-14">
        {/* Brand / Description */}
        <div className="w-full flex max-w-4xl z-40 max-sm:flex-col gap-10 justify-between ">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 mb-2">
              <img src="/homeImage.png" alt="Meta Vault" className="size-8 rounded-full border border-blue-500/40" />
              <h2 className="text-lg font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Meta Vault
              </h2>
            </div>
            <p className="text-gray-300 max-w-xs max-sm:text-center">
              Decentralized crypto vaults — secure, transparent, and built for you.
            </p>
          </div>

          {/* Web site links */}
          <div className="flex flex-col gap-2 items-center sm:items-start">
            <h3 className="text-white font-semibold mb-1">Explore</h3>
            <Link to="/" className="hover:text-blue-400 transition ">
              Home
            </Link>
            <Link to="/create-vault" className="hover:text-blue-400 transition">
              Create Vault
            </Link>
            <Link to="/profile" className="hover:text-blue-400 transition">
              Profile
            </Link>
            <a href="https://sepolia.etherscan.io/" target="_blank" className="hover:text-blue-400 transition">
              Sepolia Explorer
            </a>
          </div>

          {/* My Social Links */}
          <div className="flex flex-col gap-2 items-center sm:items-start">
            <h3 className="text-white font-semibold mb-1">Community</h3>
            <a
              href="https://github.com/Ronny2k-git"
              target="_blank"
              className="flex items-center gap-2 hover:text-blue-400 transition"
            >
              <GithubIcon /> GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 mt- pt-8 pb-8 text-center text-gray-400 text-sm">
        <p>© 2025 Meta Vault — Built on Sepolia Network</p>
        <p className="mt-1">
          Made with <span className="text-red-400">❤️</span> by Ronny
        </p>
      </div>
    </footer>
  )
}
