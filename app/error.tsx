'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="p-6 border border-red-900/50 bg-red-950/20 rounded-xl space-y-4 text-center">
      <h2 className="text-xl font-semibold text-red-400">Something went wrong!</h2>
      <p className="text-sm text-zinc-400">{error.message || 'Failed to load data'}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-lg transition-colors"
      >
        Try again
      </button>
    </div>
  )
}