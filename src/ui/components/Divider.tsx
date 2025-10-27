import { twMerge } from 'tailwind-merge'

type DividerProps = {
  className?: string
}

export function Divider({ className }: DividerProps) {
  return <hr className={twMerge(`w-full border-t-2 my-4 text-cyan-500 col-span-full`, className)} />
}
