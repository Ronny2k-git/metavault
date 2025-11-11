import { Skeleton } from '@/ui/components'

export function UserTransactionRowSkeleton() {
  return (
    <Skeleton className="flex w-full justify-between px-4 py-3 items-center gap-10 rounded-2xl" variant={'black'}>
      <span className="flex gap-2 items-center">
        <div className="w-10 h-10 rounded-full" />
        <span className="flex flex-col gap-1">
          <div className="w-20 h-4 rounded-full" />
          <div className="w-30 h-4 rounded-full" />
        </span>
      </span>

      <div className=" h-4 w-30 rounded-md" />
    </Skeleton>
  )
}
