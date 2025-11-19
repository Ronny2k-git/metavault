import { twMerge } from 'tailwind-merge'

type ProfileHeadingProps = {
  id?: string
  icon: React.ReactNode
  title: string
  subtitle?: string
  value?: number
  className?: string
}

export function ProfileHeading({ id, icon, title, subtitle, value, className }: ProfileHeadingProps) {
  return (
    <div id={id} className={twMerge('w-full flex gap-4 justify-between max-sm:flex-col', className)}>
      <div className="flex gap-2">
        {icon}
        <h1 className="text-3xl">{title}</h1>
      </div>
      <div className="flex flex-col items-center mx-2">
        <span className="text-lg">{subtitle}</span>
        <div className="text-2xl text-sky-400">{value}</div>
      </div>
    </div>
  )
}
