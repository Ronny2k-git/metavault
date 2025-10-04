import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { VaultCreateFormType } from '../schemas/VaultCreateFormSchema'
import { vaultCreateFormSchema } from '../schemas/VaultCreateFormSchema'
import { InputField } from './subcomponents'

export function CreateVaultForm() {
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(vaultCreateFormSchema),
    defaultValues: {
      network: '',
      vaultName: '',
      logo: '',
      banner: '',
      assetToken: '',
      salt: '',
      minDeposit: '',
      maxDeposit: '',
      startDate: '',
      endDate: '',
    },
  })

  const onSubmit = (data: VaultCreateFormType) => {
    console.log('Vault created succesfully:', data)
  }

  const onError = formState.errors
  const networError = formState.errors.network

  return (
    <div className={`grid grid-cols-2 max-sm:grid-cols-1 gap-5.5`}>
      {/* Basic data section */}
      <h1 className="text-2xl">Basic Vault Data</h1>
      <div className="flex flex-col relative">
        <select
          className={`h-10 w-full px-4 rounded-md text-gray-300 border-1 placeholder:text-gray-300
          ${networError ? 'border-red-400' : 'border-cyan-400'} focus:border-black border outline-none`}
          {...register('network')}
        >
          <option value="" hidden>
            Select a network
          </option>
          <option value="sepolia">Sepolia</option>
        </select>
        {networError && (
          <span className="text-sm absolute top-10 text-red-400">
            {networError.message}
          </span>
        )}
      </div>

      <InputField
        className="col-span-full"
        placeholder="Your vault name"
        {...register('vaultName')}
        error={formState.errors.vaultName?.message}
      />

      <InputField
        placeholder="Your logo url"
        className="col-span-full"
        {...register('logo')}
        error={formState.errors.logo?.message}
      />

      <InputField
        placeholder="Your banner url"
        className="col-span-full"
        {...register('banner')}
        error={formState.errors.banner?.message}
      />

      <div className="w-full h-0.5 my-4 bg-cyan-400 col-span-full" />

      {/* Token section */}
      <h1 className="col-span-full text-2xl">Token Data</h1>
      <InputField
        placeholder="Asset token"
        {...register('assetToken')}
        error={formState.errors.assetToken?.message}
      />
      <InputField
        placeholder="Salt"
        type={'number'}
        {...register('salt')}
        error={formState.errors.salt?.message}
      />
      <InputField
        placeholder="Min deposit"
        type={'number'}
        {...register('minDeposit')}
        error={formState.errors.minDeposit?.message}
      />
      <InputField
        placeholder="Max deposit"
        type={'number'}
        {...register('maxDeposit')}
        error={formState.errors.maxDeposit?.message}
      />

      <div className="w-full h-0.5 my-4 bg-cyan-400 col-span-full" />

      {/* Time section */}
      <h1 className="col-span-full text-2xl">Vault Time</h1>
      <InputField
        className="text-gray-300"
        placeholder="Start date"
        type="date"
        {...register('startDate')}
        error={formState.errors.startDate?.message}
      />
      <InputField
        className="text-gray-300"
        placeholder="End date"
        type="date"
        {...register('endDate')}
        error={formState.errors.endDate?.message}
      />

      <div className="w-full h-0.5 my-4 bg-cyan-400 col-span-full" />

      <button
        className="h-10 w-full bg-gray-600 hover:bg-gray-500 rounded-2xl"
        onClick={() => reset()}
      >
        Reset fields
      </button>
      <button
        className="h-10 w-full bg-sky-600 hover:bg-sky-500 rounded-2xl"
        onClick={handleSubmit(onSubmit)}
      >
        Create Vaults
      </button>
    </div>
  )
}
