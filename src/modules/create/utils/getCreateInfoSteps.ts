export function getCreateInfoSteps(vaultFormValid: boolean, userFormValid: boolean, confirmFormValid: boolean) {
  return [
    {
      value: 'vault-data',
      step: 'Step 1',
      label: 'Vault Data',
      descriptionIcon: vaultFormValid ? 'check_circle' : 'lock_open',
      descriptionIconStyle: vaultFormValid ? 'text-green-500' : 'text-white',
      disabled: false,
      description: vaultFormValid ? 'Completed' : 'Unlocked',
      descriptionColor: vaultFormValid ? 'text-green-500' : 'text-white',
    },
    {
      value: 'user-data',
      step: 'Step 2',
      label: 'User Data',
      descriptionIcon: userFormValid ? 'check_circle' : vaultFormValid ? 'lock_open' : 'lock',
      descriptionIconStyle: userFormValid ? 'text-green-500' : 'text-white',
      disabled: !vaultFormValid,
      description: userFormValid ? 'Completed' : vaultFormValid ? 'Unlocked' : 'Locked',
      descriptionColor: userFormValid ? 'text-green-500' : 'text-white',
    },
    {
      value: 'confirm-create',
      step: 'Step 3',
      label: 'Confirm & Create',
      descriptionIcon: confirmFormValid ? 'check_circle' : userFormValid ? 'lock_open' : 'lock',
      descriptionIconStyle: confirmFormValid ? 'text-green-500' : 'text-white',
      disabled: !userFormValid,
      description: confirmFormValid ? 'Completed' : userFormValid ? 'Unlocked' : 'Locked',
      descriptionColor: confirmFormValid ? 'text-green-500' : 'text-white',
    },
  ] as const
}
