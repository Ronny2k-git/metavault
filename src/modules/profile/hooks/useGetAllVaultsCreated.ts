import { getAllVaultsCreated, getAllVaultsCreatedProps } from '@/server/getAllVaultsCreated'
import { useQuery } from '@tanstack/react-query'

export function useGetAllVaultsCreated({ userAddress, page = 1, limit = 10, live = true }: getAllVaultsCreatedProps) {
  return useQuery({
    queryKey: ['vaults', userAddress, page, limit, live],
    enabled: !!userAddress,
    queryFn: () => getAllVaultsCreated({ data: { userAddress, page, limit, live } }),
  })
}
