"use client";

import { useState } from "react";
import { submitRating } from "../../lib/adminStore";

export default function RatingPage() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!rating) {
      setStatus("Please choose a star rating before submitting your review.");
      return;
    }

    await submitRating({ name, comment, rating });
    setName("");
    setComment("");
    setRating(0);
    setStatus("Thank you. Your review has been submitted and is now waiting for admin approval.");
  };

  return (
    <section className="mx-auto max-w-3xl rounded-lg border-2 border-emerald-500 bg-gradient-to-br from-blue-900/80 to-emerald-900/80 p-4 shadow-xl shadow-emerald-600/30 sm:rounded-3xl sm:p-8 lg:p-10">
      <p className="mb-2 text-xs sm:text-sm font-medium text-emerald-400">Customer Feedback</p>
      <h1 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-3xl">
        Rate Your Experience
      </h1>
      <p className="mt-2 text-xs text-blue-100 sm:mt-3 sm:text-base">
        Your feedback helps us maintain and improve our professional service standards.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3 sm:mt-8 sm:space-y-5">
        <div>
          <p className="mb-2 text-xs font-medium text-emerald-300 sm:text-sm">Your Rating</p>
          <div className="flex gap-1 sm:gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className="text-2xl leading-none transition hover:scale-110 sm:text-3xl"
                aria-label={`Rate ${star} star`}
              >
                <span className={star <= rating ? "text-yellow-400" : "text-emerald-600/40"}>★</span>
              </button>
            ))}
          </div>
        </div>

        <label className="block text-xs text-emerald-100 sm:text-sm">
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="mt-1 w-full rounded-lg border-2 border-emerald-600 bg-emerald-900/50 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500 sm:rounded-xl sm:text-sm"
          />
        </label>

        <label className="block text-xs text-emerald-100 sm:text-sm">
          Comment
          <textarea
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            required
            className="mt-1 min-h-24 w-full rounded-lg border-2 border-emerald-600 bg-emerald-900/50 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500 sm:min-h-28 sm:rounded-xl sm:text-sm"
          />
        </label>

        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/40 hover:from-emerald-500 hover:to-blue-500"
        >
          Submit Rating
        </button>

        {status ? <p className="text-sm text-emerald-200">{status}</p> : null}
      </form>
    </section>
  );
}
