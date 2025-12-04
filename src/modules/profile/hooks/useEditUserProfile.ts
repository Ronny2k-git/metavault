import { editUserProfileOnDb } from '@/server/editUserProfileOnDb'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useEditUserProfile() {
  const query = useQueryClient()

  return useMutation({
    mutationFn: editUserProfileOnDb,
    onSuccess: () => query.invalidateQueries({ queryKey: ['get-user-data'] }),
  })
}
