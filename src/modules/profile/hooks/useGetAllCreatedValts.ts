import { getAllVaultsCreated } from '@/server/getAllVaultsCreated'
import { useQuery } from '@tanstack/react-query'

export function useGetAllCreatedVaults(userAddress: string) {
  return useQuery({
    queryKey: ['get-vaults', userAddress],
    enabled: !!userAddress,
    queryFn: () => getAllVaultsCreated({ data: { userAddress } }),
  })
}
