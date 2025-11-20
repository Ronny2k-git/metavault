import { Card } from '@/ui/components'
import { useEffect, useState } from 'react'

type CountDownClockProps = {
  startDate: Date
  endDate: Date
}

export function CountDownClock({ startDate, endDate }: CountDownClockProps) {
  const [timeLeft, setTimeLeft] = useState(0)

  const calculateTimeLeft = () => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (now < start) {
      return start.getTime() - now.getTime()
    }
    if (now < end) {
      return end.getTime() - now.getTime()
    }
    // Finished
    return 0
  }

  const days = Math.max(Math.floor(timeLeft / 1000 / 60 / 60 / 24), 0)
  const hours = Math.max(Math.floor(timeLeft / 1000 / 60 / 60) % 24, 0)
  const minutes = Math.max(Math.floor(timeLeft / 1000 / 60) % 60, 0)
  const seconds = Math.max(Math.floor((timeLeft / 1000) % 60), 0)

  //The padStart() is used to add characters to the left of a string until it reaches a specified length
  const twoDigits = (n: number) => n.toString().padStart(2, '0')

  // Calculate timeLeft
  useEffect(() => {
    setTimeLeft(calculateTimeLeft())

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(interval)
  }, [startDate, endDate])

  return (
    <Card variant={'tertiary'} className="items-center p-4 rounded-lg">
      <div className="flex text-base gap-3">
        {days > 0 && (
          <div className="flex gap-3">
            <div className="flex flex-col items-center gap-1">
              <Card variant={'basic'} className="px-2 rounded-sm font-semibold">
                {twoDigits(days)}
              </Card>
              <span className="text-gray-200 text-xs uppercase">{days <= 1 ? 'day' : 'days'}</span>
            </div>

            <span className="opacity-50">/</span>
          </div>
        )}

        <div className="flex flex-col items-center gap-1">
          <Card className="px-2 rounded-sm font-semibold">{twoDigits(hours)}</Card>
          <span className="text-gray-200 text-xs uppercase">{hours <= 1 ? 'hour' : 'hours'}</span>
        </div>
        <span className="opacity-50">:</span>
        <div className="flex flex-col items-center gap-1">
          <Card className="px-2 rounded-sm font-semibold">{twoDigits(minutes)}</Card>
          <span className="text-gray-200 text-xs uppercase">min</span>
        </div>
        <span className="opacity-50">:</span>

        <div className="flex flex-col items-center gap-1">
          <Card className="px-2 rounded-sm font-semibold">{twoDigits(seconds)}</Card>
          <span className="text-gray-200 text-xs uppercase">sec</span>
        </div>
      </div>
    </Card>
  )
}
