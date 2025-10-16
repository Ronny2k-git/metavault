export const CREATE_TAB_STEPS = ['vault-data', 'user-data', 'confirm-approve'] as const

export const CREATE_INFO_STEPS = [
  {
    value: 'vault-data',
    step: 'Step 1',
    label: 'Vault Data',
    icon: 'lock_open',
    description: 'Unlocked',
  },
  {
    value: 'user-data',
    step: 'Step 2',
    label: 'User Data',
    icon: 'lock',
    description: 'Locked',
  },
  {
    value: 'confirm-approve',
    step: 'Step 3',
    label: 'Confirm & Approve',
    icon: 'lock',
    description: 'Locked',
  },
] as const
