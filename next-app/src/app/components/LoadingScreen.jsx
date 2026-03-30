"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-emerald-800 to-blue-950">
      <div className="flex flex-col items-center gap-6">
          <div className="relative h-24 w-24">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-400 border-r-blue-400"></div>
            <div className="flex items-center justify-center h-full text-3xl font-bold bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-transparent">F</div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-transparent">FIONAT</h1>
            <p className="text-sm text-emerald-300">SERVICES</p>
          </div>
          <p className="mt-2 text-sm text-emerald-300 animate-pulse">Loading excellence...</p>
      </div>
    </div>
  );
}
