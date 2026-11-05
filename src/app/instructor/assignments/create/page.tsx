"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ArrowLeft, PlusCircle, Save, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/db/db-store";

export default function CreateAssignmentPage() {
  const router = useRouter();
  const instructor = db.instructors.getById("ins-1")!;
  const user = db.users.getById(instructor.userId)!;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("2026-09-30T23:59");
  const [maxMarks, setMaxMarks] = useState(50);
  const [instructions, setInstructions] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    db.assignments.create({
      title,
      description,
      courseId: "course-1",
      courseTitle: "3D Printing & CAD",
      batchId: "batch-1",
      batchCode: "VT-3D-2026-04",
      instructorId: instructor.id,
      instructorName: instructor.fullName,
      deadline: new Date(deadline).toISOString(),
      maxMarks: Number(maxMarks),
      instructions,
      status: "PUBLISHED",
    });

    db.auditLogs.log({
      actorId: user.id,
      actorName: instructor.fullName,
      actorRole: "INSTRUCTOR",
      action: "CREATE_ASSIGNMENT",
      entity: "Assignment",
      metadata: { title, maxMarks },
    });

    setTimeout(() => {
      setIsSaving(false);
      router.push("/instructor/assignments");
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
          href="/instructor/assignments"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assignments</span>
        </Link>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h1 className="text-2xl font-serif font-bold text-slate-900">Create New Assignment</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Publish task instructions and deadlines for cohort VT-3D-2026-04
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Assignment Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Involute Spur Gear Modeling & Tolerancing"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Task Description *
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the required CAD steps, parameters and physical printing criteria..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Submission Deadline *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Maximum Marks</label>
                <input
                  type="number"
                  value={maxMarks}
                  onChange={(e) => setMaxMarks(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Detailed Instructions & Safety Guidelines
              </label>
              <textarea
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="1. Maintain 0.2mm tolerance. 2. Export STL binary..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3 bg-institutional-800 hover:bg-institutional-900 text-white font-semibold rounded-xl shadow transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Publishing..." : "Publish Assignment"}</span>
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
