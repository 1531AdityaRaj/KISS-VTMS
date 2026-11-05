"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ArrowLeft, PlusCircle, Save, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/db/db-store";

export default function CreateAssessmentPage() {
  const router = useRouter();
  const instructor = db.instructors.getById("ins-1")!;
  const user = db.users.getById(instructor.userId)!;

  const [title, setTitle] = useState("");
  const [scheduledDate, setScheduledDate] = useState("2026-09-28");
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [totalMarks, setTotalMarks] = useState(20);
  const [passingMarks, setPassingMarks] = useState(10);
  const [instructions, setInstructions] = useState(
    "Answer all multiple-choice questions. Passing score is 50%."
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    db.assessments.create({
      title,
      type: "ONLINE",
      courseId: "course-1",
      courseTitle: "3D Printing & CAD",
      batchId: "batch-1",
      batchCode: "VT-3D-2026-04",
      instructorId: instructor.id,
      instructorName: instructor.fullName,
      scheduledDate: new Date(scheduledDate).toISOString(),
      startTime: "10:00 AM",
      durationMinutes: Number(durationMinutes),
      totalMarks: Number(totalMarks),
      passingMarks: Number(passingMarks),
      maxAttempts: 1,
      instructions,
      status: "ACTIVE",
    });

    db.auditLogs.log({
      actorId: user.id,
      actorName: instructor.fullName,
      actorRole: "INSTRUCTOR",
      action: "CREATE_ASSESSMENT",
      entity: "Assessment",
      metadata: { title, totalMarks },
    });

    setTimeout(() => {
      setIsSaving(false);
      router.push("/instructor/assessments");
    }, 500);
  };

  return (
    <AppShell
      user={user}
      profileName={instructor.fullName}
      profileIdentifier={instructor.instructorId}
      avatarUrl={instructor.avatarUrl}
    >
      <div className="space-y-6 max-w-3xl mx-auto">
        <Link
          href="/instructor/assessments"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assessments</span>
        </Link>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h1 className="text-2xl font-serif font-bold text-slate-900">Create Online Assessment</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Set up online MCQ theory test for cohort VT-3D-2026-04
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Assessment Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Slicing with Cura & Toolpath Verification"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Scheduled Date</label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Total Marks</label>
                <input
                  type="number"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Test Instructions</label>
              <textarea
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3 bg-institutional-800 hover:bg-institutional-900 text-white font-semibold rounded-xl shadow transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Create & Schedule Assessment"}</span>
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
