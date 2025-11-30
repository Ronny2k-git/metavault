import { twMerge } from 'tailwind-merge'

type DividerProps = {
  className?: string
}

export function Divider({ className }: DividerProps) {
  return (
    <div className={twMerge(`w-full h-[2.5px] my-4 bg-gradient-to-r via-purple-900/50 col-span-full`, className)} />
  )
}
