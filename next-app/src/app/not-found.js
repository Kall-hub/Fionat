import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-emerald-800 to-blue-950 px-6 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.16),transparent_30%)]" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-56 w-56 rounded-full border border-emerald-400/10 animate-ping" />
        <div
          className="absolute h-80 w-80 rounded-full border border-blue-300/10 animate-ping"
          style={{ animationDelay: "0.6s", animationDuration: "3s" }}
        />
      </div>

      <section className="relative z-10 flex w-full max-w-xl flex-col items-center rounded-[2rem] border border-white/10 bg-slate-950/25 p-8 text-center shadow-[0_20px_80px_rgba(2,8,23,0.45)] backdrop-blur-xl sm:p-10">
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-400 border-r-blue-400" />
          <span className="bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-3xl font-bold text-transparent">
            F
          </span>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.45em] text-emerald-200/90">
          FIONAT Services
        </p>

        <h1 className="bg-gradient-to-r from-blue-200 via-white to-emerald-200 bg-clip-text text-6xl font-black tracking-tight text-transparent sm:text-7xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          This page missed the clean sweep
        </h2>

        <p className="mt-4 max-w-md text-sm leading-7 text-blue-100/85 sm:text-base">
          The page you&apos;re looking for isn&apos;t available right now. Let&apos;s get you back to
          FIONAT&apos;s main space and help you find the service you need.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/40 transition hover:scale-[1.02] hover:from-blue-400 hover:to-emerald-400"
          >
            Back to Home
          </Link>
          <Link
            href="/book-quote"
            className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-emerald-50 transition hover:bg-white/15"
          >
            Book a Quote
          </Link>
        </div>

        <p className="mt-6 text-sm text-emerald-200 animate-pulse">Redirecting your attention...</p>
      </section>
    </main>
  );
}
