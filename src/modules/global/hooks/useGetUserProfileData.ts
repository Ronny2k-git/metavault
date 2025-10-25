import { getUserProfileData } from '@/server/getUserProfileData'
import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

export function useGetUserProfileData(userAddress: string) {
  const { address } = useAccount()

  return useQuery({
    queryKey: ['get-user-data', address],
    enabled: !!userAddress,
    queryFn: () => getUserProfileData({ data: { userAddress } }),
  })
}
