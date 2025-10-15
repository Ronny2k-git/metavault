export const CREATE_TAB_STEPS = ['vault-data', 'user-data', 'confirm-approve'] as const

export const CREATE_INFO_STEPS = [
  {
    step: 'Step 1',
    value: 'vault-data',
    label: 'Vault Data',
    icon: 'Assured_Workload',
    description: 'Test',
  },
  {
    step: 'Step 2',
    value: 'user-data',
    label: 'User Data',
    icon: 'currency_exchange',
    description: 'Test',
  },
  {
    step: 'Step 3',
    value: 'confirm-approve',
    label: 'Confirm & Approve',
    icon: 'compare',
    description: 'Test',
  },
] as const
