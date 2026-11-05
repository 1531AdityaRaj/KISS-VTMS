import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/db-store";
import { Wrench, CheckCircle2, Clock, ArrowRight, Award } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function StudentPracticalsPage() {
  const session = await getSession();
  const student = session?.student || db.students.getById("st-1")!;
  const user = session?.user || db.users.getById(student.userId)!;

  const practicals = db.practicals.getAll();
  const practicalSubs = db.practicalSubmissions.getByStudentId(student.id);

  return (
    <AppShell
      user={user}
      profileName={student.fullName}
      profileIdentifier={student.studentId}
      avatarUrl={student.avatarUrl}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Practical Workshops</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Hands-on lab assignments evaluated on institutional multi-criteria technical rubrics
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {practicals.map((prac) => {
            const sub = practicalSubs.find((s) => s.practicalId === prac.id);
            const isEvaluated = sub?.status === "EVALUATED";

            return (
              <div
                key={prac.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      Workshop Practical
                    </span>
                    <h2 className="text-lg font-serif font-bold text-slate-900 mt-1">
                      {prac.title}
                    </h2>
                  </div>

                  {isEvaluated ? (
                    <div className="text-right p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                        Rubric Score
                      </span>
                      <span className="text-xl font-serif font-bold text-emerald-700">
                        {sub?.score}/{prac.maxMarks} Marks
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
                      Due: {formatDate(prac.deadline)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{prac.description}</p>

                {/* Rubric criteria breakdown */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide">
                    Evaluation Rubric Breakdown
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {prac.rubricCriteria.map((c) => (
                      <div key={c.id} className="p-2 bg-white rounded-lg border border-slate-200">
                        <span className="font-semibold text-slate-800 block text-[11px] truncate">
                          {c.name}
                        </span>
                        <span className="text-emerald-700 font-bold font-mono">
                          {c.maxScore} Max Marks
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {isEvaluated && sub?.feedback && (
                  <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-emerald-950">Instructor Feedback:</span>
                    <p className="text-emerald-900 italic">&ldquo;{sub.feedback}&rdquo;</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
