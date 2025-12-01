import { twMerge } from 'tailwind-merge'

type SpinnerProps = {
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={twMerge(
        'h-5 w-5 border-2 border-purple-900/40 border-t-indigo-400/50 rounded-full animate-spin',
        className,
      )}
    />
  )
}
