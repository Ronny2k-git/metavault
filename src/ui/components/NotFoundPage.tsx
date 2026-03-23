export function NotFoundPage() {
  return (
    <div className="background-image flex flex-col w-full min-h-screen items-center justify-center ">
      <div className="flex max-md:flex-col items-center max-md:gap-32 gap-10 p-4">
        <img alt="not-found-banner" src="/not-found3.png" className="size-[18rem] rounded-4xl" />

        <div className="flex flex-col gap-2 text-white">
          <p className="text-4xl max-[400px]:text-3xl max-md:-mt-[6rem] text-center">Page Not Found (404)</p>
          <span className="text-md text-gray-300 text-center">You reached a block that doesn’t exist</span>
        </div>
      </div>
    </div>
  )
}
