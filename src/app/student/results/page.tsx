"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { db } from "@/lib/db/db-store";
import { BarChart3, Award, CheckCircle2, TrendingUp, Printer, Sparkles, ShieldCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function StudentResultsPage() {
  const student = db.students.getById("st-1")!;
  const user = db.users.getById(student.userId)!;

  const result = db.results.getByStudentId(student.id) || db.results.getAll()[0];

  return (
    <AppShell
      user={user}
      profileName={student.fullName}
      profileIdentifier={student.studentId}
      avatarUrl={student.avatarUrl}
    >
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold mb-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Official Academic Transcript</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Academic Results & Marks</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Comprehensive weighted evaluation transcript including theory, practicals, project and attendance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full">
              Status: {result.status}
            </span>
          </div>
        </div>

        {/* Top Summary Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#073d27] via-[#0b4f34] to-[#12583c] text-white p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
              {result.courseCode} • {result.batchCode}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">{result.courseTitle}</h2>
            <p className="text-xs text-emerald-200/90">
              Evaluated on {formatDate(result.computedAt)} by KISS Academic Examination Council
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-xs shrink-0">
            <div className="text-center px-2">
              <span className="text-[10px] uppercase font-bold text-emerald-200 block tracking-wider">
                Total Score
              </span>
              <span className="text-3xl font-serif font-bold text-white">
                {result.totalScore}<span className="text-sm font-normal text-emerald-200">/{result.maxTotal}</span>
              </span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center px-2">
              <span className="text-[10px] uppercase font-bold text-amber-300 block tracking-wider">
                Final Grade
              </span>
              <span className="text-3xl font-serif font-bold text-amber-300 animate-float inline-block">
                {result.grade}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Weighted Breakdown Table matching Course Handout */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Performance Breakdown & Evaluation Matrix
              </h3>
              <p className="text-xs text-slate-500">
                Weighted components aligned with NayiDisha VTMS assessment criteria
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Pass Mark: 50%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Evaluation Component</th>
                  <th className="py-3 px-4">Max Weight</th>
                  <th className="py-3 px-4">Marks Obtained</th>
                  <th className="py-3 px-4">Percentage</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800">Theory Assessments</td>
                  <td className="py-3.5 px-4 text-slate-600">{result.maxTheory}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800">{result.theoryScore}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    {Math.round((result.theoryScore / result.maxTheory) * 100)}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      PASSED
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800">Workshop Practicals (Lab Rubric)</td>
                  <td className="py-3.5 px-4 text-slate-600">{result.maxPractical}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800">{result.practicalScore}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    {Math.round((result.practicalScore / result.maxPractical) * 100)}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      PASSED
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800">Capstone Fabrication Project</td>
                  <td className="py-3.5 px-4 text-slate-600">{result.maxProject}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800">{result.projectScore}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    {Math.round((result.projectScore / result.maxProject) * 100)}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      PASSED
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800">Attendance Compliance (≥75%)</td>
                  <td className="py-3.5 px-4 text-slate-600">{result.maxAttendance}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800">{result.attendanceScore}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    {Math.round((result.attendanceScore / result.maxAttendance) * 100)}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      PASSED
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="text-emerald-950 font-medium">
                Official marks recorded in SQLite institutional datastore and signed by Academic Registrar.
              </span>
            </div>
            <button
              onClick={() => window.print()}
              className="btn-interactive px-3 py-1.5 bg-white text-emerald-900 border border-emerald-300 font-bold rounded-lg cursor-pointer shadow-2xs hover:bg-emerald-100 flex items-center gap-1.5 shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Transcript</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
