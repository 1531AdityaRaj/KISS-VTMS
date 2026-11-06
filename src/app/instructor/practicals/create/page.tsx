"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ArrowLeft, PlusCircle, Save, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/db/db-store";

export default function CreatePracticalPage() {
  const router = useRouter();
  const instructor = db.instructors.getById("ins-1")!;
  const user = db.users.getById(instructor.userId)!;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("2026-11-10T18:00");
  const [maxMarks, setMaxMarks] = useState(80);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    db.practicals.create({
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
      toolsRequired: ["SolidWorks 2024", "Ultimaker Cura", "FDM 3D Printer"],
      instructions: [
        "1. Complete CAD part modeling.",
        "2. Export clean STL format.",
        "3. Print physical prototype in workshop.",
      ],
      rubricCriteria: [
        { id: "crit-1", name: "CAD Precision", maxScore: 20 },
        { id: "crit-2", name: "Slicing Quality", maxScore: 20 },
        { id: "crit-3", name: "Printing Finish", maxScore: 30 },
        { id: "crit-4", name: "Workshop Safety", maxScore: 10 },
      ],
    });

    setTimeout(() => {
      setIsSaving(false);
      router.push("/instructor/practicals");
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
          href="/instructor/practicals"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Practicals</span>
        </Link>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h1 className="text-2xl font-serif font-bold text-slate-900">Create Practical Activity</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Set up a multi-criteria workshop task with scoring rubrics
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Practical Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Practical #05: Micro-Turbine Blade Aerodynamic Prototyping"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Task Brief & Required Equipment
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail the mechanical design, tools and inspection procedures..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Submission Deadline</label>
                <input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Total Max Marks</label>
                <input
                  type="number"
                  value={maxMarks}
                  onChange={(e) => setMaxMarks(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3 bg-institutional-800 hover:bg-institutional-900 text-white font-semibold rounded-xl shadow transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Create Practical Workshop"}</span>
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
