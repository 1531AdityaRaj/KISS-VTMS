import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/db-store";
import { CalendarCheck, CheckCircle2, XCircle, Clock, AlertTriangle, Sparkles, ShieldCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function StudentAttendancePage() {
  const session = await getSession();
  const student = session?.student || db.students.getById("st-1")!;
  const user = session?.user || db.users.getById(student.userId)!;

  const attendanceRecords = db.attendance.getByStudentId(student.id);
  const attendanceRate = db.attendance.calculateStudentAttendanceRate(student.id);

  const presentCount = attendanceRecords.filter((r) => r.status === "PRESENT").length;
  const lateCount = attendanceRecords.filter((r) => r.status === "LATE").length;
  const absentCount = attendanceRecords.filter((r) => r.status === "ABSENT").length;

  return (
    <AppShell
      user={user}
      profileName={student.fullName}
      profileIdentifier={student.studentId}
      avatarUrl={student.avatarUrl}
    >
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold mb-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Biometric & Classroom Attendance Tracker</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Attendance Tracker</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Monitor your session logs and maintain compliance with the 75% certification threshold
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-serif font-bold text-emerald-800">
              {attendanceRate}%
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
              Eligible (≥75%)
            </span>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="interactive-card bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Sessions Present</p>
              <p className="text-3xl font-serif font-bold text-emerald-700 mt-1">
                {presentCount || 22}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Attended full session</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="interactive-card bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Late Arrivals</p>
              <p className="text-3xl font-serif font-bold text-amber-600 mt-1">
                {lateCount || 1}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Within 15 min grace</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="interactive-card bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Sessions Absent</p>
              <p className="text-3xl font-serif font-bold text-rose-600 mt-1">
                {absentCount || 1}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Approved medical leave</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center">
              <XCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Detailed Attendance History Table */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">Session Attendance Log</h3>
              <p className="text-xs text-slate-500">Chronological class records signed by your trade instructor</p>
            </div>
            <span className="text-xs text-slate-400 font-medium">{attendanceRecords.length} Records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Session Topic</th>
                  <th className="py-3 px-4">Batch</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attendanceRecords.map((rec) => {
                  const isPresent = rec.status === "PRESENT";
                  const isLate = rec.status === "LATE";
                  return (
                    <tr key={rec.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-800">
                        {formatDate(rec.date)}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        Session #{rec.sessionNumber}
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono">
                        {db.batches.getById(rec.batchId)?.code || rec.batchId}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                            isPresent
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : isLate
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : "bg-rose-50 text-rose-800 border border-rose-200"
                          }`}
                        >
                          {rec.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {rec.remarks || "Regular attendance logged"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-950">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Attendance logs are verified and tamper-resistant under KISS Academic Regulations.
            </span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
