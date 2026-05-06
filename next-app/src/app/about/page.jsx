export default function AboutPage() {
  return (
    <section className="rounded-lg sm:rounded-3xl border-2 border-emerald-500 bg-gradient-to-br from-blue-900/80 to-emerald-900/80 p-4 sm:p-8 lg:p-10 shadow-xl shadow-emerald-600/30">
      <p className="text-xs sm:text-sm font-medium text-emerald-400 mb-2">About FIONAT SERVICES</p>
      <h1 className="mt-2 text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">Registered Professional Cleaning Excellence</h1>
      <p className="mt-3 sm:mt-5 max-w-3xl text-sm sm:text-base leading-6 sm:leading-7 text-blue-100">
        FIONAT SERVICES is a South African CIPC-registered cleaning company specializing in residential, commercial, and specialized property services. We focus on reliable communication, careful execution, and consistent customer satisfaction across every project.
      </p>

      <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 sm:grid-cols-3">
        <div className="rounded-lg sm:rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-800/50 to-emerald-800/50 p-3 sm:p-5 shadow-lg shadow-blue-600/30">
          <h2 className="text-xs sm:text-sm font-semibold text-blue-300">CIPC Registered</h2>
          <p className="mt-2 text-xs sm:text-sm text-blue-100">A South African registered company committed to professional service standards, clear communication, and responsible work practices.</p>
        </div>
        <div className="rounded-lg sm:rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-800/50 to-blue-800/50 p-3 sm:p-5 shadow-lg shadow-emerald-600/30">
          <h2 className="text-xs sm:text-sm font-semibold text-emerald-300">Meticulous Excellence</h2>
          <p className="mt-2 text-xs sm:text-sm text-emerald-100">Every property, every surface, every detail receives our rigorous attention and professional expertise.</p>
        </div>
        <div className="rounded-lg sm:rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-800/50 to-emerald-800/50 p-3 sm:p-5 shadow-lg shadow-blue-600/30">
          <h2 className="text-xs sm:text-sm font-semibold text-blue-300">Dedicated Support</h2>
          <p className="mt-2 text-xs sm:text-sm text-blue-100">Professional communication and responsive support through all service channels and contact methods.</p>
        </div>
      </div>
    </section>
  );
}
