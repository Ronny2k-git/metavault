import { saveUserSwapOnDb } from '@/server/saveUserSwapOnDb'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useSaveUserSwap() {
  const query = useQueryClient()

  return useMutation({
    mutationFn: saveUserSwapOnDb,
    onSuccess: () => query.invalidateQueries({ queryKey: ['get-user-swaps'] }),
  })
}
