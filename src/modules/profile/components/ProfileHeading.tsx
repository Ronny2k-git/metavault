import { twMerge } from 'tailwind-merge'

type ProfileHeadingProps = {
  id?: string
  icon: React.ReactNode
  title: string
  subtitle?: string
  valueLabel?: string
  value?: number
  className?: string
}

export function ProfileHeading({ id, icon, title, subtitle, valueLabel, value, className }: ProfileHeadingProps) {
  return (
    <div id={id} className={twMerge('w-full flex gap-4 justify-between max-sm:flex-col', className)}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          {icon}
          <h1 className="text-3xl">{title}</h1>
        </div>
        <h2 className="text-base sm:mb-8 text-gray-300 text-center">{subtitle}</h2>
      </div>
      <div className="flex flex-col items-center text-center mx-2 max-sm:mb-8">
        <span className="text-lg">{valueLabel}</span>
        <div className="text-2xl text-indigo-300">{value}</div>
      </div>
    </div>
  )
}
