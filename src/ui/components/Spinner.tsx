import { twMerge } from 'tailwind-merge'

type SpinnerProps = {
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={twMerge(
        'h-5 w-5 border-2 border-gray-300 border-t-sky-900 rounded-full animate-spin',
        className,
      )}
    />
  )
}
