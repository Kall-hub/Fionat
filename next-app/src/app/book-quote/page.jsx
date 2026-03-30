"use client";

import { useState } from "react";
import { submitBooking, submitQuotation } from "../../lib/adminStore";

const bookingInitial = {
  name: "",
  email: "",
  cell: "",
  location: "",
  date: "",
};

const quotationInitial = {
  quoteName: "",
  quoteEmail: "",
  quoteCell: "",
  propertyType: "Apartment",
  details: "",
};

export default function BookQuotePage() {
  const [bookingForm, setBookingForm] = useState(bookingInitial);
  const [quotationForm, setQuotationForm] = useState(quotationInitial);
  const [bookingStatus, setBookingStatus] = useState("");
  const [quotationStatus, setQuotationStatus] = useState("");

  const onBookingChange = (event) => {
    const { name, value } = event.target;
    setBookingForm((current) => ({ ...current, [name]: value }));
  };

  const onQuotationChange = (event) => {
    const { name, value } = event.target;
    setQuotationForm((current) => ({ ...current, [name]: value }));
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    const booking = await submitBooking(bookingForm);
    setBookingForm(bookingInitial);
    setBookingStatus(
      `Booking received. Reference: ${booking.id.slice(0, 8).toUpperCase()}. It is now pending admin approval.`
    );
  };

  const handleQuotationSubmit = async (event) => {
    event.preventDefault();
    const quotation = await submitQuotation({
      name: quotationForm.quoteName,
      email: quotationForm.quoteEmail,
      cell: quotationForm.quoteCell,
      propertyType: quotationForm.propertyType,
      details: quotationForm.details,
    });
    setQuotationForm(quotationInitial);
    setQuotationStatus(
      `Quote request received. Reference: ${quotation.id.slice(0, 8).toUpperCase()}. It is now pending admin approval.`
    );
  };

  return (
    <section className="grid gap-4 sm:gap-6 lg:grid-cols-2">
      <form
        onSubmit={handleBookingSubmit}
        className="rounded-lg sm:rounded-3xl border-2 border-blue-500 bg-gradient-to-br from-blue-900/80 to-emerald-900/80 p-4 sm:p-8 shadow-xl shadow-blue-600/30"
      >
        <p className="mb-2 text-xs sm:text-sm font-medium text-blue-400">Service Booking</p>
        <h1 className="mt-2 text-lg sm:text-2xl font-bold tracking-tight text-white">
          Schedule Professional Cleaning
        </h1>
        <p className="mt-2 text-xs text-blue-100/80 sm:text-sm">
          Send a real booking request. Once submitted, it appears on the admin side for review and confirmation.
        </p>
        <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4">
          <label className="text-xs sm:text-sm text-emerald-100">
            Full Name
            <input
              type="text"
              name="name"
              value={bookingForm.name}
              onChange={onBookingChange}
              required
              className="mt-1 w-full rounded-lg border-2 border-emerald-600 bg-emerald-900/50 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500 sm:rounded-xl sm:text-sm"
            />
          </label>
          <label className="text-xs sm:text-sm text-emerald-100">
            Email
            <input
              type="email"
              name="email"
              value={bookingForm.email}
              onChange={onBookingChange}
              required
              className="mt-1 w-full rounded-lg border-2 border-emerald-600 bg-emerald-900/50 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500 sm:rounded-xl sm:text-sm"
            />
          </label>
          <label className="text-xs sm:text-sm text-emerald-100">
            Cell Number
            <input
              type="tel"
              name="cell"
              value={bookingForm.cell}
              onChange={onBookingChange}
              required
              className="mt-1 w-full rounded-lg border-2 border-emerald-600 bg-emerald-900/50 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500 sm:rounded-xl sm:text-sm"
            />
          </label>
          <label className="text-xs sm:text-sm text-emerald-100">
            Address/Suburb
            <input
              type="text"
              name="location"
              value={bookingForm.location}
              onChange={onBookingChange}
              required
              className="mt-1 w-full rounded-lg border-2 border-emerald-600 bg-emerald-900/50 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500 sm:rounded-xl sm:text-sm"
            />
          </label>
          <label className="text-xs sm:text-sm text-emerald-100">
            Preferred Date
            <input
              type="date"
              name="date"
              value={bookingForm.date}
              onChange={onBookingChange}
              required
              className="mt-1 w-full rounded-lg border-2 border-emerald-600 bg-emerald-900/50 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500 sm:rounded-xl sm:text-sm"
            />
          </label>
          <button
            type="submit"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/40 hover:from-blue-500 hover:to-emerald-500 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm"
          >
            Confirm Booking
          </button>
          {bookingStatus ? <p className="text-xs text-emerald-200">{bookingStatus}</p> : null}
        </div>
      </form>

      <form
        onSubmit={handleQuotationSubmit}
        className="rounded-lg sm:rounded-3xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-900/80 to-blue-900/80 p-4 sm:p-8 shadow-xl shadow-emerald-600/30"
      >
        <p className="mb-2 text-xs sm:text-sm font-medium text-emerald-400">Quote Request</p>
        <h2 className="mt-2 text-lg sm:text-2xl font-bold tracking-tight text-white">
          Professional Pricing Information
        </h2>
        <p className="mt-2 text-xs text-blue-100/80 sm:text-sm">
          Submit your quote request and let admin review the details before responding with pricing.
        </p>
        <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4">
          <label className="text-xs sm:text-sm text-emerald-100">
            Full Name
            <input
              type="text"
              name="quoteName"
              value={quotationForm.quoteName}
              onChange={onQuotationChange}
              required
              className="mt-1 w-full rounded-lg border-2 border-emerald-600 bg-emerald-900/50 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500 sm:rounded-xl sm:text-sm"
            />
          </label>
          <label className="text-xs sm:text-sm text-emerald-100">
            Email
            <input
              type="email"
              name="quoteEmail"
              value={quotationForm.quoteEmail}
              onChange={onQuotationChange}
              required
              className="mt-1 w-full rounded-lg border-2 border-emerald-600 bg-emerald-900/50 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500 sm:rounded-xl sm:text-sm"
            />
          </label>
          <label className="text-xs sm:text-sm text-emerald-100">
            Cell Number
            <input
              type="tel"
              name="quoteCell"
              value={quotationForm.quoteCell}
              onChange={onQuotationChange}
              required
              className="mt-1 w-full rounded-lg border-2 border-emerald-600 bg-emerald-900/50 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500 sm:rounded-xl sm:text-sm"
            />
          </label>
          <label className="text-xs sm:text-sm text-emerald-100">
            Property Type
            <select
              name="propertyType"
              value={quotationForm.propertyType}
              onChange={onQuotationChange}
              className="mt-1 w-full rounded-lg border-2 border-emerald-600 bg-emerald-900/50 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500 sm:rounded-xl sm:text-sm"
            >
              <option className="bg-emerald-900">Apartment</option>
              <option className="bg-emerald-900">House</option>
              <option className="bg-emerald-900">Office</option>
            </select>
          </label>
          <label className="text-xs sm:text-sm text-emerald-100">
            Details
            <textarea
              name="details"
              value={quotationForm.details}
              onChange={onQuotationChange}
              required
              className="mt-1 min-h-20 w-full rounded-lg border-2 border-emerald-600 bg-emerald-900/50 px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-500 sm:min-h-24 sm:rounded-xl sm:text-sm"
              placeholder="Property size, rooms, bathrooms, special requests..."
            />
          </label>
          <button
            type="submit"
            className="rounded-lg border-2 border-emerald-500 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 px-4 py-2 text-xs font-semibold text-emerald-200 shadow-lg shadow-emerald-600/20 hover:from-emerald-600/40 hover:to-blue-600/40 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm"
          >
            Send Quote Request
          </button>
          {quotationStatus ? <p className="text-xs text-emerald-200">{quotationStatus}</p> : null}
        </div>
      </form>
    </section>
  );
}
