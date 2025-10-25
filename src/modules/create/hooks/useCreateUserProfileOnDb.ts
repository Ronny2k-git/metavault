import { createUserProfiletOnDb } from '@/server/createUserProfileOnDb'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateUserProfileOnDb() {
  const query = useQueryClient()

  return useMutation({
    mutationFn: createUserProfiletOnDb,
    onSuccess: () => query.invalidateQueries({ queryKey: ['get-user-data'] }),
  })
}
