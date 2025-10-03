import { Link, createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <header className="page background flex flex-col gap-1 items-center bg-center justify-center text-white">
      <img
        src={logo}
        className="h-[40vmin] min-h-52 animate-[spin_20s_linear_infinite]"
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
      <Link className="flex max-w-[28rem] w-full" to="/create-vault">
        <button
          type="button"
          className="p-4 text-xl w-full bg-sky-600 hover:bg-sky-500 rounded-full"
        >
          Start now
        </button>
      </Link>
    </header>
  )
}
