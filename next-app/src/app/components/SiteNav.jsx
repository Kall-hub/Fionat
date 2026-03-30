"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/rating", label: "Rating" },
  { href: "/before-after", label: "Before & After" },
  { href: "/book-quote", label: "Book / Quote" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const asideRef = useRef(null);

  // lock body scroll when sidebar is open
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // close menu when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // close on Escape key
  useEffect(() => {
    if (!sidebarOpen || typeof window === "undefined") return;

    const handleEscape = (event) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [sidebarOpen]);

  // ensure desktop view never gets stuck with mobile menu state
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // focus trap for mobile menu
  useEffect(() => {
    if (!sidebarOpen || typeof window === "undefined") return;

    const node = asideRef.current;
    if (!node) return;

    const focusable = Array.from(
      node.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])')
    ).filter((el) => !el.hasAttribute("disabled"));

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (first) first.focus();

    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [sidebarOpen]);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-emerald-500 bg-[#04131f] shadow-lg shadow-emerald-600/20">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="z-50 bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-2xl"
          >
            FIONAT
          </Link>
        </div>

        <ul className="hidden items-center gap-3 md:flex">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50"
                      : "text-emerald-100 hover:bg-emerald-700/50 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={sidebarOpen}
            aria-controls="mobile-menu"
            onClick={() => setSidebarOpen((open) => !open)}
            className="relative z-[70] rounded-md p-2.5 text-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <span className="sr-only">{sidebarOpen ? "Close menu" : "Open menu"}</span>
            <span className="relative block h-6 w-6">
              <span
                className={`absolute left-0 top-1 h-0.5 w-6 bg-current transition-all duration-300 ${
                  sidebarOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-6 bg-current transition-all duration-300 ${
                  sidebarOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-5 h-0.5 w-6 bg-current transition-all duration-300 ${
                  sidebarOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          className={`fixed inset-0 z-[60] flex md:hidden ${
            sidebarOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          aria-hidden={!sidebarOpen}
        >
          <button
            type="button"
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu overlay"
            tabIndex={sidebarOpen ? 0 : -1}
          />

          <aside
            id="mobile-menu"
            ref={asideRef}
            className={`relative ml-auto h-full w-[84%] max-w-xs border-l-2 border-emerald-500 bg-gradient-to-br from-blue-900 via-emerald-900 to-blue-950 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] shadow-2xl transition-transform duration-300 ease-out ${
              sidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-lg font-bold text-transparent"
              >
                FIONAT
              </Link>
            </div>

            <nav>
              <ul className="flex flex-col gap-2">
                {links.map((item, index) => {
                  const active = pathname === item.href;
                  return (
                    <li
                      key={item.href}
                      className={`${sidebarOpen ? "mobile-nav-item-enter" : "mobile-nav-item-exit"}`}
                      style={{ transitionDelay: `${index * 40}ms` }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`block rounded-md px-4 py-3 text-base font-medium transition ${
                          active
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50"
                            : "text-emerald-100 hover:bg-emerald-700/50 hover:text-white"
                        }`}
                        tabIndex={sidebarOpen ? 0 : -1}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      </nav>
    </header>
  );
}
