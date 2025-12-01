import { Skeleton } from '@/ui/components'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export function VaultCardSkeleton() {
  return (
    <Skeleton className={twMerge(`w-full h-auto border border-purple-900 rounded-lg flex flex-col`)}>
      <div className={'w-full rounded-t-lg aspect-video'} />
      <div className="w-[50%] rounded-md h-4 mt-4 mx-4" />
      <div className="w-[40%] rounded-md h-4 mx-4 mt-2 mb-4" />
      <div className="grid grid-cols-2 p-4 gap-y-3 py-2 rounded-b-lg">
        {Array.from({ length: 5 }).map((_, index) => (
          <React.Fragment key={index}>
            <div className="w-[70%] rounded-md h-4 " />
            <div className="w-[60%] ml-auto rounded-md h-4 " />
            <hr className="col-span-full !text-purple-800" />
          </React.Fragment>
        ))}
        <div className="col-span-full rounded-md h-4 my-2" />
      </div>
    </Skeleton>
  )
}
