export function getCreateInfoSteps(vaultFormValid: boolean, userFormValid: boolean) {
  return [
    {
      value: 'vault-data',
      step: 'Step 1',
      label: 'Vault Data',
      icon: vaultFormValid ? 'check_circle' : 'lock_open',
      disabled: false,
      description: vaultFormValid ? 'Completed' : 'Unlocked',
    },
    {
      value: 'user-data',
      step: 'Step 2',
      label: 'User Data',
      icon: userFormValid ? 'check_circle' : vaultFormValid ? 'lock_open' : 'lock',
      disabled: !vaultFormValid,
      description: userFormValid ? 'Completed' : vaultFormValid ? 'Unlocked' : 'Locked',
    },
    {
      value: 'confirm-create',
      step: 'Step 3',
      label: 'Confirm & Create',
      icon: userFormValid ? 'lock_open' : 'lock',
      disabled: !userFormValid,
      description: userFormValid ? 'Unlocked' : 'Locked',
    },
  ] as const
}
