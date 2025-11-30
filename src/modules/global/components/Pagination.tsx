import { Icon } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { scrollToConteiner } from '../utils'

export type PaginationProps = {
  page: number
  totalPages: number
  onChange: (page: number) => void
  scrollId: string
}

export function Pagination({ page, totalPages, onChange, scrollId }: PaginationProps) {
  const navigate = (p: number) => {
    onChange(p)
    requestAnimationFrame(() => scrollToConteiner(scrollId))
  }

  return (
    <div className="flex gap-2 items-center">
      {/* Left arrow */}
      <Button className="max-w-12 h-9 rounded-l-full" onClick={() => navigate(page - 1)} disabled={page === 1}>
        <Icon>keyboard_double_arrow_left</Icon>
      </Button>

      {/*First page */}
      <Button className={'w-14 h-9'} variant={page == 1 ? 'black' : 'primary'} onClick={() => navigate(1)}>
        1
      </Button>

      {/*Second page */}
      {page > 2 && page - 1 && (
        <Button className={'w-14 h-9'} variant={page == 2 ? 'black' : 'primary'} onClick={() => navigate(page - 1)}>
          {page - 1}
        </Button>
      )}

      {/* Current page, only show if the current page is greather than one */}
      {page > 1 && page < totalPages && (
        <Button className={'w-14 h-9'} variant={'black'}>
          {page}
        </Button>
      )}

      <p className="text-indigo-300 text-2xl">...</p>

      {/* Last Page */}
      {totalPages > 1 && (
        <Button
          className={'w-14 h-9'}
          variant={page === totalPages ? 'black' : 'primary'}
          onClick={() => navigate(totalPages)}
        >
          {totalPages}
        </Button>
      )}
      {/* Right arrow */}
      <Button className="max-w-12 h-9 rounded-r-full" onClick={() => navigate(page + 1)} disabled={page === totalPages}>
        <Icon>keyboard_double_arrow_right</Icon>
      </Button>
    </div>
  )
}
