import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/db-store";
import {
  BookOpen,
  CalendarCheck,
  FileText,
  ClipboardList,
  Award,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

export default async function StudentDashboardPage() {
  const session = await getSession();
  const student = session?.student || db.students.getById("st-1")!;
  const user = session?.user || db.users.getById(student.userId)!;

  const enrollment = db.enrollments.getActiveForStudent(student.id) || db.enrollments.getAll()[0];
  const course = db.courses.getById(enrollment.courseId) || db.courses.getAll()[0];
  const modules = db.modules.getByCourseId(course.id);
  const attendanceRate = db.attendance.calculateStudentAttendanceRate(student.id);
  const assignments = db.assignments.getByCourseId(course.id);
  const submissions = db.submissions.getByStudentId(student.id);
  const pendingAssignments = assignments.filter(
    (a) => !submissions.some((s) => s.assignmentId === a.id && s.status === "EVALUATED")
  );
  const assessments = db.assessments.getByBatchId(enrollment.batchId);
  const notifications = db.notifications.getByUserId(user.id);
  const certificateEligibility = db.certificates.checkEligibility(student.id);

  return (
    <AppShell
      user={user}
      profileName={student.fullName}
      profileIdentifier={student.studentId}
      avatarUrl={student.avatarUrl}
      notifications={notifications}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Header with Ambient Gradient and Quick Actions */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#073d27] via-[#0b4f34] to-[#12583c] text-white p-6 sm:p-8 shadow-md">
          {/* Subtle background decorative shapes */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-32 h-32 rounded-full bg-amber-400/10 blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>KISS Vocational Empowerment Program</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Welcome back, {student.fullName.split(" ")[0]}!
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
                Empowering your tribal heritage through technology and vocational craftsmanship. Continue where you left off today.
              </p>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Link
                href="/student/courses"
                className="btn-interactive px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue Course</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <Link
                href="/student/assignments"
                className="btn-interactive px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold rounded-xl backdrop-blur-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-200" />
                <span>Assignments ({pendingAssignments.length})</span>
              </Link>
              <Link
                href="/student/certificates"
                className="btn-interactive px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold rounded-xl backdrop-blur-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Certificate</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Interactive Metric Cards with Gentle Hover Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Current Course */}
          <Link
            href="/student/courses"
            className="interactive-card bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-emerald-400 block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Active Trade
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <h3 className="font-serif font-bold text-slate-900 text-sm leading-tight truncate group-hover:text-emerald-800 transition-colors">
                {course.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">{enrollment.batchCode}</p>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Progress</span>
                <span className="text-emerald-700">{enrollment.progressPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full shimmer-progress transition-all duration-700"
                  style={{ width: `${enrollment.progressPercentage}%` }}
                />
              </div>
            </div>
          </Link>

          {/* Card 2: Attendance */}
          <Link
            href="/student/attendance"
            className="interactive-card bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-emerald-400 block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Attendance Rate
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CalendarCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-serif font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                {attendanceRate}%
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                Good (≥75%)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Meets certification criteria</span>
            </p>
          </Link>

          {/* Card 3: Pending Assignments */}
          <Link
            href="/student/assignments"
            className="interactive-card bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-amber-400 block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Pending Tasks
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                {pendingAssignments.length}
              </span>
              <span className="text-xs font-semibold text-amber-700">Due this week</span>
            </div>
            <p className="text-xs font-semibold text-emerald-800 mt-2 flex items-center gap-1 group-hover:underline">
              <span>Submit tasks</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </p>
          </Link>

          {/* Card 4: Assessments */}
          <Link
            href="/student/assessments"
            className="interactive-card bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-400 block group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Assessments
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ClipboardList className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-serif font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {assessments.length}
              </span>
              <span className="text-xs font-semibold text-blue-700">Next: 26 Sep</span>
            </div>
            <p className="text-xs font-semibold text-emerald-800 mt-2 flex items-center gap-1 group-hover:underline">
              <span>Prepare for test</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </p>
          </Link>
        </div>

        {/* 2-Column Dashboard Layout: Course Progress & Upcoming Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Detailed Course Progress Modules */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900">Syllabus Completion</h3>
                <p className="text-xs text-slate-500">Track your module milestones step-by-step</p>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                {course.code}
              </span>
            </div>

            <div className="space-y-3.5 pt-1">
              {[
                { name: "Introduction to 3D Printing & Safety", pct: 100 },
                { name: "CAD Fundamentals & Geometry", pct: 80 },
                { name: "SolidWorks & Parametric Design", pct: 60 },
                { name: "Slicing with Cura & Layer Mechanics", pct: 40 },
                { name: "3D Printer Calibration & Extrusion", pct: 20 },
                { name: "Practical Capstone Fabrication", pct: 0 },
              ].map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span className="flex items-center gap-1.5">
                      {m.pct === 100 ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block text-[9px] text-center leading-3 text-slate-400">
                          {idx + 1}
                        </span>
                      )}
                      <span className={m.pct === 100 ? "text-slate-900 font-semibold" : "text-slate-700"}>
                        {m.name}
                      </span>
                    </span>
                    <span className="font-bold text-slate-900 font-mono">{m.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        m.pct === 100
                          ? "bg-emerald-600"
                          : m.pct >= 60
                          ? "bg-emerald-500"
                          : m.pct > 0
                          ? "bg-amber-500"
                          : "bg-slate-200"
                      }`}
                      style={{ width: `${m.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/student/courses"
                className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View Full Course Syllabus</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Upcoming Activities Timeline */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900">Upcoming Activities</h3>
                <p className="text-xs text-slate-500">Deadlines and laboratory schedules</p>
              </div>
              <Link
                href="/student/assignments"
                className="text-xs text-emerald-800 font-semibold hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3 pt-1">
              {/* Activity 1: Practical Submission */}
              <div className="p-3.5 bg-slate-50/90 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 flex items-start justify-between gap-3 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">
                      Practical Submission Due
                    </span>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      Assignment
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">Design and Print a Mechanical Gear</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" />
                    Tomorrow, 11:59 PM
                  </p>
                </div>
                <Link
                  href="/student/assignments/asg-1"
                  className="btn-interactive px-3 py-1.5 bg-institutional-800 hover:bg-institutional-900 text-white rounded-lg text-xs font-semibold shrink-0 cursor-pointer shadow-xs"
                >
                  Submit
                </Link>
              </div>

              {/* Activity 2: Theory Assessment */}
              <div className="p-3.5 bg-slate-50/90 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 flex items-start justify-between gap-3 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">Theory Assessment</span>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                      Assessment
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">Module 3 - SolidWorks & Additive Mfg</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-600" />
                    26 Sep 2026, 10:00 AM
                  </p>
                </div>
                <Link
                  href="/student/assessments"
                  className="btn-interactive px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shrink-0 cursor-pointer shadow-xs"
                >
                  View Test
                </Link>
              </div>

              {/* Activity 3: Regular Lab Class */}
              <div className="p-3.5 bg-slate-50/90 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 flex items-start justify-between gap-3 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">Regular Lab Class</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                      Class
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">3D Printer Operation & Z-Offset Lab</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    30 Sep 2026, 9:30 AM • Lab 1
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 py-1.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Scheduled
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Eligibility Checklist Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center animate-float">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900">
                  Digital Certificate Readiness (IEEE & NSQF Aligned)
                </h3>
                <p className="text-xs text-slate-500">
                  Automated verification checklist for issuance of tamper-proof credential
                </p>
              </div>
            </div>
            <Link
              href="/student/certificates"
              className="btn-interactive px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
            >
              <span>Open Certificate Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {certificateEligibility.requirements.map((req) => (
              <div
                key={req.id}
                className={`p-3.5 rounded-xl border flex items-start gap-2.5 transition-all ${
                  req.isMet
                    ? "bg-emerald-50/70 border-emerald-200 text-emerald-900 shadow-2xs"
                    : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    req.isMet ? "text-emerald-600" : "text-slate-300"
                  }`}
                />
                <div>
                  <p className="text-xs font-bold leading-snug">{req.title.split("(")[0]}</p>
                  <p className="text-[11px] font-semibold mt-0.5 text-slate-500">
                    Status: <span className={req.isMet ? "text-emerald-700 font-bold" : "text-slate-600"}>{req.currentValue}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
