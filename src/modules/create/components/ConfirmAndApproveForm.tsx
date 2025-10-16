import { TransactionCardDialog } from '@/modules/transactions/components'
import { Divider, Icon, Input } from '@/ui/components'
import type { Dispatch, SetStateAction } from 'react'
import type { CreateFormProps } from '../types'
import { CardPreview, CreateFormHeading } from './subcomponents'

interface ConfirmAndApproveFormProps extends CreateFormProps {
  className?: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function ConfirmAndApproveForm({
  register,
  setVaultData,
  formState,
  isOpen,
  setIsOpen,
}: ConfirmAndApproveFormProps) {
  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4.5">
      <Divider />

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

      <div className="flex col-span-full gap-3">
        <button
          className="h-10 w-[10rem] flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 rounded-4xl cursor-pointer"
          // onClick={() => {
          //   setVaultData(initialVaultForm)
          //   reset()
          // }}
        >
          <Icon>backspace</Icon>
          Reset fields
        </button>
        <button
          className="h-10 w-[15rem] flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 rounded-4xl cursor-pointer"
          // onClick={handleSubmit(onSubmit)}
        >
          <Icon>add_circle</Icon>
          Create a vault
        </button>
      </div>
      <TransactionCardDialog title="Create your vault" isOpen={isOpen} onOpenChange={setIsOpen}>
        {/* {create.steps && <Stepper steps={create.steps} />} */}
      </TransactionCardDialog>
    </div>
  )
}
