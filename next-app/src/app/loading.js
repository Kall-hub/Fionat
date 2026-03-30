'use client'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-900 via-emerald-800 to-blue-950">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-400 border-r-blue-400" />
          <div className="flex h-full items-center justify-center bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-3xl font-bold text-transparent">
            F
          </div>
        </div>

        <div className="text-center">
          <h2 className="bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-2xl font-bold text-transparent">
            FIONAT
          </h2>
          <p className="text-sm tracking-[0.28em] text-emerald-300">SERVICES</p>
        </div>

        <p className="mt-2 text-sm text-emerald-300 animate-pulse">Loading FIONAT services...</p>
      </div>
    </div>
  );
}
