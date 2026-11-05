"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/layout/Navbar";
import {
  ArrowLeft,
  Clock,
  Award,
  Layers,
  Wrench,
  CheckCircle2,
  Play,
  User,
  BookOpen,
  Calendar,
  Sparkles,
} from "lucide-react";
import { initialCourses, initialModules, initialInstructors } from "@/lib/db/mock-data";
import { CourseThumbnail } from "@/components/ui/CourseThumbnail";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.courseId;
  const [activeTab, setActiveTab] = useState<"overview" | "syllabus" | "modules" | "practicals" | "instructor">("overview");

  const course = initialCourses.find((c) => c.id === courseId) || initialCourses[0];
  const modules = initialModules.filter((m) => m.courseId === course.id);
  const instructor = initialInstructors.find((i) => i.id === course.instructorId) || initialInstructors[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Back Link */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </Link>

        {/* Course Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {course.code}
              </span>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mt-2">
                {course.title}
              </h1>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5">
              <Link
                href="/register"
                className="px-6 py-3 bg-institutional-800 hover:bg-institutional-900 text-white font-semibold text-sm rounded-xl shadow-md transition-all text-center"
              >
                Enroll in this Trade
              </Link>
              <span className="text-[11px] text-slate-500 font-medium">
                * Single-Trade Policy: 1 course per student
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            {course.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-emerald-700" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Duration</p>
                <p className="text-xs font-bold text-slate-800">{course.duration}</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-emerald-700" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Skill Level</p>
                <p className="text-xs font-bold text-slate-800">{course.skillLevel}</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2.5">
              <Wrench className="w-4 h-4 text-emerald-700" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Practical Focus</p>
                <p className="text-xs font-bold text-slate-800">{course.practicalFocus}</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2.5">
              <Award className="w-4 h-4 text-amber-600" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Certificate</p>
                <p className="text-xs font-bold text-slate-800">On Completion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
          {[
            { id: "overview", label: "Overview" },
            { id: "syllabus", label: "Syllabus" },
            { id: "modules", label: "Modules" },
            { id: "practicals", label: "Practical Work" },
            { id: "instructor", label: "Course Instructor" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 transition-colors capitalize ${
                activeTab === tab.id
                  ? "text-institutional-900 border-b-2 border-institutional-800 font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {activeTab === "overview" && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="relative rounded-2xl overflow-hidden h-72 bg-slate-900">
                  <CourseThumbnail
                    src={course.thumbnail}
                    alt={course.title}
                    code={course.code}
                    categoryName={course.categoryName}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                      <Play className="w-6 h-6 ml-1 text-white fill-white" />
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-serif font-bold text-slate-900">Program Summary</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  This training track is crafted for students seeking immediate industry applicability
                  and technical competency. The syllabus blends theoretical design fundamentals with
                  intensive daily laboratory experimentation under experienced master instructors.
                </p>
              </div>
            )}

            {(activeTab === "syllabus" || activeTab === "modules") && (
              <div className="space-y-3">
                <h3 className="text-lg font-serif font-bold text-slate-900">Course Modules</h3>
                {modules.map((m, idx) => (
                  <div
                    key={m.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200">
                      0{idx + 1}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 text-sm">{m.title}</h4>
                      <p className="text-xs text-slate-600">{m.description}</p>
                      {m.learningObjectives && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {m.learningObjectives.map((obj, i) => (
                            <span
                              key={i}
                              className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                            >
                              ✓ {obj}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "practicals" && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  Practical Activities & Workshops
                </h3>
                <p className="text-xs text-slate-600">
                  Every student must complete mandatory hands-on projects evaluated on a strict
                  industry-standard rubric covering design precision, tool execution, output quality,
                  and workshop safety.
                </p>
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                    Sample Workshop Task
                  </h4>
                  <p className="text-sm font-semibold text-slate-900">
                    Design and Print a Mechanical Gear Assembly
                  </p>
                  <p className="text-xs text-slate-600">
                    Students calculate tooth pitch, model in SolidWorks, optimize slicing profiles, and
                    fabricate the physical gear prototype on high-precision 3D printers.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "instructor" && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={instructor.avatarUrl}
                    alt={instructor.fullName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-emerald-600"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-lg text-slate-900">
                      {instructor.fullName}
                    </h3>
                    <p className="text-xs text-slate-500">{instructor.designation}</p>
                    <p className="text-xs text-emerald-700 font-semibold">{instructor.department}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{instructor.bio}</p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-serif font-bold text-base text-slate-900">
                Course Instructor
              </h4>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={instructor.avatarUrl}
                  alt={instructor.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">{instructor.fullName}</p>
                  <p className="text-[11px] text-slate-500">{instructor.designation}</p>
                </div>
              </div>
              <Link
                href="/register"
                className="w-full py-2.5 bg-institutional-800 hover:bg-institutional-900 text-white font-semibold text-xs rounded-xl shadow block text-center transition-all"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
