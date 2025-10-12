export const PROJECT_ROUTES = [
  {
    path: '/',
    label: 'Home',
    icon: 'home',
  },
  {
    path: '/create-vault',
    label: 'Create - Vault',
    icon: 'add_circle',
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: 'account_circle',
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
  {
    value: 'test',
    label: 'Test',
    icon: 'compare',
    description: '(In progress...Thinking about it)',
  },
]
