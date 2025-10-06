import {
  ReactQueryAppProvider,
  WagmiAppProvider,
} from '@/modules/wallet-connection'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <>
      <Toaster toastOptions={{ duration: 4000, removeDelay: 250 }} />
      <WagmiAppProvider>
        <ReactQueryAppProvider>{children}</ReactQueryAppProvider>
      </WagmiAppProvider>
    </>
  )
}
