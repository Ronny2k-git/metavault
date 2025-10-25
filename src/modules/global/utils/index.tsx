import type { ConfirmAndCreateFormType } from '@/modules/create/schemas/ConfirmAndCreateFormSchema'
import type { vaultStatus } from '../types'

// Function used to abreviate a 0x... address.
export function abreviateAddress(address: string | null | undefined) {
  if (!address) return ''
  return `${address.slice(0, 5)}...${address.slice(-4)}`.toLocaleLowerCase()
}

// Function used to convert a provided value to timestamp
export const convertTimestamp = (value: Date) => {
  return Math.floor(value.getTime() / 1000)
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

// Function used to scroll to conteiner by the provided id.
export function scrollToConteiner(id: string) {
  const element = document.getElementById(id)

  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    console.warn(`Id not found: "${id}"`)
  }
}

// Function used to return a chainId based on the provided chain name.
export function getChainId(chainName: string) {
  switch (chainName) {
    case 'Sepolia':
      return 11155111
    case 'Ethereum':
      return 1
    default:
      return 11155111
  }
}

// Function used to return a chain name based on the provided chain id.
export function getChainName(chainId: number) {
  switch (chainId) {
    case 11155111:
      return 'Sepolia'
    case 1:
      return 'Ethereum'
    default:
      return 'Sepolia'
  }
}

// Function used to format a date.
const defaultDateFormatter = {
  function: new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }),
}

export function formatDate(date: Date | number) {
  if (!date) return '0/00/0000'

  return defaultDateFormatter.function.format(date)
}

// Function used to format a number based on provided value.
const defaultNumberFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  compactDisplay: 'short',
  unitDisplay: 'narrow',
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 4,
})

export function formatNumber(value: number) {
  return defaultNumberFormatter.format(value)
}
