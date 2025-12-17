import { scrollToConteiner } from '@/modules/global/utils'
import { Divider, Icon, Input, TextArea } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { vaultFormAtom, vaultFormValidAtom } from '../atoms/createAtoms'
import type { VaultDataFormType } from '../schemas/VaultDataFormSchema'
import { vaultDataFormSchema } from '../schemas/VaultDataFormSchema'
import { initialVaultForm } from '../utils'
import { CreateFormHeading } from './subcomponents'

export function VaultDataForm() {
  const [vaultData, setVaultData] = useAtom(vaultFormAtom)
  const [, setVaultFormValid] = useAtom(vaultFormValidAtom)
  const navigate = useNavigate({ from: '/create-vault' })
  const { t } = useTranslation('create', { keyPrefix: 'vaultData' })

  const { register, handleSubmit, reset, formState } = useForm<VaultDataFormType>({
    resolver: zodResolver(vaultDataFormSchema(t)),
    defaultValues: vaultData,
  })

  const networError = formState.errors.network

  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4.5">
      <Divider className="mt-12" />

      <CreateFormHeading
        className="col-span-full"
        title={t('titles.vault')}
        icon={'help'}
        subTitle={t('titles.required')}
      />

      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        className="max-md:col-span-full"
        label={t('fields.vaultName.label')}
        placeholder={t('fields.vaultName.placeholder')}
        {...register('vaultName', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, vaultName: event.target.value }))
          },
        })}
        error={formState.errors.vaultName?.message}
      />
      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        label={t('fields.logo.label')}
        placeholder={t('fields.logo.placeholder')}
        className="max-md:col-span-full"
        {...register('logo', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, logo: event.target.value }))
          },
        })}
        error={formState.errors.logo?.message}
      />
      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        label={t('fields.banner.label')}
        placeholder={t('fields.banner.placeholder')}
        className="max-md:col-span-full"
        {...register('banner', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, banner: event.target.value }))
          },
        })}
        error={formState.errors.banner?.message}
      />
      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        className="max-md:col-span-full"
        label={t('fields.creator.label')}
        placeholder={t('fields.creator.placeholder')}
        {...register('creatorName', {
          onChange(event) {
            setVaultData((prev) => ({ ...prev, creatorName: event.target.value }))
          },
        })}
        error={formState.errors.creatorName?.message}
      />
      <TextArea
        className="col-span-full min-h-[14rem] max-h-[14rem]"
        label={t('fields.desc.label')}
        placeholder={t('fields.desc.placeholder')}
        {...register('description', {
          onChange(event) {
            setVaultData((prev) => ({
              ...prev,
              description: event.target.value,
            }))
          },
        })}
        maxLength={120}
        error={formState.errors.description?.message}
      />

      <Divider />

      <div className="col-span-full w-full flex max-sm:flex-col justify-between gap-4.5">
        <CreateFormHeading title={t('titles.token')} icon={'help'} subTitle={t('titles.required')} />

        <div className="flex flex-col relative">
          <select
            className={`bg-gradient-to-t from-purple-950 to-[#3C1C994D] h-12 w-full max-w-48 px-6 rounded-3xl text-gray-300 outline-none
          ${networError ? 'shadow-[0_0_10px_1px_rgba(255_1_1)] border-0' : 'border-transparent'}`}
            {...register('network', {
              onChange(event) {
                setVaultData((prev) => ({ ...prev, network: event.target.value }))
              },
            })}
          >
            <option value="" hidden>
              {t('fields.network.label')}
            </option>
            <option className="bg-purple-950" value="Sepolia">
              {t('fields.network.chain')}
            </option>
          </select>
          {networError && <span className="mt-1 pl-2 text-sm text-red-400">{networError.message}</span>}
        </div>
      </div>

      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        label={t('fields.asset.label')}
        placeholder={t('fields.asset.placeholder')}
        {...register('assetToken', {
          onChange(event) {
            setVaultData((prev) => ({
              ...prev,
              assetToken: event.target.value,
            }))
          },
        })}
        error={formState.errors.assetToken?.message}
      />
      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        label={t('fields.salt.label')}
        placeholder={t('fields.salt.placeholder')}
        type={'number'}
        min={0}
        {...register('salt', {
          onChange(event) {
            setVaultData((prev) => ({
              ...prev,
              salt: event.target.value,
            }))
          },
        })}
        error={formState.errors.salt?.message}
      />
      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        label={t('fields.minDeposit.label')}
        placeholder={t('fields.minDeposit.placeholder')}
        type={'number'}
        min={0}
        {...register('minDeposit', {
          onChange(event) {
            setVaultData((prev) => ({
              ...prev,
              minDeposit: event.target.value,
            }))
          },
        })}
        error={formState.errors.minDeposit?.message}
      />
      <Input
        inputVariant={'default'}
        inputSize={'xl'}
        label={t('fields.maxDeposit.label')}
        placeholder={t('fields.maxDeposit.placeholder')}
        type={'number'}
        min={0}
        {...register('maxDeposit', {
          onChange(event) {
            setVaultData((prev) => ({
              ...prev,
              maxDeposit: event.target.value,
            }))
          },
        })}
        error={formState.errors.maxDeposit?.message}
      />

      <Divider />

      <div className="flex col-span-full gap-3">
        <Button
          className="max-w-[13rem]"
          variant={'secondary'}
          size={'md'}
          iconLeft={<Icon>backspace</Icon>}
          onClick={() => {
            setVaultData(initialVaultForm)
            reset(initialVaultForm)
          }}
        >
          {t('buttons.reset')}
        </Button>
        <Button
          className="max-w-[15rem]"
          variant={'primary'}
          size={'md'}
          iconRight={<Icon>arrow_right_alt</Icon>}
          onClick={handleSubmit(() => {
            setVaultFormValid(true)
            requestAnimationFrame(() => scrollToConteiner('tab-user-data'))
            navigate({ search: { tab: 'user-data' } })
          })}
        >
          {t('buttons.move')}
        </Button>
      </div>
    </div>
  )
}
