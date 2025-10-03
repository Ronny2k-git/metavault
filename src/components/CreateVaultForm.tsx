import { InputField } from './InputField'

export function CreateVaultForm() {
  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
      {/* Basic data section */}
      <h1 className="col-span-full text-2xl">Basic Vault Data</h1>
      <InputField placeholder="Your vault name" />
      <InputField placeholder="Your logo url" />
      <InputField placeholder="Your banner url" />
      <select className="h-10 w-full px-4 rounded-md text-gray-300 border-1 placeholder:text-gray-300 border-cyan-400">
        <option hidden>Select a network</option>
        <option value="sepolia">Sepolia</option>
      </select>

      <div className="w-full h-0.5 my-2 bg-cyan-400 col-span-full" />

      {/* Token section */}
      <h1 className="col-span-full text-2xl">Token Data</h1>
      <InputField placeholder="Asset token" />
      <InputField placeholder="Salt" type={'number'} />
      <InputField placeholder="Min deposit" type={'number'} />
      <InputField placeholder="Max deposit" type={'number'} />

      <div className="w-full h-0.5 my-2 bg-cyan-400 col-span-full" />

      {/* Time section */}
      <h1 className="col-span-full text-2xl">Vault Time</h1>
      <InputField placeholder="Start date" type="date" />
      <InputField placeholder="End date" type="date" />

      <div className="w-full h-0.5 my-2 bg-cyan-400 col-span-full" />

      <button className="h-10 w-full bg-gray-500 hover:bg-gray-600 rounded-2xl">
        Reset fields
      </button>
      <button className="h-10 w-full bg-sky-600 hover:bg-sky-500 rounded-2xl">
        Create Vaults
      </button>
    </div>
  )
}
