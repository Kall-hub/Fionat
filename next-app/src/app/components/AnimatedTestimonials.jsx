"use client";

import { useApprovedRatings } from "../../lib/adminStore";

export default function AnimatedTestimonials() {
  const testimonies = useApprovedRatings().slice(0, 6);

  return (
    <section className="mt-6 sm:mt-8 lg:mt-12">
      <div className="mb-4 space-y-3 sm:mb-6 sm:space-y-4">
        <p className="text-xs font-medium text-blue-400 sm:text-sm">Trusted by Many</p>
        <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">What customers say</h2>
      </div>
      {!testimonies.length ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-blue-100/80">
          Approved customer reviews will appear here once they are submitted and approved by admin.
        </div>
      ) : null}
      <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
        {testimonies.map((item, index) => {
          const randomDelay = index * 100;

          return (
            <article
              key={item.id}
              className="mb-3 inline-block w-full break-inside-avoid rounded-lg border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/20 backdrop-blur-md backdrop-saturate-150 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-emerald-500/30 sm:mb-4 sm:rounded-2xl sm:p-5"
              style={{
                animation: "fadeSlideIn 0.6s ease-out forwards",
                animationDelay: `${randomDelay}ms`,
              }}
            >
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2 sm:mb-3">
                <h3 className="min-w-0 flex-1 text-xs font-semibold text-emerald-300 sm:text-sm">{item.name}</h3>
                <div className="flex shrink-0 gap-0.5 text-sm leading-none sm:text-base">
                  {Array.from({ length: Number(item.rating) || 0 }).map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs leading-relaxed text-blue-100 sm:text-sm">{item.comment}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
