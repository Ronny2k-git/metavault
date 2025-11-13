export function NotFoundPage() {
  return (
    <div className="background-image p-4 gap-8 w-full min-h-screen flex items-center justify-center max-lg:flex-col ">
      <img src="/notFound.svg" className="max-h-[20rem] bg-black max-w-[35rem] w-full rounded-3xl" />
      <div className="flex flex-col gap-1 text-white">
        <h1 className="sm:text-4xl text-3xl">Page Not Found (404)</h1>
        <h2 className="text-md text-gray-300">You reached a block that doesn’t exist</h2>
      </div>
    </div>
  )
}
