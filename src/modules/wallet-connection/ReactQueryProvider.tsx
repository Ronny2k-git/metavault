import type { QueryClientProviderProps } from '@tanstack/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function ReactQueryAppProvider({
  children,
  ...props
}: Omit<QueryClientProviderProps, 'client'>) {
  return (
    <QueryClientProvider {...props} client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
