import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

export function useGetVaultByUser() {
  const { address } = useAccount()

  return useQuery({
    queryKey: ['get-vault', address],
    queryFn: async () => {
      if (!address) return null

      const res = await fetch('/vault/get', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) throw new Error('Error fetching vault')
      return res.json()
    },
  })
}
