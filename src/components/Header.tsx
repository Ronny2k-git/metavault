import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-6 flex gap-2 bg-[url(/web3.jpg)] bg-cover text-white justify-between">
      <nav className="w-full flex flex-row items-center justify-center gap-12">
        <div className="font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="font-bold">
          <Link to="/contract-interaction">Start - Contract Interaction</Link>
        </div>

        <div className="font-bold">
          <Link to="/api-request">Start - API Request</Link>
        </div>

        <button className="p-2 px-4 bg-rose-900 hover:bg-rose-800 rounded-lg">
          Connect Wallet
        </button>
      </nav>
    </header>
  )
}
