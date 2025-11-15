import type { Step } from '@/modules/global/hooks'
import { cva } from 'class-variance-authority'
import { Fragment } from 'react/jsx-runtime'
import { Icon } from './Icon'

type StepperProps = {
  steps: Array<Step>
}

const STATUS_ICON: Record<Step['status'], any> = {
  pending: 'progress_activity',
  error: 'exclamation',
  idle: 'schedule',
  success: 'check',
}

const iconStyle = cva('size-6', {
  variants: {
    status: {
      idle: 'text-sky-500',
      error: 'text-black bg-red-700 rounded-full',
      pending: 'animate-spin text-sky-500',
      success: 'text-black bg-green-500 rounded-full',
    } satisfies Record<Step['status'], string>,
  },
})

export function Stepper({ steps, ...props }: StepperProps) {
  if (!steps.length) return null

  return (
    <div {...props} className="grid grid-cols-[auto,1fr] gap-2">
      {steps.map((step, index) => (
        <Fragment key={`step_${step.label}_${index}`}>
          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2">
              <Icon className={`${iconStyle({ status: step.status })}`}>{STATUS_ICON[step.status]}</Icon>
              <div>{step.label}</div>
            </div>
            {/* Divider */}
            {index + 1 < steps.length && <div className="h-2 bg-sky-600 w-[2px] mx-2.5" />}
          </div>
        </Fragment>
      ))}
    </div>
  )
}
