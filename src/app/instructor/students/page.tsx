import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/db-store";
import { Users, BookOpen, CalendarCheck, Award, Eye, Mail, Phone } from "lucide-react";

export default async function InstructorStudentsPage() {
  const session = await getSession();
  const instructor = session?.instructor || db.instructors.getById("ins-1")!;
  const user = session?.user || db.users.getById(instructor.userId)!;

  const students = db.students.getAll();

  return (
    <AppShell
      user={user}
      profileName={instructor.fullName}
      profileIdentifier={instructor.instructorId}
      avatarUrl={instructor.avatarUrl}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Enrolled Students</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Inspect student training progress, attendance rates and academic submissions
            </p>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
            Total: {students.length} Students
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Course & Batch</th>
                  <th className="py-3 px-4">Attendance</th>
                  <th className="py-3 px-4">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((st, idx) => {
                  const att = db.attendance.calculateStudentAttendanceRate(st.id);

                  return (
                    <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs shrink-0">
                            {st.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{st.fullName}</p>
                            <p className="text-[11px] text-slate-400">{st.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                        {st.studentId}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        3D Printing & CAD <span className="text-slate-400">(VT-3D-2026-04)</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                            att >= 75
                              ? "bg-emerald-50 text-emerald-800"
                              : "bg-rose-50 text-rose-800"
                          }`}
                        >
                          {att}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">{st.phone}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
