import { AppFooter } from '@/modules/global/components'
import { Providers } from '@/modules/global/components/Providers'
import { NotFoundPage } from '@/ui/components'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { HeadContent, Scripts, createRootRoute, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
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
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent() {
    return <NotFoundPage />
  },
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { isLoading } = useRouterState()

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0..200"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          {/* Loading Overlay */}
          {isLoading && (
            <div
              className="fixed inset-0 flex items-center justify-center
                        bg-black/70 backdrop-blur-sm z-[9999]"
            >
              <div className="animate-spin h-12 w-12 border-4 border-blue-400 border-t-transparent rounded-full"></div>
            </div>
          )}
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
