import { twMerge } from 'tailwind-merge'

type DividerProps = {
  className?: string
}

export function Divider({ className }: DividerProps) {
  return <div className={twMerge(`w-full h-0.5 my-4 bg-cyan-500 col-span-full`, className)} />
}
