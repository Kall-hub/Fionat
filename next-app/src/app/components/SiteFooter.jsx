import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t-2 border-emerald-500 bg-gradient-to-r from-blue-900 to-emerald-800 shadow-lg shadow-emerald-600/20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-3 py-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-sm lg:px-8">
        <div className="space-y-1">
          <p className="bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text font-semibold text-transparent">
            © {new Date().getFullYear()} FIONAT SERVICES
          </p>
          <p className="text-emerald-300">Excellence in every detail</p>
        </div>
        <Link href="/admin" className="text-blue-100 underline decoration-emerald-300/60 underline-offset-4 hover:text-white">
          Open mini admin
        </Link>
      </div>
    </footer>
  );
}
