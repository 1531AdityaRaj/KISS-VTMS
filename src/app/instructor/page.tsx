import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/db-store";
import {
  Layers,
  Users,
  Calendar,
  FileCheck,
  CalendarCheck,
  FileText,
  Wrench,
  ClipboardList,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";

export default async function InstructorDashboardPage() {
  const session = await getSession();
  const instructor = session?.instructor || db.instructors.getById("ins-1")!;
  const user = session?.user || db.users.getById(instructor.userId)!;

  const batches = db.batches.getByInstructorId(instructor.id);
  const students = db.students.getAll();
  const submissions = db.submissions.getAll().filter((s) => s.status === "SUBMITTED");
  const practicalSubs = db.practicalSubmissions.getAll().filter((p) => p.status === "SUBMITTED");
  const pendingCount = submissions.length + practicalSubs.length;

  return (
    <AppShell
      user={user}
      profileName={instructor.fullName}
      profileIdentifier={instructor.instructorId}
      avatarUrl={instructor.avatarUrl}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#073d27] via-[#0b4f34] to-[#12583c] text-white p-6 sm:p-8 shadow-md">
          <div className="absolute -right-8 -bottom-8 w-60 h-60 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>Instructor Academic Management</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Welcome, {instructor.fullName}!
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
                {instructor.qualification ? (
                  <span className="font-semibold text-amber-300 mr-1.5">{instructor.qualification} •</span>
                ) : null}
                Guide students through hands-on vocational modules, mark attendance and review workshop practicals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
              <Link
                href="/instructor/profile"
                className="btn-interactive px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold rounded-xl backdrop-blur-xs flex items-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>Edit Profile & Degree</span>
              </Link>
              <Link
                href="/instructor/attendance"
                className="btn-interactive px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow flex items-center gap-1.5 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 stroke-[2.5]" />
                <span>Mark Attendance</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/instructor/classes"
            className="interactive-card bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-emerald-400 block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Active Batches
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-serif font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                {batches.length || 3}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Across 2 vocational trades</p>
          </Link>

          <Link
            href="/instructor/students"
            className="interactive-card bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-400 block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Enrolled Scholars
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-serif font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                {students.length || 48}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Single-Trade verified</p>
          </Link>

          <div className="interactive-card bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs block group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Classes Today
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-serif font-bold text-slate-900">2</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Lab 1 & Lab 2 scheduled</p>
          </div>

          <Link
            href="/instructor/practicals"
            className="interactive-card bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-rose-400 block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Pending Reviews
              </span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-serif font-bold text-rose-600">
                {pendingCount || 6}
              </span>
            </div>
            <p className="text-xs text-rose-600 font-semibold mt-1">Action required →</p>
          </Link>
        </div>

        {/* 4 Quick Actions Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/instructor/attendance"
            className="btn-interactive p-4 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200 text-emerald-950 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4 text-emerald-700" />
            <span>Mark Attendance (Bulk)</span>
          </Link>

          <Link
            href="/instructor/assignments/create"
            className="btn-interactive p-4 bg-blue-50/80 hover:bg-blue-100 border border-blue-200 text-blue-950 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-blue-700" />
            <span>+ Create Assignment</span>
          </Link>

          <Link
            href="/instructor/practicals/create"
            className="btn-interactive p-4 bg-amber-50/80 hover:bg-amber-100 border border-amber-200 text-amber-950 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
          >
            <Wrench className="w-4 h-4 text-amber-700" />
            <span>+ Create Practical</span>
          </Link>

          <Link
            href="/instructor/assessments/create"
            className="btn-interactive p-4 bg-purple-50/80 hover:bg-purple-100 border border-purple-200 text-purple-950 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
          >
            <ClipboardList className="w-4 h-4 text-purple-700" />
            <span>+ Create Assessment</span>
          </Link>
        </div>

        {/* Today's Classes List with Interactive Quick-Launch */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">Today&apos;s Lab Schedule</h3>
              <p className="text-xs text-slate-500">Live sessions for practical equipment and software labs</p>
            </div>
            <span className="text-xs text-slate-500 font-medium">2 Scheduled Sessions</span>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-50/80 hover:bg-slate-100/90 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
              <div className="flex items-start sm:items-center gap-4">
                <div className="px-3.5 py-2 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold font-mono shrink-0 shadow-2xs">
                  09:30 AM - 11:30 AM
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">3D Printing & CAD Fabrication</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Batch: VT-3D-2026-04 • Room: Lab 1 • 24 Students</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/instructor/attendance"
                  className="btn-interactive px-4 py-2 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-bold shadow-xs transition-all shrink-0 text-center cursor-pointer flex items-center gap-1.5"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Take Attendance</span>
                </Link>
                <Link
                  href="/instructor/practicals"
                  className="btn-interactive px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition-all shrink-0 text-center cursor-pointer"
                >
                  Rubrics
                </Link>
              </div>
            </div>

            <div className="p-4 bg-slate-50/80 hover:bg-slate-100/90 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
              <div className="flex items-start sm:items-center gap-4">
                <div className="px-3.5 py-2 bg-blue-100 text-blue-900 rounded-xl text-xs font-bold font-mono shrink-0 shadow-2xs">
                  02:00 PM - 04:00 PM
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">SolidWorks & Geometric Modeling</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Batch: VT-3D-2026-05 • Room: Lab 2 • 24 Students</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/instructor/attendance"
                  className="btn-interactive px-4 py-2 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-bold shadow-xs transition-all shrink-0 text-center cursor-pointer flex items-center gap-1.5"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Take Attendance</span>
                </Link>
                <Link
                  href="/instructor/classes"
                  className="btn-interactive px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition-all shrink-0 text-center cursor-pointer"
                >
                  Class Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
