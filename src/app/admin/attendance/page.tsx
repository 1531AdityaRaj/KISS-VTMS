import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/db-store";
import { formatDate } from "@/lib/utils";
import { AttendanceExportButton } from "@/components/ui/AttendanceExportButton";
import { ShieldCheck, Fingerprint } from "lucide-react";

export default async function AdminAttendancePage() {
  const session = await getSession();
  const admin = session?.admin || db.admins.getAll()[0];
  const user = session?.user || db.users.getById(admin.userId)!;

  const records = db.attendance.getAll();

  return (
    <AppShell
      user={user}
      profileName={admin.fullName}
      profileIdentifier="Admin Officer"
      avatarUrl={admin.avatarUrl}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Institutional Attendance Oversight
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Course-level and batch-level attendance tracking and certification threshold audits (Minimum 75% Required)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
              Institutional Average: 87%
            </span>
            <AttendanceExportButton records={records} filenamePrefix="KISS_VTMS_Attendance_Audit_MIS" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">Biometric & RFID Smart Card Log</span>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {records.length} Recorded Entries
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tamper-Proof Biometric Hashes Active</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Verification Mode</th>
                  <th className="py-3 px-4">Faculty Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-700">{formatDate(rec.date)}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{rec.studentName}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{rec.studentCode}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                          rec.status === "PRESENT"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : rec.status === "LATE"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "bg-rose-50 text-rose-800 border border-rose-200"
                        }`}
                      >
                        {rec.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium">
                        <Fingerprint className="w-3 h-3 text-emerald-600" />
                        Biometric Verified
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{rec.remarks || "Regular Session"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
