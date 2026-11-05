import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/db-store";
import { ClipboardList, PlusCircle, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function InstructorAssessmentsPage() {
  const session = await getSession();
  const instructor = session?.instructor || db.instructors.getById("ins-1")!;
  const user = session?.user || db.users.getById(instructor.userId)!;

  const assessments = db.assessments.getAll();

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
              Online Assessments & Tests
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Create theory assessments with multiple choice questions, timer rules and automated scoring
            </p>
          </div>

          <Link
            href="/instructor/assessments/create"
            className="px-4 py-2.5 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Assessment</span>
          </Link>
        </div>

        <div className="space-y-4">
          {assessments.map((asm) => (
            <div
              key={asm.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded">
                      {asm.type}
                    </span>
                    <span className="text-xs font-bold text-emerald-800">{asm.status}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-900 mt-1">{asm.title}</h3>
                </div>

                <div className="text-right text-xs text-slate-500">
                  <p>
                    <strong className="text-slate-800">{asm.totalMarks} Marks</strong> (Pass:{" "}
                    {asm.passingMarks})
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Duration: {asm.durationMinutes} Minutes • Scheduled: {formatDate(asm.scheduledDate)}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{asm.instructions}</p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{asm.questions?.length || 5} Questions Configured</span>
                <span className="font-mono text-emerald-800 font-bold">Auto-Scoring Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
