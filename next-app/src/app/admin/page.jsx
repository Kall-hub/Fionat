"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addGalleryItem,
  deleteBooking,
  deleteGalleryItem,
  deleteQuotation,
  deleteRating,
  markBookingStatus,
  markQuotationStatus,
  setRatingStatus,
  useAdminStore,
} from "../../lib/adminStore";
import { auth } from "../../lib/firebase";

const tabs = [
  { id: "quotations", label: "Quotations" },
  { id: "bookings", label: "Bookings" },
  { id: "ratings", label: "Ratings" },
  { id: "gallery", label: "Gallery" },
];

function formatDate(value) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function badgeClasses(status) {
  if (status === "approved") {
    return "bg-emerald-500/15 text-emerald-200 border border-emerald-400/30";
  }

  if (status === "rejected" || status === "closed") {
    return "bg-rose-500/15 text-rose-200 border border-rose-400/30";
  }

  return "bg-amber-500/15 text-amber-200 border border-amber-400/30";
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const store = useAdminStore(Boolean(user));
  const [authReady, setAuthReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [activeTab, setActiveTab] = useState("quotations");
  const [selectedQuotationId, setSelectedQuotationId] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);
  const [galleryStatus, setGalleryStatus] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);
    });
  }, []);

  const selectedQuotation = useMemo(
    () => store.quotations.find((item) => item.id === selectedQuotationId) || store.quotations[0],
    [selectedQuotationId, store.quotations]
  );
  const selectedBooking = useMemo(
    () => store.bookings.find((item) => item.id === selectedBookingId) || store.bookings[0],
    [selectedBookingId, store.bookings]
  );

  useEffect(() => {
    if (!selectedQuotationId && store.quotations[0]) {
      setSelectedQuotationId(store.quotations[0].id);
    }
  }, [selectedQuotationId, store.quotations]);

  useEffect(() => {
    if (!selectedBookingId && store.bookings[0]) {
      setSelectedBookingId(store.bookings[0].id);
    }
  }, [selectedBookingId, store.bookings]);

  const handleGallerySubmit = async (event) => {
    event.preventDefault();
    if (!beforeFile || !afterFile || !galleryTitle.trim()) {
      setGalleryStatus("Please add a title plus both before and after images.");
      return;
    }

    const before = await readFileAsDataUrl(beforeFile);
    const after = await readFileAsDataUrl(afterFile);
    await addGalleryItem({
      title: galleryTitle.trim(),
      before,
      after,
    });

    setGalleryTitle("");
    setBeforeFile(null);
    setAfterFile(null);
    event.target.reset();
    setGalleryStatus("Gallery item uploaded. It now appears on the public Before & After page.");
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setAuthBusy(true);
    setAuthError("");

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setPassword("");
    } catch (error) {
      setAuthError(error?.message || "Sign-in failed. Please check the admin account details.");
    } finally {
      setAuthBusy(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const pendingRatings = store.ratings.filter((item) => item.status === "pending");
  const approvedRatings = store.ratings.filter((item) => item.status === "approved");
  if (!authReady) {
    return (
      <section className="rounded-3xl border border-white/10 bg-slate-950/35 p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
        <p className="text-sm text-blue-100/80">Checking admin session...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-lg space-y-6">
        <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            FIONAT Admin Login
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Secure staff sign-in</h1>
          <p className="mt-3 text-sm leading-7 text-blue-100/85">
            Sign in with the Firebase email/password admin account for this project to open the quotation inbox, booking queue, rating moderation, and gallery uploads.
          </p>
        </div>

        <form
          onSubmit={handleSignIn}
          className="rounded-3xl border border-white/10 bg-slate-950/35 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
        >
          <div className="grid gap-4">
            <label className="text-sm text-blue-100/85">
              Admin email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-white outline-none focus:ring focus:ring-emerald-300/40"
              />
            </label>
            <label className="text-sm text-blue-100/85">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-white outline-none focus:ring focus:ring-emerald-300/40"
              />
            </label>
            <button
              type="submit"
              disabled={authBusy}
              className="rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {authBusy ? "Signing in..." : "Sign in to admin"}
            </button>
            {authError ? <p className="text-sm text-rose-200">{authError}</p> : null}
            <Link href="/" className="text-sm text-blue-100 underline underline-offset-4">
              Back to website
            </Link>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              FIONAT Mini Admin
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Operations, inbox, moderation, and gallery
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100/85">
              This admin dashboard is connected to Firebase Auth, Firestore, and Storage. Keep it open while monitoring website submissions, approvals, and gallery updates.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Back to website
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">Pending quotations</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {store.quotations.filter((item) => item.status === "pending").length}
          </p>
        </div>
        <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-200/80">Pending bookings</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {store.bookings.filter((item) => item.status === "pending").length}
          </p>
        </div>
        <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">Pending ratings</p>
          <p className="mt-2 text-3xl font-bold text-white">{pendingRatings.length}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-emerald-500 text-slate-950"
                : "bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "quotations" ? (
        <div className="grid gap-4 xl:grid-cols-[340px_minmax(0,1fr)]">
          <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-3 backdrop-blur-xl">
            <h2 className="px-3 py-2 text-lg font-semibold text-white">Quotation inbox</h2>
            <div className="space-y-2">
              {store.quotations.length ? (
                store.quotations.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedQuotationId(item.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selectedQuotation?.id === item.id
                        ? "border-emerald-400/40 bg-emerald-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-white">{item.name}</p>
                      <span className={`rounded-full px-2 py-1 text-[11px] ${badgeClasses(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-blue-100/80">{item.email}</p>
                    <p className="mt-2 text-xs text-slate-400">
                      Ref {item.id.slice(0, 8).toUpperCase()} | {formatDate(item.createdAt)}
                    </p>
                  </button>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-300">
                  No quotation requests yet. New website submissions will land here.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-6 backdrop-blur-xl">
            {selectedQuotation ? (
              <div className="space-y-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm text-blue-100/70">From</p>
                    <h3 className="text-2xl font-bold text-white">{selectedQuotation.name}</h3>
                    <p className="mt-1 text-sm text-blue-100/80">{selectedQuotation.email}</p>
                    <p className="text-sm text-blue-100/80">{selectedQuotation.cell}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-blue-100/80">
                    <p>Received: {formatDate(selectedQuotation.createdAt)}</p>
                    <p>Property: {selectedQuotation.propertyType}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Request details</p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-blue-100/85">
                    {selectedQuotation.details}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => markQuotationStatus(selectedQuotation.id, "approved")}
                    className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950"
                  >
                    Approve request
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteQuotation(selectedQuotation.id)}
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
                  >
                    Delete request
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-sm text-slate-300">
                Select a quotation from the inbox to view its details.
              </div>
            )}
          </div>
        </div>
      ) : null}

      {activeTab === "bookings" ? (
        <div className="grid gap-4 xl:grid-cols-[340px_minmax(0,1fr)]">
          <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-3 backdrop-blur-xl">
            <h2 className="px-3 py-2 text-lg font-semibold text-white">Booking queue</h2>
            <div className="space-y-2">
              {store.bookings.length ? (
                store.bookings.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedBookingId(item.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selectedBooking?.id === item.id
                        ? "border-blue-400/40 bg-blue-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-white">{item.name}</p>
                      <span className={`rounded-full px-2 py-1 text-[11px] ${badgeClasses(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-blue-100/80">{item.location}</p>
                    <p className="mt-2 text-xs text-slate-400">
                      Ref {item.id.slice(0, 8).toUpperCase()} | {item.date}
                    </p>
                  </button>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-300">
                  No bookings yet. New service bookings will appear here.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-6 backdrop-blur-xl">
            {selectedBooking ? (
              <div className="space-y-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm text-blue-100/70">Client</p>
                    <h3 className="text-2xl font-bold text-white">{selectedBooking.name}</h3>
                    <p className="mt-1 text-sm text-blue-100/80">{selectedBooking.email}</p>
                    <p className="text-sm text-blue-100/80">{selectedBooking.cell}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-blue-100/80">
                    <p>Preferred date: {selectedBooking.date}</p>
                    <p>Submitted: {formatDate(selectedBooking.createdAt)}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Service location</p>
                  <p className="mt-3 text-sm leading-7 text-blue-100/85">{selectedBooking.location}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => markBookingStatus(selectedBooking.id, "confirmed")}
                    className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950"
                  >
                    Approve booking
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteBooking(selectedBooking.id)}
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
                  >
                    Delete booking
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-sm text-slate-300">
                Select a booking from the queue to see its details.
              </div>
            )}
          </div>
        </div>
      ) : null}

      {activeTab === "ratings" ? (
        <div className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Pending approval</h2>
              <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs text-amber-200">
                {pendingRatings.length} pending
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {pendingRatings.length ? (
                pendingRatings.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <p className="text-sm text-blue-100/75">{formatDate(item.createdAt)}</p>
                      </div>
                      <div className="text-yellow-400">{"★".repeat(item.rating)}</div>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-blue-100/85">{item.comment}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setRatingStatus(item.id, "approved")}
                        className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteRating(item.id)}
                        className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-300">
                  No ratings are waiting for approval.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Approved reviews</h2>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-200">
                {approvedRatings.length} live
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {approvedRatings.map((item) => (
                <article key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      <p className="text-sm text-blue-100/75">{formatDate(item.createdAt)}</p>
                    </div>
                    <div className="text-yellow-400">{"★".repeat(item.rating)}</div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-blue-100/85">{item.comment}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {activeTab === "gallery" ? (
        <div className="grid gap-4 xl:grid-cols-[420px_minmax(0,1fr)]">
          <form
            onSubmit={handleGallerySubmit}
            className="rounded-3xl border border-white/10 bg-slate-950/35 p-6 backdrop-blur-xl"
          >
            <h2 className="text-xl font-semibold text-white">Upload before and after</h2>
            <div className="mt-5 grid gap-4">
              <label className="text-sm text-blue-100/85">
                Job title
                <input
                  type="text"
                  value={galleryTitle}
                  onChange={(event) => setGalleryTitle(event.target.value)}
                  placeholder="Example: Lounge deep clean"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-white outline-none focus:ring focus:ring-emerald-300/40"
                />
              </label>
              <label className="text-sm text-blue-100/85">
                Before image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setBeforeFile(event.target.files?.[0] || null)}
                  className="mt-2 block w-full text-sm text-blue-100 file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950"
                />
              </label>
              <label className="text-sm text-blue-100/85">
                After image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setAfterFile(event.target.files?.[0] || null)}
                  className="mt-2 block w-full text-sm text-blue-100 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                />
              </label>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 px-4 py-3 text-sm font-semibold text-white"
              >
                Publish gallery item
              </button>
              {galleryStatus ? <p className="text-sm text-emerald-200">{galleryStatus}</p> : null}
            </div>
          </form>

          <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Published gallery</h2>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-blue-100">
                {store.gallery.length} items
              </span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {!store.gallery.length ? (
                <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-300 md:col-span-2">
                  No gallery images yet. Upload a before-and-after set here and it will show on the public gallery page.
                </div>
              ) : null}
              {store.gallery.map((item) => (
                <article key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-xs text-slate-400">{formatDate(item.createdAt)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteGalleryItem(item)}
                      className="text-xs text-rose-200 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <img src={item.before} alt={`${item.title} before`} className="h-36 w-full rounded-xl object-cover" />
                    <img src={item.after} alt={`${item.title} after`} className="h-36 w-full rounded-xl object-cover" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : null}

    </section>
  );
}
