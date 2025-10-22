import { createVaultOnDb } from '@/server/createVaultOnDb'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateVaultOnDb() {
  const query = useQueryClient()

  return useMutation({
    mutationFn: createVaultOnDb,
    onSuccess: () => query.invalidateQueries({ queryKey: ['get-vaults'] }),
  })
}
