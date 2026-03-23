import '@/i18n'
import { AppFooter } from '@/modules/global/components'
import { Providers } from '@/modules/global/components/Providers'
import { NotFoundPage } from '@/ui/components'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import React from 'react'
import Header from '../modules/global/components/Header'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Meta Vault',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/icon.webp' },
      { rel: 'preload', as: 'image', href: '/banners/header-banner3.webp' },
      { rel: 'preload', as: 'image', href: '/banners/vault.webp' },
      { rel: 'preload', as: 'image', href: '/banners/secondary-banner.webp' },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent() {
    return <NotFoundPage />
  },
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="A decentralized platform that lets users create secure vaults to store and manage their crypto tokens safely and efficiently."
        />

        <HeadContent />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Header />

          {children}

          <AppFooter />
          <TanStackDevtools
            config={{
              position: 'bottom-left',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
          <Scripts />
        </Providers>
      </body>
    </html>
  )
}
