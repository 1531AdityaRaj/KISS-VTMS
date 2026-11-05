"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PublicNavbar } from "@/components/layout/Navbar";
import { KissLogo } from "@/components/ui/KissLogo";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Search,
  Sparkles,
} from "lucide-react";
import { initialCourses } from "@/lib/db/mock-data";
import { CourseThumbnail } from "@/components/ui/CourseThumbnail";

export default function LandingPage() {
  const router = useRouter();
  const [verifyInput, setVerifyInput] = useState("");

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyInput.trim()) {
      router.push(`/verify/${encodeURIComponent(verifyInput.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <PublicNavbar />

      {/* Hero Section with Ambient Mesh & Micro-animations */}
      <section className="relative overflow-hidden hero-ambient-mesh pt-14 pb-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-950 text-xs font-semibold tracking-wide shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
                <span>Eradicating hunger through Education</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-institutional-900 tracking-tight leading-[1.15]">
                Building Skills. <br />
                <span className="text-emerald-700 bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
                  Creating Opportunities.
                </span>
              </h1>

              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                A comprehensive platform for vocational education, practical training, continuous
                assessments and tamper-proof digital certification at{" "}
                <strong className="text-slate-800 font-semibold">
                  Kalinga Institute of Social Sciences (KISS)
                </strong>
                .
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="#programs"
                  className="btn-interactive px-6 py-3.5 rounded-xl font-bold text-white bg-institutional-800 hover:bg-institutional-900 shadow-md hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
                <Link
                  href="/login"
                  className="btn-interactive px-6 py-3.5 rounded-xl font-semibold text-institutional-900 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all cursor-pointer"
                >
                  Student Login
                </Link>
                <Link
                  href="/verify"
                  className="btn-interactive px-4 py-3.5 rounded-xl text-sm font-semibold text-emerald-900 hover:text-emerald-950 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Verify Certificate</span>
                </Link>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative animate-fade-in">
              <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white interactive-card group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&auto=format&fit=crop&q=80"
                  alt="Vocational Training Lab"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider mb-2 w-fit shadow-xs">
                    <span>Skills Empower Change</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg leading-snug">
                    Hands-on Practical Labs & Modern Workshops
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Industry-grade equipment: 3D Printers, CNC machining, electrical test benches & digital labs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar with Glass Effect */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl glass-panel shadow-sm">
            <div className="text-center p-2 hover:scale-105 transition-transform">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-institutional-900">
                20
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                Vocational Electives
              </div>
            </div>
            <div className="text-center p-2 border-l border-slate-200/80 hover:scale-105 transition-transform">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-institutional-900">
                500+
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                Students Trained
              </div>
            </div>
            <div className="text-center p-2 border-l border-slate-200/80 hover:scale-105 transition-transform">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-emerald-700">
                95%
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                Completion Rate
              </div>
            </div>
            <div className="text-center p-2 border-l border-slate-200/80 hover:scale-105 transition-transform">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-600">
                100%
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                Digital Certificates
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Categories & Catalog Section */}
      <section id="programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Vocational Training Electives & Programs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-institutional-900">
              Vocational Training Programs
            </h2>
            <p className="text-slate-600">
              Industry-aligned vocational training electives designed to build hands-on skills, promote
              self-employment, and empower students with sustainable livelihoods.
            </p>
          </div>

            {/* Course Cards Grid */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {initialCourses.map((course) => (
                <div
                  key={course.id}
                  className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm interactive-card flex flex-col justify-between hover:border-emerald-400/50 hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden bg-slate-900">
                      <CourseThumbnail
                        src={course.thumbnail}
                        alt={course.title}
                        code={course.code}
                        categoryName={course.categoryName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur text-institutional-900 font-bold text-[11px] px-2.5 py-1 rounded-lg shadow-sm">
                        {course.code}
                      </div>
                      <div className="absolute top-3 right-3 bg-[#073d27]/95 backdrop-blur text-white font-medium text-[10px] px-2.5 py-0.5 rounded-full shadow-sm">
                        {course.categoryName}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-700" />
                          {course.duration}
                        </span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                          {course.skillLevel}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                        {course.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{course.description}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500 font-normal truncate max-w-[130px] text-[11px]">
                      {course.practicalFocus}
                    </span>
                    <Link
                      href={`/courses/${course.id}`}
                      className="btn-interactive inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold transition-all shrink-0 cursor-pointer group-hover:bg-emerald-700 group-hover:text-white"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-serif font-bold text-institutional-900">
              How The Training Works
            </h2>
            <p className="text-slate-600 text-sm">
              A structured 5-step vocational lifecycle from initial enrollment to verified digital certification.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                step: "01",
                title: "Enroll",
                desc: "Register in your chosen vocational discipline and get assigned to an instructor cohort.",
              },
              {
                step: "02",
                title: "Learn",
                desc: "Study modular syllabus, attend scheduled daily classes and complete theory modules.",
              },
              {
                step: "03",
                title: "Practice",
                desc: "Perform hands-on lab experiments, build CAD models, wire circuits or fabricate components.",
              },
              {
                step: "04",
                title: "Get Assessed",
                desc: "Submit rubrics-based practicals and take online chapter & final theory assessments.",
              },
              {
                step: "05",
                title: "Get Certified",
                desc: "Satisfy eligibility checks to receive your verifiable, QR-enabled institutional digital certificate.",
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative group hover:border-emerald-300 transition-all text-left"
              >
                <div className="text-3xl font-serif font-bold text-emerald-700/80 mb-3">
                  {item.step}
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-base mb-1">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Public Certificate Verification Banner */}
      <section className="py-16 bg-gradient-to-r from-[#0a261a] to-[#0b4f34] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Public Verification Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Verify Vocational Certificate Authenticity
          </h2>

          <p className="text-slate-200 text-sm max-w-xl mx-auto">
            Instantly authenticate genuine vocational completion credentials issued by Kalinga
            Institute of Social Sciences using the official Certificate ID or QR code.
          </p>

          <form onSubmit={handleVerifySubmit} className="max-w-xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={verifyInput}
                onChange={(e) => setVerifyInput(e.target.value)}
                placeholder="Enter Certificate ID (e.g. KISS-VT-2026-000421)"
                className="w-full pl-11 pr-4 py-3.5 text-sm bg-white text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-lg placeholder:text-slate-400 font-mono font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 font-semibold text-white rounded-xl shadow-lg transition-colors shrink-0"
            >
              Verify
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/nayidisha-logo.png"
              alt="NayiDisha - Turning Skills into Opportunities"
              className="h-12 w-auto object-contain"
            />
            <div className="border-l border-slate-200 pl-3">
              <p className="font-sans font-bold text-sm text-institutional-900">NayiDisha</p>
              <p className="text-xs text-slate-500">In collaboration with KISS</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <Link href="/courses" className="hover:underline">
              Vocational Electives
            </Link>
            <Link href="/verify" className="hover:underline">
              Certificate Verification
            </Link>
            <Link href="/login" className="hover:underline">
              Portal Login
            </Link>
          </div>
          <p className="text-xs text-slate-400 text-center sm:text-right">
            © 2026 NayiDisha. In collaboration with Kalinga Institute of Social Sciences (KISS).
          </p>
        </div>
      </footer>
    </div>
  );
}
