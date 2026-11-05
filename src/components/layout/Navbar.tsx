"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, Menu, X, ArrowRight } from "lucide-react";
import { NayiDishaLogo } from "@/components/ui/NayiDishaLogo";

export function TopInstitutionalHeader() {
  return (
    <div className="w-full bg-white border-b border-slate-200 shadow-sm">
      {/* Top Green Accent Bar */}
      <div className="h-1.5 w-full bg-[#1b7340]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-4">
        {/* 1. Extreme Left: Official KISS Logo (enlarged & balanced) with tagline directly below within width */}
        <div className="flex flex-col items-center justify-center text-center shrink-0">
          <Link
            href="/"
            className="flex flex-col items-center group max-w-[125px] sm:max-w-[145px] md:max-w-[160px] transition-transform hover:scale-[1.02]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/kiss-logo-official.png"
              alt="Kalinga Institute of Social Sciences"
              className="h-14 sm:h-16 md:h-[72px] lg:h-[76px] w-auto object-contain"
            />
            <span className="text-[8.5px] sm:text-[9.5px] md:text-[10px] font-serif font-bold text-[#1b7340] leading-tight text-center mt-1 w-full tracking-normal">
              Eradicating hunger through Education.
            </span>
          </Link>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-14 md:h-16 w-px bg-slate-200 shrink-0" />

        {/* 2. NayiDisha Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link href="/" className="flex items-center group">
            <NayiDishaLogo className="h-14 sm:h-16 md:h-[72px] lg:h-[76px] w-auto object-contain transition-transform group-hover:scale-[1.02]" />
          </Link>

          {/* 3. In collaboration with part */}
          <div className="hidden lg:flex flex-col text-left pl-3 border-l border-slate-200">
            <span className="text-[9.5px] font-semibold tracking-wider uppercase text-slate-500 leading-tight">
              In collaboration with
            </span>
            <span className="text-xs sm:text-sm font-serif font-bold text-[#0b4f34] leading-tight">
              KISS Foundation
            </span>
          </div>
        </div>

        {/* 4. Leftover Center Part: NayiDisha Tagline */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center text-center px-2 lg:px-4">
          <div className="flex items-center gap-2">
            <div className="h-px w-5 sm:w-8 bg-gradient-to-r from-transparent to-[#1b7340]" />
            <h2 className="font-serif italic font-bold text-sm lg:text-base xl:text-lg text-[#0b4f34] tracking-wide whitespace-nowrap">
              “Turning Skills into Opportunities”
            </h2>
            <div className="h-px w-5 sm:w-8 bg-gradient-to-l from-transparent to-[#1b7340]" />
          </div>
          <p className="text-[9px] lg:text-[10px] font-sans font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
            Vocational Training & Livelihood Mission
          </p>
        </div>

        {/* 5. Right: Founder Profile Prof. Achyuta Samanta */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 pl-2 shrink-0">
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/achyuta-samanta.jpg"
              alt="Prof. Achyuta Samanta"
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-full object-cover border-2 border-slate-100 shadow-sm"
            />
          </div>
          <div className="text-left flex flex-col justify-center">
            <h3 className="font-bold text-xs sm:text-sm text-[#004b87] leading-tight tracking-tight">
              Prof. Achyuta Samanta
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-tight">
              Founder — KIIT & KISS
            </p>
            <a
              href="https://achyutasamanta.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] sm:text-xs text-[#004b87] hover:underline font-normal leading-tight mt-0.5"
            >
              achyutasamanta.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <TopInstitutionalHeader />
      <header className="sticky top-0 z-50 bg-[#073d27]/95 backdrop-blur-md text-white shadow-lg border-b border-emerald-800/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Brand Title */}
            <Link
              href="/"
              className="flex items-center gap-2.5 text-white font-serif font-bold text-lg sm:text-xl tracking-tight hover:text-emerald-200 transition-all group"
            >
              <span className="font-sans font-extrabold tracking-tight group-hover:tracking-normal transition-all">
                NayiDisha
              </span>
              <span className="hidden sm:inline-block text-[11px] font-sans font-medium text-emerald-200 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20 shadow-2xs">
                In collaboration with KISS
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 text-sm font-medium text-emerald-50">
              <Link
                href="/"
                className="px-3 py-1.5 rounded-xl hover:text-white hover:bg-white/10 transition-all"
              >
                Home
              </Link>
              <Link
                href="/courses"
                className="px-3 py-1.5 rounded-xl hover:text-white hover:bg-white/10 transition-all"
              >
                Vocational Electives (20)
              </Link>
              <Link
                href="/about"
                className="px-3 py-1.5 rounded-xl hover:text-white hover:bg-white/10 transition-all"
              >
                About Training
              </Link>
              <Link
                href="/#how-it-works"
                className="px-3 py-1.5 rounded-xl hover:text-white hover:bg-white/10 transition-all"
              >
                How It Works
              </Link>
              <Link
                href="/verify"
                className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold bg-amber-400/10 hover:bg-amber-400/20 px-3 py-1.5 rounded-xl border border-amber-400/30 transition-all shadow-2xs hover:scale-105"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Verification</span>
              </Link>
            </nav>

            {/* CTA Actions */}
            <div className="hidden md:flex items-center gap-2.5">
              <Link
                href="/login"
                className="px-3.5 py-1.5 text-sm font-semibold text-emerald-100 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn-interactive flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md hover:shadow-amber-400/25 transition-all cursor-pointer"
              >
                <span>Register / Apply</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#073623] border-t border-emerald-800 px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-emerald-100 hover:text-white py-2 font-medium"
            >
              Home
            </Link>
            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-emerald-100 hover:text-white py-2 font-medium"
            >
              Vocational Electives (20)
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-emerald-100 hover:text-white py-2 font-medium"
            >
              About Training
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-emerald-100 hover:text-white py-2 font-medium"
            >
              How It Works
            </Link>
            <Link
              href="/verify"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-amber-300 py-2 font-semibold"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Verify Certificate</span>
            </Link>
            <div className="pt-3 border-t border-emerald-800/80 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-white/10 text-white font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-amber-400 text-[#0b4f34] font-bold shadow-sm"
              >
                Register / Apply
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
