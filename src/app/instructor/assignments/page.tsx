import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/db-store";
import { FileText, PlusCircle, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function InstructorAssignmentsListPage() {
  const session = await getSession();
  const instructor = session?.instructor || db.instructors.getById("ins-1")!;
  const user = session?.user || db.users.getById(instructor.userId)!;

  const assignments = db.assignments.getAll();
  const submissions = db.submissions.getAll();

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
            <h1 className="text-2xl font-serif font-bold text-slate-900">Assignments & Tasks</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage assignment briefs, review student uploads and enter evaluations
            </p>
          </div>

          <Link
            href="/instructor/assignments/create"
            className="px-4 py-2.5 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Assignment</span>
          </Link>
        </div>

        <div className="space-y-4">
          {assignments.map((asg) => {
            const subsForAsg = submissions.filter((s) => s.assignmentId === asg.id);
            const evaluatedCount = subsForAsg.filter((s) => s.status === "EVALUATED").length;

            return (
              <div
                key={asg.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-serif font-bold text-base text-slate-900">{asg.title}</h3>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      {asg.batchCode || "VT-3D-2026-04"}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Due: {formatDate(asg.deadline)}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">{asg.description}</p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-800">
                    Submissions: {subsForAsg.length} received ({evaluatedCount} evaluated)
                  </span>

                  <span className="font-mono text-slate-400 font-bold">
                    Max Marks: {asg.maxMarks}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
