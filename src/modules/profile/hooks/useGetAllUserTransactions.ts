import { getAllUserTransactions } from '@/server/getAllUserTransactions'
import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

export function useGetAllUserTransactions() {
  const { address } = useAccount()

  return useQuery({
    queryKey: ['get-user-transactions', address],
    queryFn: () => getAllUserTransactions({ data: { sender: address! } }),
    enabled: !!address,
  })
}
