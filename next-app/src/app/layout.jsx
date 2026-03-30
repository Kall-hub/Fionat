import { Geist, Geist_Mono } from "next/font/google";
import LoadingScreen from "./components/LoadingScreen";
import SiteFooter from "./components/SiteFooter";
import SiteNav from "./components/SiteNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FIONAT SERVICES",
  description: "Premium professional cleaning and maintenance services with expert care and attention to detail.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LoadingScreen />
        <div className="min-h-screen bg-gradient-to-br from-blue-950 via-emerald-900 to-blue-900 text-white">
          <SiteNav />
          <main className="mx-auto w-full max-w-6xl px-3 pt-24 sm:pt-20 pb-6 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-10 w-60 h-60 sm:w-80 sm:h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              {children}
            </div>
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
