// Function used to abreviate a 0x... address.
export function abreviateAddress(address: string | null | undefined) {
  if (!address) return ''
  return `${address.slice(0, 5)}...${address.slice(-4)}`.toLocaleLowerCase()
}

// Function used to format the first letter of a word
export function toUpperCaseFirst(text: string) {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}
