import React from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/layout/Navbar";
import { Award, Users, Wrench } from "lucide-react";

export default function AboutTrainingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <PublicNavbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-semibold">
            <span>Eradicating hunger through Education</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-institutional-900">
            Empowering Youth Through Hands-on Vocational Skills
          </h1>
          <p className="text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
            The Vocational Training Management System (VTMS) is engineered to deliver structured,
            industry-calibrated technical education for students at Kalinga Institute of Social
            Sciences (KISS).
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Practical-First Curriculum
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Over 70% of course hours are spent on physical machines, 3D printers, CNC lathes,
              electronic workstations and automotive bays.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Certified Master Trainers
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instructors with deep industrial track records guide cohorts through rubrics-based
              evaluations and personalized technical feedback.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Verifiable Credentials
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every graduate receives an official institutional certificate embedded with a
              tamper-proof QR code verifiable by employers worldwide.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
