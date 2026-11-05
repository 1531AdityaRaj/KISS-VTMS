"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import {
  Award,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Send,
} from "lucide-react";
import { initialStudents, initialUsers } from "@/lib/db/mock-data";
import { db } from "@/lib/db/db-store";

export default function InstructorCertificationsPage() {
  const instructor = db.instructors.getById("ins-1")!;
  const user = db.users.getById(instructor.userId)!;

  const [students, setStudents] = useState(db.students.getAll());
  const [successToast, setSuccessToast] = useState("");

  const handleRecommend = (studentId: string, studentName: string) => {
    db.certificates.recommendForCertification(studentId, instructor.fullName);
    db.auditLogs.log({
      actorId: user.id,
      actorName: instructor.fullName,
      actorRole: "INSTRUCTOR",
      action: "RECOMMEND_CERTIFICATION",
      entity: "Student",
      entityId: studentId,
      metadata: { studentName },
    });
    setSuccessToast(`Recommended ${studentName} for Certificate Approval by Admin!`);
    setTimeout(() => setSuccessToast(""), 4000);
  };

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
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Certificate Recommendations
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Review student progress against eligibility criteria and recommend eligible students for final Admin approval
            </p>
          </div>
        </div>

        {successToast && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successToast}</span>
          </div>
        )}

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Attendance</th>
                  <th className="py-3 px-4">Course Progress</th>
                  <th className="py-3 px-4">Eligibility Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((st, idx) => {
                  const elig = db.certificates.checkEligibility(st.id);
                  const att = db.attendance.calculateStudentAttendanceRate(st.id);
                  const progress = [78, 92, 65, 85, 80][idx] || 75;

                  return (
                    <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{st.fullName}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">{st.studentId}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">{att}%</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-700">{progress}%</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                            elig.isEligible
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {elig.isEligible ? "Ready for Certification" : "Requirements Pending"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleRecommend(st.id, st.fullName)}
                          className="px-3.5 py-1.5 bg-institutional-800 hover:bg-institutional-900 text-white rounded-lg text-xs font-semibold shadow-xs transition-all inline-flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Recommend</span>
                        </button>
                      </td>
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
