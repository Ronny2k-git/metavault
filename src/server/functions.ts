import { createServerFunction } from '@tanstack/start/server'

export const serverFunctions = {
  createVault: createServerFunction(async (input: { data: FullVaultType; blockchainData: { address: string } }) => {
    return createVault(input)
  }),
}
