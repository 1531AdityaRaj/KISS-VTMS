"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PublicNavbar } from "@/components/layout/Navbar";
import { ShieldCheck, Search, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function VerifySearchPage() {
  const router = useRouter();
  const [certId, setCertId] = useState("KISS-VT-2026-000421");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (certId.trim()) {
      router.push(`/verify/${encodeURIComponent(certId.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <PublicNavbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center text-center space-y-8">
        {/* Verification Icon & Header */}
        <div className="space-y-3 max-w-xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck className="w-10 h-10 text-institutional-800" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-institutional-900">
            Verify Certificate
          </h1>
          <p className="text-sm text-slate-600">
            Enter the unique Certificate ID printed on the physical credential or scanned from the
            verifiable QR code.
          </p>
        </div>

        {/* Verification Form */}
        <div className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Certificate ID Number
              </label>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  placeholder="e.g. KISS-VT-2026-000421"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-institutional-800/20 focus:border-institutional-800 transition-all uppercase"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-institutional-800 hover:bg-institutional-900 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Verify Authenticity</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo ID suggestion */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500">
            <span>Demo Certificate ID: </span>
            <button
              type="button"
              onClick={() => {
                setCertId("KISS-VT-2026-000421");
                router.push("/verify/KISS-VT-2026-000421");
              }}
              className="font-mono font-bold text-emerald-800 hover:underline bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 ml-1"
            >
              KISS-VT-2026-000421
            </button>
          </div>
        </div>

        {/* Institutional Trust Notice */}
        <div className="max-w-md text-xs text-slate-400 leading-relaxed">
          Public verification displays only non-sensitive completion credentials to maintain student
          data privacy in compliance with institutional guidelines.
        </div>
      </main>
    </div>
  );
}
