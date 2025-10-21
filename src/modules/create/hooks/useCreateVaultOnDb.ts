import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { FullVaultType } from '../schemas'

export function useCreateVaultOnDb() {
  const query = useQueryClient()

  return useMutation({
    mutationFn: async (data: FullVaultType) =>
      await fetch('/vault/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: () => query.invalidateQueries({ queryKey: ['get-vault'] }),
  })
}
