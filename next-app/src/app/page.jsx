import Link from "next/link";
import AnimatedTestimonials from "./components/AnimatedTestimonials";

const serviceHighlights = [
  "Home Cleaning",
  "Deep Cleaning",
  "Move In / Move Out",
  "Office Touch-Up",
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="grid gap-8 rounded-3xl border-2 border-blue-400 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-8 sm:p-10 lg:grid-cols-2 lg:items-center shadow-lg shadow-blue-200/40">
        <div className="space-y-5">
          <p className="inline-block rounded-full bg-gradient-to-r from-blue-200 to-emerald-200 px-3 py-1 text-sm font-medium text-blue-700">
            ✓ Established Professional Services
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-blue-900 sm:text-5xl">
            Enterprise-Grade Cleaning Solutions
          </h1>
          <p className="text-base text-slate-700 sm:text-lg">
            FIONAT SERVICES is a registered professional cleaning company delivering consistent excellence, unwavering reliability, and meticulous results across residential and commercial properties.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/book-quote"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:from-blue-700 hover:to-emerald-700 shadow-lg shadow-emerald-400/30"
            >
              Schedule Service
            </Link>
            <Link
              href="/book-quote"
              className="rounded-xl border-2 border-emerald-500 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 shadow-md"
            >
              Get a Quote
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-blue-50 p-6 shadow-lg shadow-emerald-200/40">
          <h2 className="text-xl font-semibold text-emerald-900">Professional Service Portfolio</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {serviceHighlights.map((service) => (
              <li
                key={service}
                className="rounded-xl border-2 border-blue-300 bg-gradient-to-br from-white to-blue-50 px-4 py-3 text-sm font-medium text-blue-900 shadow-md hover:shadow-blue-300/50 transition hover:border-blue-400"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AnimatedTestimonials />

      {/* Footer */}
      <footer className="mt-12 sm:mt-16 border-t-2 border-emerald-500/30 bg-gradient-to-br from-blue-950 via-emerald-950 to-blue-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-emerald-400 mb-3 sm:mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-xs sm:text-sm text-blue-200 hover:text-emerald-300 transition">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-emerald-400 mb-3 sm:mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/book-quote" className="text-xs sm:text-sm text-blue-200 hover:text-emerald-300 transition">
                    Book Now
                  </Link>
                </li>
                <li>
                  <Link href="/book-quote" className="text-xs sm:text-sm text-blue-200 hover:text-emerald-300 transition">
                    Get Quote
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Testimonials */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-emerald-400 mb-3 sm:mb-4">Feedback</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/rating" className="text-xs sm:text-sm text-blue-200 hover:text-emerald-300 transition">
                    Rate Us
                  </Link>
                </li>
                <li>
                  <Link href="/before-after" className="text-xs sm:text-sm text-blue-200 hover:text-emerald-300 transition">
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Company */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <h3 className="text-sm sm:text-base font-bold text-emerald-400 mb-3 sm:mb-4">FIONAT Services</h3>
              <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
                Professional cleaning excellence since day one. A registered company committed to exceptional standards.
              </p>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-emerald-500/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-blue-300/80">© {new Date().getFullYear()} FIONAT SERVICES — All rights reserved</p>
            <p className="text-xs sm:text-sm text-emerald-300/80 font-medium">Excellence in every detail</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

