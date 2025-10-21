import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { FullVaultType } from '../schemas'

interface useCeateVaultonDbPayload {
  data: FullVaultType
  blockchainData: any
}

export function useCreateVaultOnDb() {
  const query = useQueryClient()

  return useMutation({
    mutationFn: async ({ data, blockchainData }: useCeateVaultonDbPayload) =>
      await fetch('/api/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, blockchainData }),
      }),
    onSuccess: () => query.invalidateQueries({ queryKey: ['get-vault'] }),
  })
}
