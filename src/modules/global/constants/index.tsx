export const PROJECT_ROUTES = [
  {
    path: '/',
    label: 'Home',
    icon: 'home',
  },
  {
    path: '/create-vault',
    label: 'Create - Vault',
    icon: 'Add',
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: 'Enhanced_Encryption',
  },
]

export const ECOSYSTEMS = ['ethereum', 'solana', 'move']

export const PROFILE_TABS = [
  {
    value: 'user-vaults',
    label: 'Vaults',
    icon: 'Assured_Workload',
    description: '(All your vaults will be here)',
  },
  {
    value: 'trades',
    label: 'Trades',
    icon: 'currency_exchange',
    description: '(Deposit or Withdraw in a vault)',
  },
]
