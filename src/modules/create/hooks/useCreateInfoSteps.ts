import { useTranslation } from 'react-i18next'

export type useCreateInfoStepsProps = {
  validStep1: boolean
  validStep2: boolean
  validStep3: boolean
}

export function useCreateInfoSteps({ validStep1, validStep2, validStep3 }: useCreateInfoStepsProps) {
  const { t } = useTranslation('create')

  return [
    {
      value: 'vault-data',
      step: t('tabs.step1.step'),
      label: t('tabs.step1.label'),
      descriptionIcon: validStep1 ? 'check_circle' : 'lock_open',
      descriptionIconStyle: validStep1 ? 'text-green-500' : 'text-white',
      disabled: false,
      description: validStep1 ? t('tabs.status.completed') : t('tabs.status.unlocked'),
      descriptionColor: validStep1 ? 'text-green-500' : 'text-white',
    },
    {
      value: 'user-data',
      step: t('tabs.step2.step'),
      label: t('tabs.step2.label'),
      descriptionIcon: validStep2 ? 'check_circle' : validStep1 ? 'lock_open' : 'lock',
      descriptionIconStyle: validStep2 ? 'text-green-500' : 'text-white',
      disabled: !validStep1,
      description: validStep2
        ? t('tabs.status.completed')
        : validStep1
          ? t('tabs.status.unlocked')
          : t('tabs.status.locked'),
      descriptionColor: validStep2 ? 'text-green-500' : 'text-white',
    },
    {
      value: 'confirm-create',
      step: t('tabs.step3.step'),
      label: t('tabs.step3.label'),
      descriptionIcon: validStep3 ? 'check_circle' : validStep2 ? 'lock_open' : 'lock',
      descriptionIconStyle: validStep3 ? 'text-green-500' : 'text-white',
      disabled: !validStep2,
      description: validStep3
        ? t('tabs.status.completed')
        : validStep2
          ? t('tabs.status.unlocked')
          : t('tabs.status.locked'),
      descriptionColor: validStep3 ? 'text-green-500' : 'text-white',
    },
  ] as const
}
