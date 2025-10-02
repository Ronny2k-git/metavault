import { Link, createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <header className="h-[calc(100vh-88px)] flex flex-col gap-1 items-center bg-center justify-center bg-cover bg-[url(/web3.jpg)] text-white">
      <img
        src={logo}
        className="h-[40vmin] animate-[spin_20s_linear_infinite]"
        alt="logo"
      />
      <div className="flex gap-2 items-center">
        <img
          className="size-14 bg-cover bg-center rounded-full animate-[spin_10s_linear_infinite]"
          src={'/icon.png'}
          alt="icon"
        />
        <h1 className="text-5xl">Meta Vault</h1>
      </div>
      <h2 className="text-2xl">Decentralized. Secure. Yours.</h2>
      <h2 className="text-xl">
        Create your vault and secure your crypto today.
      </h2>
      <Link className="flex max-w-[28rem] w-full" to="/contract-interaction">
        <button
          type="button"
          className="p-4 m-2 text-xl w-full bg-rose-900 hover:bg-rose-800 rounded-full"
        >
          Start now
        </button>
      </Link>
    </header>
  )
}
