import { getAllVaultsCreated } from '@/server/getAllVaultsCreated'
import { useQuery } from '@tanstack/react-query'

export function useGetAllCreatedVaults() {
  return useQuery({
    queryKey: ['get-vaults'],
    queryFn: getAllVaultsCreated,
  })
}
