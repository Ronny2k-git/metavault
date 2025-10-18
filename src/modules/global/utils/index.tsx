import type { ConfirmAndCreateFormType } from '@/modules/create/schemas/ConfirmAndCreateFormSchema'
import type { vaultStatus } from '../types'

export function abreviateAddress(address: string | null | undefined) {
  if (!address) return ''
  return `${address.slice(0, 5)}...${address.slice(-4)}`.toLocaleLowerCase()
}

export const convertTimestamp = (value: Date) => {
  return Math.floor(value.getTime() / 1000)
}

export function getStatus(date: Pick<ConfirmAndCreateFormType, 'startDate' | 'endDate'>): vaultStatus {
  if (!date.startDate || !date.endDate) return 'undefined'

  const currentDate = new Date()
  const startDate = new Date(date.startDate)
  const endDate = new Date(date.endDate)

  if (currentDate < startDate) return 'coming'
  if (currentDate >= startDate && currentDate <= endDate) return 'live'
  return 'ended'
}

export function scrollToConteiner(id: string) {
  const element = document.getElementById(id)

  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    console.warn(`Id not found: ${id}`)
  }
}
