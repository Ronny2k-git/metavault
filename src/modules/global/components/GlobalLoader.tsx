export function GlobalLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen background-image">
      <div className="h-24 w-24 flex items-center justify-center">
        {/*Border with ping */}
        <div className="absolute inset-0 border border-purple-900 bg-purple-900/10 animate-ping rounded-full" />
        {/*Spinner */}
        <div className="relative animate-spin h-16 w-16 border-4 border-purple-950/40 border-t-indigo-400/50 rounded-full" />
      </div>
    </div>
  )
}
