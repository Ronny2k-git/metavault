import { useCallback, useState } from 'react'

export type Step = {
  label?: string
  href?: string
  hash?: string
  status: 'idle' | 'pending' | 'success' | 'error'
}

export function useSteps<T extends Record<never, Step>>(initialSteps: T) {
  const [steps, setSteps] = useState<T | null>(null)

  const init = () => setSteps(initialSteps)
  const clear = () => setSteps(null)

  const update = (...payload: Array<{ id: keyof T } & Partial<Step>>) => {
    setSteps((value) => {
      if (!value) return value
      const newSteps = { ...value }

      payload.forEach(({ id, ...step }) => {
        newSteps[id] = { ...newSteps[id], ...step }
      })
      return newSteps
    })
  }

  const toStepper = useCallback(() => {
    if (!steps) return null
    return Object.values(steps).map((step) => step as Step)
  }, [steps])

  return { steps, init, clear, setSteps, update, toStepper }
}
