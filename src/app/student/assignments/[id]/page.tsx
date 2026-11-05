"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  UploadCloud,
  FileText,
  FileCheck,
  Award,
  MessageSquare,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { db } from "@/lib/db/db-store";

export default function AssignmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const assignmentId = resolvedParams.id;

  const student = db.students.getById("st-1")!;
  const user = db.users.getById(student.userId)!;
  const assignment = db.assignments.getById(assignmentId) || db.assignments.getAll()[0];
  const [submission, setSubmission] = useState(
    db.submissions.getByAssignmentAndStudent(assignment.id, student.id)
  );

  const [comments, setComments] = useState(submission?.comments || "");
  const [uploadedFiles, setUploadedFiles] = useState(
    submission?.files || [
      { name: "Spur_Gear_24T_SolidWorks.sldprt", url: "#", size: "2.4 MB", type: "CAD Part" },
      { name: "Spur_Gear_Print.stl", url: "#", size: "1.1 MB", type: "STL Model" },
      { name: "Cura_Slicing_Parameters.pdf", url: "#", size: "640 KB", type: "PDF Document" },
      { name: "Printed_Gear_Photo.jpg", url: "#", size: "1.8 MB", type: "Image" },
    ]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSimulatedUpload = () => {
    const newFile = {
      name: `Updated_Design_v2_${Date.now().toString().slice(-4)}.stl`,
      url: "#",
      size: "2.2 MB",
      type: "STL Model",
    };
    setUploadedFiles((prev) => [...prev, newFile]);
  };

  const handleSubmitWork = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const updated = db.submissions.createOrUpdate({
        assignmentId: assignment.id,
        assignmentTitle: assignment.title,
        studentId: student.id,
        studentName: student.fullName,
        studentCode: student.studentId,
        files: uploadedFiles,
        comments,
        status: "SUBMITTED",
        marksObtained: submission?.marksObtained,
        maxMarks: assignment.maxMarks,
        feedback: submission?.feedback,
      });
      setSubmission(updated);
      setIsSubmitting(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 600);
  };

  return (
    <AppShell
      user={user}
      profileName={student.fullName}
      profileIdentifier={student.studentId}
      avatarUrl={student.avatarUrl}
    >
      <div className="space-y-6">
        {/* Back Link */}
        <Link
          href="/student/assignments"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assignments</span>
        </Link>

        {showSuccessToast && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Assignment submitted successfully to your instructor!</span>
          </div>
        )}

        {/* Assignment Header matching Screenshot */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                {assignment.title}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md">
                Practical
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 w-fit">
              <Clock className="w-3.5 h-3.5" />
              <span>Due: 25 Sep 2026, 11:59 PM</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            {assignment.description}
          </p>

          {assignment.instructions && (
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-1">
              <span className="font-bold text-slate-800">Task Instructions:</span>
              <p className="text-slate-600">{assignment.instructions}</p>
            </div>
          )}
        </div>

        {/* Main 2-Column: Upload Dropzone & Submission Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Upload Submission Box */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-serif font-bold text-base text-slate-900">Submission</h3>

            <form onSubmit={handleSubmitWork} className="space-y-4">
              {/* Drag and Drop Zone matching screenshot */}
              <div
                onClick={handleSimulatedUpload}
                className="border-2 border-dashed border-slate-300 hover:border-emerald-600 bg-slate-50/70 hover:bg-emerald-50/30 rounded-2xl p-8 text-center cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white text-emerald-700 shadow-sm flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Drag and drop files here, or <span className="text-emerald-700 underline">click to browse</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Supports SLDPRT, STL, GCODE, PDF, Images, ZIP (Max 50MB)
                  </p>
                </div>
              </div>

              {/* Uploaded Files List */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-700 block">
                  Attached Files ({uploadedFiles.length})
                </span>
                <div className="space-y-1.5">
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span className="font-medium text-slate-800 truncate">{file.name}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-[11px] shrink-0">{file.size}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Comments */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Remarks & Notes
                </label>
                <textarea
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Add notes about your design, slicing configuration, or printer nozzle settings..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-institutional-800 hover:bg-institutional-900 text-white font-semibold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Uploading Submission..." : "Update / Submit Assignment"}
              </button>
            </form>
          </div>

          {/* Right Column: Status & Instructor Feedback matching screenshot */}
          <div className="lg:col-span-4 space-y-6">
            {/* Submission Status Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-serif font-bold text-sm text-slate-900">Submission Status</h4>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <span className="font-bold text-emerald-800 text-xs uppercase tracking-wider">
                  Submitted
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-500 pt-1">
                <p>
                  <strong className="text-slate-700">Submitted on:</strong> 22 Sep 2026, 10:30 AM
                </p>
                <p>
                  <strong className="text-slate-700">Files:</strong> {uploadedFiles.length}
                </p>
              </div>
            </div>

            {/* Instructor Feedback Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-sm text-slate-900">Instructor Feedback</h4>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Marks: {submission?.marksObtained || 46}/{assignment.maxMarks}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 italic">
                &ldquo;{submission?.feedback || "Good work! The gear design is accurate and tooth profile is crisp. Try improving slicing settings for a smoother top layer."}&rdquo;
              </p>

              <div className="text-[11px] text-slate-400">
                Graded by: <span className="font-semibold text-slate-700">Rohit Kumar</span> (Instructor)
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
