"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import {
  Wrench,
  CheckCircle2,
  FileCheck,
  Clock,
  Eye,
  Save,
  Sparkles,
  Sliders,
  Award,
  Zap,
} from "lucide-react";
import { db } from "@/lib/db/db-store";

export default function InstructorPracticalsPage() {
  const instructor = db.instructors.getById("ins-1")!;
  const user = db.users.getById(instructor.userId)!;

  const [submissions, setSubmissions] = useState(db.practicalSubmissions.getAll());
  const [selectedSubId, setSelectedSubId] = useState<string | null>("psub-1");

  // Rubric state for currently selected submission
  const [cadScore, setCadScore] = useState(18);
  const [slicingScore, setSlicingScore] = useState(19);
  const [printScore, setPrintScore] = useState(26);
  const [safetyScore, setSafetyScore] = useState(9);
  const [feedback, setFeedback] = useState(
    "Outstanding work on tolerance calculation. The pin articulation was smooth on first attempt!"
  );
  const [toastMessage, setToastMessage] = useState("");

  const selectedSub = submissions.find((s) => s.id === selectedSubId) || submissions[0];
  const totalScore = cadScore + slicingScore + printScore + safetyScore;

  // Preset fast-grading shortcuts
  const applyPreset = (tier: "EXCELLENT" | "MERIT" | "PASS") => {
    if (tier === "EXCELLENT") {
      setCadScore(20);
      setSlicingScore(20);
      setPrintScore(28);
      setSafetyScore(10);
      setFeedback("Exceptional precision, flawless surface finish and strict adherence to workshop safety standards.");
    } else if (tier === "MERIT") {
      setCadScore(17);
      setSlicingScore(17);
      setPrintScore(24);
      setSafetyScore(9);
      setFeedback("Very good fabrication quality. Minor stringing observed on overhangs, but overall dimensions are accurate.");
    } else {
      setCadScore(14);
      setSlicingScore(14);
      setPrintScore(20);
      setSafetyScore(8);
      setFeedback("Acceptable work meeting baseline requirements. Recommended to recalibrate bed leveling and extrusion temperature.");
    }
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;

    const updated = db.practicalSubmissions.grade(
      selectedSub.id,
      totalScore,
      {
        "crit-1": cadScore,
        "crit-2": slicingScore,
        "crit-3": printScore,
        "crit-4": safetyScore,
      },
      feedback,
      instructor.fullName
    );

    if (updated) {
      setSubmissions(db.practicalSubmissions.getAll());
      setToastMessage("Practical graded and rubric recorded successfully!");
      setTimeout(() => setToastMessage(""), 3500);
    }
  };

  return (
    <AppShell
      user={user}
      profileName={instructor.fullName}
      profileIdentifier={instructor.instructorId}
      avatarUrl={instructor.avatarUrl}
    >
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold mb-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Multi-Criteria Rubric Evaluation</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Practical Training & Rubric Evaluation
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Grade physical workshop submissions and evaluate multi-criteria rubrics with 1-click presets
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl">
              {submissions.length} Workshop Submissions
            </span>
          </div>
        </div>

        {toastMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-xs animate-slide-up">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Submissions List */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900">Student Submissions</h3>
              <span className="text-xs text-slate-400">Click to evaluate</span>
            </div>

            <div className="space-y-3">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubId(sub.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedSubId === sub.id
                      ? "bg-emerald-50/70 border-emerald-500 shadow-xs"
                      : "bg-slate-50/70 hover:bg-slate-100/70 border-slate-200/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-slate-900">
                      {sub.studentName}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sub.status === "EVALUATED"
                          ? "bg-emerald-100 text-emerald-900"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {sub.status === "EVALUATED" ? "Graded" : "Needs Review"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{sub.studentId}</p>
                  <div className="flex items-center justify-between text-xs text-slate-600 mt-2 pt-2 border-t border-slate-200/60">
                    <span className="truncate max-w-[180px]">{sub.practicalTitle}</span>
                    <span className="font-bold text-emerald-800">
                      {sub.score ? `${sub.score}/80 Marks` : "Not Graded"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Rubric Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedSub.practicalId.toUpperCase()}
                </span>
                <h3 className="font-serif font-bold text-lg text-slate-900 mt-1">
                  {selectedSub.studentName}
                </h3>
                <p className="text-xs text-slate-500">{selectedSub.practicalTitle}</p>
              </div>

              <div className="text-right p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Computed Rubric Score
                </span>
                <span className="text-2xl font-serif font-bold text-emerald-700">
                  {totalScore} <span className="text-xs font-normal text-slate-600">/ 80 Marks</span>
                </span>
              </div>
            </div>

            {/* Quick 1-Click Grading Presets for Efficiency */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 uppercase tracking-wide">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>1-Click Grading Presets</span>
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => applyPreset("EXCELLENT")}
                  className="btn-interactive px-3 py-1 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-semibold cursor-pointer shadow-2xs"
                >
                  ★ Distinction / Excellent (78/80)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("MERIT")}
                  className="btn-interactive px-3 py-1 bg-white hover:bg-blue-50 text-blue-900 border border-blue-300 rounded-lg text-xs font-semibold cursor-pointer shadow-2xs"
                >
                  ✓ First Class / Merit (67/80)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("PASS")}
                  className="btn-interactive px-3 py-1 bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold cursor-pointer shadow-2xs"
                >
                  ● Pass Grade (56/80)
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveGrade} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Criterion 1 */}
                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">1. CAD Model Accuracy</span>
                    <span className="font-mono font-bold text-emerald-700">{cadScore}/20</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={cadScore}
                    onChange={(e) => setCadScore(Number(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400">Dimensions, sketch constraints, drafts</p>
                </div>

                {/* Criterion 2 */}
                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">2. Slicing & Layer Parameters</span>
                    <span className="font-mono font-bold text-emerald-700">{slicingScore}/20</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={slicingScore}
                    onChange={(e) => setSlicingScore(Number(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400">Infill density, support tree, print speed</p>
                </div>

                {/* Criterion 3 */}
                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">3. Print Quality & Tolerances</span>
                    <span className="font-mono font-bold text-emerald-700">{printScore}/30</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={printScore}
                    onChange={(e) => setPrintScore(Number(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400">Surface finish, bed adhesion, dimensions</p>
                </div>

                {/* Criterion 4 */}
                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">4. Workshop Safety Compliance</span>
                    <span className="font-mono font-bold text-emerald-700">{safetyScore}/10</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={safetyScore}
                    onChange={(e) => setSafetyScore(Number(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400">PPE gear, tool handling, workstation cleanup</p>
                </div>
              </div>

              {/* Feedback text */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Instructor Evaluator Feedback:
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  placeholder="Provide personalized technical feedback for student growth..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="btn-interactive px-6 py-3 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Submit Rubric Grade</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
