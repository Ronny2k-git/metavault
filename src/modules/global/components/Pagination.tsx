import { Button } from '@/ui/components/Button'

export type PaginationProps = {
  value: number
  setValue: () => void
  fields: [number]
}

export function Pagination({ value, setValue, fields }: PaginationProps) {
  return (
    <div className="flex gap-2">
      <Button className="max-w-12 h-8 rounded-l-full" disabled={value === 1} onClick={() => setValue((p) => p - 1)}>
        {'<'}
      </Button>
      <Button className="max-w-12 h-8">{value}</Button>
      <Button
        className="max-w-12 h-8 rounded-r-full"
        onClick={() => setValue((p) => p + 1)}
        disabled={value > fields.length}
      >
        {'>'}
      </Button>
    </div>
  )
}
