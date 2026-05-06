"use client";

import { useEffect, useState } from "react";
import { usePublicGalleryStatus } from "../../lib/adminStore";

function FionatGalleryLoader() {
  return (
    <div className="flex min-h-72 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-blue-900 via-emerald-800 to-blue-950 p-8 text-center shadow-xl shadow-emerald-600/20">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-emerald-500/20 border-r-blue-400 border-t-emerald-400" />
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

        <p className="mt-2 text-sm text-emerald-300 animate-pulse">Loading gallery...</p>
      </div>
    </div>
  );
}

export default function BeforeAfterPage() {
  const { gallery, isLoading } = usePublicGalleryStatus();
  const [previewIndex, setPreviewIndex] = useState(null);

  const galleryImages = gallery.flatMap((item) => [
    { src: item.before, title: item.title, label: "Before" },
    { src: item.after, title: item.title, label: "After" },
  ]);

  const preview = previewIndex === null ? null : galleryImages[previewIndex];
  const openPreview = (src) => {
    const nextIndex = galleryImages.findIndex((image) => image.src === src);
    setPreviewIndex(nextIndex >= 0 ? nextIndex : null);
  };

  const closePreview = () => setPreviewIndex(null);

  const showPrevious = () => {
    setPreviewIndex((current) => {
      if (current === null || !galleryImages.length) return current;
      return current === 0 ? galleryImages.length - 1 : current - 1;
    });
  };

  const showNext = () => {
    setPreviewIndex((current) => {
      if (current === null || !galleryImages.length) return current;
      return current === galleryImages.length - 1 ? 0 : current + 1;
    });
  };

  useEffect(() => {
    if (!preview) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closePreview();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [preview, galleryImages.length]);

  useEffect(() => {
    if (previewIndex !== null && previewIndex >= galleryImages.length) closePreview();
  }, [previewIndex, galleryImages.length]);

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
        {isLoading ? <FionatGalleryLoader /> : null}

        {!isLoading && !gallery.length ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-6 text-sm text-blue-100/80">
            No gallery items yet. Published before-and-after results will appear here soon.
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
                <button
                  type="button"
                  onClick={() => openPreview(item.before)}
                  className="block w-full overflow-hidden rounded-lg bg-blue-950/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:rounded-2xl"
                  aria-label={`Open ${item.title} before image`}
                >
                  <img
                    src={item.before}
                    alt={`${item.title} before`}
                    className="h-40 w-full object-cover transition duration-300 hover:scale-105 sm:h-56"
                  />
                </button>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                  After
                </p>
                <button
                  type="button"
                  onClick={() => openPreview(item.after)}
                  className="block w-full overflow-hidden rounded-lg bg-blue-950/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:rounded-2xl"
                  aria-label={`Open ${item.title} after image`}
                >
                  <img
                    src={item.after}
                    alt={`${item.title} after`}
                    className="h-40 w-full object-cover transition duration-300 hover:scale-105 sm:h-56"
                  />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {preview ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${preview.title} ${preview.label} image preview`}
          onClick={closePreview}
        >
          <div
            className="relative"
            style={{ width: "min(92vw, 860px)", maxWidth: "860px" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePreview}
              className="flex items-center justify-center rounded-full shadow-lg transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                left: "auto",
                zIndex: 30,
                width: "32px",
                height: "32px",
                backgroundColor: "#dc2626",
                color: "#ffffff",
              }}
              aria-label="Close image preview"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>

            <div
              className="flex flex-col overflow-hidden rounded-2xl border border-emerald-300/30 bg-blue-950 shadow-2xl shadow-black/60"
              style={{ width: "min(92vw, 860px)", maxWidth: "860px" }}
            >
              <div className="w-full border-b border-white/10 px-3 py-2 pr-14">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                  {preview.label}
                </p>
                <h2 className="truncate text-xs font-semibold text-white">{preview.title}</h2>
              </div>

              <div
                className="flex bg-black"
                style={{
                  width: "100%",
                  height: "min(62vh, 560px)",
                  minHeight: "260px",
                  maxHeight: "560px",
                }}
              >
                <div className="flex min-w-0 flex-1 items-center justify-center">
                  <img
                    src={preview.src}
                    alt={`${preview.title} ${preview.label}`}
                    className="object-contain"
                    style={{ width: "100%", height: "auto", maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
