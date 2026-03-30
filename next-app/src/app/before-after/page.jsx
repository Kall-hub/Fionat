"use client";

import { usePublicGallery } from "../../lib/adminStore";

export default function BeforeAfterPage() {
  const gallery = usePublicGallery();

  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="rounded-lg border border-emerald-200 bg-gradient-to-br from-blue-900/80 to-emerald-900/80 p-4 sm:rounded-3xl sm:p-8">
        <p className="mb-2 text-xs sm:text-sm font-medium text-emerald-400">Portfolio & Results</p>
        <h1 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-3xl">
          Professional Transformation Gallery
        </h1>
        <p className="mt-2 text-xs text-blue-100 sm:mt-3 sm:text-base">
          View results from our professional cleaning projects demonstrating consistent quality and meticulous execution.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {!gallery.length ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-blue-100/80">
            No gallery items yet. Upload before-and-after images from the admin page and they will appear here.
          </div>
        ) : null}
        {gallery.map((item) => (
          <article
            key={item.id}
            className="rounded-lg border-2 border-emerald-500 bg-gradient-to-br from-blue-900/80 to-emerald-900/80 p-4 shadow-xl shadow-emerald-600/30 sm:rounded-3xl sm:p-6"
          >
            <h2 className="mb-3 text-base font-semibold text-emerald-300 sm:mb-4 sm:text-lg">
              {item.title}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                  Before
                </p>
                <img src={item.before} alt={`${item.title} before`} className="h-40 w-full rounded-lg object-cover sm:h-56 sm:rounded-2xl" />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                  After
                </p>
                <img src={item.after} alt={`${item.title} after`} className="h-40 w-full rounded-lg object-cover sm:h-56 sm:rounded-2xl" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
