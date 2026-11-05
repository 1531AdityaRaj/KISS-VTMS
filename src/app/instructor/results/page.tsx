import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/db-store";
import { BarChart3, Award, Users, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function InstructorResultsPage() {
  const session = await getSession();
  const instructor = session?.instructor || db.instructors.getById("ins-1")!;
  const user = session?.user || db.users.getById(instructor.userId)!;

  const results = db.results.getAll();

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
              Student Results & Grades
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Review aggregate performance marks, component weighted breakdowns and passing grades
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Theory (20)</th>
                  <th className="py-3 px-4">Practical (40)</th>
                  <th className="py-3 px-4">Project (25)</th>
                  <th className="py-3 px-4">Total (90)</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{res.studentName}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">{res.studentCode}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{res.theoryScore}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{res.practicalScore}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{res.projectScore}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-800 font-mono">
                      {res.totalScore} ({res.percentage}%)
                    </td>
                    <td className="py-3.5 px-4 font-bold text-amber-600">{res.grade}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {res.status}
                      </span>
                    </td>
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
