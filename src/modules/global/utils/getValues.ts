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
