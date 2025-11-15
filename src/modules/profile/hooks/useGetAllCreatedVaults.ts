import { getAllVaultsCreated } from '@/server/getAllVaultsCreated'
import { useQuery } from '@tanstack/react-query'

export type useGetAllCreatedVaultsProps = {
  userAddress: string
  page?: number
  limit?: number
}

export function useGetAllCreatedVaults({ userAddress, page = 1, limit = 10 }: useGetAllCreatedVaultsProps) {
  return useQuery({
    queryKey: ['get-vaults', userAddress, page, limit],
    enabled: !!userAddress,
    queryFn: () => getAllVaultsCreated({ data: { userAddress, page, limit } }),
  })
}
