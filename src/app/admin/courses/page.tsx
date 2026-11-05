"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { BookOpen, PlusCircle, Clock, Layers, Award, Edit, Trash2, CheckCircle2 } from "lucide-react";
import { initialCourses, initialUsers, initialAdmins, initialCategories } from "@/lib/db/mock-data";
import { db } from "@/lib/db/db-store";

export default function AdminCoursesPage() {
  const user = initialUsers[2];
  const admin = initialAdmins[0];

  const [courses, setCourses] = useState(db.courses.getAll());
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [duration, setDuration] = useState("3 Months");
  const [skillLevel, setSkillLevel] = useState("INTERMEDIATE");
  const [description, setDescription] = useState("");

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse = db.courses.create({
      title,
      code: code.toUpperCase(),
      categoryId: "cat-1",
      categoryName: "Technology",
      description,
      duration,
      skillLevel: skillLevel as any,
      practicalFocus: "Hands-on Lab Training",
      hasCertificate: true,
      status: "ACTIVE",
      thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    });

    db.auditLogs.log({
      actorId: user.id,
      actorName: admin.fullName,
      actorRole: "ADMIN",
      action: "CREATE_COURSE",
      entity: "Course",
      entityId: newCourse.id,
      metadata: { code: newCourse.code, title: newCourse.title },
    });

    setCourses([...db.courses.getAll()]);
    setShowAddModal(false);
    setToastMessage(`Course ${title} created successfully!`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <AppShell
      user={user}
      profileName={admin.fullName}
      profileIdentifier="Admin Officer"
      avatarUrl={admin.avatarUrl}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Vocational Courses & Modules
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Curate vocational training curricula, modules, practical activities and instructors
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Course</span>
          </button>
        </div>

        {toastMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded">
                    {course.code}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">{course.status}</span>
                </div>

                <h3 className="font-serif font-bold text-base text-slate-900">{course.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{course.description}</p>

                <div className="flex items-center gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {course.duration}
                  </span>
                  <span>•</span>
                  <span>{course.skillLevel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl border border-slate-200">
              <h3 className="font-serif font-bold text-lg text-slate-900">Create Vocational Course</h3>

              <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Solar Panel Installation & Microgrids"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Course Code *</label>
                    <input
                      type="text"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="e.g. VT-SOLAR"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono uppercase"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Duration</label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide overview of hands-on tools, equipment and syllabus..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-1/2 py-2.5 bg-slate-100 font-semibold rounded-xl text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 bg-institutional-800 text-white font-semibold rounded-xl shadow"
                  >
                    Create Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
