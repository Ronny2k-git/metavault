export function NotFoundPage() {
  return (
    <div className="background-image p-4 gap-8 w-full min-h-screen flex items-center justify-center max-md:flex-col ">
      <img src="/not-found.png" className="max-h-[35rem] max-w-[35rem]" />
      <div className="flex flex-col gap-2 text-white">
        <h1 className="text-4xl max-[400px]:text-3xl max-md:-mt-[6rem] text-center">Page Not Found (404)</h1>
        <h2 className="text-md text-gray-300 text-center">You reached a block that doesn’t exist</h2>
      </div>
    </div>
  )
}
