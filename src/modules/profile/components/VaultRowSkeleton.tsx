import { Skeleton } from '@/ui/components'

export function VaulRowSkeleton() {
  return (
    <Skeleton className="flex w-full justify-between border border-purple-900/80 min-w-[40rem] items-center gap-10 h-16 rounded-md">
      <div className="w-28 h-full rounded-md" />
      <div className=" h-4 w-[5rem] rounded-md" />
      <div className=" h-4 w-[5rem] rounded-md" />
      <div className=" h-4 w-[5rem] rounded-md" />
      <div className=" h-4 w-[5rem] mr-6 rounded-md" />
    </Skeleton>
  )
}
