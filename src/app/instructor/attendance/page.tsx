"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Save,
  Users,
  Check,
} from "lucide-react";
import { initialStudents, initialUsers, initialBatches } from "@/lib/db/mock-data";
import { db } from "@/lib/db/db-store";
import { AttendanceStatus } from "@/types";

export default function InstructorAttendancePage() {
  const instructor = db.instructors.getById("ins-1")!;
  const user = db.users.getById(instructor.userId)!;

  const [selectedBatch, setSelectedBatch] = useState("batch-1");
  const [selectedDate, setSelectedDate] = useState("2026-11-06");
  const [attendanceState, setAttendanceState] = useState<Record<string, AttendanceStatus>>({
    "st-1": "PRESENT",
    "st-2": "PRESENT",
    "st-3": "ABSENT",
    "st-4": "PRESENT",
    "st-5": "LATE",
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [bulkNotice, setBulkNotice] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const studentsList = initialStudents;

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceState((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleBulkStatus = (status: AttendanceStatus) => {
    const updated: Record<string, AttendanceStatus> = {};
    studentsList.forEach((s) => {
      updated[s.id] = status;
    });
    setAttendanceState(updated);
    setBulkNotice(`All ${studentsList.length} students marked ${status.toLowerCase()}`);
    setTimeout(() => setBulkNotice(null), 3000);
  };

  const handleSaveAttendance = () => {
    setIsSaving(true);
    const records = studentsList.map((s, idx) => ({
      sessionId: `sess-${selectedBatch}-${selectedDate}`,
      studentId: s.id,
      studentName: s.fullName,
      studentCode: s.studentId,
      date: selectedDate,
      sessionNumber: 24,
      courseId: "course-1",
      batchId: selectedBatch,
      status: attendanceState[s.id] || "PRESENT",
    }));

    setTimeout(() => {
      db.attendance.markAttendance(records);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    }, 500);
  };

  return (
    <AppShell
      user={user}
      profileName={instructor.fullName}
      profileIdentifier={instructor.instructorId}
      avatarUrl={instructor.avatarUrl}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Mark Attendance</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Select batch and date to mark student attendance
            </p>
          </div>
        </div>

        {saveSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Attendance saved successfully for {selectedDate}!</span>
          </div>
        )}

        {/* Filter Controls matching Screenshot */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Batch</label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            >
              <option value="batch-1">VT-3D-2026-04 (3D Printing & CAD)</option>
              <option value="batch-2">VT-WEB-2026-02 (Web Development)</option>
              <option value="batch-3">VT-ELEC-2026-01 (Electrical)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            />
          </div>

          <div>
            <button
              type="button"
              className="w-full py-2.5 bg-institutional-800 hover:bg-institutional-900 text-white font-semibold rounded-xl text-xs shadow transition-all"
            >
              Load Students
            </button>
          </div>
        </div>

        {/* Students Marking Table matching Screenshot */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          {/* Quick Bulk Action Bar - PROMINENT MARK ALL PRESENT TOGETHER */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-700" />
              <span className="font-serif font-bold text-sm text-slate-900">
                Student Roster ({studentsList.length} Students)
              </span>
              {bulkNotice && (
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full animate-in fade-in duration-200">
                  {bulkNotice}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">Bulk Actions:</span>
              <button
                type="button"
                onClick={() => handleBulkStatus("PRESENT")}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-95 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                title="Mark all students present together"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Mark All Present</span>
              </button>

              <button
                type="button"
                onClick={() => handleBulkStatus("ABSENT")}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 active:scale-95 border border-rose-200 flex items-center gap-1 transition-all cursor-pointer"
                title="Mark all students absent"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Mark All Absent</span>
              </button>

              <button
                type="button"
                onClick={() => handleBulkStatus("LATE")}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 active:scale-95 border border-amber-200 flex items-center gap-1 transition-all cursor-pointer"
                title="Mark all students late"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Mark All Late</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-12">#</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">
                    <div className="flex items-center justify-between gap-2">
                      <span>Status</span>
                      <button
                        type="button"
                        onClick={() => handleBulkStatus("PRESENT")}
                        className="text-[10px] font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded border border-emerald-300 transition-colors uppercase tracking-wider cursor-pointer"
                        title="Set all rows to Present"
                      >
                        ✓ All Present
                      </button>
                    </div>
                  </th>
                  <th className="py-3 px-4">Attendance %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentsList.map((st, idx) => {
                  const currentStatus = attendanceState[st.id] || "PRESENT";
                  const pct = [87, 92, 78, 85, 80][idx] || 82;

                  return (
                    <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-400">{idx + 1}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{st.fullName}</td>
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-600">
                        {st.studentId}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="inline-flex rounded-xl bg-slate-100 p-1 gap-1 border border-slate-200">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(st.id, "PRESENT")}
                            className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                              currentStatus === "PRESENT"
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                            Present
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(st.id, "ABSENT")}
                            className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                              currentStatus === "ABSENT"
                                ? "bg-rose-600 text-white shadow-xs"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                            Absent
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(st.id, "LATE")}
                            className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                              currentStatus === "LATE"
                                ? "bg-amber-600 text-white shadow-xs"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                            Late
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">{pct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Bulk Actions & Save Footer matching Screenshot */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleBulkStatus("PRESENT")}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                ✓ Mark All Present
              </button>
              <button
                type="button"
                onClick={() => handleBulkStatus("ABSENT")}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
              >
                ✗ Mark All Absent
              </button>
              <button
                type="button"
                onClick={() => handleBulkStatus("LATE")}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
              >
                ⏱ Mark All Late
              </button>
            </div>

            <button
              type="button"
              disabled={isSaving}
              onClick={handleSaveAttendance}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Attendance"}</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
