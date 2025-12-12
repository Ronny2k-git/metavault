import { formatUnits } from 'viem'

// Function used to format a number based on provided value.
const defaultNumberFormatter = new Intl.NumberFormat('en', {
  compactDisplay: 'short',
  unitDisplay: 'narrow',
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 6,
})

export function formatNumber(value: number | bigint) {
  return defaultNumberFormatter.format(value)
}

export function formatToCompactIntl(value: number | bigint, locale: string = 'en'): string {
  const formatter = new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })

  return formatter.format(value)
}
// Function format big int to number
export function formatBigIntToNumber(value: bigint, decimals: number) {
  return Number(formatUnits(value, decimals) || 0)
}
