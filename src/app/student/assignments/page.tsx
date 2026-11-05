"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { db } from "@/lib/db/db-store";
import {
  FileText,
  Clock,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Filter,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function StudentAssignmentsPage() {
  const student = db.students.getById("st-1")!;
  const user = db.users.getById(student.userId)!;

  const enrollment = db.enrollments.getActiveForStudent(student.id) || db.enrollments.getAll()[0];
  const assignments = db.assignments.getByCourseId(enrollment.courseId);
  const submissions = db.submissions.getByStudentId(student.id);

  const [filter, setFilter] = useState<"ALL" | "PENDING" | "SUBMITTED" | "EVALUATED">("ALL");

  const filteredAssignments = assignments.filter((asg) => {
    const sub = submissions.find((s) => s.assignmentId === asg.id);
    const isEvaluated = sub?.status === "EVALUATED";
    const isSubmitted = sub?.status === "SUBMITTED";

    if (filter === "EVALUATED") return isEvaluated;
    if (filter === "SUBMITTED") return isSubmitted;
    if (filter === "PENDING") return !sub;
    return true;
  });

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
              <span>Continuous Assessment (30% Course Weight)</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Assignments & Tasks</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Submit your CAD designs, fabrication reports and review instructor marks & feedback
            </p>
          </div>
          <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
            {enrollment.courseTitle}
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setFilter("ALL")}
            className={`btn-interactive px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === "ALL"
                ? "bg-slate-900 text-white shadow-2xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            All Tasks ({assignments.length})
          </button>
          <button
            onClick={() => setFilter("PENDING")}
            className={`btn-interactive px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === "PENDING"
                ? "bg-amber-500 text-slate-950 shadow-2xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("SUBMITTED")}
            className={`btn-interactive px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === "SUBMITTED"
                ? "bg-blue-600 text-white shadow-2xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Submitted
          </button>
          <button
            onClick={() => setFilter("EVALUATED")}
            className={`btn-interactive px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === "EVALUATED"
                ? "bg-emerald-700 text-white shadow-2xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Evaluated
          </button>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="font-serif font-bold text-slate-800">No tasks found in this filter</p>
              <p className="text-xs text-slate-400">All submissions are up to date.</p>
            </div>
          ) : (
            filteredAssignments.map((asg) => {
              const sub = submissions.find((s) => s.assignmentId === asg.id);
              const isEvaluated = sub?.status === "EVALUATED";
              const isSubmitted = sub?.status === "SUBMITTED" || isEvaluated;

              return (
                <div
                  key={asg.id}
                  className="interactive-card bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-emerald-300 flex flex-col md:flex-row md:items-center justify-between gap-5 group"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2.5">
                      <span className="font-serif font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {asg.title}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                        Max Marks: {asg.maxMarks}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{asg.description}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Deadline: <strong className="text-slate-700">{formatDate(asg.deadline)}</strong></span>
                      </span>
                      <span>•</span>
                      <span className="text-slate-600 font-medium">{asg.moduleTitle || "Core Module"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 justify-between md:justify-end shrink-0">
                    <div>
                      {isEvaluated ? (
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Score: {sub?.marksObtained}/{asg.maxMarks}</span>
                          </span>
                        </div>
                      ) : isSubmitted ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>Submitted</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 shadow-2xs">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          <span>Pending Action</span>
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/student/assignments/${asg.id}`}
                      className="btn-interactive px-4 py-2.5 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                    >
                      <span>{isSubmitted ? "View Submission" : "Submit Work"}</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AppShell>
  );
}
