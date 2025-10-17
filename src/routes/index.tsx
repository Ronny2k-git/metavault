import { Button } from '@/ui/components/Button'
import { Link, createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <header className="page background flex flex-col items-center bg-center justify-center text-white">
      <img src={logo} className="h-[40vmin] min-h-52 animate-[spin_20s_linear_infinite]" alt="logo" />
      <div className="flex gap-2 mb-4 items-center">
        <img
          className="size-12 bg-cover bg-center rounded-full animate-[spin_10s_linear_infinite]"
          src={'/icon.png'}
          alt="icon"
        />
        <h1 className="text-5xl">Meta Vault</h1>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl">Decentralized. Secure. Yours.</h2>
        <h3 className="text-xl text-gray-200">Create your vault and secure your crypto today.</h3>
      </div>
      <Link className="flex max-w-[28rem] w-full mt-4" to="/create-vault">
        <Button variant={'primary'} size={'xl'}>
          Start Now
        </Button>
      </Link>
    </header>
  )
}
