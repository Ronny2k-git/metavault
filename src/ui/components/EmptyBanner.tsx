import { twMerge } from 'tailwind-merge'
import { Button } from './Button'

interface EmptyBannerProps {
  message: string
  subMessage?: string
  icon?: React.ReactNode
  buttonLabel?: string
  className?: string
}

export function EmptyBanner({ message, subMessage, icon, buttonLabel, className }: EmptyBannerProps) {
  return (
    <div
      className={twMerge(
        `w-full shadow-[0_0_10px_3px_rgba(255_218_255)] shadow-purple-900/40 p-16 flex relative bg-[url('/blockchain.jpg')] bg-center bg-cover rounded-4xl`,
        className,
      )}
    >
      <div className="absolute inset-0 bg-black/10 rounded-4xl" />

      <div className="w-full flex flex-col items-center z-0 gap-4">
        {icon}
        <h2 className="text-4xl max-sm:text-2xl text-center ">{message}</h2>
        {subMessage && (
          <p className="text-md sm:px-4 py-2 break-words sm:py-1 text-gray-200 rounded-full">{subMessage}</p>
        )}
        {buttonLabel && (
          <a className="w-full flex justify-center" href="/create-vault">
            <Button className="max-w-[25rem] border-0 border-b-1 border-purple-400/80" variant={'primary'} size={'lg'}>
              {buttonLabel}
            </Button>
          </a>
        )}
      </div>
    </div>
  )
}
