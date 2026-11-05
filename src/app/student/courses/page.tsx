import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/db-store";
import { BookOpen, Layers, Clock, Award, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { CourseThumbnail } from "@/components/ui/CourseThumbnail";

export default async function StudentCoursesPage() {
  const session = await getSession();
  const student = session?.student || db.students.getById("st-1")!;
  const user = session?.user || db.users.getById(student.userId)!;

  const enrollments = db.enrollments.getByStudentId(student.id);

  return (
    <AppShell
      user={user}
      profileName={student.fullName}
      profileIdentifier={student.studentId}
      avatarUrl={student.avatarUrl}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold mb-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Vocational Specialization Trade</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">My Enrolled Course</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Track module completion, syllabus lessons and laboratory milestones
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full shadow-2xs">
            1 of 1 Maximum Elective Enrolled
          </span>
        </div>

        {/* Single-Trade Specialization Policy Notice (BR-10 Compliance) */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0 animate-pulse" />
            <div>
              <p className="font-bold text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>KISS Single-Trade Specialization Policy Active (BR-10)</span>
              </p>
              <p className="text-emerald-800 text-[11px] mt-0.5">
                Under the KISS vocational mission, student scholars focus on exactly 1 specialized trade at a time to maximize hands-on workshop mastery and NSQF certification readiness.
              </p>
            </div>
          </div>
          <span className="shrink-0 px-3 py-1 bg-white text-emerald-900 font-bold text-[10px] rounded-lg border border-emerald-300 uppercase tracking-wider shadow-2xs">
            Single-Trade Compliant
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {enrollments.map((enr) => {
            const course = db.courses.getById(enr.courseId) || db.courses.getAll()[0];
            const modules = db.modules.getByCourseId(course.id);

            return (
              <div
                key={enr.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-xs border border-slate-200">
                      <CourseThumbnail code={course.code} alt={course.title} categoryName={course.categoryName} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-900 px-2.5 py-0.5 rounded border border-emerald-200">
                          {course.code}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          Batch: {enr.batchCode}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-1">
                        {course.title}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Lead Instructor: <strong className="text-slate-800 font-semibold">{enr.instructorName}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 min-w-[200px] text-right space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Course Progress</span>
                      <span className="font-bold text-emerald-700">{enr.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full shimmer-progress transition-all duration-700"
                        style={{ width: `${enr.progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block">4 of 6 Modules Completed</span>
                  </div>
                </div>

                {/* Modules list */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-base text-slate-900">
                      Curriculum Syllabus & Learning Modules
                    </h3>
                    <span className="text-xs text-slate-400 font-medium">{modules.length} Core Modules</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {modules.map((m, idx) => (
                      <div
                        key={m.id}
                        className="p-4 bg-slate-50/80 hover:bg-slate-100/80 rounded-2xl border border-slate-200/80 space-y-2 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold font-mono text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                            Module {idx + 1}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {m.durationHours} Hrs
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-xs text-slate-900 leading-snug line-clamp-1">
                          {m.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {m.description}
                        </p>
                        <div className="pt-1 flex items-center justify-between text-[11px] font-semibold">
                          <span className={idx < 4 ? "text-emerald-700 flex items-center gap-1" : "text-slate-400"}>
                            {idx < 4 ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : null}
                            {idx < 4 ? "Completed" : "Upcoming"}
                          </span>
                          <span className="text-slate-400 font-mono">{idx < 4 ? "100%" : "0%"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Lab Equipment */}
                <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-amber-950">Workshop Machinery & Safety Standards</p>
                      <p className="text-amber-800 text-[11px]">
                        Lab Room: Central Vocational Wing Lab 1 • Mandatory Safety Glasses & Closed-Toe Boots
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/student/practicals"
                    className="btn-interactive px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shrink-0 cursor-pointer shadow-2xs"
                  >
                    View Practical Rubrics →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
