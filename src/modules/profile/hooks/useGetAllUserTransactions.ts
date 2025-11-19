import { getAllUserTransactions, getAllUserTransactionsProps } from '@/server/getAllUserTransactions'
import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

export function useGetAllUserTransactions({ limit = 10, page }: Omit<getAllUserTransactionsProps, 'sender'>) {
  const { address } = useAccount()

  return useQuery({
    queryKey: ['get-user-transactions', address, limit, page],
    queryFn: () => getAllUserTransactions({ data: { sender: address!, limit, page } }),
    enabled: !!address,
  })
}
