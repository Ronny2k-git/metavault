import type { ConfirmAndCreateFormType } from '@/modules/create/schemas'
import type { vaultStatus } from '../types'

// Function used to convert a provided value to timestamp
export const convertTimestamp = (value: Date) => {
  return Math.floor(value.getTime() / 1000)
}

// Functions used to format a date.
const dateFormatters = {
  short: new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }),
  long: new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }),
}

export function formatDate(date: Date | number, type: 'short' | 'long' = 'short') {
  if (!date) return '0/00/0000'

  return dateFormatters[type].format(date)
}

// Function used to return a status based on the provided date.
export function getStatus(date: Pick<ConfirmAndCreateFormType, 'startDate' | 'endDate'>): vaultStatus {
  if (!date.startDate || !date.endDate) return 'undefined'

  const currentDate = new Date()
  const startDate = new Date(date.startDate)
  const endDate = new Date(date.endDate)

  if (currentDate < startDate) return 'coming'
  if (currentDate >= startDate && currentDate <= endDate) return 'live'
  return 'ended'
}
