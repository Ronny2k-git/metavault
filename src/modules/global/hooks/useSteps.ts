import { useState } from 'react'

export type useStepProps = {
  label?: string
  href?: string
  hash?: string
  status:
    | 'idle'
    | 'pending'
    | 'success'
    | 'waiting_user'
    | 'waiting_confirmation'
    | 'error'
}

export function useSteps<T extends useStepProps>(initialSteps: T) {
  const [steps, setSteps] = useState<T | null>(null)

  const init = () => setSteps(initialSteps)
  const clear = () => setSteps(null)

  return {}
}
