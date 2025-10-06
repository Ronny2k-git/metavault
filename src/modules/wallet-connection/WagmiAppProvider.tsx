import React from 'react'
import type { WagmiProviderProps } from 'wagmi'
import { WagmiProvider } from 'wagmi'
import { wagmiAppConfig } from './wagmi'

export interface WagmiAppProviderProps
  extends Omit<WagmiProviderProps, 'config'> {
  children: React.ReactNode
}

export function WagmiAppProvider({
  children,
  ...props
}: WagmiAppProviderProps) {
  return (
    <WagmiProvider {...props} config={wagmiAppConfig}>
      {children}
    </WagmiProvider>
  )
}
