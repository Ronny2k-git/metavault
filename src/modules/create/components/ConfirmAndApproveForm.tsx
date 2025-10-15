import { TransactionCardDialog } from '@/modules/transactions/components'
import { Divider, Input } from '@/ui/components'
import type { CreateFormProps } from '../types'
import { CardPreview, CreateFormHeading } from './subcomponents'

interface ConfirmAndApproveFormProps extends CreateFormProps {
  className?: string
  open?:
  setIsOpen?:
}

export function ConfirmAndApproveForm({ register, setVaultData, formState }: ConfirmAndApproveFormProps) {
  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4.5">
      <CreateFormHeading className="col-span-full" title="Vault Time" icon={'help'} />

      <Input
        label="Start Date"
        type="date"
        {...register('startDate', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, startDate: event.target.value }))
          },
        })}
        error={formState.errors.startDate?.message}
      />
      <Input
        label="End Date"
        type="date"
        {...register('endDate', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, endDate: event.target.value }))
          },
        })}
        error={formState.errors.endDate?.message}
      />

      <Divider />

      <CreateFormHeading className="col-span-full" title="Card Preview" icon={'help'} />
      <CardPreview />

      <Divider />
      <TransactionCardDialog title="Create your vault" open={isModalOpen} onOpenChange={setIsModalOpen}>
        {/* {create.steps && <Stepper steps={create.steps} />} */}
      </TransactionCardDialog>
    </div>
  )
}
