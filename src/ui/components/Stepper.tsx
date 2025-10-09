import type { Step } from '@/modules/global/hooks'
import { Fragment } from 'react/jsx-runtime'
import { Icon } from './Icon'

interface StepperProps extends Step {
  steps: Array<Step>
}

const STATUS_ICON: Record<Step['status'], any> = {
  pending: 'progress_activity',
  error: 'exclamation',
  idle: 'schedule',
  success: 'check',
}

export function Stepper({ steps, ...props }: StepperProps) {
  if (!steps.length) return null

  return (
    <div {...props} className="grid grid-cols-[auto,1fr] gap-2">
      {steps.map((step, index) => (
        <Fragment key={`step_${step.label}_${index}`}>
          <div className="flex gap-2 items-center">
            <Icon className="text-sm">{STATUS_ICON[step.status]}</Icon>
            <div>{step.label}</div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
